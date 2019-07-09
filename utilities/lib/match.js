exports.sortScores = function(matches) {
		const scores = [];
		
		matches.map(m => {
			const home = {
				score: m.homeScore,
				team: m.homeTeamId
			}
			const away = {
				score: m.awayScore,
				team: m.awayTeamId
			}
			
			scores.push(home, away);
		});
		
		scores.sort((a,b) => a.score < b.score ? 1 : a.score > b.score ? -1 : 0);

		return scores;
};

// exports.lowestScore = function(matches) {
// 	// compare scores and return loser
// },

// exports.rankPosition = function(matches) {
// 	//rank all positions and return rankings
// }