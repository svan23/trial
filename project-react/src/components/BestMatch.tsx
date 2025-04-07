import React, { useState } from "react";
import { getBestMatch } from "../api/routeApi";

interface BestMatchProps {
  file: File;
}

const BestMatch: React.FC<BestMatchProps> = ({ file }) => {
  const [bestMatch, setBestMatch] = useState<{
    img: string;
    distance: number;
    image_base64: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBestMatch = async () => {
    setLoading(true);
    try {
      const data = await getBestMatch(file);
      setBestMatch(data);
    } catch (error) {
      console.error("Error fetching best match:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchBestMatch} disabled={loading}>
        {loading ? "Fetching Best Match..." : "Get Best Match"}
      </button>
      {bestMatch && (
        <div>
          <h2>Best Match: {bestMatch.img}</h2>
          <p>Distance: {bestMatch.distance}</p>
          <img
            src={`data:image/jpeg;base64,${bestMatch.image_base64}`}
            alt={bestMatch.img}
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default BestMatch;
