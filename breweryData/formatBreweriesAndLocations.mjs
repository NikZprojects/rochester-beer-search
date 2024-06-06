import fs from "fs";

const allBreweries = JSON.parse(
  fs.readFileSync("./breweriesBeersAndLocations.json")
);

const allFormattedData = [];
for (const breweryData of allBreweries) {
  const formattedData = {
    Brewery: breweryData.Brewery,
    Section: breweryData.Section,
    Subsection: breweryData.Subsection,
    Beers: [],
  };
  const beersAtBrewery = breweryData.Beers.split(";");
  for (const beer of beersAtBrewery) {
    const formattedBeerName = beer.replace(".", "").trim();
    if (formattedBeerName) {
      formattedData.Beers.push(formattedBeerName);
    }
  }
  allFormattedData.push(formattedData);
}

fs.writeFileSync(
  "../src/app/assets/formattedBreweriesBeersLocations.json",
  JSON.stringify(allFormattedData, null, 2)
);
