// -------------------- Greeter Bible App (Fully Online) --------------------

// ----- Globals -----
let userName = localStorage.getItem("userName") || "";
let currentBackground = "";
let verses = {};
let versesWeekend = {};
let dailyQuotes = [];
let quoteExplanations = {};

// ----- Helpers -----
function getRandomVerses(array, count = 3) {
  if (!array || array.length === 0) return [];
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, array.length));
}

function getDailyQuote() {
  if (!dailyQuotes || dailyQuotes.length === 0) return "";
  const today = new Date();
  return dailyQuotes[today.getDate() % dailyQuotes.length];
}

// ----- Load JSON Files -----
async function loadData() {
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
  quoteExplanations = data.reduce((acc, item) => {
    acc[item.quote] = item.explanation;
    return acc;
  }, {});

  updateGreeting();
  displayDailyQuote(getDailyQuote());
  updateShareLinks(getDailyQuote());
}

// ----- Update Greeting -----
function updateGreeting() {
  const hour = new Date().getHours();
  const dayOfWeek = new Date().getDay();
  let greeting, icon, verseArray, newBackground;

  if (hour >= 5 && hour < 12) { greeting="Good Morning"; icon="🌅"; newBackground="morning"; }
  else if (hour >= 12 && hour < 15) { greeting="Good Day"; icon="☀️"; newBackground="day"; }
  else if (hour >= 15 && hour < 18) { greeting="Good Afternoon"; icon="🌤️"; newBackground="afternoon"; }
  else if (hour >= 18 && hour < 22) { greeting="Good Evening"; icon="🌇"; newBackground="evening"; }
  else { greeting="Good Night"; icon="🌙"; newBackground="night"; }

  verseArray = (dayOfWeek===0 || dayOfWeek===6) ? versesWeekend[newBackground] || [] : verses[newBackground] || [];

  const displayGreeting = userName ? `${greeting}, ${userName}!` : greeting;
  document.getElementById("icon").innerText = icon;
  document.getElementById("text").innerText = displayGreeting;

  if (verseArray.length>0) {
    const randomVerses = getRandomVerses(verseArray,3);
    document.getElementById("verse").innerText = randomVerses.join("\n\n");
  } else {
    document.getElementById("verse").innerText = "Loading verses...";
  }

  if (currentBackground !== newBackground) { document.body.className = newBackground; currentBackground=newBackground; }
}

// ----- Daily Quote & Explanation -----
function displayDailyQuote(quote) {
  document.getElementById("dailyQuote").innerText = quote;
  document.getElementById("quoteExplanation").style.display = "none"; // hidden by default
}

document.getElementById("explainQuoteBtn").addEventListener("click", ()=>{
  const quote = document.getElementById("dailyQuote").innerText;
  const explanation = quoteExplanations[quote] || "No explanation available.";
  const expEl = document.getElementById("quoteExplanation");
  if (expEl.style.display==="none") { expEl.innerText=explanation; expEl.style.display="block"; }
  else { expEl.style.display="none"; }
});

// ----- Share Links -----
function updateShareLinks(quote){
  const encodedQuote = encodeURIComponent(quote);
  document.getElementById("shareFacebook").href = `https://www.facebook.com/sharer/sharer.php?u=https://yourapp.com&quote=${encodedQuote}`;
  document.getElementById("shareWhatsApp").href = `https://wa.me/?text=${encodedQuote}`;
  document.getElementById("shareTwitter").href = `https://twitter.com/intent/tweet?text=${encodedQuote}`;
  document.getElementById("shareEmail").href = `mailto:?subject=Daily Quote&body=${encodedQuote}`;
}

// ----- Clock & Date -----
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

// ----- Name Input Listeners -----
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

// ----- Initialize -----
loadData();
updateClock();
updateDate();
setInterval(updateClock,1000);
setInterval(updateGreeting,60000);
setInterval(updateDate,60000);
