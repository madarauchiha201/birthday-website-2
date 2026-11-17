const openSurpriseButton = document.querySelector("#openSurprise");
const loveLetter = document.querySelector("#loveLetter");
const giftBox = document.querySelector("#giftBox");
const daysLeft = document.querySelector("#daysLeft");
const hoursLeft = document.querySelector("#hoursLeft");
const minutesLeft = document.querySelector("#minutesLeft");
const secondsLeft = document.querySelector("#secondsLeft");
let surpriseOpened = false;
const birthday = getNextBirthday();

openSurpriseButton.addEventListener("click", () => {
  giftBox.classList.add("open");
  loveLetter.classList.remove("hidden");
  loveLetter.classList.add("show");
  openSurpriseButton.textContent = "Surprise opened";

  if (!surpriseOpened) {
    createFloatingPieces();
    surpriseOpened = true;
  }

  loveLetter.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

updateCountdown();
setInterval(updateCountdown, 1000);

function getNextBirthday() {
  // Start a fresh 45-minute countdown whenever the page is opened.
  return new Date(Date.now() + 45 * 60 * 1000);
}

function updateCountdown() {
  const now = new Date();
  const difference = birthday - now;

  if (difference <= 0) {
    daysLeft.textContent = "00";
    hoursLeft.textContent = "00";
    minutesLeft.textContent = "00";
    secondsLeft.textContent = "00";
    return;
  }

  const seconds = Math.floor(difference / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  daysLeft.textContent = String(days).padStart(2, "0");
  hoursLeft.textContent = String(hours).padStart(2, "0");
  minutesLeft.textContent = String(minutes).padStart(2, "0");
  secondsLeft.textContent = String(remainingSeconds).padStart(2, "0");
}

function createFloatingPieces() {
  const pieces = ["heart", "heart", "heart", "confetti", "confetti", "star"];
  const colors = ["#ef476f", "#ff8fab", "#ffd166", "#7bdff2", "#b8f2e6", "#cdb4db"];

  for (let index = 0; index < 34; index += 1) {
    const piece = document.createElement("span");
    const type = pieces[Math.floor(Math.random() * pieces.length)];

    piece.className = "floating-piece";
    piece.textContent = getPieceShape(type);
    piece.style.setProperty("--x", `${Math.random() * 100}vw`);
    piece.style.setProperty("--size", `${18 + Math.random() * 18}px`);
    piece.style.setProperty("--speed", `${2600 + Math.random() * 1800}ms`);
    piece.style.setProperty("--spin", `${Math.random() > 0.5 ? "" : "-"}${120 + Math.random() * 260}deg`);
    piece.style.setProperty("--piece-color", colors[Math.floor(Math.random() * colors.length)]);

    document.body.appendChild(piece);

    piece.addEventListener("animationend", () => {
      piece.remove();
    });
  }
}

function getPieceShape(type) {
  if (type === "heart") {
    return "\u2665";
  }

  if (type === "star") {
    return "\u2726";
  }

  return "\u2022";
}

