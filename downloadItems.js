import { CSV } from "https://js.sabae.cc/CSV.js";
import { fetchOrLoad } from "https://js.sabae.cc/fetchOrLoad.js";

//const url = "https://www1.city.tamba.lg.jp/ja/api/v1.0/Things(17)/Locations";

const itemnames = [
  "Things",
  "Locations",
  "HistoricalLocations",
  "Datastreams",
  "ObservedProperties",
//  "Observations", // データ can't get
];

const baseurl = "https://www1.city.tamba.lg.jp/ja/api/v1.0/";
const data = {};
for (const name of itemnames) {
  const url = baseurl + name + (name == "Datastreams" ? "?$top=200" : "");
  const json = JSON.parse(await fetchOrLoad(url));
  const lname = name.toLowerCase();
  await Deno.writeTextFile("data/" + lname + ".json", JSON.stringify(json, null, 2));
  data[lname] = json;
}

//const url = "https://www1.city.tamba.lg.jp/ja/api/v1.0/Observations?$top=10";

/*
    {
      "@iot.id": 6,
      "@iot.selfLink": "https://www1.city.tamba.lg.jp/ja/api/v1.0/Things(6)",
      "HistoricalLocations@iot.navigationLink": "https://www1.city.tamba.lg.jp/ja/api/v1.0/Things(6)/HistoricalLocations",
      "Locations@iot.navigationLink": "https://www1.city.tamba.lg.jp/ja/api/v1.0/Things(6)/Locations",
      "Datastreams@iot.navigationLink": "https://www1.city.tamba.lg.jp/ja/api/v1.0/Things(6)/Datastreams",
      "name": "神楽の郷交流センター",
      "description": "雨",
      "properties": null
    },
*/
