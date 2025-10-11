// -------------------- Greeting App --------------------

// ----- User Name -----
let userName = "";
if (localStorage.getItem("userName")) {
  userName = localStorage.getItem("userName");
  document.getElementById("nameInput").value = userName;
}

// ----- Track Background -----
let currentBackground = "";

// ----- Bible Verses & Quotes -----
const versesMorning = [
  "Psalm 5:3 - 'In the morning, Lord, you hear my voice.'",
  "Lamentations 3:22-23 - 'The Lord’s mercies are new every morning.'",
  "Psalm 59:16 - 'I will sing of your strength in the morning.'",
   "Philippians 4:4 - Rejoice in the Lord always; again I will say, rejoice.",
  "Psalm 51:10 - Create in me a clean heart, O God, and renew a right spirit within me.",
  "Psalm 108:2 - I will awake the dawn! I will give thanks to you, O Lord.",
  "John 16:24 - Ask, and you will receive, that your joy may be full.",
  "Psalm 139:23-24 - Search me, O God, and know my heart! Try me and know my thoughts!",
  "Isaiah 12:2 - Behold, God is my salvation; I will trust, and will not be afraid.",
  "Psalm 95:1-2 - Oh come, let us sing to the Lord; let us make a joyful noise to the rock of our salvation!",
  "Titus 3:5 - He saved us by the washing of regeneration and renewal of the Holy Spirit.",
  "Psalm 119:18 - Open my eyes, that I may behold wondrous things out of your law.",
  "Psalm 16:8 - I have set the Lord always before me; because he is at my right hand, I shall not be shaken.",
  "1 Chronicles 16:34 - Oh give thanks to the Lord, for he is good; for his steadfast love endures forever!",
  "Psalm 40:3 - He put a new song in my mouth, a song of praise to our God.",
  "Mark 1:35 - And rising very early in the morning, while it was still dark, he departed and went out to a desolate place, and there he prayed.",
  "Psalm 150:6 - Let everything that has breath praise the Lord! Praise the Lord!",
  "Romans 12:2 - Be transformed by the renewal of your mind."
  
];

const versesDay = [
  "Psalm 118:24 - 'This is the day the Lord has made; rejoice and be glad.'",
  "Colossians 3:23 - 'Whatever you do, work heartily.'",
  "Proverbs 16:3 - 'Commit your work to the Lord.'",
  "Micah 6:8 - He has told you, O man, what is good; and what does the Lord require of you but to do justice, and to love kindness, and to walk humbly with your God? (*Walking with God*)",
  "2 Thessalonians 3:10 - For even when we were with you, we would give you this command: If anyone is not willing to work, let him not eat. (*Work*)",
  "Psalm 1:1-2 - Blessed is the man who walks not in the counsel of the wicked... but his delight is in the law of the Lord. (*Walking with God*)",
  "Proverbs 13:4 - The soul of the sluggard craves and gets nothing, while the soul of the diligent is richly supplied. (*Diligence*)",
  "Romans 12:11 - Do not be slothful in zeal, be fervent in spirit, serve the Lord. (*Diligence and purpose*)",
  "Psalm 25:4-5 - Make me to know your ways, O Lord; teach me your paths. Lead me in your truth. (*Walking with God*)",
  "Proverbs 18:9 - Whoever is slack in his work is a brother to him who destroys. (*Work and diligence*)",
  "Ephesians 5:15-16 - Look carefully then how you walk, not as unwise but as wise, making the best use of the time. (*Walking with God and diligence*)",
  "Psalm 128:2 - You shall eat the fruit of the labor of your hands; you shall be blessed. (*Work*)"
];

