const fs = require('fs');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;


let path = `${__dirname.split('\\').slice(0,5).join('\\')}\\srcVideoOutput\\`;

//login a google
var oauth2Client = new OAuth2(
    '478709879855-g4mdbi44sru69p1kuulbq7icee3mrih2.apps.googleusercontent.com',
    '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'
);

oauth2Client.setCredentials({
    access_token: "ya29.a0AVA9y1t03OUC133gsfMTc_HUNaeWKoExCuFnM1-ttrcLgECG8l3dK1v0Fa4oZmSckSKEcQ9mWwqOoy37OlzrZvzs40QlbvSr2fVpxRkGxJ1PfwJw01hlkzLL1xIpWfGSV8HHSMromWvGgTa3Mg0C4Jt7PFSfcQaCgYKATASARMSFQE65dr8702S9aGn4gKwKI_CDpHj_w0165", 
    refresh_token: "1//04yG2Xdf_g_4PCgYIARAAGAQSNwF-L9IrZR7HuCO7nK-JPnNQhINLGE3fTVSyF3zFYQVeXQ0ifXb7pkDMRkxH1bZ6QrRbyf7w3R0"
});

google.options({ auth: oauth2Client }, function (err, res) {
    if(err) throw err;
    console.log(res);
});

var youtube = google.youtube('v3');

var options = {
    resource: {
        snippet: {
            title: 'Subida desde Youtube API con NodeJS',
            description: 'La subida desde NodeJS funciona :P',
        },
        status: {
            privacyStatus: 'Public'
        }
    },
    part: 'snippet,status',
    media: {
        body: fs.createReadStream(`${path}VideoFinal.mp4`)
    }   
};
console.log(`${path}VideoFinal.mp4`);

youtube.videos.insert(options, function (err, data) {
    if (err) throw err;
    console.log(data);
});