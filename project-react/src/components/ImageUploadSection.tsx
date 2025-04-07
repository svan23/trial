import React, { useRef, ChangeEvent } from 'react';
import ResultsDisplay from './ResultsDisplay';

interface ImageUploadSectionProps {
  image: string | null;
  isDragging: boolean;
  isComparing: boolean;
  comparisonResult: string | null;
  confidenceScore: number | null;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCompare: () => void;
  onReset: () => void; // Add this prop
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
  image,
  isDragging,
  isComparing,
  comparisonResult,
  confidenceScore,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onFileChange,
  onCompare,
  onReset // Add this to destructuring
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // You can keep this function for any component-specific reset logic
  // but make sure to call the parent's onReset too
  // const handleReset = () => {
  //   // Call the parent's reset function
  //   onReset();
  // };

  // Define styles as JavaScript objects
  const themedDashedBorderStyle = {
    border: '2px dashed var(--color-tertiary)',
    backgroundColor: 'rgba(233, 165, 241, 0.05)',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(198, 142, 253, 0.1)'
  };

  const themedDashedBorderHoverStyle = {
    borderColor: 'var(--color-secondary)',
    backgroundColor: 'rgba(198, 142, 253, 0.08)',
    boxShadow: '0 6px 20px rgba(198, 142, 253, 0.15)'
  };

  const gradientPrimaryStyle = {
    background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
    border: 'none',
    fontWeight: '600',
    fontSize: '1.1rem',
    boxShadow: '0 4px 12px rgba(198, 142, 253, 0.25)'
  };

  return (
    <div id="upload-section" className="card border-0 rounded-4 shadow-lg mb-5">
      <div className="card-body p-4 p-md-5">
        <div className="mb-5">
          <h2 className="card-title text-center mb-3 d-flex flex-column align-items-center">
            <div className="mb-2">
              <i className="bi bi-stars fs-1 text-gradient-pink me-2"></i>
            </div>
            <div className="text-gradient fw-bold display-5 mb-2" style={{letterSpacing: "-0.5px"}}>Who's Your Celebrity Twin?</div>
            <div className="text-secondary fs-4 fw-light">Find Your Famous Look-Alike</div>
          </h2>
          <div className="text-center">
            <div className="gradient-divider mx-auto mb-4" style={{ width: "120px", height: "3px" }}></div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-7">
            <div 
              className={`position-relative mb-4 rounded-4 overflow-hidden d-flex align-items-center justify-content-center image-upload-container cursor-pointer ${
                isDragging 
                  ? 'border-primary bg-primary bg-opacity-10 border-2' 
                  : image 
                    ? 'border-primary border-2' 
                    : ''
              } transition shadow-hover`}
              style={{
                ...((!image && !isDragging) ? themedDashedBorderStyle : {}),
                maxHeight: '400px' // Added max height constraint
              }}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onClick={triggerFileInput}
              onMouseOver={(e) => {
                if (!image && !isDragging) {
                  Object.assign(e.currentTarget.style, themedDashedBorderHoverStyle);
                }
              }}
              onMouseOut={(e) => {
                if (!image && !isDragging) {
                  e.currentTarget.style.borderColor = 'var(--color-tertiary)';
                  e.currentTarget.style.backgroundColor = 'rgba(233, 165, 241, 0.05)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(198, 142, 253, 0.1)';
                }
              }}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={onFileChange}
                className="d-none" 
                accept="image/*"
              />
              
              {image ? (
                <>
                  <img src={image} alt="Your face" className="img-fluid h-100 w-100 object-fit-cover" />
                  <div className="position-absolute inset-0 bg-dark bg-opacity-50 opacity-0 hover:opacity-100 d-flex flex-column align-items-center justify-content-center transition">
                    <span 
                      className="badge mb-2 px-4 py-3 fs-6"
                      style={gradientPrimaryStyle}
                    >
                      Replace image
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-center p-5">
                  <i className="bi bi-camera-fill display-2 text-purple-600 mb-4"></i>
                  <p className="text-purple-700 mb-2 fs-4 fw-medium lh-sm">Drop your photo to meet your star twin</p>
                  <p className="text-purple-700 mb-3 fs-5 fw-medium">First match may take 10-30 seconds</p>
                
                  <p className="text-muted fs-6 mb-4">Supports JPG, PNG (max 5MB)</p>
                  
                  {/* The Find Similar Faces button moved inside the upload area */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering file input click
                      onCompare();
                    }}
                    disabled={!image || isComparing}
                    className="btn btn-gradient-primary px-5 py-3 rounded-pill fw-semibold fs-5 mt-2"
                    style={{
                      boxShadow: '0 4px 15px rgba(198, 142, 253, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(198, 142, 253, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(198, 142, 253, 0.3)';
                    }}
                  >
                    {isComparing ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Finding Matches...
                      </>
                    ) : "Find Similar Faces"}
                  </button>
                </div>
              )}
            </div>
            
            {/* The button appears below the upload area when an image is selected */}
            {image && (
              <div className="text-center mt-4">
                <button
                  onClick={onCompare}
                  disabled={isComparing}
                  className="btn btn-lg btn-gradient-primary px-5 py-3 rounded-pill fw-semibold fs-5"
                  style={{
                    boxShadow: '0 4px 15px rgba(198, 142, 253, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(198, 142, 253, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(198, 142, 253, 0.3)';
                  }}
                >
                  {isComparing ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Finding Matches...
                    </>
                  ) : "Find Similar Faces"}
                </button>
                <p className="text-muted fs-6 mt-3">First analysis may take 10-30 seconds</p>
              </div>
            )}
          </div>
        </div>

        <ResultsDisplay 
          comparisonResult={comparisonResult}
          confidenceScore={confidenceScore}
          onReset={onReset} // Pass the parent's onReset directly
        />
      </div>

      {/* Add normal CSS style tag - no JSX */}
      <style>
        {`
        /* Themed dashed border for image uploader */
        .themed-dashed-border {
          border: 2px dashed var(--color-tertiary);
          background-color: rgba(233, 165, 241, 0.05);
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(198, 142, 253, 0.1);
        }

        .themed-dashed-border:hover {
          border-color: var(--color-secondary);
          background-color: rgba(198, 142, 253, 0.08);
          box-shadow: 0 6px 20px rgba(198, 142, 253, 0.15);
        }

        .shadow-hover {
          transition: all 0.3s ease;
        }

        .shadow-hover:hover {
          box-shadow: 0 10px 25px rgba(198, 142, 253, 0.2);
        }

        /* Replace button styling */
        .badge.bg-gradient-primary {
          background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
          border: none;
          font-weight: 600;
          font-size: 1.1rem;
        }

        /* Button gradient */
        .btn-gradient-primary {
          background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
          border: none;
          color: white;
          font-weight: 600;
          letter-spacing: 0.3px;
          transition: all 0.3s ease;
        }

        .btn-gradient-primary:hover {
          opacity: 0.95;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(198, 142, 253, 0.4);
        }

        .btn-gradient-primary:active {
          transform: translateY(1px);
        }

        /* Image container styling */
        .image-upload-container {
          aspect-ratio: 16/9; /* Changed from 1/1 to 16/9 for a shorter rectangle */
          max-width: 100%;
          height: auto;
          min-height: 350px; /* Added min-height for consistency */
        }

        .text-gradient {
          background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .gradient-divider {
          background: linear-gradient(to right, var(--color-primary), var(--color-tertiary));
          height: 3px;
          border-radius: 3px;
        }
        `}
      </style>
    </div>
  );
};

export default ImageUploadSection;