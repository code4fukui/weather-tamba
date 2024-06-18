import { CSV } from "https://js.sabae.cc/CSV.js";

const things = JSON.parse(await Deno.readTextFile("data/things_deep.json"));

for (const t of things) {
  delete t.HistoricalLocations;
  t.lat = t.Locations[0].location.coordinates[1];
  t.lng = t.Locations[0].location.coordinates[0];
  delete t.Locations;

  t.datastreams = t.Datastreams.map(i => i.name + "(" + i.unitOfMeasurement.unit + ")").join(",");
  delete t.Datastreams;

  delete t.properties;
}
await Deno.writeTextFile("data/things_summary.csv", CSV.stringify(things));

const oprop = JSON.parse(await Deno.readTextFile("data/observedproperties.json"));
await Deno.writeTextFile("data/observedproperties.csv", CSV.stringify(oprop.value));
