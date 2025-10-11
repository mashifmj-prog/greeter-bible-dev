let userName = localStorage.getItem("userName") || "";
let currentBackground = "";
let verseArray = [];

// ---------------- Helper Functions ----------------
function getRandomVerse(array) {
  if (!array || array.length === 0) return "No verses available.";
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

// ---------------- Lazy Load Verses ----------------
async function loadVerses(category) {
  try {
    const res = await fetch(`data/verses_${category}.json`);
    return await res.json();
  } catch (err) {
    console.error(`Error loading ${category} verses:`, err);
    return [];
  }
}

// ---------------- Update Greeting & Verse ----------------
async function updateGreeting() {
  const hour = new Date().getHours();
  const dayOfWeek = new Date().getDay();
  let greeting, icon, category, newBackground;

  if (hour >= 5 && hour < 12) { greeting="Good Morning"; icon="🌅"; category="morning"; newBackground="morning"; }
  else if (hour >= 12 && hour < 15) { greeting="Good Day"; icon="☀️"; category="day"; newBackground="day"; }
  else if (hour >= 15 && hour < 18) { greeting="Good Afternoon"; icon="🌤️"; category="afternoon"; newBackground="afternoon"; }
  else if (hour >= 18 && hour < 22) { greeting="Good Evening"; icon="🌇"; category="evening"; newBackground="evening"; }
  else { greeting="Good Night"; icon="🌙"; category="night"; newBackground="night"; }

  // Weekend override
  if (dayOfWeek === 0 || dayOfWeek === 6) { category="weekend"; }

  // Lazy load only needed verses
  verseArray = await loadVerses(category);
  const randomVerse = getRandomVerse(verseArray);

  const displayGreeting = userName ? `${greeting}, ${userName}!` : greeting;
  document.getElementById("icon").innerText = icon;
  document.getElementById("text").innerText = displayGreeting;
  document.getElementById("verse").innerText = randomVerse;

  if (currentBackground !== newBackground) { document.body.className = newBackground; currentBackground = newBackground; }
}

// ---------------- Clock & Date ----------------
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');
  document.getElementById("clock").innerText = `${h}:${m}:${s}`;
}

function updateDate() {
  const now = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  document.getElementById("date").innerText = now.toLocaleDateString("en-US", options);
}

// ---------------- Name Input Listeners ----------------
document.getElementById("nameInput").addEventListener("input", e => {
  userName = e.target.value.trim();
  localStorage.setItem("userName", userName);
  updateGreeting();
});

document.getElementById("resetButton").addEventListener("click", () => {
  localStorage.removeItem("userName");
  userName="";
  document.getElementById("nameInput").value="";
  updateGreeting();
});

// ---------------- Share Verse ----------------
document.getElementById("shareVerseBtn").addEventListener("click", () => {
  document.getElementById("shareMenu").style.display = "flex";
});

document.getElementById("closeShare").addEventListener("click", () => {
  document.getElementById("shareMenu").style.display = "none";
});

function shareVerse(platform) {
  const verseText = document.getElementById("verse").innerText;
  const encoded = encodeURIComponent(verseText);

  if (platform === "whatsapp") window.open(`https://wa.me/?text=${encoded}`, "_blank");
  if (platform === "twitter") window.open(`https://twitter.com/intent/tweet?text=${encoded}`, "_blank");
  if (platform === "facebook") window.open(`https://www.facebook.com/sharer/sharer.php?u=https://yourapp.com&quote=${encoded}`, "_blank");
  if (platform === "copy") navigator.clipboard.writeText(verseText);
}

document.getElementById("shareWhatsApp").addEventListener("click", () => shareVerse("whatsapp"));
document.getElementById("shareTwitter").addEventListener("click", () => shareVerse("twitter"));
document.getElementById("shareFacebook").addEventListener("click", () => shareVerse("facebook"));
document.getElementById("copyVerse").addEventListener("click", () => shareVerse("copy"));

// ---------------- Initialize ----------------
updateGreeting();
updateClock();
updateDate();

setInterval(updateClock, 1000);
setInterval(updateGreeting, 60000);
setInterval(updateDate, 60000);
