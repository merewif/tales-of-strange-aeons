const xml2js = require("xml2js");
const fs = require("fs");

// XML string to be parsed to JSON
const xml = fs.readFileSync("./assets/feed/feed");
const url = "https://pasch.substack.com/feed";

// convert XML to JSON
xml2js.parseString(url, (err, result) => {
  if (err) {
    throw err;
  }

  // `result` is a JavaScript object
  // convert it to a JSON string
  const json = JSON.stringify(result, null, 4);

  // save JSON in a file
  fs.writeFileSync("./assets/feed/blogposts.json", json);
  console.log("JSON file created");
});

// run 'node xml2json.js' to generate file
