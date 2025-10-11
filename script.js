/* -------------------- Greeter Bible App -------------------- */

// ----- User Name -----
let userName = "";
try {
  const storedName = localStorage.getItem("userName");
  if (storedName) {
    userName = storedName;
    const nameInput = document.getElementById("nameInput");
    if (nameInput) nameInput.value = userName;
  }
} catch (e) {
  console.warn("localStorage is not available:", e);
}

// ----- Track Background -----
let currentBackground = "";

// ----- Bible Verses & Quotes -----
const versesMorning = [
  "Psalm 5:3 - In the morning, Lord, you hear my voice.",
  "Lamentations 3:22-23 - The Lord’s mercies are new every morning."
  // Add more verses here
];

const versesDay = [
  "Psalm 118:24 - This is the day the Lord has made; rejoice and be glad.",
  "Colossians 3:23 - Whatever you do, work heartily."
  // Add more verses here
];

const versesAfternoon = [
  "Isaiah 40:31 - Those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
  "Psalm 27:14 - Wait for the Lord; be strong, and let your heart take courage; wait for the Lord!"
  // Add more verses here
];

const versesEvening = [
  "Psalm 141:2 - May my prayer be set before you like incense; may the lifting up of my hands be like the evening sacrifice.",
  "Psalm 119:148 - My eyes are awake before the watches of the night, that I may meditate on your promise."
  // Add more verses here
];

const versesNight = [
  "Psalm 4:8 - In peace I will both lie down and sleep; for you alone, O Lord, make me dwell in safety.",
  "Psalm 91:1-2 - He who dwells in the shelter of the Most High will abide in the shadow of the Almighty. I will say to the Lord, 'My refuge and my fortress, my God, in whom I trust.'"
  // Add more verses here
];

