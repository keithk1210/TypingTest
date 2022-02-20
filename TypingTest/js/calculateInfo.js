var comparison = "";



function calculateWPM() {
    const chars = fixedText.split("");
    let currentWord = 0;
    let totalCorrectCharacters = 0;
    let tempCorrectCharacters = 0;
    let wpm = 0;
    for (let i = 0; i < userKeyInput.length; i++) {
        console.log(chars[i] + " == " + userKeyInput[i] + " current word " + words[currentWord]);
        if (chars[i] == " ") {
            if (tempCorrectCharacters == words[currentWord].length) {
                wpm++;
                console.log("wpm++");
            }
            tempCorrectCharacters = 0;
            currentWord++;
        } else if (userKeyInput[i] == chars[i]) {
            totalCorrectCharacters++;
            tempCorrectCharacters++;
        }
    }
    displayOutput(wpm/(duration/60));
}