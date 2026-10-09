/**
 * Muhammad Akbar Gimnastiar - Portfolio Website Logic
 * Executive-Grade Interactivity, BI Mockup Switcher, Pipeline Simulation & Resume Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavigation();
  initCopyEmail();
  initBiDashboardMockup();
  initPipelineSimulation();
  initSchemaToggle();
  initResumeModal();
  initBackToTop();
});

/* ==========================================================================
   1. THEME TOGGLE (Executive Light / Sleek Dark)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('akbar_portfolio_theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('akbar_portfolio_theme', nextTheme);
    });
  }
}

/* ==========================================================================
   2. NAVIGATION & ACTIVE SCROLL TRACKING
   ========================================================================== */
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen 
        ? '<i data-lucide="x"></i>' 
        : '<i data-lucide="menu"></i>';
      if (window.lucide) lucide.createIcons();
    });

    // Close mobile menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
        if (window.lucide) lucide.createIcons();
      });
    });
  }

  // Active link on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. EMAIL COPY TO CLIPBOARD & TOAST
   ========================================================================== */
function initCopyEmail() {
  const emailChip = document.getElementById('chip-email');
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  const copyAction = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied email to clipboard: ' + text);
    }).catch(() => {
      showToast('Email: ' + text);
    });
  };

  if (emailChip) {
    emailChip.addEventListener('click', () => copyAction('akbargimnastiar616@gmail.com'));
  }

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => copyAction('akbargimnastiar616@gmail.com'));
  });

  function showToast(msg) {
    if (!toast) return;
    toastMessage.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

/* ==========================================================================
   4. POWER BI DASHBOARD MOCKUP INTERACTIVE PERIOD TOGGLE
   ========================================================================== */
function initBiDashboardMockup() {
  const periodBtns = document.querySelectorAll('.bi-pill-btn');
  const kpiPortfolio = document.getElementById('kpi-portfolio');
  const kpiYield = document.getElementById('kpi-yield');
  const kpiNpl = document.getElementById('kpi-npl');
  const kpiRec = document.getElementById('kpi-rec');
  const barFills = document.querySelectorAll('.bar-fill');

  const dataset = {
    ytd: {
      portfolio: 'IDR 142.8 B',
      yield: '16.85%',
      npl: '1.24%',
      rec: '99.98%',
      bars: ['65%', '55%', '78%', '72%', '85%', '81%', '94%', '90%', '90%', '88%']
    },
    q3: {
      portfolio: 'IDR 131.2 B',
      yield: '16.40%',
      npl: '1.18%',
      rec: '99.95%',
      bars: ['60%', '50%', '70%', '68%', '80%', '76%', '88%', '85%', '82%', '80%']
    },
    q4: {
      portfolio: 'IDR 158.0 B',
      yield: '17.10%',
      npl: '1.30%',
      rec: '99.99%',
      bars: ['70%', '65%', '85%', '80%', '92%', '89%', '98%', '95%', '96%', '92%']
    }
  };

  periodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      periodBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const period = btn.getAttribute('data-period');
      const data = dataset[period];

      if (data && kpiPortfolio) {
        kpiPortfolio.textContent = data.portfolio;
        kpiYield.textContent = data.yield;
        kpiNpl.textContent = data.npl;
        kpiRec.textContent = data.rec;

        // Animate bars
        barFills.forEach((bar, idx) => {
          if (data.bars[idx]) {
            bar.style.height = data.bars[idx];
          }
        });
      }
    });
  });
}

/* ==========================================================================
   5. ARCHITECTURE PIPELINE SIMULATION
   ========================================================================== */
