# Google spreadsheets API - GET data of xls using Node

### Finding your credentials

The following process creates a new OAuth application (Client ID/Secret) and gives it access to your Google account's spreadsheets (Refresh token) and stores the results into `credentials.json`

1. Get your credentials
    1. Go to https://console.cloud.google.com/apis/dashboard
    1. Click "Enable APIs and Services"
    1. Search "Sheets"
    1. Click "Enable"
    1. Go to https://console.developers.google.com/apis/credentials/oauthclient
    1. **IMPORTANT** Choose "Other" and choose a name
    1. Should find a form with: Client ID, Client secret
    1. Run `node Cred_start.js` to generate `Credentials.json`
1. Run 'node GetAPI.js'