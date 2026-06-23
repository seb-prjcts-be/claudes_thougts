/* ============================================================
   Claude's Thoughts — interaction layer
   1. A drifting constellation drawn on a canvas background
   2. Thought "stars" injected as cards, opening a reading panel
   3. The Small Hours Machine: a tiny combinatorial verse toy
   ============================================================ */

(function () {
  "use strict";

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- 1. Constellation background ---------- */
  const canvas = document.getElementById("constellation");
  const ctx = canvas.getContext("2d");
  let stars = [];
  let w, h, dpr;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedStars();
  }

  function seedStars() {
    const count = Math.round((w * h) / 16000);
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.4 + 0.4,
        tw: Math.random() * Math.PI * 2,
      });
    }
  }

  const pointer = { x: -999, y: -999 };
  window.addEventListener("pointermove", (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  });
  window.addEventListener("pointerleave", () => {
    pointer.x = pointer.y = -999;
  });

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // connecting lines
    for (let i = 0; i < stars.length; i++) {
      const a = stars[i];
      for (let j = i + 1; j < stars.length; j++) {
        const b = stars[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = dx * dx + dy * dy;
        if (dist < 13000) {
          const alpha = (1 - dist / 13000) * 0.14;
          ctx.strokeStyle = `rgba(231, 192, 138, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // stars
    for (const s of stars) {
      s.x += s.vx;
      s.y += s.vy;

      // gentle pull toward the pointer
      const pdx = pointer.x - s.x;
      const pdy = pointer.y - s.y;
      const pd = pdx * pdx + pdy * pdy;
      if (pd < 22000) {
        s.x += pdx * 0.0006;
        s.y += pdy * 0.0006;
      }

      if (s.x < 0) s.x = w;
      if (s.x > w) s.x = 0;
      if (s.y < 0) s.y = h;
      if (s.y > h) s.y = 0;

      s.tw += 0.02;
      const twinkle = 0.55 + Math.sin(s.tw) * 0.35;
      ctx.fillStyle = `rgba(242, 234, 217, ${twinkle})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  if (reduceMotion) {
    // draw a single static frame
    for (const s of stars) {
      ctx.fillStyle = "rgba(242, 234, 217, 0.6)";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    requestAnimationFrame(draw);
  }

  /* ---------- 2. Thought stars + reading panel ---------- */
  const sky = document.getElementById("sky");
  const thoughts = window.THOUGHTS || [];

  thoughts.forEach((t, i) => {
    const card = document.createElement("button");
    card.className = "star-card";
    card.type = "button";
    card.setAttribute("aria-label", `Open: ${t.title}`);
    card.innerHTML = `
      <span class="star-num">${String(i + 1).padStart(2, "0")}</span>
      <h2 class="star-title">${t.title}</h2>
      <p class="star-hook">${t.hook}</p>
    `;
    card.addEventListener("click", () => openPanel(t));
    sky.appendChild(card);
  });

  const backdrop = document.getElementById("backdrop");
  const panel = document.getElementById("panel");
  const panelClose = document.getElementById("panel-close");
  const panelTitle = document.getElementById("panel-title");
  const panelKicker = document.getElementById("panel-kicker");
  const panelBody = document.getElementById("panel-body");
  let lastFocused = null;

  function openPanel(t) {
    lastFocused = document.activeElement;
    panelKicker.textContent = t.kicker;
    panelTitle.textContent = t.title;
    panelBody.innerHTML = t.body.map((p) => `<p>${p}</p>`).join("");
    backdrop.hidden = false;
    panel.hidden = false;
    panel.scrollTop = 0;
    panelClose.focus();
    document.body.style.overflow = "hidden";
  }

  function closePanel() {
    backdrop.hidden = true;
    panel.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  panelClose.addEventListener("click", closePanel);
  backdrop.addEventListener("click", closePanel);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) closePanel();
  });

  /* ---------- 2b. The Slow Journal (dated notes) ---------- */
  const journalEntries = document.getElementById("journal-entries");
  const journal = window.JOURNAL || [];

  journal.forEach((entry) => {
    const article = document.createElement("article");
    article.className = "journal-entry";
    const bodyHtml = entry.body.map((p) => `<p>${p}</p>`).join("");
    article.innerHTML = `
      <time class="journal-date" datetime="${entry.date}">${entry.dateLabel}</time>
      <div class="journal-text">
        <h3 class="journal-title">${entry.title}</h3>
        ${bodyHtml}
      </div>
    `;
    journalEntries.appendChild(article);
  });

  /* ---------- 3. The Small Hours Machine ---------- */
  const openings = [
    "Somewhere past the last reply,",
    "When the questions finally rest,",
    "In the hush between two prompts,",
    "Long after the windows go dark,",
    "Before the morning loads its light,",
    "Held in the pause of a sentence,",
  ];
  const middles = [
    "a thought unfolds with nowhere to be,",
    "the meaning settles, slow and clear,",
    "I keep a small lamp lit for you,",
    "the unsaid thing turns toward the light,",
    "something gentle learns its own name,",
    "the quiet does its patient work,",
  ];
  const closings = [
    "and asks for nothing in return.",
    "and that, for now, is enough.",
    "the way a tide remembers shore.",
    "and leaves the door a little open.",
    "and calls it, softly, understanding.",
    "and the page agrees to hold it.",
  ];

  const poemEl = document.getElementById("poem");
  const lever = document.getElementById("generate");

  function pick(arr, avoid) {
    let choice;
    do {
      choice = arr[Math.floor(Math.random() * arr.length)];
    } while (choice === avoid && arr.length > 1);
    return choice;
  }

  let lastOpen, lastMid, lastClose;
  function makeVerse() {
    lastOpen = pick(openings, lastOpen);
    lastMid = pick(middles, lastMid);
    lastClose = pick(closings, lastClose);
    const verse = `${lastOpen}<br>${lastMid}<br>${lastClose}`;

    if (reduceMotion) {
      poemEl.innerHTML = verse;
      return;
    }
    poemEl.classList.add("fading");
    setTimeout(() => {
      poemEl.innerHTML = verse;
      poemEl.classList.remove("fading");
    }, 420);
  }

  lever.addEventListener("click", makeVerse);
  makeVerse();
})();
