const express = require('express');
const { Client } = require('espn-fantasy-football-api/node');
const nodemailer = require('nodemailer');
const myEmail = require('./email.js');
const matchUtils = require('./utilities').Match;

const app = express();
const myClient = new Client({ leagueId: 366210 });

myClient.setCookies({ espnS2: 'AEBxj59LhZR9gGHOlmjtmtwq29SGQJfSMCTgBIZR2a4tpSS3oBKdN9Pv%2B%2BmEVT7wdevZjt51N9iHUkM%2B%2FXAIBOemDz%2BNHKRCRmaDYZQpaO5Bgq9tZLus6vGri6kLGIFCd7T2B1Zb5l7nUhj5gCKz2juRYhUyDOCFN85z%2BsHZGOLsadDirS4mrnUE5EHCYcK25ZvaNs1hLWynHKTpgatQ9%2B6A9vrE7HItdQkND9WeSbatEcPrXlceuI8JqNtGI6DbbO5ZIPzimUQ1xbQ1Bw7y1dupadT5if6MMBWNAQncpqslEg%3D%3D', SWID: '73675E39-CDD8-49A3-8421-D94C4C7105D0' });

let data;

myClient.getBoxscoreForWeek({ seasonId: 2018, scoringPeriodId: 5, matchupPeriodId: 5 }).then((boxscores) => {
	data = boxscores;
	const scores = matchUtils.sortScores(data);
	
	if(scores) {
		myEmail.email(scores);
	}
});

app.get('/', function (req, res) {
	res.status(200).send(data);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});