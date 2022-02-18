//numbers
const numberOfRows = 3;
const cellsPerRow = 25;
const accuracyDisplayIndex = 1;
//html elements
var input;
const root = getComputedStyle(document.documentElement);
var cursor;
const mainContent = document.querySelector(".main-content");
const durationMenu = document.getElementById("duration-menu");
var durationButtons = [];
const timerDisplay = document.createElement("span");
//sentences
const outputMsg = "Your results...";
const accuracyDisplayInitialText = "Accuracy: ";
const sentence1 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque congue nisl ut augue tincidunt, a gravida ipsum auctor. Vivamus laoreet nec orci ac hendrerit. Vestibulum ac lorem tincidunt sem mollis volutpat. Mauris congue cursus urna et bibendum. Proin quis risus porttitor, facilisis justo eget, bibendum diam. Sed consequat tempus cursus. Curabitur semper in sem ac rhoncus. Nullam id sem augue. Suspendisse mi metus, elementum non tincidunt in, finibus sit amet dolor. Donec nunc mi, eleifend ac dolor in, scelerisque fermentum dolor. Nullam lobortis efficitur neque. Sed turpis ipsum, fringilla fermentum lacus vel, congue consequat mauris.`;
