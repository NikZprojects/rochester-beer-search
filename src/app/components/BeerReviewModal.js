"use client";
import React, { useState, useEffect } from "react";

export default function BeerReviewModal({
  beer,
  breweryData,
  beerIndex,
  isOpen,
  onClose,
  getKey,
  beerRatings,
  updateBeerReview,
  cycleBeerState,
}) {
  if (!isOpen || !beer) return null;

  const key = getKey(beer);
  const savedRating = beerRatings[key]?.rating ?? "";
  const savedNotes = beerRatings[key]?.notes ?? "";

  // Local input state to handle typing without cutting chars off
  const [ratingInput, setRatingInput] = useState(
    savedRating !== "" ? savedRating.toString() : ""
  );

  useEffect(() => {
    setRatingInput(savedRating !== "" ? savedRating.toString() : "");
  }, [savedRating]);

  // Handle rating input changes smoothly
  const handleRatingChange = (e) => {
    const val = e.target.value;

    // Regex allows numbers with optional decimal (like "4", "3.5", "2.25")
    if (val === "" || (/^\d*\.?\d*$/.test(val) && Number(val) <= 5)) {
      setRatingInput(val);
      if (val === "") {
        updateBeerReview(beer, { rating: "" });
      } else {
        updateBeerReview(beer, { rating: parseFloat(val) });
      }
    }
  };

  // Handle notes changes
  const handleNotesChange = (e) => {
    updateBeerReview(beer, { notes: e.target.value });
  };
  const isDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: isDarkMode ? "#222" : "#fff",
          color: isDarkMode ? "#eee" : "#222",
          padding: "1.5rem 2rem",
          borderRadius: 8,
          boxShadow: isDarkMode
            ? "0 8px 24px rgba(0,0,0,0.8)"
            : "0 8px 24px rgba(0,0,0,0.2)",
          zIndex: 1000,
          width: "90vw",
          maxWidth: 400,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      />
      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: isDarkMode ? "#555" : "#fff",
          color: isDarkMode ? "black" : "#222",
          padding: "1.5rem 2rem",
          borderRadius: 8,
          boxShadow: isDarkMode
            ? "0 8px 24px rgba(0,0,0,0.8)"
            : "0 8px 24px rgba(0,0,0,0.2)",
          zIndex: 1000,
          width: "90vw",
          maxWidth: 400,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <h2 id="modal-title" style={{ marginTop: 0 }}>
          {beer.name || "Review Beer"}
        </h2>

        <label style={{ display: "block", marginBottom: 12 }}>
          Rating (0 to 5):
          <input
            type="number"
            step={0.25}
            min={0}
            max={5}
            value={ratingInput}
            onChange={handleRatingChange}
            style={{
              width: "100%",
              padding: 8,
              marginTop: 4,
              fontSize: 16,
              boxSizing: "border-box",
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: 12 }}>
          Notes:
          <textarea
            value={savedNotes}
            onChange={handleNotesChange}
            rows={5}
            style={{
              width: "100%",
              padding: 8,
              marginTop: 4,
              fontSize: 16,
              boxSizing: "border-box",
              resize: "vertical",
            }}
          />
        </label>

        <button
          onClick={onClose}
          style={{
            padding: "0.5rem 1rem",
            fontSize: 16,
            borderRadius: 4,
            border: "none",
            backgroundColor: "#3BAA5C",
            color: "white",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </>
  );
}
