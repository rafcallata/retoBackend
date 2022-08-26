const fs = require('fs');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;


let path = "D:/RAFAEL/2022_I/BOOTCAMP/test/srcVideoOutPut/"
//login a google
var oauth2Client = new OAuth2(
    '478709879855-g4mdbi44sru69p1kuulbq7icee3mrih2.apps.googleusercontent.com',
    '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'
);

oauth2Client.setCredentials({
    access_token: 'ya29.a0AVA9y1uGDDoX6d9_uOmEO20wd4-xbY0rVTNJUsJVMQHdsP_IEfFyOcs5y2E3Azt_hteXJlaFYUc5tWfa3GG84Y6kJJk8hPE6iu_GyVZAhWbO8QyKSwaDuzssWE0uxt9s36bSHwJeM7ENOUFNHAORNz2TQmr1aCgYKATASAQASFQE65dr8ieAndYaj0dAYCuS7lo3d7Q0163',
    refresh_token: '1//04R9-TgoFl7QOCgYIARAAGAQSNwF-L9IrxaIyEP1E7fHmaiMyaDbH8eDH9lWVkFWwUjvTXdW8uA1Jz0bDYZQGbF11AOv2Kmbc9g0'
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