const dailyQuotes = [
  "Trust in the Lord with all your heart. – Proverbs 3:5",
  "Do not be anxious about anything. – Philippians 4:6",
  "I can do all things through Christ. – Philippians 4:13",
  "The Lord is my shepherd; I shall not want. – Psalm 23:1",
  "Be strong and courageous. – Joshua 1:9",
  "Commit your works to the Lord, and your plans will be established. – Proverbs 16:3",
  "The joy of the Lord is your strength. – Nehemiah 8:10",
  "Cast your burden on the Lord, and He will sustain you. – Psalm 55:22",
  "Blessed is the one who trusts in the Lord. – Jeremiah 17:7",
  "Fear not, for I am with you. – Isaiah 41:10",
  "Delight yourself in the Lord, and He will give you the desires of your heart. – Psalm 37:4",
  "Love the Lord your God with all your heart, soul, and mind. – Matthew 22:37",
  "Rejoice always. – 1 Thessalonians 5:16",
  "Pray without ceasing. – 1 Thessalonians 5:17",
  "Give thanks in all circumstances. – 1 Thessalonians 5:18",
  "The Lord is my light and my salvation; whom shall I fear? – Psalm 27:1",
  "Cast all your anxieties on Him, because He cares for you. – 1 Peter 5:7",
  "Be strong and courageous. – Deuteronomy 31:6",
  "He who dwells in the shelter of the Most High will abide in the shadow of the Almighty. – Psalm 91:1",
  "I have loved you with an everlasting love. – Jeremiah 31:3",
  "For I know the plans I have for you, declares the Lord. – Jeremiah 29:11",
  "Let all that you do be done in love. – 1 Corinthians 16:14",
  "Love does no wrong to a neighbor; therefore love is the fulfilling of the law. – Romans 13:10",
  "Rejoice in the Lord, O you righteous, and give thanks to His holy name! – Psalm 97:12",
  "Be faithful, even to the point of death, and I will give you the crown of life. – Revelation 2:10",
  "Blessed is the one who perseveres under trial. – James 1:12",
  "Do not be overcome by evil, but overcome evil with good. – Romans 12:21",
  "The Lord is near to all who call on Him. – Psalm 145:18",
  "You keep him in perfect peace whose mind is stayed on you. – Isaiah 26:3",
  "Wait for the Lord; be strong, and let your heart take courage. – Psalm 27:14",
  "The Lord is gracious and merciful, slow to anger and abounding in steadfast love. – Psalm 145:8",
  "Come to me, all who labor and are heavy laden, and I will give you rest. – Matthew 11:28",
  "Peace I leave with you; my peace I give to you. – John 14:27",
  "For God gave us a spirit not of fear but of power and love and self-control. – 2 Timothy 1:7",
  "The steadfast love of the Lord never ceases; His mercies never come to an end. – Lamentations 3:22",
  "He restores my soul. – Psalm 23:3",
  "I am the vine; you are the branches. – John 15:5",
  "Let your light shine before others, that they may see your good works. – Matthew 5:16",
  "The Lord is good, a stronghold in the day of trouble; He knows those who take refuge in Him. – Nahum 1:7",
  "Be kind to one another, tenderhearted, forgiving one another. – Ephesians 4:32",
  "Do not fear, for I have redeemed you; I have called you by name, you are mine. – Isaiah 43:1",
  "He will cover you with His feathers, and under His wings you will find refuge. – Psalm 91:4",
  "The Lord is my strength and my song; He has become my salvation. – Psalm 118:14",
  "My grace is sufficient for you, for my power is made perfect in weakness. – 2 Corinthians 12:9",
  "Let everything that has breath praise the Lord! – Psalm 150:6",
  "Blessed are the peacemakers, for they shall be called sons of God. – Matthew 5:9",
  "Your word is a lamp to my feet and a light to my path. – Psalm 119:105",
  "Trust in the Lord and do good; dwell in the land and befriend faithfulness. – Psalm 37:3",
  "The Lord is my refuge and my fortress, my God, in whom I trust. – Psalm 91:2",
  "Be still, and know that I am God. – Psalm 46:10",
  "Do not let your hearts be troubled. – John 14:1",
  "For we walk by faith, not by sight. – 2 Corinthians 5:7",
  "The Lord will fight for you, and you have only to be silent. – Exodus 14:14",
  "Rejoice in hope, be patient in tribulation, be constant in prayer. – Romans 12:12",
  "The Lord is near to the brokenhearted and saves the crushed in spirit. – Psalm 34:18",
  "A soft answer turns away wrath. – Proverbs 15:1",
  "Better is a little with righteousness than great revenues with injustice. – Proverbs 16:8",
  "Let your reasonableness be known to everyone. – Philippians 4:5",
  "The Lord is my light and my salvation; whom shall I fear? – Psalm 27:1",
  "Blessed is the one who trusts in the Lord, whose confidence is in Him. – Jeremiah 17:7",
  "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil. – Jeremiah 29:11",
  "He heals the brokenhearted and binds up their wounds. – Psalm 147:3",
  "Commit your way to the Lord; trust in Him, and He will act. – Psalm 37:5",
  "Do not be conformed to this world, but be transformed by the renewal of your mind. – Romans 12:2",
  "The Lord your God is in your midst, a mighty one who will save. – Zephaniah 3:17",
  "Be strong and courageous. Do not fear or be in dread of them. – Deuteronomy 31:6",
  "Rejoice always, pray without ceasing, give thanks in all circumstances. – 1 Thessalonians 5:16-18",
  "The Lord is righteous in all His ways and kind in all His works. – Psalm 145:17",
  "A joyful heart is good medicine, but a crushed spirit dries up the bones. – Proverbs 17:22",
  "Let not your hearts be troubled. Believe in God; believe also in me. – John 14:1",
  "For nothing will be impossible with God. – Luke 1:37",
  "The name of the Lord is a strong tower; the righteous man runs into it and is safe. – Proverbs 18:10",
  "Bear one another's burdens, and so fulfill the law of Christ. – Galatians 6:2",
  "Do everything in love. – 1 Corinthians 16:14",
  "Let the peace of Christ rule in your hearts. – Colossians 3:15",
  "I have loved you with an everlasting love; therefore I have continued my faithfulness to you. – Jeremiah 31:3",
  "Be strong in the Lord and in the strength of His might. – Ephesians 6:10",
  "For by grace you have been saved through faith. – Ephesians 2:8",
  "You keep him in perfect peace whose mind is stayed on you. – Isaiah 26:3",
  "Let us not grow weary of doing good, for in due season we will reap. – Galatians 6:9",
  "I have set the Lord always before me; because He is at my right hand, I shall not be shaken. – Psalm 16:8",
  "The Lord will guide you continually and satisfy your desire in scorched places. – Isaiah 58:11",
  "Do not be afraid, little flock, for it is your Father's good pleasure to give you the kingdom. – Luke 12:32",
  "He who calls you is faithful; He will surely do it. – 1 Thessalonians 5:24",
  "Even though I walk through the valley of the shadow of death, I will fear no evil, for You are with me. – Psalm 23:4",
  "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness. – Galatians 5:22",
  "Therefore encourage one another and build one another up. – 1 Thessalonians 5:11",
  "Be strong, and let your heart take courage, all you who wait for the Lord! – Psalm 31:24",
  "For the Lord your God is He who goes with you, to fight for you against your enemies. – Deuteronomy 20:4",
  "The Lord is my rock, my fortress, and my deliverer. – 2 Samuel 22:2",
  "Blessed are those who hunger and thirst for righteousness, for they shall be satisfied. – Matthew 5:6",
  "He who began a good work in you will bring it to completion. – Philippians 1:6",
  "Love your enemies and pray for those who persecute you. – Matthew 5:44",
  "For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come. – Romans 8:38",
  "Behold, I am with you always, to the end of the age. – Matthew 28:20",
  "The Lord will bless you and keep you. – Numbers 6:24",
  "May the God of hope fill you with all joy and peace in believing. – Romans 15:13",
  "Trust in the Lord forever, for the Lord God is an everlasting rock. – Isaiah 26:4",
  "The Lord is good, a stronghold in the day of trouble. – Nahum 1:7",
  "Sing to the Lord, bless His name; tell of His salvation from day to day. – Psalm 96:2",
  "Behold, God is my salvation; I will trust, and will not be afraid. – Isaiah 12:2",
  "Do not let your hearts be troubled, neither let them be afraid. – John 14:27",
  "In all your ways acknowledge Him, and He will make straight your paths. – Proverbs 3:6",
  "For the Lord takes pleasure in His people; He adorns the humble with salvation. – Psalm 149:4",
  "The steadfast love of the Lord never ceases; His mercies never come to an end. – Lamentations 3:22",
  "The Lord is my strength and my song; He has become my salvation. – Exodus 15:2",
  "God is our refuge and strength, a very present help in trouble. – Psalm 46:1",
  "Your word is truth. – John 17:17",
  "Blessed is the man who remains steadfast under trial. – James 1:12",
  "For the Lord is righteous; He loves righteous deeds. – Psalm 11:7",
  "Behold, I am making all things new. – Revelation 21:5",
  "He gives strength to the weary and increases the power of the weak. – Isaiah 40:29",
  "Let the word of Christ dwell in you richly. – Colossians 3:16",
  "The Lord is my rock and my fortress and my deliverer. – Psalm 18:2",
  "Blessed are the pure in heart, for they shall see God. – Matthew 5:8",
  "The Lord gives strength to His people; the Lord blesses His people with peace. – Psalm 29:11",
  "The righteous cry out, and the Lord hears them; He delivers them from all their troubles. – Psalm 34:17",
  "But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles. – Isaiah 40:31",
  "Do not worry about tomorrow, for tomorrow will worry about itself. – Matthew 6:34",
  "Therefore, if anyone is in Christ, he is a new creation. – 2 Corinthians 5:17",
  "And let us not grow weary of doing good, for in due season we will reap if we do not give up. – Galatians 6:9",
  "Taste and see that the Lord is good; blessed is the man who takes refuge in Him. – Psalm 34:8",
  "Rejoice in the Lord always; again I will say, rejoice. – Philippians 4:4",
  "Seek first the kingdom of God and His righteousness, and all these things will be added to you. – Matthew 6:33",
  "Blessed is the man who trusts in the Lord, whose trust is the Lord. – Jeremiah 17:7",
  "And we know that for those who love God all things work together for good. – Romans 8:28",
  "I sought the Lord, and He answered me and delivered me from all my fears. – Psalm 34:4",
  "The Lord is compassionate and gracious, slow to anger, abounding in love. – Psalm 103:8",
  "The Lord upholds all who fall and lifts up all who are bowed down. – Psalm 145:14",
  "Let us hold fast the confession of our hope without wavering. – Hebrews 10:23",
  "And my God will supply every need of yours according to His riches in glory in Christ Jesus. – Philippians 4:19",
  "The Lord your God is in your midst, a mighty one who will save; He will rejoice over you with gladness. – Zephaniah 3:17",
  "Be strong and courageous. Do not be frightened, and do not be dismayed, for the Lord your God is with you wherever you go. – Joshua 1:9",
  "Delight yourself in the Lord, and He will give you the desires of your heart. – Psalm 37:4",
  "A new commandment I give to you, that you love one another. – John 13:34",
  "God is faithful, by whom you were called into the fellowship of His Son, Jesus Christ our Lord. – 1 Corinthians 1:9",
  "The Lord is righteous in all His ways and kind in all His works. – Psalm 145:17"
];

