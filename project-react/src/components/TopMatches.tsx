import React, { useState } from "react";

const TopMatches: React.FC = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    fetch("http://127.0.0.1:5001/top-matches", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data from API:", data);
        if (Array.isArray(data)) {
          setMatches(data);
        } else {
          console.error("API response is not an array:", data);
          setMatches([]);
        }
      })
      .catch((err) => console.error("Error fetching top matches:", err));
  };

  return (
    <div>
      <h2>Top Matches</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {matches.length > 0 ? (
        <ul>
          {matches.map((match, index) => (
            <li key={index}>
              {match.img}: {match.distance}
            </li>
          ))}
        </ul>
      ) : (
        <p>No matches found</p>
      )}
    </div>
  );
};

export default TopMatches;
