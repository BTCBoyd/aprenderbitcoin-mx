// Gamification System - Interactive Learning Features

// ==========================================
// PATTERN 1: STAR RATING SYSTEM
// ==========================================

const expertRatings = {
  durabilidad: { 
    rating: 2, 
    explanation: "Los billetes físicos se desgastan, mojan y rompen. Dinero digital es más durable, pero sigue siendo vulnerable a la inflación que erosiona su valor." 
  },
  portabilidad: { 
    rating: 5, 
    explanation: "Excelente. Puedes llevar millones de pesos en una tarjeta o app. Físicamente, grandes cantidades son pesadas, pero digitalmente es perfecto." 
  },
  divisibilidad: { 
    rating: 5, 
    explanation: "Perfecto. El peso se divide hasta centavos. Transacciones digitales permiten cualquier monto." 
  },
  fungibilidad: { 
    rating: 5, 
    explanation: "Excelente. Un peso es un peso, sin importar el billete. (Aunque billetes muy viejos a veces son rechazados en comercios.)" 
  },
  escasez: { 
    rating: 1, 
    explanation: "FALLA CRÍTICA. Banxico puede imprimir pesos infinitamente. Oferta monetaria M2 creció 487% desde 1995. No hay límite máximo." 
  },
  verificabilidad: { 
    rating: 4, 
    explanation: "Bueno. Billetes tienen medidas de seguridad (marcas de agua, hologramas). Dinero digital es verificable al instante. Billetes falsos existen pero son detectables." 
  }
};

let userRatings = {};

function initializeStarRatings() {
  document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      const characteristic = row.dataset.characteristic;
      const value = parseInt(e.target.dataset.value);
      
      // Update visual
      row.querySelectorAll('.star').forEach((s, idx) => {
        s.classList.toggle('selected', idx < value);
      });
      row.querySelector('.selected-rating').textContent = value;
      
      // Store rating
      userRatings[characteristic] = value;
      
      // Enable button if all rated
      const showBtn = document.getElementById('show-evaluation');
      if (showBtn && Object.keys(userRatings).length === 6) {
        showBtn.disabled = false;
      }
    });
  });

  const showBtn = document.getElementById('show-evaluation');
  if (showBtn) {
    showBtn.addEventListener('click', showEvaluation);
  }
}

