import listOfBreweries from "../assets/formattedBreweriesAndBeers.json";

export default function BreweriesList({ searchTerm }) {
  const formatBeer = (beerName) => {
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

    // Bold the search Term:
    if (!searchTerm) {
      return <span>{beerName}</span>;
    }

    const splitBeer = beerName.split(
      new RegExp(`${searchTerm.toLowerCase()}`, "gi")
    );
    const searchTermsMatched = [
      ...beerName.matchAll(new RegExp(`${searchTerm.toLowerCase()}`, "gi")),
    ];

    const formattedSearch = [];
    let searchTermIndex = 0;
    for (const beerSubstring of splitBeer) {
      console.log(searchTermIndex);
      formattedSearch.push(
        splitBeer.indexOf(beerSubstring) !== splitBeer.length - 1 ? (
          <span>
            {beerSubstring}
            <b className="text-lg font-bold">
              {searchTermsMatched[searchTermIndex]}
            </b>
          </span>
        ) : (
          <span>{beerSubstring}</span>
        )
      );
      searchTermIndex += 1;
    }
    return formattedSearch;
  };

  return (
    <div>
      {listOfBreweries
        .filter((brewery) =>
          brewery.Beers.some(
            (beer) =>
              beer.toLowerCase().includes(searchTerm.toLowerCase()) ||
              brewery.Brewery.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
        .sort((a, b) => (a.Brewery > b.Brewery ? 1 : -1))
        .map((breweryData, index) => (
          <div className="pt-8" key={index}>
            <h1 className="text-lg font-bold">{breweryData.Brewery}</h1>
            <ul className="list-disc pl-8">
              {breweryData.Beers.map((beer, beerIndex) => {
                return <li key={beerIndex}>{formatBeer(beer)}</li>;
              })}
            </ul>
          </div>
        ))}
    </div>
  );
}
