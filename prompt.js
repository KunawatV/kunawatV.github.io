
let promptInterval = 10;
setInterval(myTimer, promptInterval*1000);

let count = 0;
let max = 6;
const prompt = [
    "‿︵‿ Do the wave ︵‿︵",
    "Do the Dab ヽ(O⌣Oヾ)",
    "ヽ(O⌣Oヾ) Do it again on the other side",
    "Hold an invisbile small box □",
    "Hold an invisible BIG box ◻",
    "Do the YMCA",
    "Strike a Pose!"
];

function myTimer() {
    document.getElementById("prompt").innerHTML = prompt[count]
    if (count >= max ) {
        count = 0
    } else {
        count += 1;
    }
    
    



//   const date = new Date();
// document.getElementById("prompt").innerHTML = date.toLocaleTimeString();
}