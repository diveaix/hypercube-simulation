// --- Hypercube Simulator Game Logic ---

let collectedShards = {};
let currentNode = null;
const nodes = [1, 2, 3, 4];

// === Generate the Node Grid ===
function generateHypercube() {
  const grid = document.getElementById('hypercubeGrid');
  grid.innerHTML = '';
  nodes.forEach((num) => {
    const div = document.createElement('div');
    div.className = 'node';
    div.innerText = `Node ${num}`;
    div.id = `node-${num}`;
    div.addEventListener('click', () => enterNode(num));
    grid.appendChild(div);
  });
  updateShardCount();
}

// === Update Shard Count Display ===
function updateShardCount() {
  const count = Object.keys(collectedShards).length;
  document.getElementById('shardCount').innerText = count;
}

// === Enter Node View ===
function enterNode(id) {
  currentNode = id;
  document.querySelectorAll('.node').forEach((n, i) => {
    n.classList.toggle('selected', i + 1 === id);
  });
  document.getElementById('hypercubeGrid').classList.add('hidden');
  document.getElementById('threadView').classList.remove('hidden');
  document.getElementById('threadTitle').innerText = `Node ${id}`;

  switch (id) {
    case 1: loadArithmeticPuzzle(); break;
    case 2: loadSP1Quiz(); break;
    case 3: loadLogicPuzzle(); break;
    case 4: loadPatternPuzzle(); break;
  }
}

// === Back Button Handler ===
document.getElementById('backButton').addEventListener('click', () => {
  document.getElementById('threadView').classList.add('hidden');
  document.getElementById('hypercubeGrid').classList.remove('hidden');
});

// === Node 1: Arithmetic Puzzle ===
function loadArithmeticPuzzle() {
  const num = Math.floor(Math.random() * 9) + 1;
  const answer = 10 - num;
  document.getElementById('threadContent').innerHTML = `
    Solve: ${num} + ? = 10<br><br>
    <input type="number" id="arithInput" />
    <button onclick="checkArithmetic(${answer})">Submit</button>
    <div id="resultMsg"></div>
  `;
}

function checkArithmetic(correct) {
  const input = parseInt(document.getElementById('arithInput').value);
  const msg = document.getElementById('resultMsg');
  if (input === correct) {
    msg.innerHTML = `<img src="assets/correct.webp" width="80"><br>Correct!`;
    collectedShards[1] = true;
    updateShardCount();
    showNextButton();
  } else {
    msg.innerHTML = `<img src="assets/wrong.webp" width="80"><br>Try again.`;
  }
}

// === Node 2: SP1 Quiz ===
const sp1Questions = [
  {
    q: "What does SP1 stand for?",
    options: ["Super Prover 1", "Succinct Prover 1", "Sequential Proof 1"],
    a: "Succinct Prover 1"
  },
  {
    q: "What structure does SP1 Hypercube simulate?",
    options: ["Single thread", "Blockchain", "Parallel threads"],
    a: "Parallel threads"
  },
  {
    q: "Is SP1 open-source?",
    options: ["Yes", "No", "Not sure"],
    a: "Yes"
  }
];

function loadSP1Quiz() {
  const q = sp1Questions[Math.floor(Math.random() * sp1Questions.length)];
  let optionsHTML = q.options.map(option =>
    `<button onclick="checkSP1Answer('${option}', '${q.a}')">${option}</button>`
  ).join("<br><br>");
  document.getElementById('threadContent').innerHTML = `${q.q}<br><br>${optionsHTML}<div id="resultMsg"></div>`;
}

function checkSP1Answer(choice, correct) {
  const msg = document.getElementById('resultMsg');
  if (choice === correct) {
    msg.innerHTML = `<img src="assets/correct.webp" width="80"><br>Correct!`;
    collectedShards[2] = true;
    updateShardCount();
    showNextButton();
  } else {
    msg.innerHTML = `<img src="assets/wrong.webp" width="80"><br>Try again.`;
  }
}

// === Node 3: Logic Puzzle ===
const logicPuzzles = [
  { q: "AND(1, 1)", a: 1 },
  { q: "AND(1, 0)", a: 0 },
  { q: "OR(0, 1)", a: 1 },
  { q: "OR(0, 0)", a: 0 },
  { q: "NOT(1)", a: 0 },
  { q: "NOT(0)", a: 1 }
];

function loadLogicPuzzle() {
  const p = logicPuzzles[Math.floor(Math.random() * logicPuzzles.length)];
  document.getElementById('threadContent').innerHTML = `
    ${p.q} = ?<br><br>
    <button onclick="checkLogic(${p.a}, 0)">0</button>
    <button onclick="checkLogic(${p.a}, 1)">1</button>
    <div id="resultMsg"></div>
  `;
}