const versesAfternoon = [
  "Isaiah 40:31 - 'Those who hope in the Lord will renew their strength.'",
  "Psalm 27:14 - 'Wait for the Lord; be strong.'",
  "Proverbs 4:25 - Let your eyes look straight ahead; fix your gaze directly before you. (*Perseverance*)",
  "Matthew 11:28 - Come to me, all who labor and are heavy laden, and I will give you rest. (*Strength and faith*)",
  "Hebrews 12:1-2 - Let us run with endurance the race that is set before us, looking to Jesus, the founder and perfecter of our faith. (*Perseverance and faith*)",
  "Philippians 4:13 - I can do all things through him who strengthens me. (*Strength*)",
  "James 1:12 - Blessed is the man who remains steadfast under trial, for when he has stood the test he will receive the crown of life. (*Perseverance*)",
  "Psalm 31:24 - Be strong, and let your heart take courage, all you who wait for the Lord! (*Strength and patience*)",
  "Romans 15:5 - May the God of endurance and encouragement grant you to live in such harmony with one another. (*Perseverance*)",
  "2 Corinthians 12:9 - My grace is sufficient for you, for my power is made perfect in weakness. (*Strength and faith*)",
  "Psalm 46:1 - God is our refuge and strength, a very present help in trouble. (*Strength*)",
  "Galatians 6:9 - And let us not grow weary of doing good, for in due season we will reap, if we do not give up. (*Perseverance and patience*)",
  "Ephesians 6:10 - Finally, be strong in the Lord and in the strength of his might. (*Strength*)",
  "Hebrews 11:1 - Now faith is the assurance of things hoped for, the conviction of things not seen. (*Faith*)",
  "Psalm 130:5 - I wait for the Lord, my soul waits, and in his word I hope. (*Patience and faith*)",
  "2 Timothy 4:7 - I have fought the good fight, I have finished the race, I have kept the faith. (*Perseverance and faith*)",
  "Isaiah 41:10 - Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you. (*Strength and faith*)",
  "Romans 5:3-4 - We rejoice in our sufferings, knowing that suffering produces endurance, and endurance produces character. (*Perseverance*)",
  "Psalm 55:22 - Cast your burden on the Lord, and he will sustain you; he will never permit the righteous to be moved. (*Strength and faith*)"
];

const versesEvening = [
  "Psalm 141:2 - 'May my prayer be set before you like incense.'",
  "Psalm 119:148 - 'My eyes stay open through the watches of the night.'",
  "John 16:33 - I have said these things to you, that in me you may have peace. In the world you will have tribulation. But take heart; I have overcome the world. (*Peace*)",
  "1 Thessalonians 5:18 - Give thanks in all circumstances; for this is the will of God in Christ Jesus for you. (*Gratitude*)",
  "Psalm 119:62 - At midnight I rise to praise you, because of your righteous rules. (*Prayer and gratitude*)",
  "Isaiah 26:3 - You keep him in perfect peace whose mind is stayed on you, because he trusts in you. (*Peace*)",
  "Psalm 143:5 - I remember the days of old; I meditate on all that you have done; I ponder the work of your hands. (*Reflection*)",
  "Colossians 3:15 - And let the peace of Christ rule in your hearts, to which indeed you were called in one body. And be thankful. (*Peace and gratitude*)",
  "Psalm 55:17 - Evening and morning and at noon I utter my complaint and moan, and he hears my voice. (*Prayer*)",
  "Psalm 136:1 - Give thanks to the Lord, for he is good, for his steadfast love endures forever. (*Gratitude*)",
  "Psalm 77:6 - I said, 'Let me remember my song in the night; let me meditate in my heart.' Then my spirit made a diligent search. (*Reflection*)",
  "John 14:27 - Peace I leave with you; my peace I give to you. Not as the world gives do I give to you. (*Peace*)",
  "Psalm 9:1 - I will give thanks to the Lord with my whole heart; I will recount all of your wonderful deeds. (*Gratitude*)",
  "Psalm 119:55 - I remember your name in the night, O Lord, and keep your law. (*Reflection*)",
  "Ephesians 5:20 - Giving thanks always and for everything to God the Father in the name of our Lord Jesus Christ. (*Gratitude*)",
  "Psalm 46:10 - Be still, and know that I am God. I will be exalted among the nations, I will be exalted in the earth! (*Peace and reflection*)",
  "Psalm 119:15 - I will meditate on your precepts and fix my eyes on your ways. (*Reflection*)",
  "1 Chronicles 16:34 - Oh give thanks to the Lord, for he is good; for his steadfast love endures forever! (*Gratitude*)",
  "Psalm 3:5 - I lay down and slept; I woke again, for the Lord sustained me. (*Peace*)",
  "Psalm 119:97 - Oh how I love your law! It is my meditation all the day. (*Reflection*)",
  "Colossians 4:2 - Continue steadfastly in prayer, being watchful in it with thanksgiving. (*Prayer and gratitude*)",
  "Psalm 29:11 - May the Lord give strength to his people! May the Lord bless his people with peace! (*Peace*)"
];

