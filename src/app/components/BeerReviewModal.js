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
    savedRating !== "" ? savedRating.toString() : "",
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
      {/* Overlay - now correctly covers the full screen and dims the background */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.55)",
          zIndex: 999,
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
          backgroundColor: isDarkMode ? "#2b2b2b" : "#fff",
          color: isDarkMode ? "#f0f0f0" : "#222",
          padding: "1.75rem 2rem 2rem",
          borderRadius: 12,
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
          zIndex: 1000,
          width: "90vw",
          maxWidth: 420,
          maxHeight: "85vh",
          overflowY: "auto",
          border: isDarkMode ? "1px solid #444" : "1px solid #eee",
        }}
      >
        {/* Header row with title + close button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
            paddingBottom: 12,
            borderBottom: isDarkMode ? "1px solid #444" : "1px solid #f0f0f0",
          }}
        >
          <h2
            id="modal-title"
            style={{
              margin: 0,
              fontSize: "1.25rem",
              fontWeight: 600,
              lineHeight: 1.3,
              paddingRight: 12,
            }}
          >
            {beer ? `Review ${beer}` : "Review Beer"}
          </h2>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              flexShrink: 0,
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "none",
              backgroundColor: isDarkMode ? "#444" : "#f2f2f2",
              color: isDarkMode ? "#f0f0f0" : "#555",
              fontSize: 18,
              lineHeight: 1,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.15s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = isDarkMode
                ? "#555"
                : "#e4e4e4";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = isDarkMode
                ? "#444"
                : "#f2f2f2";
            }}
          >
            ×
          </button>
        </div>

        <label
          style={{
            display: "block",
            marginBottom: 16,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Rating (0 to 5)
          <input
            type="number"
            step={0.25}
            min={0}
            max={5}
            value={ratingInput}
            onChange={handleRatingChange}
            style={{
              width: "100%",
              padding: "10px 12px",
              marginTop: 6,
              fontSize: 16,
              boxSizing: "border-box",
              borderRadius: 6,
              border: isDarkMode ? "1px solid #555" : "1px solid #ddd",
              backgroundColor: isDarkMode ? "#3a3a3a" : "#fafafa",
              color: isDarkMode ? "#f0f0f0" : "#222",
              outline: "none",
            }}
          />
        </label>

        <label
          style={{
            display: "block",
            marginBottom: 20,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Notes
          <textarea
            value={savedNotes}
            onChange={handleNotesChange}
            rows={5}
            placeholder="What did you think?"
            style={{
              width: "100%",
              padding: "10px 12px",
              marginTop: 6,
              fontSize: 16,
              boxSizing: "border-box",
              resize: "vertical",
              borderRadius: 6,
              border: isDarkMode ? "1px solid #555" : "1px solid #ddd",
              backgroundColor: isDarkMode ? "#3a3a3a" : "#fafafa",
              color: isDarkMode ? "#f0f0f0" : "#222",
              outline: "none",
              fontFamily: "inherit",
            }}
          />
        </label>

        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "0.6rem 1.75rem",
              fontSize: 16,
              fontWeight: 600,
              borderRadius: 6,
              border: "none",
              backgroundColor: "#3BAA5C",
              color: "white",
              cursor: "pointer",
              textAlign: "center",
              boxShadow: "0 2px 6px rgba(59, 170, 92, 0.35)",
              transition: "background-color 0.15s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#329651";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#3BAA5C";
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
