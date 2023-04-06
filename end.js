
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

const score = localStorage.getItem("score");
document.getElementById("score").innerHTML =mostRecentScore;

