import { fetchOrLoad } from "https://js.sabae.cc/fetchOrLoad.js";

const baseurl = "https://www1.city.tamba.lg.jp/ja/api/v1.0/";
const things = JSON.parse(await fetchOrLoad(baseurl + "Things")).value;

for (const t of things) {
  for (const name in t) {
    if (name.endsWith("@iot.navigationLink")) {
      const name2 = name.substring(0, name.indexOf("@"));
      const url = t[name];
      const json = JSON.parse(await fetchOrLoad(url)).value;
      delete t[name];
      delete json["@iot.id"];
      t[name2] = json;
    }
  }
  delete t["@iot.id"];
}
await Deno.writeTextFile("data/things_deep.json", JSON.stringify(things, null, 2));

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
