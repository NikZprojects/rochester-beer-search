import Link from "next/link";
import { useState, useEffect } from "react";
import listOfBreweries from "../assets/formattedBreweriesBeersLocations.json";

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function markItem(name) {
  const stored = JSON.parse(localStorage.getItem("markedItems") || "[]");
  if (!stored.includes(name)) {
    stored.push(name);
    localStorage.setItem("markedItems", JSON.stringify(stored));
  }
}

function unmarkItem(name) {
  const stored = JSON.parse(localStorage.getItem("markedItems") || "[]");
  const updated = stored.filter((item) => item !== name);
  localStorage.setItem("markedItems", JSON.stringify(updated));
}

function isMarked(name) {
  const stored = JSON.parse(localStorage.getItem("markedItems") || "[]");
  return stored.includes(name);
}

const getKey = (item) => item.toLowerCase(); // or any other stable unique string

export default function BreweriesList({ searchTerm, section }) {
  // const STORAGE_KEY = "markedBeers";

  // const [markedItems, setMarkedItems] = useState(() => {
  //   const stored = localStorage.getItem(STORAGE_KEY);
  //   return stored ? new Set(JSON.parse(stored)) : new Set();
  // });

  // useEffect(() => {
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify([...markedItems]));
  // }, [markedItems]);

  // const getKey = (item) => item.toLowerCase();

  // const toggleMark = (item) => {
  //   const key = getKey(item);
  //   setMarkedItems((prev) => {
  //     const updated = new Set(prev);
  //     if (updated.has(key)) {
  //       updated.delete(key);
  //     } else {
  //       updated.add(key);
  //     }
  //     return updated;
  //   });
  // };

  // const isItemMarked = (item) => markedItems.has(getKey(item));

  const nextState = {
    none: "saved",
    saved: "checked",
    checked: "none",
  };

  const STORAGE_KEY = "beerStates";

  const [beerStates, setBeerStates] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Map(JSON.parse(stored)) : new Map();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...beerStates]));
  }, [beerStates]);

  const cycleBeerState = (beer) => {
    const key = getKey(beer);
    setBeerStates((prev) => {
      const newMap = new Map(prev);
      const current = newMap.get(key) || "none";
      newMap.set(key, nextState[current]);
      return newMap;
    });
  };

  const getBeerState = (beer) => {
    return beerStates.get(getKey(beer)) || "none";
  };

  const formatTitle = (beerName) => {
    // Format to title case:
    beerName = beerName.replace(/\.$/, "");
    const beerSubstrings = beerName.split(" ");
    let newBeerName = "";
    const excludeTitleCase = ["on", "in", "of", "the", "to", "and", "or"];
    for (let beerSubstring of beerSubstrings) {
      if (
        beerSubstring === beerSubstring.toLowerCase() &&
        !excludeTitleCase.includes(beerSubstring)
      ) {
        const specialSubstring = ["(", "[", "*"].includes(beerSubstring[0]);
        beerSubstring =
          beerSubstring.slice(0, specialSubstring ? 2 : 1).toUpperCase() +
          beerSubstring.slice(specialSubstring ? 2 : 1);
      }
      newBeerName += ` ${beerSubstring}`;
    }
    beerName = newBeerName;
    return beerName;
  };

  const boldSearchQueryName = (beerName, searchTerm, fontWeightAdjustment) => {
    if (!searchTerm) {
      return <span>{beerName}</span>;
    }

    const safeTerm = escapeRegExp(searchTerm.toLowerCase());

    const splitBeer = beerName.split(
      new RegExp(`${safeTerm.toLowerCase()}`, "gi")
    );
    const searchTermsMatched = [
      ...beerName.matchAll(new RegExp(`${safeTerm.toLowerCase()}`, "gi")),
    ];

    const formattedSearch = [];
    let searchTermIndex = 0;
    for (const beerSubstring of splitBeer) {
      formattedSearch.push(
        splitBeer.indexOf(beerSubstring) !== splitBeer.length - 1 ? (
          <span>
            {beerSubstring}
            <span className={`font-${fontWeightAdjustment}`}>
              {searchTermsMatched[searchTermIndex]}
            </span>
          </span>
        ) : (
          <span>{beerSubstring}</span>
        )
      );
      searchTermIndex += 1;
    }
    return formattedSearch;
  };

  const [sortByBrewery, setSortByBrewery] = useState(false);

  return (
    <div className="justify-start w-100">
      {!section && !searchTerm && (
        <div className="w-100 mt-8 text-center">
          <div
            className="text-sky-600 cursor-pointer"
            onClick={() => setSortByBrewery(!sortByBrewery)}
          >
            Sort by {sortByBrewery ? "Section" : "Brewery Name"}
          </div>
        </div>
      )}
      {listOfBreweries
        .filter((brewery) =>
          section ? brewery.Section === section.toUpperCase() : true
        )
        .filter((brewery) =>
          brewery.Beers.some(
            (beer) =>
              beer.toLowerCase().includes(searchTerm.toLowerCase()) ||
              brewery.Brewery.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
        .sort((a, b) =>
          sortByBrewery
            ? a.Brewery > b.Brewery
              ? 1
              : -1
            : a.Section === b.Section
            ? parseInt(a.Subsection) - parseInt(b.Subsection)
            : a.Section > b.Section
            ? 1
            : -1
        )
        .map((breweryData, index) => (
          <div className="pt-8" key={index}>
            <h1 className="text-xl font-semibold text-left pb-2">
              {boldSearchQueryName(
                breweryData.Brewery,
                searchTerm,
                "extrabold"
              )}{" "}
              ({breweryData.Section}-{breweryData.Subsection})
              {!section ? (
                <Link
                  className="text-sky-600 text-sm"
                  href={`/section/${breweryData.Section.toLowerCase()}`}
                >
                  {" "}
                  [Map to Section]
                </Link>
              ) : (
                ""
              )}
            </h1>
            <ul className="list-disc pl-8">
              {breweryData.Beers.map((beer, beerIndex) => {
                return (
                  <li key={beerIndex}>
                    <div
                      div
                      onClick={() =>
                        cycleBeerState(
                          breweryData.Brewery + ":" + beer + beerIndex
                        )
                      }
                      style={{
                        cursor: "pointer",
                        color:
                          getBeerState(
                            breweryData.Brewery + ":" + beer + beerIndex
                          ) === "saved"
                            ? "#3BAA5C"
                            : getBeerState(
                                breweryData.Brewery + ":" + beer + beerIndex
                              ) === "checked"
                            ? ""
                            : "",
                        textDecoration:
                          getBeerState(
                            breweryData.Brewery + ":" + beer + beerIndex
                          ) === "checked"
                            ? "line-through"
                            : "none",
                        opacity:
                          getBeerState(
                            breweryData.Brewery + ":" + beer + beerIndex
                          ) === "checked"
                            ? 0.5
                            : 1,
                      }}
                    >
                      {boldSearchQueryName(
                        formatTitle(beer),
                        searchTerm,
                        "bold"
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
    </div>
  );
}