function checkLogic(correct, choice) {
  const msg = document.getElementById('resultMsg');
  if (choice === correct) {
    msg.innerHTML = `<img src="assets/correct.webp" width="80"><br>Correct!`;
    collectedShards[3] = true;
    updateShardCount();
    showNextButton();
  } else {
    msg.innerHTML = `<img src="assets/wrong.webp" width="80"><br>Try again.`;
  }
}

// === Node 4: Pattern Puzzle ===
let expectedPatternAnswer = null;

function loadPatternPuzzle() {
  const start = Math.floor(Math.random() * 5) + 1;
  const diff = Math.floor(Math.random() * 3) + 2;
  const sequence = [start, start + diff, start + 2 * diff];
  expectedPatternAnswer = start + 3 * diff;

  document.getElementById('threadContent').innerHTML = `
    What's the next number in the pattern?<br>
    ${sequence.join(", ")}, ?<br><br>
    <input type="number" id="patternInput" />
    <button onclick="checkPattern()">Submit</button>
    <div id="resultMsg"></div>
  `;
}

function checkPattern() {
  const input = parseInt(document.getElementById('patternInput').value);
  const msg = document.getElementById('resultMsg');
  if (input === expectedPatternAnswer) {
    msg.innerHTML = `<img src="assets/correct.webp" width="80"><br>Correct!`;
    collectedShards[4] = true;
    updateShardCount();
    showNextButton();
  } else {
    msg.innerHTML = `<img src="assets/wrong.webp" width="80"><br>Try again.`;
  }
}

// === Navigation ===
function showNextButton() {
  const msg = document.getElementById('resultMsg');
  msg.innerHTML += `<br><br><button onclick="goToNextNode()">▶ Next Node</button>`;
}

function goToNextNode() {
  const next = currentNode + 1;
  if (next > 4) {
    showCompletionMessage();
    return;
  }
  enterNode(next);
}

function showCompletionMessage() {
  const tweetText = encodeURIComponent(
    "🧠 Just completed the Hypercube Simulator on-chain!\n\n4 nodes. 4 puzzles. 1 ZK Proof.\n\nI proved I'm not a Sybil 🌀\n \nRun your hypercube simulator\nLink: hypercube-simulation.vercel.app"
  );
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

  document.getElementById('threadContent').innerHTML = `
    <img src="assets/brain.webp" width="100"><br><br>
    <h3>SP1 Proof Constructed!</h3>
    <p>You’ve successfully simulated all nodes of the Hypercube!</p><br>
    <button onclick="restartGame()">🔄 Restart</button><br><br>
    <a href="${tweetUrl}" target="_blank" class="tweet-btn">🕊 Share on X</a>
  `;
}


function restartGame() {
  collectedShards = {};
  currentNode = null;
  document.getElementById('threadView').classList.add('hidden');
  document.getElementById('hypercubeGrid').classList.remove('hidden');
  generateHypercube();
  enterNode(1);
}

// === Start Game Button Logic ===
document.getElementById('startGameBtn').addEventListener('click', () => {
  document.getElementById('introExplanation').style.display = 'none';
  document.getElementById('hypercubeGrid').classList.remove('hidden');
  generateHypercube();
  enterNode(1);
});

// === Intro Page Navigation ===
const introPages = [
  `<h2>💠 Welcome to Hypercube Simulator</h2>
   <p>In this simulation, you'll explore 4 computation nodes.<br>
   Each node contains a puzzle—solving all will complete the SP1 proof construction.</p>`,

  `<h2>🧩 What's inside each node?</h2>
   <p>Node 1: Arithmetic puzzle<br>Node 2: SP1 quiz<br>Node 3: Logic gates<br>Node 4: Pattern puzzle</p>`,

  `<h2>🚀 How to Win?</h2>
   <p>Solve all 4 puzzles to complete the simulation and construct your SP1 proof!</p>`
];

let currentPage = 0;

function renderIntroPage() {
  document.getElementById('introContent').innerHTML = introPages[currentPage];
  document.getElementById('prevPage').style.display = currentPage === 0 ? 'none' : 'inline-block';
  document.getElementById('nextPage').style.display = currentPage === introPages.length - 1 ? 'none' : 'inline-block';
}

document.getElementById('prevPage').addEventListener('click', () => {
  if (currentPage > 0) currentPage--;
  renderIntroPage();
});

document.getElementById('nextPage').addEventListener('click', () => {
  if (currentPage < introPages.length - 1) currentPage++;
  renderIntroPage();
});

// === Handle Intro Video Fade Out ===
document.getElementById('introVideo').addEventListener('ended', () => {
  const container = document.getElementById('introVideoContainer');
  container.style.opacity = '0';
  setTimeout(() => {
    container.remove();
    document.getElementById('introExplanation').style.display = 'block';
    renderIntroPage();
  }, 700);
});