// ----- Helper Functions -----
function getRandomVerse(array) {
  if (!array || array.length === 0) return "No verse available.";
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

function getDailyQuote() {
  if (!dailyQuotes || dailyQuotes.length === 0) return "No quote available.";
  const today = new Date();
  return dailyQuotes[today.getDate() % dailyQuotes.length];
}

function encodeShareText(text) {
  return encodeURIComponent(text);
}

// ----- Update Greeting -----
function updateGreeting() {
  const hour = new Date().getHours();
  let greeting, icon, verseArray, newBackground;

  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning";
    icon = "🌅";
    verseArray = versesMorning;
    newBackground = "morning";
  } else if (hour >= 12 && hour < 15) {
    greeting = "Good Day";
    icon = "☀️";
    verseArray = versesDay;
    newBackground = "day";
  } else if (hour >= 15 && hour < 18) {
    greeting = "Good Afternoon";
    icon = "🌤️";
    verseArray = versesAfternoon;
    newBackground = "afternoon";
  } else if (hour >= 18 && hour < 22) {
    greeting = "Good Evening";
    icon = "🌇";
    verseArray = versesEvening;
    newBackground = "evening";
  } else {
    greeting = "Good Night";
    icon = "🌙";
    verseArray = versesNight;
    newBackground = "night";
  }

  if (currentBackground !== newBackground) {
    document.body.className = newBackground;
    currentBackground = newBackground;
  }

  const displayGreeting = userName ? `${greeting}, ${userName}!` : greeting;
  const iconElement = document.getElementById("icon");
  const textElement = document.getElementById("text");
  const verseElement = document.getElementById("verse");

  if (iconElement) iconElement.innerText = icon;
  if (textElement) textElement.innerText = displayGreeting;
  if (verseElement) verseElement.innerText = `${getRandomVerse(verseArray)}\n\nDaily Quote: ${getDailyQuote()}`;
}

