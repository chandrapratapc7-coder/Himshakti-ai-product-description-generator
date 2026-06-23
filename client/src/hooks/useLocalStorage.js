// hooks/useLocalStorage.js
// Generic localStorage-backed state hook, plus a dedicated
// useSavedListings hook for HimShakti generated descriptions.

import { useState, useEffect, useCallback } from "react";

// ── Generic localStorage hook ────────────────────────────────────────────
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.error(`useLocalStorage: failed to read "${key}"`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`useLocalStorage: failed to write "${key}"`, err);
    }
  }, [key, value]);

  return [value, setValue];
}

// ── Saved Listings hook ───────────────────────────────────────────────────
// Stores an array of saved listing objects:
// {
//   id, savedAt,
//   formData: { productName, category, weight, ingredients, features, tone, platforms, keywords },
//   output:   { title, shortDesc, longDesc, bullets[], keywords[], usage }
// }

const STORAGE_KEY = "himshakti_saved_listings";

export function useSavedListings() {
  const [listings, setListings] = useLocalStorage(STORAGE_KEY, []);

  // Save a new listing — returns the new listing's id
  const saveListing = useCallback((formData, output) => {
    const newListing = {
      id: `listing_${Date.now()}`,
      savedAt: new Date().toISOString(),
      formData,
      output,
    };
    setListings((prev) => [newListing, ...prev]);
    return newListing.id;
  }, [setListings]);

  // Delete a listing by id
  const deleteListing = useCallback((id) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
  }, [setListings]);

  // Clear all listings
  const clearAll = useCallback(() => {
    setListings([]);
  }, [setListings]);

  // Check if a given product (by name) is already saved
  const isSaved = useCallback((productName) => {
    return listings.some(
      (l) => l.formData?.productName?.toLowerCase() === productName?.toLowerCase()
    );
  }, [listings]);

  return { listings, saveListing, deleteListing, clearAll, isSaved };
}
