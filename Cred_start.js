const { google } = require("googleapis");
const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const question = async text =>
  new Promise((resolve, reject) => {
    rl.question(text, result =>
      result ? resolve(result) : reject("Nothing entered")
    );
  });


async function fill() {
  const clientId = await question("Enter the client ID here: ");
  const clientSecret = await question("Enter the client secret here: ");
  // create new oauth client for the app
  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    "urn:ietf:wg:oauth:2.0:oob"
  );
  // generate consent page url
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/spreadsheets"]
  });
  // url provides access, then returns a code
  console.log("Visit this url:\n%s", url);
  // paste in code
  const code = await question("Enter the code here: ");
  console.log("Converting to refresh token...");
  // convert into refresh token
  const resp = await oauth2Client.getToken(code);
  const creds = {
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: resp.tokens.refresh_token
  };
  const str = JSON.stringify(creds, true, 2);
  console.log(`Your 'credentials.json' has been set to: ${str}`);
  fs.writeFileSync("./Credentials.json", str);
}

fill().then(
  () => {
    console.log("done");
    rl.close();
  },
  err => {
    console.error("ERR", err);
    rl.close();
  }
);