// ----- Update Clock -----
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  const clockElement = document.getElementById("clock");
  if (clockElement) clockElement.innerText = `${h}:${m}:${s}`;
}

// ----- Update Date -----
function updateDate() {
  const now = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const dateElement = document.getElementById("date");
  if (dateElement) dateElement.innerText = now.toLocaleDateString("en-US", options);
}

// ----- Event Listeners -----
const nameInput = document.getElementById("nameInput");
const resetButton = document.getElementById("resetButton");
const shareButton = document.getElementById("shareButton");
const shareModal = document.getElementById("shareModal");
const shareDevice = document.getElementById("shareDevice");
const shareWhatsApp = document.getElementById("shareWhatsApp");
const shareTwitter = document.getElementById("shareTwitter");
const shareFacebook = document.getElementById("shareFacebook");
const shareTikTok = document.getElementById("shareTikTok");
const copyVerse = document.getElementById("copyVerse");
const closeModal = document.getElementById("closeModal");

if (nameInput) {
  nameInput.addEventListener("input", (e) => {
    userName = e.target.value.trim();
    try {
      localStorage.setItem("userName", userName);
    } catch (e) {
      console.warn("localStorage is not available:", e);
    }
    updateGreeting();
  });
}

if (resetButton) {
  resetButton.addEventListener("click", () => {
    try {
      localStorage.removeItem("userName");
    } catch (e) {
      console.warn("localStorage is not available:", e);
    }
    userName = "";
    if (nameInput) nameInput.value = "";
    updateGreeting();
  });
}

