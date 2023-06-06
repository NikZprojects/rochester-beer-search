import fs from "fs";

const allBreweries = JSON.parse(fs.readFileSync("./breweriesAndBeers.json"));

const formattedData = [];
for (const brewery of allBreweries) {
  const breweryData = { Brewery: brewery.Brewery, Beers: [] };
  const beersAtBrewery = brewery.Beers.split(";");
  for (const beer of beersAtBrewery) {
    breweryData.Beers.push(beer.replace(".", "").trim());
  }
  formattedData.push(breweryData);
}

fs.writeFileSync(
  "./formattedBreweriesAndBeers.json",
  JSON.stringify(formattedData, null, 2)
);