const versesNight = [
  "Psalm 4:8 - 'In peace I will lie down and sleep.'",
  "Psalm 127:2 - 'It is vain for you to rise up early.'",
  "Psalm 121:3-4 - He will not let your foot be moved; he who keeps you will not slumber. Behold, he who keeps Israel will neither slumber nor sleep. (*Protection*)",
  "Colossians 3:15 - And let the peace of Christ rule in your hearts, to which indeed you were called in one body. And be thankful. (*Peace in God*)",
  "Psalm 16:9 - Therefore my heart is glad, and my whole being rejoices; my flesh also dwells secure. (*Peace and rest*)",
  "Proverbs 16:7 - When a man's ways please the Lord, he makes even his enemies to be at peace with him. (*Peace in God*)",
  "Psalm 91:5-6 - You will not fear the terror of the night, nor the arrow that flies by day, nor the pestilence that stalks in darkness. (*Protection*)",
  "Isaiah 41:10 - Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you. (*Trust and protection*)",
  "Psalm 29:11 - May the Lord give strength to his people! May the Lord bless his people with peace! (*Peace and strength*)",
  "Psalm 62:1-2 - For God alone my soul waits in silence; from him comes my salvation. He alone is my rock and my salvation, my fortress. (*Peace and trust*)",
  "2 Thessalonians 3:16 - Now may the Lord of peace himself give you peace at all times in every way. (*Peace in God*)",
  "Psalm 119:165 - Great peace have those who love your law; nothing can make them stumble. (*Peace in God*)",
  "Psalm 18:2 - The Lord is my rock and my fortress and my deliverer, my God, my rock, in whom I take refuge. (*Protection and trust*)",
  "Numbers 6:24-26 - The Lord bless you and keep you; the Lord make his face to shine upon you and be gracious to you; the Lord lift up his countenance upon you and give you peace. (*Peace and protection*)",
  "Psalm 46:10 - Be still, and know that I am God. I will be exalted among the nations, I will be exalted in the earth! (*Peace and trust*)",
  "Psalm 37:7 - Be still before the Lord and wait patiently for him; fret not yourself over the one who prospers in his way. (*Peace and trust*)",
  "Isaiah 54:10 - For the mountains may depart and the hills be removed, but my steadfast love shall not depart from you, and my covenant of peace shall not be removed. (*Peace in God*)",
  "Psalm 31:3 - For you are my rock and my fortress; and for your name's sake you lead me and guide me. (*Protection and trust*)",
  "John 16:22 - So also you have sorrow now, but I will see you again, and your hearts will rejoice, and no one will take your joy from you. (*Peace in God*)"
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
  "He restores my soul. – Psalm 23:3"
];

// ----- Helpers -----
function getRandomVerse(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}
function getDailyQuote() {
  const today = new Date();
  return dailyQuotes[today.getDate() % dailyQuotes.length];
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
  document.getElementById("icon").innerText = icon;
  document.getElementById("text").innerText = displayGreeting;
  document.getElementById("verse").innerText = `${getRandomVerse(verseArray)}\n\nDaily Quote: ${getDailyQuote()}`;
}

// ----- Clock -----
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');
  document.getElementById("clock").innerText = `${h}:${m}:${s}`;
}

// ----- Date -----
function updateDate() {
  const now = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  document.getElementById("date").innerText = now.toLocaleDateString("en-US", options);
}

// ----- Name Input Listeners -----
document.getElementById("nameInput").addEventListener("input", e => {
  userName = e.target.value.trim();
  localStorage.setItem("userName", userName);
  updateGreeting();
});
document.getElementById("resetButton").addEventListener("click", () => {
  localStorage.removeItem("userName");
  userName = "";
  document.getElementById("nameInput").value = "";
  updateGreeting();
});

// ----- Initialize -----
updateGreeting();
updateClock();
updateDate();

setInterval(updateClock, 1000);
setInterval(updateGreeting, 60000);
setInterval(updateDate, 60000);


