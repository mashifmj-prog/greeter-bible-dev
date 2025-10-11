let userName = localStorage.getItem("userName") || "";
let currentBackground = "";

// ---------------- Load JSON Data ----------------
let verses = {};
let versesWeekend = [];
let dailyQuotes = [];
let quoteExplanations = {};

async function loadAllData() {
  const categories = ["morning", "day", "afternoon", "evening", "night"];
  for (const cat of categories) {
    const res = await fetch(`data/verses_${cat}.json`);
    verses[cat] = await res.json();
  }

  const weekendRes = await fetch("data/verses_weekend.json");
  versesWeekend = await weekendRes.json();

  const quotesRes = await fetch("data/daily_quotes.json");
  dailyQuotes = await quotesRes.json();

  const explanationsRes = await fetch("data/daily_quote_explanations.json");
  const data = await explanationsRes.json();
  quoteExplanations = data.reduce((acc, item) => { acc[item.quote] = item.explanation; return acc; }, {});

  updateGreeting();
  displayDailyQuote(getDailyQuote());
}

// ---------------- Helpers ----------------
function getRandomVerse(array) {
  if (!array || array.length === 0) return "No verse available.";
  return array[Math.floor(Math.random() * array.length)];
}

function getDailyQuote() {
  if (!dailyQuotes || dailyQuotes.length === 0) return "No daily quotes available.";
  const today = new Date();
  return dailyQuotes[today.getDate() % dailyQuotes.length];
}

// ---------------- Update Greeting & Verse ----------------
function updateGreeting() {
  const hour = new Date().getHours();
  const dayOfWeek = new Date().getDay();
  let greeting, icon, verseArray, newBackground;

  if (hour >= 5 && hour < 12) { greeting="Good Morning"; icon="🌅"; verseArray=verses["morning"]; newBackground="morning"; }
  else if (hour >= 12 && hour < 15) { greeting="Good Day"; icon="☀️"; verseArray=verses["day"]; newBackground="day"; }
  else if (hour >= 15 && hour < 18) { greeting="Good Afternoon"; icon="🌤️"; verseArray=verses["afternoon"]; newBackground="afternoon"; }
  else if (hour >= 18 && hour < 22) { greeting="Good Evening"; icon="🌇"; verseArray=verses["evening"]; newBackground="evening"; }
  else { greeting="Good Night"; icon="🌙"; verseArray=verses["night"]; newBackground="night"; }

  if (dayOfWeek === 0 || dayOfWeek === 6) { verseArray = versesWeekend; }

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
  document.getElementById("clock").innerText = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
}

function updateDate() {
  const now = new Date();
  document.getElementById("date").innerText = now.toLocaleDateString("en-US", { weekday:"long", year:"numeric", month:"long", day:"numeric" });
}

// ---------------- Name Input ----------------
document.getElementById("nameInput").addEventListener("input", e=>{
  userName = e.target.value.trim();
  localStorage.setItem("userName", userName);
  updateGreeting();
});

document.getElementById("resetButton").addEventListener("click", ()=>{
  localStorage.removeItem("userName");
  userName="";
  document.getElementById("nameInput").value="";
  updateGreeting();
});

// ---------------- Daily Quote ----------------
function displayDailyQuote(quote){
  document.getElementById("dailyQuote").innerText = quote;
  document.getElementById("quoteExplanation").style.display="none";
}

document.getElementById("explainQuoteBtn").addEventListener("click", ()=>{
  const quote = document.getElementById("dailyQuote").innerText;
  const explanation = quoteExplanations[quote] || "No explanation available.";
  const expEl = document.getElementById("quoteExplanation");
  expEl.style.display = (expEl.style.display==="none")?"block":"none";
  expEl.innerText = explanation;
});

// ---------------- Share Verse ----------------
document.getElementById("shareVerseBtn").addEventListener("click", ()=>document.getElementById("shareMenu").style.display="flex");
document.getElementById("closeShare").addEventListener("click", ()=>document.getElementById("shareMenu").style.display="none");

function shareVerse(platform){
  const verseText = document.getElementById("verse").innerText;
  const encoded = encodeURIComponent(verseText);

  if(platform==="whatsapp") window.open(`https://wa.me/?text=${encoded}`,"_blank");
  if(platform==="twitter") window.open(`https://twitter.com/intent/tweet?text=${encoded}`,"_blank");
  if(platform==="facebook") window.open(`https://www.facebook.com/sharer/sharer.php?u=https://yourapp.com&quote=${encoded}`,"_blank");
  if(platform==="copy") navigator.clipboard.writeText(verseText);
  if(platform==="more" && navigator.share) navigator.share({text:verseText});
}

document.getElementById("shareWhatsApp").addEventListener("click", ()=>shareVerse("whatsapp"));
document.getElementById("shareTwitter").addEventListener("click", ()=>shareVerse("twitter"));
document.getElementById("shareFacebook").addEventListener("click", ()=>shareVerse("facebook"));
document.getElementById("copyVerse").addEventListener("click", ()=>shareVerse("copy"));
document.getElementById("shareMore").addEventListener("click", ()=>shareVerse("more"));

// ---------------- Initialize ----------------
loadAllData();
updateClock();
updateDate();

setInterval(updateClock,1000);
setInterval(updateGreeting,60000);
setInterval(updateDate,60000);
