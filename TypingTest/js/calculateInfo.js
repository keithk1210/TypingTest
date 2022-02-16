var comparison = "";
const chars = sentence1.split("");


function calculateWPM() {
    let currentWord = 0;
    let totalCorrectCharacters = 0;
    let tempCorrectCharacters = 0;
    let wpm = 0;
    for (let i = 0; i < userKeyInput.length; i++) {
        if (chars[i] == " " || chars[i] == "\n") {
            if (tempCorrectCharacters == words[currentWord].length) {
                wpm++;
            }
            tempCorrectCharacters = 0;
            currentWord++;
        } else if (userKeyInput[i] == chars[i]) {
            totalCorrectCharacters++;
            tempCorrectCharacters++;
        }
    }
    displayOutput(wpm);
}