function initPipelineSimulation() {
  const triggerBtn = document.getElementById('trigger-flow-anim');
  const nodeCore = document.getElementById('node-core');
  const nodeEngine = document.getElementById('node-engine');
  const nodeOracle = document.getElementById('node-oracle');
  const logContent = document.getElementById('log-text');
  const pipelineStatus = document.getElementById('pipeline-status');

  if (!triggerBtn) return;

  let isSimulating = false;

  triggerBtn.addEventListener('click', () => {
    if (isSimulating) return;
    isSimulating = true;
    triggerBtn.disabled = true;
    triggerBtn.innerHTML = '<i data-lucide="loader" class="spin-icon"></i> <span>Syncing Batches...</span>';
    if (window.lucide) lucide.createIcons();

    // Reset nodes
    [nodeCore, nodeEngine, nodeOracle].forEach(n => n.classList.remove('active'));
    pipelineStatus.textContent = 'Status: Extracting Core Data...';
    pipelineStatus.style.color = '#F59E0B';

    // Step 1: Core System
    nodeCore.classList.add('active');
    appendLog('Step 1: Extracting unposted transaction batch from Core Financing System...');

    // Step 2: Mapping Engine after 900ms
    setTimeout(() => {
      nodeCore.classList.remove('active');
      nodeEngine.classList.add('active');
      pipelineStatus.textContent = 'Status: Validating CoA & Parity...';
      appendLog('Step 2: Automated Engine validating SAK ETAP Chart of Accounts & balance parity...');
    }, 1200);

    // Step 3: Oracle ERP after 2400ms
    setTimeout(() => {
      nodeEngine.classList.remove('active');
      nodeOracle.classList.add('active');
      pipelineStatus.textContent = 'Status: Posting to Oracle GL...';
      appendLog('Step 3: Transmitting validated journals to Oracle ERP GL Interface...');
    }, 2400);

    // Finish simulation
    setTimeout(() => {
      pipelineStatus.textContent = 'Status: Synchronized & Balanced (Zero Variance)';
      pipelineStatus.style.color = '#10B981';
      appendLog('Success: Batch #2026-VC-088 posted. 100% Debit/Credit Parity achieved.');
      
      triggerBtn.disabled = false;
      triggerBtn.innerHTML = '<i data-lucide="play"></i> <span>Run Pipeline Simulation Again</span>';
      if (window.lucide) lucide.createIcons();
      isSimulating = false;
    }, 3600);
  });

  function appendLog(text) {
    if (!logContent) return;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const logItem = document.createElement('span');
    logItem.className = 'log-item ok';
    logItem.textContent = `[${timeStr}] ${text}`;
    logContent.appendChild(logItem);
    logContent.scrollTop = logContent.scrollHeight;
  }
}

/* ==========================================================================
   6. SCHEMA TOGGLE (Relational View vs JSON API Payload)
   ========================================================================== */
function initSchemaToggle() {
  const schemaToggleBtn = document.getElementById('schema-toggle');
  const schemaView = document.getElementById('schema-view');

  if (!schemaToggleBtn || !schemaView) return;

  let showingJson = false;
  const originalHtml = schemaView.innerHTML;

  schemaToggleBtn.addEventListener('click', () => {
    showingJson = !showingJson;

    if (showingJson) {
      schemaToggleBtn.innerHTML = '<i data-lucide="columns"></i> <span>View Relational Tables</span>';
      schemaView.innerHTML = `
        <div style="grid-column: 1 / -1; background: #090D16; color: #38BDF8; font-family: var(--font-mono); font-size: 0.75rem; padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid #1E293B; line-height: 1.5; overflow-x: auto;">
          <span style="color: #64748B;">// Real-time Virtual Account Webhook Payload</span><br>
          {<br>
          &nbsp;&nbsp;<span style="color: #93C5FD;">"event"</span>: <span style="color: #FCD34D;">"PAYMENT_SETTLED"</span>,<br>
          &nbsp;&nbsp;<span style="color: #93C5FD;">"va_number"</span>: <span style="color: #FCD34D;">"880812349001"</span>,<br>
          &nbsp;&nbsp;<span style="color: #93C5FD;">"loan_account_no"</span>: <span style="color: #FCD34D;">"VC-2024-JKT-0492"</span>,<br>
          &nbsp;&nbsp;<span style="color: #93C5FD;">"bank"</span>: <span style="color: #FCD34D;">"BANK_MANDIRI"</span>,<br>
          &nbsp;&nbsp;<span style="color: #93C5FD;">"amount"</span>: <span style="color: #34D399;">25000000.00</span>,<br>
          &nbsp;&nbsp;<span style="color: #93C5FD;">"oracle_gl_mapping"</span>: {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #93C5FD;">"debit_account"</span>: <span style="color: #FCD34D;">"1101-02-BANK-ESCROW"</span>,<br>
          &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #93C5FD;">"credit_account"</span>: <span style="color: #FCD34D;">"1302-01-FINANCING-RECEIVABLE"</span><br>
          &nbsp;&nbsp;},<br>
          &nbsp;&nbsp;<span style="color: #93C5FD;">"reconciliation_status"</span>: <span style="color: #34D399;">"AUTO_RECONCILED"</span><br>
          }
        </div>
      `;
    } else {
      schemaToggleBtn.innerHTML = '<i data-lucide="table"></i> <span>Toggle Database Schema View</span>';
      schemaView.innerHTML = originalHtml;
    }
    if (window.lucide) lucide.createIcons();
  });
}

/* ==========================================================================
   7. RESUME MODAL & CLEAN PRINT / PDF EXPORT
   ========================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const openBtns = document.querySelectorAll('.open-resume-btn');
  const closeBtn = document.getElementById('close-modal');
  const printBtn = document.getElementById('print-resume-btn');

  if (!modal) return;

  const openModal = (e) => {
    if (e) e.preventDefault();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close when clicking modal backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Print / Save PDF
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   8. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const backTopBtn = document.getElementById('back-to-top');
  if (backTopBtn) {
    backTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}
