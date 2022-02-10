var comparison = "";
const chars = sentence1.split("");


function calculateAccuracy() {
    let currentWord = 0;
    let totalCorrectCharacters = 0;
    let tempCorrectCharacters = 0;
    let wpm = 0;
    for (let i = 0; i < userKeyInput.length; i++) {
        if (chars[i] == " ") {
            console.log(tempCorrectCharacters + " " + words[currentWord].length);
            if (tempCorrectCharacters == words[currentWord].length) {
                wpm++;
            }
            tempCorrectCharacters = 0;
            currentWord++;
        }
        if (userKeyInput[i] == chars[i]) {
            totalCorrectCharacters++;
            if (userKeyInput[i] != " ") {
                tempCorrectCharacters++;
            }
        }
    }
    var accuracy = (totalCorrectCharacters/userKeyInput.length) * 100;
    displayOutput(wpm,accuracy);
    console.log("correct chars " + totalCorrectCharacters);
    console.log("userkeynput.length " + userKeyInput.length);
    console.log("accuracy " + accuracy);
    console.log("wpm " + wpm);
}