const openLetterBtn = document.getElementById("openLetterBtn");
const burstBtn = document.getElementById("burstBtn");
const promiseBtn = document.getElementById("promiseBtn");
const finalBtn = document.getElementById("finalBtn");
const finalMessage = document.getElementById("finalMessage");
const promiseText = document.getElementById("promiseText");
const floatingHearts = document.getElementById("floatingHearts");
const revealables = document.querySelectorAll(".revealable");
const flipCards = document.querySelectorAll(".flip-card");
const shots = document.querySelectorAll(".shot");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

const promises = [
  "เราจะอยู่ข้างเธอในวันที่สดใสและวันที่เหนื่อยที่สุด",
  "ต่อให้วันยุ่งแค่ไหน เราจะหาเวลามาบอกรักเธอ",
  "เราจะดูแลหัวใจเธอแบบอ่อนโยนให้ดีที่สุด",
  "ทุกปีที่ผ่านไป เราจะยังเลือกเธอเหมือนเดิม",
  "เราจะทำให้เธอยิ้มได้บ่อยขึ้นอีกนิดในทุกวัน"
];

function reveal(el) {
  el.classList.remove("hidden");
  el.classList.add("reveal");
}

openLetterBtn.addEventListener("click", () => {
  revealables.forEach((el, i) => {
    setTimeout(() => reveal(el), i * 160);
  });
  document.getElementById("letterSection").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
  openLetterBtn.disabled = true;
  openLetterBtn.textContent = "เปิดแล้วนะ";
});

flipCards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("is-flipped");
  });
});

promiseBtn.addEventListener("click", () => {
  const text = promises[Math.floor(Math.random() * promises.length)];
  promiseText.textContent = text;
  promiseText.classList.remove("reveal");
  void promiseText.offsetWidth;
  promiseText.classList.add("reveal");
});

finalBtn.addEventListener("click", () => {
  reveal(finalMessage);
  finalBtn.disabled = true;
  finalBtn.textContent = "กอดแล้วนะ";
  burstHearts(window.innerWidth / 2, window.innerHeight / 2, 26);
});

function spawnHeart(x = Math.random() * window.innerWidth, fromTap = false) {
  const heart = document.createElement("span");
  heart.className = `heart${fromTap ? " tap" : ""}`;
  heart.textContent = "❤";

  if (fromTap) {
    heart.style.left = `${x}px`;
    heart.style.top = `${window.innerHeight * 0.65}px`;
    heart.style.fontSize = `${Math.random() * 14 + 18}px`;
  } else {
    heart.style.left = `${x}px`;
    heart.style.bottom = "-26px";
    heart.style.fontSize = `${Math.random() * 14 + 12}px`;
    heart.style.setProperty("--dur", `${Math.random() * 2.8 + 4.2}s`);
  }

  floatingHearts.appendChild(heart);
  setTimeout(() => heart.remove(), fromTap ? 900 : 7600);
}

function burstHearts(x, y, count = 16) {
  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart tap";
    heart.textContent = "❤";
    heart.style.left = `${x + (Math.random() - 0.5) * 140}px`;
    heart.style.top = `${y + (Math.random() - 0.5) * 120}px`;
    heart.style.fontSize = `${Math.random() * 16 + 14}px`;
    floatingHearts.appendChild(heart);
    setTimeout(() => heart.remove(), 900);
  }
}

setInterval(() => spawnHeart(), 520);

burstBtn.addEventListener("click", () => {
  burstHearts(window.innerWidth / 2, window.innerHeight * 0.72, 18);
});

window.addEventListener("click", (event) => {
  if (event.target.closest(".btn, .shot, .flip-card, .lightbox")) {
    return;
  }
  spawnHeart(event.clientX, true);
});

shots.forEach((shot) => {
  shot.addEventListener("click", () => {
    const image = shot.querySelector("img");
    lightboxImage.src = image.src;
    lightboxCaption.textContent = shot.dataset.caption || "";
    lightbox.classList.remove("hidden");
  });
});

function closeLightbox() {
  lightbox.classList.add("hidden");
  lightboxImage.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});