function showEvaluation() {
  const resultsDiv = document.getElementById('evaluation-results');
  if (!resultsDiv) return;
  
  // Mark exercise complete
  const currentChapter = document.body.dataset.chapter;
  if (currentChapter) {
    markComplete(currentChapter, 'characteristics-rating');
  }

  let html = '<h4>📊 Comparación: Tu Evaluación vs. Análisis Experto</h4>';
  html += '<div class="comparison-grid">';
  
  Object.keys(expertRatings).forEach(char => {
    const userRating = userRatings[char];
    const expertRating = expertRatings[char].rating;
    const diff = Math.abs(userRating - expertRating);
    
    let assessment;
    if (diff === 0) {
      assessment = '✅ Correcto';
    } else if (diff === 1) {
      assessment = '🟡 Muy cerca';
    } else {
      assessment = '🔴 Diferente';
    }
    
    html += `
      <div class="comparison-card ${diff > 1 ? 'highlight' : ''}">
        <h5>${char.charAt(0).toUpperCase() + char.slice(1)}</h5>
        <div class="rating-comparison">
          <span>Tu rating: ${'⭐'.repeat(userRating)}</span><br>
          <span>Experto: ${'⭐'.repeat(expertRating)}</span><br>
          <span class="assessment">${assessment}</span>
        </div>
        <p class="explanation">${expertRatings[char].explanation}</p>
        ${diff > 1 ? `
          <div class="teaching-moment">
            💡 <strong>¿Por qué ${expertRating} y no ${userRating}?</strong><br>
            ${getTeachingMoment(char, userRating, expertRating)}
          </div>
        ` : ''}
      </div>
    `;
  });
  
  html += '</div>';
  
  // Calculate total score
  const totalUser = Object.values(userRatings).reduce((a, b) => a + b, 0);
  const totalExpert = Object.keys(expertRatings).reduce((sum, key) => sum + expertRatings[key].rating, 0);
  
  html += `
    <div class="final-score">
      <h4>📈 Puntaje Total</h4>
      <p><strong>Tu evaluación:</strong> ${totalUser}/30</p>
      <p><strong>Análisis experto:</strong> ${totalExpert}/30 (el peso falla como dinero duro)</p>
      <div class="key-insight">
        <h5>🎯 Conclusión Clave:</h5>
        <p>El peso mexicano obtiene 22/30 - aprobado en la mayoría de características técnicas, pero <strong>reprueba en ESCASEZ</strong> (1/5), la característica más importante para preservar valor a largo plazo.</p>
        <p><strong>Comparación:</strong> Bitcoin obtendría 30/30 - la primera forma de dinero en la historia que cumple perfectamente las 6 características.</p>
      </div>
    </div>
  `;
  
  resultsDiv.innerHTML = html;
  resultsDiv.classList.remove('hidden');
  resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

function getTeachingMoment(char, userRating, expertRating) {
  const moments = {
    escasez: {
      high: "Aunque el gobierno 'controla' la oferta, eso no significa escasez real. Banxico puede imprimir más pesos en cualquier momento - no hay límite físico como con el oro o Bitcoin.",
      low: "Si bien es cierto que pueden imprimir más, el peso sí funciona como dinero diariamente. El problema es que NO preserva valor a largo plazo."
    },
    durabilidad: {
      high: "Los billetes físicos se deterioran rápido. Aunque el dinero digital es más durable físicamente, la inflación 'deteriora' el valor - una forma de destrucción menos visible.",
      low: "Cierto que se rompen, pero la versión digital es bastante durable. El problema real es que el VALOR se deteriora por inflación, no el medio físico."
    }
  };
  
  const direction = userRating > expertRating ? 'high' : 'low';
  return moments[char]?.[direction] || "Considera cómo esta característica afecta la capacidad del peso para preservar valor a largo plazo.";
}

// ==========================================
// PATTERN 2: MULTIPLE CHOICE QUIZZES
// ==========================================

function initializeQuizzes() {
  document.querySelectorAll('.quiz-option').forEach(option => {
    option.addEventListener('click', (e) => {
      const isCorrect = e.target.dataset.correct === 'true';
      const quizQuestion = e.target.closest('.quiz-question');
      const feedbackDiv = quizQuestion.querySelector('.quiz-feedback');
      const correctAnswer = e.target.dataset.correctAnswer || '';
      const explanation = e.target.dataset.explanation || '';
      
      // Mark exercise complete
      const exerciseId = quizQuestion.dataset.exerciseId;
      const currentChapter = document.body.dataset.chapter;
      if (exerciseId && currentChapter) {
        markComplete(currentChapter, exerciseId);
      }
      
      // Disable all options
      e.target.closest('.quiz-options').querySelectorAll('.quiz-option').forEach(opt => {
        opt.disabled = true;
        if (opt.dataset.correct === 'true') {
          opt.classList.add('correct');
        }
      });
      
      // Show feedback
      if (isCorrect) {
        e.target.classList.add('correct');
        feedbackDiv.innerHTML = `
          <div class="feedback-correct">
            ✅ <strong>¡Correcto!</strong><br>
            ${explanation || 'Has identificado la respuesta correcta.'}
          </div>
        `;
      } else {
        e.target.classList.add('incorrect');
        feedbackDiv.innerHTML = `
          <div class="feedback-incorrect">
            ❌ <strong>No exactamente.</strong><br>
            ${correctAnswer ? `La respuesta correcta es: <strong>${correctAnswer}</strong><br>` : ''}
            ${explanation || 'Revisa el contenido y vuelve a intentar.'}
          </div>
        `;
      }
      
      feedbackDiv.classList.remove('hidden');
    });
  });
}

// ==========================================
// PATTERN 3: REFLECTION EXERCISES
// ==========================================

function submitReflection(topicId) {
  const textarea = document.getElementById(`reflection-${topicId}`);
  const text = textarea.value.trim();
  const feedbackDiv = document.getElementById(`reflection-${topicId}-feedback`);
  
  if (text.length < 50) {
    alert('Por favor escribe al menos 50 caracteres para reflexionar bien sobre el tema.');
    return;
  }
  
  // Mark exercise complete
  const currentChapter = document.body.dataset.chapter;
  if (currentChapter) {
    markComplete(currentChapter, `${topicId}-reflection`);
  }
  
  // Analyze response for keywords
  const keywords = {
    positive: ['confiar', 'confiable', 'bueno', 'estable', 'seguro'],
    negative: ['inflación', 'pierde', 'devaluación', 'descarga', 'malo'],
    neutral: ['depende', 'relativo', 'corto plazo']
  };
  
  const lowerText = text.toLowerCase();
  let sentiment = 'neutral';
  
  if (keywords.positive.some(word => lowerText.includes(word)) && 
      !keywords.negative.some(word => lowerText.includes(word))) {
    sentiment = 'positive';
  } else if (keywords.negative.some(word => lowerText.includes(word))) {
    sentiment = 'negative';
  }
  
  let feedback = `
    <div class="guided-feedback">
      <h5>💭 Tu reflexión:</h5>
      <div class="user-reflection">${text}</div>
      <h5>🎓 Análisis guiado:</h5>
  `;
  
  if (sentiment === 'positive') {
    feedback += `
      <p>Veo que ves aspectos positivos del peso. Tienes razón en que <strong>para transacciones diarias</strong> el peso funciona bien. Sin embargo, considera esto:</p>
      <div class="counterpoint">
        <strong>📉 Los Datos:</strong>
        <ul>
          <li>Inflación promedio 2020-2024: ~5% anual</li>
          <li>Tu dinero pierde 5% de poder de compra cada año automáticamente</li>
          <li>Es como una batería que se descarga 5% anual sin usarla</li>
        </ul>
        <p><strong>Pregunta clave:</strong> ¿Confiarías en una batería que pierde 5% de carga por año sin tocarla?</p>
      </div>
    `;
  } else if (sentiment === 'negative') {
    feedback += `
      <p>¡Excelente análisis! Has identificado el problema crítico: <strong>la inflación erosiona el valor almacenado</strong>.</p>
      <div class="affirmation">
        <strong>✅ Puntos clave que captaste:</strong>
        <ul>
          <li>El peso pierde poder de compra constantemente (~5% anual)</li>
          <li>Como batería, se "descarga" sola sin que la uses</li>
          <li>No es confiable para almacenar valor a largo plazo</li>
        </ul>
      </div>
      <div class="next-level">
        <strong>🚀 Próximo nivel:</strong>
        <p>Ahora que entiendes este problema, pregúntate: ¿Existe dinero que NO se "descargue" solo? Bitcoin tiene oferta máxima de 21 millones - imposible de aumentar. ¿Cambia eso la analogía de la batería?</p>
      </div>
    `;
  } else {
    feedback += `
      <p>Interesante perspectiva. Mencionas que "depende" - exploremos eso:</p>
      <div class="exploration">
        <strong>Depende de... ¿qué?</strong>
        <ul>
          <li><strong>Corto plazo:</strong> El peso funciona bien para gastos diarios y ahorros de 1-2 años</li>
          <li><strong>Largo plazo:</strong> Inflación de 5% anual destruye ~40% del valor en 10 años</li>
        </ul>
        <p><strong>La pregunta real:</strong> ¿Estás guardando dinero para 1 mes o para 10 años? La respuesta debería cambiar DÓNDE guardas tu valor.</p>
      </div>
    `;
  }
  
  feedback += `
    <div class="key-insight">
      <strong>💡 Lección clave:</strong>
      <p>Una batería buena retiene carga. Una batería mala se descarga sola. El peso mexicano pierde 5% anual por inflación - se descarga automáticamente. Bitcoin tiene oferta fija de 21 millones - NO se descarga.</p>
    </div>
    </div>
  `;
  
  feedbackDiv.innerHTML = feedback;
  feedbackDiv.classList.remove('hidden');
  textarea.disabled = true;
}

// ==========================================
// PATTERN 4: DRAG-AND-DROP RANKING
// ==========================================

let draggedItem = null;

function initializeRanking() {
  document.querySelectorAll('.ranking-item').forEach(item => {
    item.addEventListener('dragstart', (e) => {
      draggedItem = e.target;
      e.target.style.opacity = '0.5';
    });
    
    item.addEventListener('dragend', (e) => {
      e.target.style.opacity = '';
    });
    
    item.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    
    item.addEventListener('drop', (e) => {
      e.preventDefault();
      if (draggedItem !== e.target) {
        const container = e.target.closest('.ranking-items');
        const allItems = [...container.children];
        const draggedIndex = allItems.indexOf(draggedItem);
        const targetIndex = allItems.indexOf(e.target);
        
        if (draggedIndex < targetIndex) {
          e.target.after(draggedItem);
        } else {
          e.target.before(draggedItem);
        }
      }
    });
  });
}

function checkRanking() {
  const items = document.querySelectorAll('#money-ranking .ranking-item');
  let correct = 0;
  let total = items.length;
  
  items.forEach((item, index) => {
    const currentPosition = index + 1;
    const correctPosition = parseInt(item.dataset.correctPosition);
    
    if (currentPosition === correctPosition) {
      item.classList.add('correct');
      correct++;
    } else {
      item.classList.add('incorrect');
    }
  });
  
  const feedbackDiv = document.getElementById('ranking-feedback');
  const percentage = (correct / total) * 100;
  
  let feedback = `
    <div class="ranking-results">
      <h5>📊 Resultado: ${correct}/${total} correctos (${percentage.toFixed(0)}%)</h5>
  `;
  
  if (percentage === 100) {
    feedback += `
      <div class="feedback-excellent">
        🎉 <strong>¡Perfecto!</strong><br>
        Entendiste completamente la escalera de dureza monetaria. Bitcoin en la cima (SF → ∞), seguido por oro (SF 66), luego plata, y las formas primitivas al final.
      </div>
    `;
  } else if (percentage >= 70) {
    feedback += `
      <div class="feedback-good">
        ✅ <strong>Muy bien!</strong><br>
        Tienes la idea general. Recuerda: mientras MAYOR el Stock-to-Flow, más "duro" (escaso) es el dinero.
      </div>
    `;
  } else {
    feedback += `
      <div class="feedback-needs-work">
        💡 <strong>Revisemos el concepto...</strong><br>
        Stock-to-Flow = años que tomaría duplicar la oferta actual. Mayor SF = más duro = mejor dinero a largo plazo.
      </div>
    `;
  }
  
  feedback += `
      <div class="correct-ranking">
        <h6>Orden correcto:</h6>
        <ol>
          <li><strong>Bitcoin</strong> (SF → ∞ en 2140)</li>
          <li><strong>Oro</strong> (SF 66 años)</li>
          <li><strong>Plata</strong> (SF 22 años)</li>
          <li><strong>Ganado</strong> (SF 3-5 años)</li>
          <li><strong>Conchas</strong> (SF variable)</li>
          <li><strong>Cacao</strong> (SF ~1 año)</li>
          <li><strong>Frutas</strong> (SF ~0.1 año)</li>
        </ol>
      </div>
    </div>
  `;
  
  feedbackDiv.innerHTML = feedback;
  feedbackDiv.classList.remove('hidden');
}

// ==========================================
// PROGRESS TRACKING
// ==========================================

const progress = {
  cap1: {},
  cap2: {},
  cap3: {},
  cap4: {}
};

function loadProgress() {
  const saved = localStorage.getItem('courseProgress');
  if (saved) {
    Object.assign(progress, JSON.parse(saved));
  }
}

function markComplete(chapter, exercise) {
  progress[chapter][exercise] = true;
  localStorage.setItem('courseProgress', JSON.stringify(progress));
  updateProgressBar();
  checkForBadge(chapter);
}

function updateProgressBar() {
  const currentChapter = document.body.dataset.chapter;
  if (!currentChapter) return;
  
  const chapterProgress = progress[currentChapter] || {};
  const totalExercises = document.querySelectorAll('[data-exercise-id]').length;
  const completed = Object.values(chapterProgress).filter(Boolean).length;
  const percentage = totalExercises > 0 ? (completed / totalExercises) * 100 : 0;
  
  const progressBar = document.querySelector('.progress-fill');
  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
  }
}

