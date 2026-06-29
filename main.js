const ballsEl = document.querySelector("#balls");
const drawStatusEl = document.querySelector("#drawStatus");
const drawButton = document.querySelector("#drawButton");
const copyButton = document.querySelector("#copyButton");
const clearButton = document.querySelector("#clearButton");
const gameCountEl = document.querySelector("#gameCount");
const ticketListEl = document.querySelector("#ticketList");

let latestTickets = [];

function getBallClass(number) {
  if (number <= 10) return "";
  if (number <= 20) return "range-2";
  if (number <= 30) return "range-3";
  if (number <= 40) return "range-4";
  return "range-5";
}

function createBall(number, options = {}) {
  const ball = document.createElement("span");
  ball.className = ["ball", getBallClass(number), options.bonus ? "bonus" : "", options.pop ? "pop" : ""]
    .filter(Boolean)
    .join(" ");
  ball.textContent = number;
  return ball;
}

function pickNumbers() {
  const pool = Array.from({ length: 45 }, (_, index) => index + 1);
  const selected = [];

  while (selected.length < 7) {
    const index = Math.floor(Math.random() * pool.length);
    selected.push(pool.splice(index, 1)[0]);
  }

  return {
    numbers: selected.slice(0, 6).sort((a, b) => a - b),
    bonus: selected[6],
  };
}

function renderMainTicket(ticket, revealedCount = 7) {
  ballsEl.innerHTML = "";

  ticket.numbers.forEach((number, index) => {
    if (index < revealedCount) {
      ballsEl.appendChild(createBall(number, { pop: true }));
      return;
    }
    ballsEl.appendChild(createPlaceholder());
  });

  const plus = document.createElement("span");
  plus.className = "plus";
  plus.textContent = "+";
  ballsEl.appendChild(plus);

  if (revealedCount > 6) {
    ballsEl.appendChild(createBall(ticket.bonus, { bonus: true, pop: true }));
  } else {
    ballsEl.appendChild(createPlaceholder(true));
  }
}

function createPlaceholder(isBonus = false) {
  const placeholder = document.createElement("span");
  placeholder.className = `ball placeholder${isBonus ? " bonus" : ""}`;
  placeholder.textContent = "?";
  return placeholder;
}

function renderTicketList(tickets) {
  ticketListEl.innerHTML = "";

  if (!tickets.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "아직 추첨한 번호가 없습니다.";
    ticketListEl.appendChild(empty);
    return;
  }

  tickets.forEach((ticket, index) => {
    const item = document.createElement("article");
    item.className = "ticket";

    const title = document.createElement("div");
    title.className = "ticket-title";
    title.innerHTML = `<span>${index + 1}게임</span><span>보너스 ${ticket.bonus}</span>`;

    const ticketBalls = document.createElement("div");
    ticketBalls.className = "ticket-balls";

    ticket.numbers.forEach((number) => ticketBalls.appendChild(createBall(number)));

    const plus = document.createElement("span");
    plus.className = "plus";
    plus.textContent = "+";
    ticketBalls.appendChild(plus);
    ticketBalls.appendChild(createBall(ticket.bonus, { bonus: true }));

    item.append(title, ticketBalls);
    ticketListEl.appendChild(item);
  });
}

function setDrawing(isDrawing) {
  drawButton.disabled = isDrawing;
  copyButton.disabled = isDrawing;
  gameCountEl.disabled = isDrawing;
}

async function drawTickets() {
  const count = Number(gameCountEl.value);
  latestTickets = Array.from({ length: count }, pickNumbers);
  const featured = latestTickets[0];

  setDrawing(true);
  drawStatusEl.textContent = "번호를 섞는 중...";
  renderMainTicket(featured, 0);

  for (let index = 1; index <= 7; index += 1) {
    await wait(320);
    drawStatusEl.textContent = index <= 6 ? `${index}번째 번호 추첨` : "보너스 번호 추첨";
    renderMainTicket(featured, index);
  }

  await wait(180);
  drawStatusEl.textContent = `${count}게임 추첨 완료`;
  renderTicketList(latestTickets);
  setDrawing(false);
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

async function copyResults() {
  if (!latestTickets.length) {
    drawStatusEl.textContent = "먼저 번호를 추첨해 주세요.";
    return;
  }

  const text = latestTickets
    .map((ticket, index) => `${index + 1}게임: ${ticket.numbers.join(", ")} + 보너스 ${ticket.bonus}`)
    .join("\n");

  try {
    await navigator.clipboard.writeText(text);
    drawStatusEl.textContent = "추첨 결과를 복사했습니다.";
  } catch {
    drawStatusEl.textContent = "브라우저에서 복사를 허용하지 않았습니다.";
  }
}

function clearResults() {
  latestTickets = [];
  drawStatusEl.textContent = "준비 완료";
  ballsEl.innerHTML = "";

  for (let index = 0; index < 6; index += 1) {
    ballsEl.appendChild(createPlaceholder());
  }

  const plus = document.createElement("span");
  plus.className = "plus";
  plus.textContent = "+";
  ballsEl.appendChild(plus);
  ballsEl.appendChild(createPlaceholder(true));
  renderTicketList(latestTickets);
}

drawButton.addEventListener("click", drawTickets);
copyButton.addEventListener("click", copyResults);
clearButton.addEventListener("click", clearResults);
