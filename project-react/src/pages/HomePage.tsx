import { useState, ChangeEvent, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import PrivacyNotice from "../components/PrivacyNotice";
import ImageUploadSection from "../components/ImageUploadSection";
import { getBestMatch } from "../api/routeApi";
import ImageComparisonPopup from "../components/ImageComparisonPopupProps"; // import the popup component
import LoadingPopup from "../components/LoadingPopup";
import "../index.css";

const HomePage = () => {
  // Check dark mode preference
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      return savedMode === "true";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Effect to apply dark mode
  useEffect(() => {
    const darkModeListener = (e: StorageEvent) => {
      if (e.key === "darkMode") {
        setDarkMode(e.newValue === "true");
      }
    };

    window.addEventListener("storage", darkModeListener);
    return () => window.removeEventListener("storage", darkModeListener);
  }, []);

  // Transparent Popup during analysis
  const [showPopup, setShowPopup] = useState(false);

  // Image states
  const [image1, setImage1] = useState<string | null>(null);
  const [selectedFile1, setSelectedFile1] = useState<File | null>(null);

  // Drag states
  const [isDragging1, setIsDragging1] = useState(false);

  // Result states
  const [comparisonResult, setComparisonResult] = useState<string | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [confidenceScore, setConfidenceScore] = useState<number | null>(null);
  const [topMatches, setTopMatches] = useState<any[]>([]);

  // Drag event handlers for image
  const handleDragEnter1 = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging1(true);
  };

  const handleDragLeave1 = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging1(false);
  };

  const handleDragOver1 = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop1 = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging1(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0], setSelectedFile1, setImage1);
    }
  };

  // File selection handler
  const handleFileSelection = (
    file: File,
    setSelectedFile: (file: File | null) => void,
    setImagePreview: (url: string | null) => void
  ) => {
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit");
      return;
    }

    // Check if file is an image
    if (!file.type.match("image.*")) {
      alert("Please select an image file");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // File input change handlers
  const handleFileInputChange1 = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelection(e.target.files[0], setSelectedFile1, setImage1);
    }
  };

  const handleCompare = async () => {
    if (!selectedFile1) {
      alert("Please select an image first");
      return;
    }

    setIsComparing(true);
    setComparisonResult(null);

    try {
      const result = await getBestMatch(selectedFile1);
      if (result && result.img) {
        // Save the single best match as an array for consistency with the UI that expects an array
        setTopMatches([result]);
        const score = 1 - result.distance;
        setConfidenceScore(Math.round(score * 100));
        setComparisonResult("Analysis Complete");
        // Show the popup after a successful compare
        setShowPopup(true);
      } else {
        setComparisonResult("No matches found");
      }
    } catch (error) {
      alert("An error occurred while processing the image.");
    } finally {
      setIsComparing(false);
    }
  };

  // Add this handler to reset everything
  const handleReset = () => {
    setImage1(null);
    setSelectedFile1(null);
    setComparisonResult(null);
    setConfidenceScore(null);
    setTopMatches([]);
    setIsComparing(false);
  };

  return (
    <div
      className={`d-flex flex-column min-vh-100 ${
        darkMode ? "dark bg-dark text-white" : "bg-light"
      }`}
    >
      <Navbar />

      {/* Add spacing to account for fixed navbar */}
      <div style={{ paddingTop: "76px" }}></div>

      <main className="flex-grow-1 pb-5">
        <div className="container pt-4">
          {/* Privacy notice section */}
          <PrivacyNotice />

          {/* Main upload and comparison section */}
          <ImageUploadSection
            image={image1}
            isDragging={isDragging1}
            isComparing={isComparing}
            comparisonResult={comparisonResult}
            confidenceScore={confidenceScore}
            onDragEnter={handleDragEnter1}
            onDragLeave={handleDragLeave1}
            onDragOver={handleDragOver1}
            onDrop={handleDrop1}
            onFileChange={handleFileInputChange1}
            onCompare={handleCompare}
            onReset={handleReset}
          />
        </div>
      </main>

      <Footer />

      {/* Bootstrap icons */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
      />

      {/* Conditionally render the popup if there's a result */}
      {showPopup && image1 && topMatches.length > 0 && confidenceScore !== null && (
        <ImageComparisonPopup
          originalImage={image1}
          resultImage={topMatches[0].image_base64}
          resultImgName={topMatches[0].img}
          confidenceScore={confidenceScore}
          onClose={() => setShowPopup(false)}
          onReset={handleReset}
        />
      )}

      {/* Show Loading Popup during analysis */}
      {isComparing && <LoadingPopup message="Finding Matches..." />}

      {/* Your existing components */}
      {/* <button onClick={handleCompare} disabled={isComparing}>
        {isComparing ? "Analyzing..." : "Find Similar Faces"}
      </button> */}
    </div>
  );
};

export default HomePage;