function checkForBadge(chapter) {
  const chapterProgress = progress[chapter];
  const totalExercises = document.querySelectorAll('[data-exercise-id]').length;
  const completed = Object.values(chapterProgress).filter(Boolean).length;
  
  if (completed === totalExercises && totalExercises > 0) {
    showBadgeAnimation(chapter);
  }
}

function showBadgeAnimation(chapter) {
  const badges = {
    cap1: { emoji: '🎓', name: 'Dinero Maestro' },
    cap2: { emoji: '📜', name: 'Historiador' },
    cap3: { emoji: '⛏️', name: 'Buscador de Oro' },
    cap4: { emoji: '💸', name: 'Experto Fiat' }
  };
  
  const badge = badges[chapter];
  if (!badge) return;
  
  const popup = document.createElement('div');
  popup.className = 'badge-popup';
  popup.innerHTML = `
    <div class="badge-content">
      <div class="badge-emoji">${badge.emoji}</div>
      <h3>¡Insignia Desbloqueada!</h3>
      <p class="badge-name">${badge.name}</p>
      <p>Completaste todos los ejercicios de ${chapter.toUpperCase()}</p>
      <button onclick="closeBadgePopup()" class="button primary">Continuar</button>
    </div>
  `;
  
  document.body.appendChild(popup);
  setTimeout(() => popup.classList.add('show'), 100);
}

function closeBadgePopup() {
  const popup = document.querySelector('.badge-popup');
  if (popup) {
    popup.classList.remove('show');
    setTimeout(() => popup.remove(), 300);
  }
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  initializeStarRatings();
  initializeQuizzes();
  initializeRanking();
  updateProgressBar();
});
