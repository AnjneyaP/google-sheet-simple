const { google } = require("googleapis");
const auth = require("./Cred_load");

async function run() {
  //create sheets client
  const sheets = google.sheets({ version: "v4", auth });
  //get a range of values
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: "1C5DUNqruaDp-CVWIVV52wPHafgTsRBR6j55WCiAxgfY",
    range: "Sheet2!A1:E"
  });
  //print results
  console.log(JSON.stringify(res.data, null, 2));
}

run().catch(err => console.error("ERR", err));
