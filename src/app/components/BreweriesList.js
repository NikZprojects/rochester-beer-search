import listOfBreweries from "../assets/formattedBreweriesAndBeers.json";

export default function BreweriesList({ searchTerm }) {
  console.log(searchTerm);
  return (
    <div>
      {listOfBreweries
        .filter((brewery) =>
          brewery.Beers.some((beer) =>
            beer.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
        .map((breweryData, index) => (
          <div className="pt-8" key={index}>
            <h1 className="text-lg font-bold">{breweryData.Brewery}</h1>
            <ul className="list-disc pl-8">
              {breweryData.Beers.map((beer, beerIndex) => (
                <li key={beerIndex}>{beer}</li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}
