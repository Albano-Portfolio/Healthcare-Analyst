/* ============================================
   JASON ALBANO PORTFOLIO — SCRIPT.JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ────────────────────────────────────
  // NEURAL NETWORK CANVAS BACKGROUND
  // ────────────────────────────────────
  const canvas = document.getElementById('neuralCanvas');
  const ctx = canvas.getContext('2d');
  let nodes = [], W, H, mouse = { x: -999, y: -999 };

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); initNodes(); });

  class Node {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.2;
      this.color = Math.random() > 0.6 ? '#06FFA5' : '#00D4FF';
    }
    update() {
      // Slight attraction to mouse
      const dx = mouse.x - this.x, dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180) {
        this.vx += dx / dist * 0.02;
        this.vy += dy / dist * 0.02;
      }
      this.vx *= 0.99; this.vy *= 0.99;
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 6; ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function initNodes() {
    const count = Math.min(80, Math.floor(W * H / 14000));
    nodes = Array.from({ length: count }, () => new Node());
  }
  initNodes();

  function drawEdges() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          ctx.save();
          ctx.globalAlpha = (1 - d / 120) * 0.15;
          ctx.strokeStyle = '#06FFA5';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function drawPulses() {
    // Occasional traveling pulse along an edge
    if (Math.random() < 0.003 && nodes.length >= 2) {
      const a = nodes[Math.floor(Math.random() * nodes.length)];
      const b = nodes[Math.floor(Math.random() * nodes.length)];
      const dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < 120) {
        const t = (Date.now() % 1000) / 1000;
        const px = a.x + dx * t, py = a.y + dy * t;
        ctx.save();
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = '#06FFA5';
        ctx.shadowBlur = 10; ctx.shadowColor = '#06FFA5';
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    nodes.forEach(n => { n.update(); n.draw(); });
    drawEdges();
    drawPulses();
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  // ────────────────────────────────────
  // CUSTOM CURSOR
  // ────────────────────────────────────
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
  function trailRing() {
    rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(trailRing);
  }
  trailRing();

  // ────────────────────────────────────
  // NAV SCROLL
  // ────────────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ────────────────────────────────────
  // HAMBURGER
  // ────────────────────────────────────
  const ham = document.getElementById('hamburger');
  const overlay = document.getElementById('mobileOverlay');
  ham.addEventListener('click', () => {
    const open = overlay.classList.toggle('open');
    const [s1, s2, s3] = ham.querySelectorAll('span');
    if (open) {
      s1.style.transform = 'rotate(45deg) translateY(7px)'; s2.style.opacity = '0'; s3.style.transform = 'rotate(-45deg) translateY(-7px)';
    } else {
      s1.style.transform = ''; s2.style.opacity = ''; s3.style.transform = '';
    }
  });
  document.querySelectorAll('.m-link').forEach(l => l.addEventListener('click', () => {
    overlay.classList.remove('open');
    const [s1, s2, s3] = ham.querySelectorAll('span');
    s1.style.transform = ''; s2.style.opacity = ''; s3.style.transform = '';
  }));

  // ────────────────────────────────────
  // SMOOTH SCROLL
  // ────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 76, behavior: 'smooth' }); }
    });
  });

  // ────────────────────────────────────
  // TYPEWRITER HERO
  // ────────────────────────────────────
  const phrases = [
    'Business Analytics Advisor · Cigna',
    'AI-Enabled Healthcare Data Analyst',
    'Databricks & SQL Expert',
    'Tableau & Power BI Dashboard Architect',
    'Healthcare Claims Analytics SME',
    'Prompt Engineering Practitioner',
  ];
  let pi = 0, ci = 0, deleting = false;
  const typeEl = document.getElementById('typeTarget');
  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      typeEl.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(type, 2000); return; }
      setTimeout(type, 55);
    } else {
      typeEl.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 300); return; }
      setTimeout(type, 28);
    }
  }
  setTimeout(type, 1400);

  // ────────────────────────────────────
  // COUNTER ANIMATION
  // ────────────────────────────────────
  function countUp(el, target, duration = 1600) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      el.textContent = Math.floor(start);
      if (start >= target) clearInterval(timer);
    }, 16);
  }

  // ────────────────────────────────────
  // INTERSECTION OBSERVER — Universal
  // ────────────────────────────────────
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      // Hero stats
      if (el.classList.contains('hero-stats-row')) {
        el.querySelectorAll('.hstat-n').forEach(n => countUp(n, +n.dataset.target));
      }
      // Reveal classes
      if (el.classList.contains('reveal-left') || el.classList.contains('reveal-up') || el.classList.contains('reveal-scale')) {
        el.classList.add('visible');
      }
      // Skill bars
      if (el.classList.contains('skill-cat')) {
        el.classList.add('visible');
        el.querySelectorAll('.sk-fill').forEach((bar, i) => {
          setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, 100 + i * 60);
        });
      }
      // Timeline items
      if (el.classList.contains('tl-item')) {
        el.classList.add('visible');
      }
      // Pro dev & cert items
      if (el.classList.contains('prodev-item') || el.classList.contains('cert-card') || el.classList.contains('edu-cert-card') || el.classList.contains('edu-card') || el.classList.contains('ai-uc-card')) {
        el.classList.add('visible');
      }

      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Observe all reveal targets
  document.querySelectorAll('.hero-stats-row, .reveal-left, .reveal-up, .reveal-scale, .skill-cat, .tl-item, .prodev-item, .cert-card, .edu-cert-card, .edu-card, .ai-uc-card').forEach(el => io.observe(el));

  // ────────────────────────────────────
  // ACTIVE NAV LINK
  // ────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a');
  const navIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAs.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + e.target.id) a.style.color = 'var(--c-accent)';
        });
      }
    });
  }, { threshold: 0.45 });
  sections.forEach(s => navIO.observe(s));

  // ────────────────────────────────────
  // AI LAB TERMINAL — Code Scenarios
  // ────────────────────────────────────
  const scenarios = [
    {
      file: 'databricks_genie_nlp.py',
      lang: 'Databricks Genie / SQL',
      code: `<span class="tc"># Databricks Genie — Natural Language → SQL</span>
<span class="tb"></span>
<span class="tk">from</span> <span class="tv">databricks.sdk</span> <span class="tk">import</span> WorkspaceClient
<span class="tk">import</span> <span class="tv">pyspark.sql.functions</span> <span class="tk">as</span> F
<span class="tb"></span>
<span class="tc"># Genie converts natural language to optimized Spark SQL</span>
<span class="tv">nl_query</span> = <span class="ts">"Show me total allowed cost by provider specialty</span>
<span class="ts">           for members with diabetes in Q1 2026"</span>
<span class="tb"></span>
<span class="tc"># Genie translates to (and executes):</span>
<span class="tv">genie_sql</span> = <span class="ts">"""</span>
<span class="tind"><span class="ts">SELECT p.specialty, COUNT(DISTINCT c.member_id) AS members,</span></span>
<span class="tind"><span class="ts">       SUM(c.allowed_amount) AS total_cost,</span></span>
<span class="tind"><span class="ts">       AVG(c.allowed_amount) AS avg_cost_per_claim</span></span>
<span class="tind"><span class="ts">FROM claims_lakehouse.medical_claims c</span></span>
<span class="tind"><span class="ts">JOIN claims_lakehouse.providers p ON c.npi = p.npi</span></span>
<span class="tind"><span class="ts">JOIN claims_lakehouse.dx_flags d ON c.member_id = d.member_id</span></span>
<span class="tind"><span class="ts">WHERE d.diabetes_flag = 1</span></span>
<span class="tind"><span class="ts">  AND c.service_date BETWEEN '2026-01-01' AND '2026-03-31'</span></span>
<span class="tind"><span class="ts">GROUP BY 1 ORDER BY total_cost DESC</span></span>
<span class="ts">"""</span>
<span class="tb"></span>
<span class="tv">results</span> = spark.<span class="tf">sql</span>(<span class="tv">genie_sql</span>)
<span class="tv">results</span>.<span class="tf">display</span>()
<span class="tb"></span>
<span class="t-result">→ 47 specialties · $128.4M total cost identified in 2.3s</span>
<span class="t-caret">█</span>`
    },
    {
      file: 'risk_stratification.py',
      lang: 'Python / ML / Databricks',
      code: `<span class="tc"># Member Risk Stratification — Predictive ML Pipeline</span>
<span class="tb"></span>
<span class="tk">from</span> <span class="tv">pyspark.ml</span> <span class="tk">import</span> Pipeline
<span class="tk">from</span> <span class="tv">pyspark.ml.classification</span> <span class="tk">import</span> GBTClassifier
<span class="tk">from</span> <span class="tv">pyspark.ml.feature</span> <span class="tk">import</span> VectorAssembler, StandardScaler
<span class="tk">from</span> <span class="tv">databricks.feature_store</span> <span class="tk">import</span> FeatureStoreClient
<span class="tb"></span>
<span class="tc"># Load features from Databricks Feature Store</span>
<span class="tv">fs</span> = FeatureStoreClient()
<span class="tv">member_features</span> = <span class="tv">fs</span>.<span class="tf">read_table</span>(<span class="ts">"healthcare.member_risk_features"</span>)
<span class="tb"></span>
<span class="tv">feature_cols</span> = [
    <span class="ts">'prior_auth_count'</span>, <span class="ts">'er_visits_12m'</span>, <span class="ts">'chronic_conditions'</span>,
    <span class="ts">'rx_adherence_score'</span>, <span class="ts">'pcp_visits'</span>, <span class="ts">'cost_trend_6m'</span>
]
<span class="tb"></span>
<span class="tv">assembler</span> = VectorAssembler(<span class="tv">inputCols</span>=<span class="tv">feature_cols</span>, <span class="tv">outputCol</span>=<span class="ts">"features"</span>)
<span class="tv">gbt</span> = GBTClassifier(<span class="tv">labelCol</span>=<span class="ts">"high_cost_flag"</span>, <span class="tv">maxIter</span>=<span class="tn">100</span>)
<span class="tv">pipeline</span> = Pipeline(<span class="tv">stages</span>=[<span class="tv">assembler</span>, <span class="tv">gbt</span>])
<span class="tb"></span>
<span class="tv">model</span> = <span class="tv">pipeline</span>.<span class="tf">fit</span>(<span class="tv">member_features</span>)
<span class="tv">predictions</span> = <span class="tv">model</span>.<span class="tf">transform</span>(<span class="tv">member_features</span>)
<span class="tb"></span>
<span class="tc"># Route high-risk members to care management</span>
<span class="tv">high_risk</span> = <span class="tv">predictions</span>.<span class="tf">filter</span>(<span class="ts">"probability[1] > 0.75"</span>)
<span class="tb"></span>
<span class="t-result">→ 2,847 high-risk members flagged · 94.2% model accuracy</span>
<span class="t-caret">█</span>`
    },
    {
      file: 'fwa_detection.py',
      lang: 'Python / PySpark / SQL',
      code: `<span class="tc"># Fraud, Waste & Abuse Detection — Claims Anomaly Analysis</span>
<span class="tb"></span>
<span class="tk">from</span> <span class="tv">pyspark.sql</span> <span class="tk">import</span> functions <span class="tk">as</span> F
<span class="tk">from</span> <span class="tv">pyspark.sql.window</span> <span class="tk">import</span> Window
<span class="tb"></span>
<span class="tc"># Load claims data from Delta Lakehouse</span>
<span class="tv">claims</span> = spark.<span class="tf">table</span>(<span class="ts">"claims_lakehouse.medical_claims"</span>)
<span class="tb"></span>
<span class="tc"># Flag billing anomalies per provider</span>
<span class="tv">window</span> = Window.<span class="tf">partitionBy</span>(<span class="ts">"npi"</span>).<span class="tf">orderBy</span>(<span class="ts">"service_date"</span>)

<span class="tv">anomaly_flags</span> = <span class="tv">claims</span>.<span class="tf">withColumn</span>(
    <span class="ts">"avg_peer_cost"</span>, F.<span class="tf">avg</span>(<span class="ts">"allowed_amount"</span>).<span class="tf">over</span>(<span class="tv">window</span>)
).<span class="tf">withColumn</span>(
    <span class="ts">"cost_zscore"</span>,
    (F.<span class="tf">col</span>(<span class="ts">"allowed_amount"</span>) - F.<span class="tf">col</span>(<span class="ts">"avg_peer_cost"</span>)) /
    F.<span class="tf">stddev</span>(<span class="ts">"allowed_amount"</span>).<span class="tf">over</span>(<span class="tv">window</span>)
).<span class="tf">withColumn</span>(
    <span class="ts">"fwa_flag"</span>,
    F.<span class="tf">when</span>(F.<span class="tf">col</span>(<span class="ts">"cost_zscore"</span>) > <span class="tn">3.0</span>, <span class="tn">1</span>).<span class="tf">otherwise</span>(<span class="tn">0</span>)
)
<span class="tb"></span>
<span class="tv">flagged_providers</span> = <span class="tv">anomaly_flags</span>.<span class="tf">filter</span>(<span class="ts">"fwa_flag = 1"</span>) \
    .<span class="tf">groupBy</span>(<span class="ts">"npi"</span>, <span class="ts">"provider_name"</span>).<span class="tf">agg</span>(
        F.<span class="tf">count</span>(<span class="ts">"*"</span>).<span class="tf">alias</span>(<span class="ts">"anomaly_count"</span>),
        F.<span class="tf">sum</span>(<span class="ts">"allowed_amount"</span>).<span class="tf">alias</span>(<span class="ts">"flagged_amount"</span>)
    ).<span class="tf">orderBy</span>(<span class="ts">"flagged_amount"</span>, <span class="tv">ascending</span>=<span class="tk">False</span>)
<span class="tb"></span>
<span class="t-result">→ 134 providers flagged · $4.2M in anomalous claims identified</span>
<span class="t-caret">█</span>`
    },
    {
      file: 'prompt_engineering.py',
      lang: 'Python / LLM / GenAI',
      code: `<span class="tc"># Prompt Engineering — AI-Powered Claims Summary Generation</span>
<span class="tb"></span>
<span class="tk">import</span> <span class="tv">json</span>
<span class="tk">from</span> <span class="tv">openai</span> <span class="tk">import</span> AzureOpenAI
<span class="tb"></span>
<span class="tv">client</span> = AzureOpenAI(
    <span class="tv">azure_endpoint</span> = <span class="ts">"https://cigna-health-ai.openai.azure.com/"</span>,
    <span class="tv">api_version</span>    = <span class="ts">"2024-02-01"</span>
)
<span class="tb"></span>
<span class="tv">system_prompt</span> = <span class="ts">"""You are an expert healthcare analyst. Given claims</span>
<span class="ts">data metrics, produce a concise executive summary highlighting</span>
<span class="ts">key cost drivers, trends, and actionable recommendations.</span>
<span class="ts">Format: 3 bullets max. Use healthcare industry terminology."""</span>
<span class="tb"></span>
<span class="tv">claims_data</span> = {
    <span class="ts">"total_cost"</span>: <span class="ts">"$128.4M"</span>, <span class="ts">"yoy_change"</span>: <span class="ts">"+7.2%"</span>,
    <span class="ts">"top_driver"</span>: <span class="ts">"Oncology ($34.2M)"</span>,
    <span class="ts">"er_avoidable"</span>: <span class="ts">"1,847 avoidable ER visits"</span>
}
<span class="tb"></span>
<span class="tv">response</span> = <span class="tv">client</span>.chat.completions.<span class="tf">create</span>(
    <span class="tv">model</span>=<span class="ts">"gpt-4o"</span>,
    <span class="tv">messages</span>=[
        {<span class="ts">"role"</span>: <span class="ts">"system"</span>, <span class="ts">"content"</span>: <span class="tv">system_prompt</span>},
        {<span class="ts">"role"</span>: <span class="ts">"user"</span>, <span class="ts">"content"</span>: json.<span class="tf">dumps</span>(<span class="tv">claims_data</span>)}
    ]
)
<span class="tb"></span>
<span class="t-result">→ Executive summary generated in 1.8s · Ready for leadership deck</span>
<span class="t-caret">█</span>`
    }
  ];

  const terminalBody = document.getElementById('terminalBody');
  const terminalFile = document.getElementById('terminalFile');
  const scenarioBtns = document.querySelectorAll('.lab-scenario-btn');

  function setScenario(idx) {
    const s = scenarios[idx];
    terminalFile.textContent = s.file;
    terminalBody.closest('.lab-terminal').querySelector('.ttb-lang').textContent = s.lang;

    // Animate in lines
    terminalBody.innerHTML = '';
    const lines = s.code.split('\n');
    lines.forEach((line, i) => {
      const div = document.createElement('div');
      div.innerHTML = line || '&nbsp;';
      div.style.opacity = '0';
      div.style.transform = 'translateY(4px)';
      terminalBody.appendChild(div);
      setTimeout(() => {
        div.style.transition = 'opacity 0.25s, transform 0.25s';
        div.style.opacity = '1';
        div.style.transform = 'translateY(0)';
      }, i * 30);
    });

    scenarioBtns.forEach((b, i) => b.classList.toggle('active', i === idx));
  }

  setScenario(0);
  scenarioBtns.forEach((btn, i) => btn.addEventListener('click', () => setScenario(i)));

  // ────────────────────────────────────
  // CONTACT FORM
  // ────────────────────────────────────
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      const origText = btn.querySelector('span').textContent;
      btn.querySelector('span').textContent = 'Sending...';
      btn.disabled = true;

      // Simulate send (replace with Formspree/EmailJS/Netlify)
      setTimeout(() => {
        form.style.display = 'none';
        successMsg.classList.add('show');
      }, 1200);
    });
  }

  // ────────────────────────────────────
  // GLITCH EFFECT — Hero name
  // ────────────────────────────────────
  const line2 = document.querySelector('.line2');
  if (line2) {
    setInterval(() => {
      line2.style.filter = `hue-rotate(${Math.random()*40}deg)`;
      line2.style.transform = `translateX(${(Math.random()-0.5)*4}px)`;
      setTimeout(() => { line2.style.filter = ''; line2.style.transform = ''; }, 80);
    }, 5000);
  }

  // ────────────────────────────────────
  // HERO BADGE pulse click easter egg
  // ────────────────────────────────────
  const badge = document.getElementById('heroBadge');
  if (badge) {
    badge.addEventListener('click', () => {
      badge.style.background = 'rgba(6,255,165,0.25)';
      badge.style.boxShadow = '0 0 30px rgba(6,255,165,0.4)';
      setTimeout(() => { badge.style.background = ''; badge.style.boxShadow = ''; }, 400);
    });
  }

  // ────────────────────────────────────
  // SCROLL PROGRESS — subtle logo glow
  // ────────────────────────────────────
  const navLogo = document.querySelector('.nav-logo');
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    if (navLogo) navLogo.style.boxShadow = `0 0 ${16 + pct*24}px rgba(6,255,165,${0.35 + pct*0.35})`;
  });

  // ────────────────────────────────────
  // CARD TILT EFFECT
  // ────────────────────────────────────
  document.querySelectorAll('.cert-card, .tl-card, .skill-cat, .ai-uc-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${-y*4}deg) rotateY(${x*4}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  console.log('%c⬡ Jason Albano Portfolio', 'color:#06FFA5;font-size:20px;font-weight:900;');
  console.log('%cAI-Enabled Healthcare Analytics · Nashville, TN', 'color:#00D4FF;font-size:13px;');
  console.log('%c🏥 Cigna · Databricks · Tableau · SQL · Python', 'color:#8BA4BE;font-size:12px;');

});