if (shareButton) {
  shareButton.addEventListener("click", () => {
    if (shareModal) shareModal.style.display = "block";
  });
}

if (closeModal) {
  closeModal.addEventListener("click", () => {
    if (shareModal) shareModal.style.display = "none";
  });
}

// Close modal if clicking outside content
window.addEventListener("click", (event) => {
  if (event.target === shareModal) {
    shareModal.style.display = "none";
  }
});

// Get share text
function getShareText() {
  const verseElement = document.getElementById("verse");
  if (verseElement) {
    return `${verseElement.innerText}\n\nFrom Greeter Bible App: ${window.location.href}`;
  }
  return "";
}

if (shareDevice) {
  shareDevice.addEventListener("click", async () => {
    const shareData = {
      title: "Greeter Bible Verse",
      text: getShareText(),
      url: window.location.href
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      alert("Device sharing not supported in this browser.");
    }
  });
}

if (shareWhatsApp) {
  shareWhatsApp.addEventListener("click", () => {
    const text = encodeShareText(getShareText());
    window.open(`https://wa.me/?text=${text}`, "_blank");
  });
}

if (shareTwitter) {
  shareTwitter.addEventListener("click", () => {
    const text = encodeShareText(getShareText());
    window.open(`https://x.com/intent/tweet?text=${text}`, "_blank");
  });
}

if (shareFacebook) {
  shareFacebook.addEventListener("click", () => {
    const text = getShareText();
    const encodedUrl = encodeShareText(window.location.href);
    // Simplify text for Facebook share dialog to avoid truncation
    const shortText = encodeShareText(
      text.split("\n\n")[0] + "\n\nFrom Greeter Bible App" // Share only verse and app name to fit
    );
    // Open Facebook share dialog
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${shortText}`,
      "_blank"
    );
    // Alert user to paste full text if needed
    alert(
      "Facebook may only show the link or part of the verse. To share the full verse and quote, copy the text using the 'Copy Verse' button and paste it into your Facebook post."
    );
  });
}

if (shareTikTok) {
  shareTikTok.addEventListener("click", () => {
    const text = encodeShareText(getShareText());
    window.open(`https://www.tiktok.com/upload?text=${text}`, "_blank");
  });
}

if (copyVerse) {
  copyVerse.addEventListener("click", async () => {
    const text = getShareText();
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        alert("Verse copied to clipboard!");
      } catch (err) {
        console.error("Copy failed:", err);
      }
    } else {
      alert("Clipboard not supported.");
    }
  });
}

// ----- Initialize -----
updateGreeting();
updateClock();
updateDate();

setInterval(updateClock, 1000); // Update clock every second
setInterval(updateGreeting, 300000); // Update greeting every 5 minutes
setInterval(updateDate, 3600000); // Update date every hour
