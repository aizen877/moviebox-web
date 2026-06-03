"use client";

import { useState, useEffect } from "react";
import Carousel from "./Carousel";

export default function ContinueWatching() {
  const [history, setHistory] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("mbx:continue_watching");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Map to match the shape MovieCard / Carousel expects
          const mapped = parsed.map((item: any) => ({
            id: item.id,
            title: item.title,
            poster_path: item.posterPath,
            vote_average: 0,
            release_date: "",
            _id: item.id, // Use id directly for watch route or detail route
            media_type: item.mediaType || "movie",
            progress: item.progress,
            duration: item.duration,
            episodeTitle: item.episodeTitle,
            season: item.season,
            episode: item.episode,
          }));
          setHistory(mapped);
        }
      }
    } catch (e) {
      console.error("Failed to load continue watching history:", e);
    }
  }, []);

  if (!mounted || history.length === 0) return null;

  return (
    <div style={{ marginBottom: "2rem" }}>
      <Carousel title="Continue Watching" movies={history} eager={true} />
    </div>
  );
}
