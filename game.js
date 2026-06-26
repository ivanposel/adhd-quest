// ADHD Quest

(function () {
  'use strict';

  // ===================== STATE =====================
  const state = {
    currentScreen: 'home',
    currentStation: 1,
    score: 0,
    completedStations: new Set(),
    audioEnabled: true,
    audioCtx: null
  };

  // ===================== AUDIO =====================
  function getAudioCtx() {
    if (!state.audioCtx) {
      state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume if suspended (browser autoplay policy)
    if (state.audioCtx.state === 'suspended') state.audioCtx.resume();
    return state.audioCtx;
  }

  function playTone(freq, duration, type = 'sine', vol = 0.25) {
    if (!state.audioEnabled) return;
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch (e) { /* AudioContext might be blocked */ }
  }

  function playCorrect() {
    playTone(523, 0.1);
    setTimeout(() => playTone(659, 0.1), 110);
    setTimeout(() => playTone(784, 0.22), 220);
  }

  function playWrong() {
    playTone(280, 0.15, 'sawtooth', 0.18);
    setTimeout(() => playTone(220, 0.25, 'sawtooth', 0.12), 160);
  }

  function playClick() {
    playTone(440, 0.06, 'sine', 0.12);
  }

  function playWin() {
    const notes = [523, 659, 784, 1047, 784, 1047];
    notes.forEach((f, i) => setTimeout(() => playTone(f, 0.18), i * 110));
  }

  function playStation() {
    [392, 494, 587].forEach((f, i) => setTimeout(() => playTone(f, 0.15), i * 90));
  }

  // ===================== SCREEN SYSTEM =====================
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById('screen-' + id);
    if (el) el.classList.add('active');
    state.currentScreen = id;
    window.scrollTo(0, 0);
  }

  function updateScoreDisplays() {
    document.querySelectorAll('#score-value, #station-score-value').forEach(el => {
      el.textContent = state.score;
    });
  }

  // ===================== MAP =====================
  // Percentage left positions for each of the 5 station nodes in the map-world container
  const CHAR_POSITIONS = ['12%', '29%', '46%', '63%', '80%'];

  function renderMap() {
    for (let i = 1; i <= 5; i++) {
      const node = document.getElementById('node-' + i);
      if (!node) continue;
      const iconEl = node.querySelector('.station-icon');
      node.classList.remove('current', 'completed', 'locked');
      if (state.completedStations.has(i)) {
        node.classList.add('completed');
        iconEl.textContent = '✅';
      } else if (i === state.currentStation) {
        node.classList.add('current');
        iconEl.textContent = CONTENT['station' + i].icon;
      } else {
        node.classList.add('locked');
        iconEl.textContent = CONTENT['station' + i].icon;
      }
    }

    // Position character at current station
    const char = document.getElementById('map-character');
    if (char) {
      char.style.left = CHAR_POSITIONS[state.currentStation - 1];
    }

    // Update hint text
    const hint = document.getElementById('map-hint');
    if (hint) {
      if (state.completedStations.size === 5) {
        hint.textContent = '🎉 Sve stanice završene! Idemo na kraj!';
      } else {
        hint.textContent = `📍 Stanica ${state.currentStation}: ${CONTENT['station' + state.currentStation].title}`;
      }
    }

    updateScoreDisplays();
    document.getElementById('station-num').textContent = state.currentStation;
  }

  function goToMap() {
    renderMap();
    showScreen('map');
  }

  // ===================== STATION LAUNCHER =====================
  function enterStation(n) {
    document.getElementById('station-num').textContent = n;
    updateScoreDisplays();
    const body = document.getElementById('station-body');
    body.innerHTML = '';
    showScreen('station');
    playStation();

    switch (n) {
      case 1: buildStation1(body); break;
      case 2: buildStation2(body); break;
      case 3: buildStation3(body); break;
      case 4: buildStation4(body); break;
      case 5: buildStation5(body); break;
    }
  }

  function completeStation(pointsEarned) {
    state.score += pointsEarned;
    state.completedStations.add(state.currentStation);
    updateScoreDisplays();
    playWin();

    const body = document.getElementById('station-body');
    body.innerHTML = '';

    const box = document.createElement('div');
    box.className = 'station-complete';
    box.innerHTML = `
      <div style="font-size:4rem">🎉</div>
      <h3>Odlično!</h3>
      <p>Završio/la si stanicu:<br><strong>${CONTENT['station' + state.currentStation].title}</strong></p>
      <div class="points-earned">+${pointsEarned} bodova</div>
      <button class="btn-primary" id="btn-next-station">
        ${state.currentStation < 5 ? 'Sljedeća stanica →' : 'Završi avanturu! 🏆'}
      </button>
    `;
    body.appendChild(box);

    document.getElementById('btn-next-station').onclick = () => {
      playClick();
      if (state.currentStation < 5) {
        state.currentStation++;
        goToMap();
      } else {
        showEnd();
      }
    };
  }

  // ===================== END SCREEN =====================
  function showEnd() {
    const maxScore = 200;
    document.getElementById('final-score').textContent = state.score;
    const pct = state.score / maxScore;
    let grade;
    if (pct >= 0.9) grade = '🏆 Izvrsno! Pravi ADHD stručnjak!';
    else if (pct >= 0.7) grade = '⭐ Vrlo dobro! Sjajno znanje!';
    else if (pct >= 0.5) grade = '👍 Dobro! Učiš dalje!';
    else grade = '📚 Pokušaj ponovo — znanje dolazi vježbanjem!';
    document.getElementById('final-grade').textContent = grade;
    showScreen('end');
    launchConfetti();
    playWin();
  }

  function launchConfetti() {
    const container = document.getElementById('confetti');
    if (!container) return;
    container.innerHTML = '';
    const colors = ['#6C63FF', '#4ECDC4', '#FFE66D', '#FF6B6B', '#6BCB77', '#ffffff'];
    for (let i = 0; i < 70; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      const size = 6 + Math.random() * 10;
      piece.style.cssText = `
        left: ${Math.random() * 100}%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        animation-duration: ${1.4 + Math.random() * 2}s;
        animation-delay: ${Math.random() * 0.8}s;
        width: ${size}px;
        height: ${size}px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      `;
      container.appendChild(piece);
    }
    setTimeout(() => { container.innerHTML = ''; }, 4500);
  }

  // ===================== STATION 1: TRUE/FALSE =====================
  function buildStation1(body) {
    const data = CONTENT.station1;
    let qIndex = 0;
    let points = 0;

    const info = document.createElement('div');
    info.className = 'info-card';
    info.innerHTML = `
      <h2>${data.info.heading}</h2>
      <p>${data.info.body}</p>
      <div class="info-facts">
        ${data.info.facts.map(f => `<span class="fact-chip">${f}</span>`).join('')}
      </div>
    `;
    body.appendChild(info);

    const quizBox = document.createElement('div');
    quizBox.className = 'quiz-question-box';
    body.appendChild(quizBox);

    const feedback = document.createElement('div');
    feedback.className = 'feedback-banner';
    feedback.style.display = 'none';
    body.appendChild(feedback);

    function renderQuestion() {
      if (qIndex >= data.questions.length) {
        completeStation(points);
        return;
      }
      const q = data.questions[qIndex];
      quizBox.innerHTML = `
        <div class="quiz-counter">Pitanje ${qIndex + 1} od ${data.questions.length}</div>
        <div class="quiz-question-text">${q.text}</div>
        <div class="tf-buttons">
          <button class="btn-true" id="tf-true">✓ Točno</button>
          <button class="btn-false" id="tf-false">✗ Netočno</button>
        </div>
      `;
      feedback.style.display = 'none';

      function answer(userAnswer) {
        const correct = userAnswer === q.answer;
        if (correct) { points += 10; playCorrect(); }
        else { playWrong(); }
        feedback.className = 'feedback-banner ' + (correct ? 'correct' : 'wrong');
        feedback.textContent = (correct ? '✅ ' : '❌ ') + q.explanation;
        feedback.style.display = 'block';
        document.getElementById('tf-true').disabled = true;
        document.getElementById('tf-false').disabled = true;
        setTimeout(() => { qIndex++; renderQuestion(); }, 2000);
      }

      document.getElementById('tf-true').onclick = () => { playClick(); answer(true); };
      document.getElementById('tf-false').onclick = () => { playClick(); answer(false); };
    }

    renderQuestion();
  }

  // ===================== STATION 2: DRAG & DROP =====================
  function buildStation2(body) {
    const data = CONTENT.station2;
    let draggedItem = null;

    const infoCard = document.createElement('div');
    infoCard.className = 'info-card';
    infoCard.innerHTML = `
      <h2>🔍 ${data.title}</h2>
      <p>${data.info}</p>
    `;
    body.appendChild(infoCard);

    const instruction = document.createElement('div');
    instruction.className = 'drag-instructions';
    instruction.textContent = '↕ Prevuci svaki simptom u odgovarajuću skupinu';
    body.appendChild(instruction);

    const shuffled = [...data.items].sort(() => Math.random() - 0.5);

    const pool = document.createElement('div');
    pool.className = 'drag-items-pool';
    pool.id = 'drag-pool';

    shuffled.forEach(item => {
      const el = createDragItem(item);
      pool.appendChild(el);
    });
    body.appendChild(pool);

    const zones = document.createElement('div');
    zones.className = 'drop-zones';
    data.categories.forEach(cat => {
      const zone = document.createElement('div');
      zone.className = 'drop-zone';
      zone.dataset.category = cat.id;
      zone.innerHTML = `<div class="drop-zone-title">${cat.emoji} ${cat.label}</div>`;

      zone.addEventListener('dragover', e => {
        e.preventDefault();
        zone.classList.add('over');
      });
      zone.addEventListener('dragleave', () => zone.classList.remove('over'));
      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('over');
        if (draggedItem) {
          zone.appendChild(draggedItem);
          draggedItem = null;
          checkAllPlaced();
        }
      });
      zones.appendChild(zone);
    });
    body.appendChild(zones);

    const submitBtn = document.createElement('button');
    submitBtn.className = 'btn-primary';
    submitBtn.textContent = 'Provjeri odgovore ✓';
    submitBtn.style.display = 'none';
    submitBtn.onclick = () => checkAnswer();
    body.appendChild(submitBtn);

    function createDragItem(item) {
      const el = document.createElement('div');
      el.className = 'drag-item';
      el.textContent = item.text;
      el.dataset.category = item.category;
      el.draggable = true;

      el.addEventListener('dragstart', e => {
        draggedItem = el;
        el.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      el.addEventListener('dragend', () => {
        el.classList.remove('dragging');
        draggedItem = null;
      });

      // Touch support
      let touchClone = null;
      let touchOffsetX = 0, touchOffsetY = 0;

      el.addEventListener('touchstart', e => {
        draggedItem = el;
        const touch = e.touches[0];
        const rect = el.getBoundingClientRect();
        touchOffsetX = touch.clientX - rect.left;
        touchOffsetY = touch.clientY - rect.top;
        touchClone = el.cloneNode(true);
        touchClone.style.cssText = `
          position:fixed;pointer-events:none;opacity:0.85;z-index:9999;
          width:${rect.width}px;left:${rect.left}px;top:${rect.top}px;
        `;
        document.body.appendChild(touchClone);
        el.style.opacity = '0.3';
      }, { passive: true });

      el.addEventListener('touchmove', e => {
        e.preventDefault();
        const touch = e.touches[0];
        if (touchClone) {
          touchClone.style.left = (touch.clientX - touchOffsetX) + 'px';
          touchClone.style.top = (touch.clientY - touchOffsetY) + 'px';
        }
      }, { passive: false });

      el.addEventListener('touchend', e => {
        if (touchClone) { document.body.removeChild(touchClone); touchClone = null; }
        el.style.opacity = '';
        const touch = e.changedTouches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        const zone = target ? target.closest('.drop-zone') : null;
        if (zone && draggedItem) {
          zone.appendChild(draggedItem);
          checkAllPlaced();
        }
        draggedItem = null;
      });

      return el;
    }

    function checkAllPlaced() {
      const remaining = pool.querySelectorAll('.drag-item').length;
      submitBtn.style.display = remaining === 0 ? 'block' : 'none';
    }

    function checkAnswer() {
      let correct = 0;
      const total = data.items.length;
      document.querySelectorAll('.drop-zone').forEach(zone => {
        const expected = zone.dataset.category;
        zone.querySelectorAll('.drag-item').forEach(item => {
          if (item.dataset.category === expected) {
            item.style.background = '#6BCB77';
            correct++;
          } else {
            item.style.background = '#FF6B6B';
          }
        });
      });
      const points = correct === total ? 20 : correct >= Math.ceil(total / 2) ? 10 : 5;
      if (correct === total) playCorrect(); else playWrong();
      submitBtn.disabled = true;
      submitBtn.textContent = `${correct}/${total} točno — nastavi →`;
      submitBtn.onclick = () => completeStation(points);
      submitBtn.disabled = false;
    }
  }

  // ===================== STATION 3: MYTHS VS FACTS =====================
  function buildStation3(body) {
    const data = CONTENT.station3;
    let cardIndex = 0;
    let points = 0;
    const shuffled = [...data.cards].sort(() => Math.random() - 0.5);

    const infoCard = document.createElement('div');
    infoCard.className = 'info-card';
    infoCard.innerHTML = `<h2>💡 ${data.title}</h2><p>${data.intro}</p>`;
    body.appendChild(infoCard);

    const stack = document.createElement('div');
    stack.className = 'card-stack';
    body.appendChild(stack);

    const feedback = document.createElement('div');
    feedback.className = 'feedback-banner';
    feedback.style.display = 'none';
    body.appendChild(feedback);

    function renderCard() {
      stack.innerHTML = '';
      feedback.style.display = 'none';
      if (cardIndex >= shuffled.length) {
        completeStation(points);
        return;
      }
      const card = shuffled[cardIndex];
      const el = document.createElement('div');
      el.className = 'myth-card';
      el.innerHTML = `
        <div class="myth-card-counter">Kartica ${cardIndex + 1} od ${shuffled.length}</div>
        <div class="myth-card-text">"${card.text}"</div>
        <div class="myth-buttons">
          <button class="btn-myth-true">✓ Točno</button>
          <button class="btn-myth-false">✗ Netočno</button>
        </div>
      `;
      stack.appendChild(el);

      function answer(userSaysTrue) {
        const correct = userSaysTrue === card.isTrue;
        if (correct) { points += 10; playCorrect(); }
        else { playWrong(); }
        el.classList.add(correct ? 'slide-out-right' : 'slide-out-left');
        feedback.className = 'feedback-banner ' + (correct ? 'correct' : 'wrong');
        feedback.textContent = (correct ? '✅ ' : '❌ ') + card.explanation;
        feedback.style.display = 'block';
        el.querySelectorAll('button').forEach(b => b.disabled = true);
        setTimeout(() => { cardIndex++; renderCard(); }, 2100);
      }

      el.querySelector('.btn-myth-true').onclick = () => { playClick(); answer(true); };
      el.querySelector('.btn-myth-false').onclick = () => { playClick(); answer(false); };
    }

    renderCard();
  }

  // ===================== STATION 4: BREATHING TIMER =====================
  function buildStation4(body) {
    const data = CONTENT.station4;
    let cyclesDone = 0;
    let running = false;

    const infoCard = document.createElement('div');
    infoCard.className = 'info-card';
    infoCard.innerHTML = `<h2>🌬️ ${data.title}</h2><p>${data.intro}</p>`;
    body.appendChild(infoCard);

    const wrap = document.createElement('div');
    wrap.className = 'breathing-circle-wrap';

    const circle = document.createElement('div');
    circle.className = 'breathing-circle';
    circle.innerHTML = 'Klikni za<br>početak 🌬️';

    const label = document.createElement('div');
    label.className = 'breathing-instruction';
    label.textContent = 'Pritisni krug za početak vježbe';

    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'breathing-progress';
    const dots = [];
    for (let i = 0; i < data.cycles; i++) {
      const dot = document.createElement('div');
      dot.className = 'breath-dot';
      dotsWrap.appendChild(dot);
      dots.push(dot);
    }

    const tip = document.createElement('div');
    tip.className = 'info-card';
    tip.style.fontSize = '0.9rem';
    tip.style.marginTop = '4px';
    tip.style.color = '#555';
    tip.textContent = '💡 ' + data.tip;

    wrap.appendChild(circle);
    wrap.appendChild(label);
    wrap.appendChild(dotsWrap);
    wrap.appendChild(tip);
    body.appendChild(wrap);

    function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

    async function runCycle() {
      for (const step of data.steps) {
        circle.className = 'breathing-circle ' + step.phase;
        circle.innerHTML = step.label + '<br><span style="font-size:1.6rem;opacity:0.9">' + step.duration + 's</span>';
        label.textContent = step.label + '...';
        await sleep(step.duration * 1000);
      }
    }

    circle.onclick = async () => {
      if (running) return;
      running = true;
      circle.style.cursor = 'default';
      playClick();

      for (let i = 0; i < data.cycles; i++) {
        label.textContent = `Ciklus ${i + 1} od ${data.cycles}`;
        await sleep(300);
        await runCycle();
        dots[i].classList.add('done');
        cyclesDone++;
        if (i < data.cycles - 1) playTone(523, 0.12);
      }

      circle.className = 'breathing-circle';
      circle.innerHTML = '✅<br>Odlično!';
      label.textContent = 'Izvrsno! Završio/la si vježbu fokusa!';
      playCorrect();
      setTimeout(() => completeStation(30), 1600);
    };
  }

  // ===================== STATION 5: MULTIPLE CHOICE =====================
  function buildStation5(body) {
    const data = CONTENT.station5;
    let scenarioIndex = 0;
    let points = 0;

    const infoCard = document.createElement('div');
    infoCard.className = 'info-card';
    infoCard.innerHTML = `<h2>🤝 ${data.title}</h2><p>${data.intro}</p>`;
    body.appendChild(infoCard);

    const scenBox = document.createElement('div');
    scenBox.className = 'scenario-box';
    body.appendChild(scenBox);

    const feedback = document.createElement('div');
    feedback.className = 'feedback-banner';
    feedback.style.display = 'none';
    body.appendChild(feedback);

    function renderScenario() {
      scenBox.innerHTML = '';
      feedback.style.display = 'none';
      if (scenarioIndex >= data.scenarios.length) {
        completeStation(points);
        return;
      }
      const s = data.scenarios[scenarioIndex];
      const counter = document.createElement('div');
      counter.className = 'scenario-counter';
      counter.textContent = `Situacija ${scenarioIndex + 1} od ${data.scenarios.length}`;
      scenBox.appendChild(counter);

      const ctx = document.createElement('div');
      ctx.className = 'scenario-context';
      ctx.textContent = '📖 ' + s.context;
      scenBox.appendChild(ctx);

      const question = document.createElement('div');
      question.className = 'scenario-question';
      question.textContent = s.question;
      scenBox.appendChild(question);

      const optionsList = document.createElement('div');
      optionsList.className = 'scenario-options';

      s.options.forEach((option, i) => {
        const btn = document.createElement('button');
        btn.className = 'scenario-option';
        btn.textContent = option.text;
        btn.onclick = () => {
          playClick();
          optionsList.querySelectorAll('.scenario-option').forEach(b => b.disabled = true);
          btn.classList.add(option.correct ? 'correct' : 'wrong');
          if (option.correct) {
            points += 15;
            playCorrect();
          } else {
            playWrong();
            // Reveal correct answer
            optionsList.querySelectorAll('.scenario-option').forEach((b, j) => {
              if (s.options[j].correct) b.classList.add('correct');
            });
          }
          feedback.className = 'feedback-banner ' + (option.correct ? 'correct' : 'wrong');
          feedback.textContent = (option.correct ? '✅ ' : '❌ ') + option.feedback;
          feedback.style.display = 'block';
          setTimeout(() => { scenarioIndex++; renderScenario(); }, 2400);
        };
        optionsList.appendChild(btn);
      });

      scenBox.appendChild(optionsList);
    }

    renderScenario();
  }

  // ===================== INIT =====================
  function init() {
    // Home → Map
    document.getElementById('btn-start').onclick = () => {
      playClick();
      goToMap();
    };

    // Map → Station (button)
    document.getElementById('btn-enter-station').onclick = () => {
      if (!state.completedStations.has(state.currentStation)) {
        playClick();
        enterStation(state.currentStation);
      }
    };

    // Station → Map
    document.getElementById('btn-back-map').onclick = () => {
      playClick();
      goToMap();
    };

    // Mute toggle
    document.getElementById('btn-mute').onclick = () => {
      state.audioEnabled = !state.audioEnabled;
      document.getElementById('btn-mute').textContent = state.audioEnabled ? '🔊' : '🔇';
    };

    // Restart from end screen
    document.getElementById('btn-restart').onclick = () => {
      state.score = 0;
      state.currentStation = 1;
      state.completedStations.clear();
      updateScoreDisplays();
      playClick();
      showScreen('home');
    };

    // Station node clicks on map
    for (let i = 1; i <= 5; i++) {
      const node = document.getElementById('node-' + i);
      if (node) {
        node.onclick = () => {
          if (state.completedStations.has(i)) return; // already done
          if (i !== state.currentStation) return;      // locked
          playClick();
          enterStation(i);
        };
      }
    }
  }

  document.addEventListener('DOMContentLoaded', init);

})();
