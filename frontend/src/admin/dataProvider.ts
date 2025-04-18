import jsonServerProvider from "ra-data-json-server";

export const dataProvider = jsonServerProvider(
  // "https://jsonplaceholder.typicode.com"
  "http://localhost:3000/api"
);
