const https = require("https");
const fs = require("fs");

//Download feed from substack
const url = "https://pasch.substack.com/feed";

https.get(url, (response) => {
  const filePath = fs.createWriteStream(`./assets/feed/feed`);
  response.pipe(filePath);
  filePath.on("finish", () => {
    filePath.close();
    console.log("Download Completed");
  });
});
