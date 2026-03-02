// Funzione Helper per debounce
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this; const args = arguments;
        const later = function() { timeout = null; if (!immediate) func.apply(context, args); };
        const callNow = immediate && !timeout; clearTimeout(timeout); timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
 }
// Verifica Disponibilità Chart.js
function isChartAvailable() { return typeof Chart !== 'undefined'; }

// --- Funzioni Inizializzazione Grafici ---
function initServicesChart() {
     if (!isChartAvailable() || document.getElementById('servicesChart')?.chartInstance) return;
     const ctx = document.getElementById('servicesChart')?.getContext('2d'); if (!ctx) return;
     console.log("Inizializzazione Grafico Servizi...");
     const chart = new Chart(ctx, { type: 'bar', data: { labels: ['Gestione Completa', 'Ottimizzazione Ricavi', 'Marketing & Visibilità', 'Manutenzione & Qualità', 'Supporto Burocratico', 'Assistenza Ospiti'], datasets: [{ label: 'Livello Servizio MoorentPm', data: [95, 95, 85, 90, 90, 95], backgroundColor: 'rgba(243, 223, 217, 0.7)', borderColor: 'var(--primary-dark)', borderWidth: 1 }] }, options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, scales: { x: { beginAtZero: true, max: 100, grid: { display: false } }, y: { grid: { display: false } } }, plugins: { legend: { display: false }, title: { display: true, text: 'Aree di Eccellenza del Servizio' } }, animation: { duration: 1500, easing: 'easeOutQuart' } } });
     document.getElementById('servicesChart').chartInstance = chart;
}
function initPackageChart() {
     if (!isChartAvailable() || document.getElementById('packageChart')?.chartInstance) return;
     const ctx = document.getElementById('packageChart')?.getContext('2d'); if (!ctx) return;
     console.log("Inizializzazione Grafico Pacchetto...");
     const packageData = { labels: [ 'Staging (€250)', 'Foto (€150)', 'Fiscale (€100)', 'Assic. (€100)', 'Check-in (€100)', 'Set Base (€70)', 'Welcome (€50)', 'Pratiche (€20)' ], values: [ 250, 150, 100, 100, 100, 70, 50, 20 ] };
     const backgroundColors = [ '#f3dfd9', '#aca5a5', '#232323', '#f8d0c3', '#b58577', '#8f8a8a', '#e0b9ae', '#6b6666' ];
     let currentChartType = 'doughnut'; let packageChart = null;
     function createPackageChartConfig(type) { const isDoughnut = type === 'doughnut'; return { type: type, data: { labels: packageData.labels, datasets: [{ data: packageData.values, backgroundColor: backgroundColors, borderColor: isDoughnut ? '#ffffff' : null, borderWidth: isDoughnut ? 3 : 0 }] }, options: { indexAxis: isDoughnut ? 'x' : 'y', responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: 'Valore Componenti Pacchetto (€840)', font: { size: 14 } }, legend: { display: isDoughnut, position: 'bottom', labels: { padding: 15, font: { size: 10 } } }, tooltip: { callbacks: { label: function(context) { let label = context.label || ''; if (label) { label = label.split('(')[0].trim() + ': '; } label += `€${context.parsed.y || context.parsed}`; return label; } } } }, scales: { x: { display: !isDoughnut, beginAtZero: true, grid: { display: false }, title: { display: true, text: 'Valore (€)', font: { size: 10 } } }, y: { display: !isDoughnut, grid: { display: false }, ticks: { font: { size: 10 } } } }, animation: { duration: 1200, easing: 'easeOutCubic' } } }; }
     packageChart = new Chart(ctx, createPackageChartConfig(currentChartType));
     document.getElementById('packageChart').chartInstance = packageChart;
     const toggleBtn = document.getElementById('toggleChartViewBtn');
     if (toggleBtn && !toggleBtn.dataset.listenerAttached) { toggleBtn.addEventListener('click', () => { if (!packageChart) return; currentChartType = packageChart.config.type === 'doughnut' ? 'bar' : 'doughnut'; packageChart.destroy(); packageChart = new Chart(ctx, createPackageChartConfig(currentChartType)); document.getElementById('packageChart').chartInstance = packageChart; }); toggleBtn.dataset.listenerAttached = 'true'; }
}
function initFinancialChart() { /* Non usato in questa versione */ }
function initFinancialChartPadova() {
    if (!isChartAvailable() || document.getElementById('financialChartPadova')?.chartInstance) return;
    const ctx = document.getElementById('financialChartPadova')?.getContext('2d');
    if (!ctx) { console.error("Canvas per Grafico Padova non trovato"); return; }
    console.log("Inizializzazione Grafico Padova...");

    const padovaData = {
        labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
        guadagni: [600, 700, 1000, 1500, 1800, 2200, 2300, 2500, 1700, 1200, 300, 500]
    };
    const financialChartPadova = new Chart(ctx, {
        type: 'line',
        data: {
            labels: padovaData.labels,
            datasets: [{
                label: 'Guadagni Possibili (€)',
                data: padovaData.guadagni,
                borderColor: 'var(--primary)',
                backgroundColor: 'rgba(243, 223, 217, 0.4)',
                borderWidth: 3, fill: true, tension: 0.4,
                pointBackgroundColor: 'var(--primary-dark)', pointBorderColor: 'var(--white)',
                pointHoverBackgroundColor: 'var(--white)', pointHoverBorderColor: 'var(--primary-dark)',
                pointRadius: 5, pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: false, title: { display: true, text: 'Guadagni Possibili (€)' }, grid: { color: 'rgba(0,0,0,0.08)'}, ticks: { stepSize: 500 } },
                x: { grid: { display: false } }
            },
            plugins: {
                legend: { display: false },
                tooltip: { mode: 'index', intersect: false, callbacks: { label: function(context) { return `Guadagno: €${context.parsed.y}`; } } }
            },
            interaction: { mode: 'nearest', axis: 'x', intersect: false },
            animation: { duration: 1500, easing: 'easeOutExpo' }
        }
    });
    document.getElementById('financialChartPadova').chartInstance = financialChartPadova;
}


// --- Inizializzazione Globale ---
document.addEventListener('DOMContentLoaded', () => {
    const mainNav = document.getElementById('main-nav');
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    const navHeight = mainNav ? mainNav.offsetHeight : 60;
    document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);
    let lastScrollTop = 0;

    // Scroll handler per nascondere/mostrare la navbar
    const handleScroll = () => {
        if (document.body.classList.contains('mobile-menu-open')) return;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > navHeight) {
            mainNav.classList.add('nav-hidden');
        } else {
            mainNav.classList.remove('nav-hidden');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        // Barra di progresso
        if (scrollProgressBar) { 
            const scrollPercent = (document.documentElement.scrollHeight - window.innerHeight) > 0 ? (scrollTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100 : 0; 
            scrollProgressBar.style.width = `${scrollPercent}%`; 
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });


    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observerInstance.unobserve(entry.target); } });
    }, observerOptions);
    animatedElements.forEach(el => observer.observe(el));

    const chartObserverOptions = { threshold: 0.4 };
    const chartObserver = new IntersectionObserver((entries, observerInstance) => {
         entries.forEach(entry => { if (entry.isIntersecting) { const canvas = entry.target; if (!canvas.chartInstance) { const canvasId = canvas.id; if (canvasId === 'servicesChart') initServicesChart(); else if (canvasId === 'packageChart') initPackageChart(); else if (canvasId === 'financialChartPadova') initFinancialChartPadova(); } observerInstance.unobserve(canvas); } });
    }, chartObserverOptions);
    document.querySelectorAll('canvas[id$="Chart"], canvas[id$="ChartPadova"]').forEach(canvas => chartObserver.observe(canvas));

    const navLinks = document.querySelectorAll('.desktop-nav a');
    const sections = document.querySelectorAll('section[id]');
    const updateActiveNavLink = debounce(() => {
         let currentSectionId = ''; const referencePoint = window.pageYOffset + navHeight + (window.innerHeight * 0.4);
         sections.forEach(section => { const sectionTop = section.offsetTop; if (referencePoint >= sectionTop) { currentSectionId = section.getAttribute('id'); } });
         if (window.pageYOffset < sections[0]?.offsetTop - navHeight * 2) { currentSectionId = 'hero'; }
         navLinks.forEach(link => { link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`); });
    }, 100);
    window.addEventListener('scroll', updateActiveNavLink, { passive: true }); updateActiveNavLink();

    // --- Logica Menu Mobile ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            document.body.classList.add('mobile-menu-open');
        });
    }

    if (closeMobileMenuButton && mobileMenu) {
        closeMobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.classList.remove('mobile-menu-open');
        });
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.classList.remove('mobile-menu-open');
        });
    });

    const serviceTabButtons = document.querySelectorAll('.service-tab-button');
    const serviceTabContents = document.querySelectorAll('.service-content');
    serviceTabButtons.forEach(button => {
          button.addEventListener('click', () => {
              const targetId = button.dataset.target;
              // Rimuove la classe 'active' da tutti i bottoni
              serviceTabButtons.forEach(btn => btn.classList.remove('active'));
              // Aggiunge la classe 'active' solo al bottone cliccato
              button.classList.add('active');
              
              serviceTabContents.forEach(content => {
                  content.classList.toggle('active', content.id === targetId);
              });
          });
     });

    // --- Logica Calcolatore di Rendimento ---
    const calculateBtn = document.getElementById('calculate-roi-btn');
    const roiLoader = document.getElementById('roi-loader');
    const roiResultDiv = document.getElementById('roi-result');
    const disclaimer = document.getElementById('disclaimer');

    // Modello dati più dettagliato e verosimile
    const marketData = {
        'Milano':    { basePrice: 150, occupancy: 0.78, typeMultiplier: { monolocale: 0.8, bilocale: 1, trilocale: 1.4, quadrilocale: 1.8, attico: 2.2, villa: 2.5 } },
        'Roma':      { basePrice: 130, occupancy: 0.82, typeMultiplier: { monolocale: 0.8, bilocale: 1, trilocale: 1.3, quadrilocale: 1.7, attico: 2.1, villa: 2.2 } },
        'Firenze':   { basePrice: 140, occupancy: 0.85, typeMultiplier: { monolocale: 0.7, bilocale: 1, trilocale: 1.5, quadrilocale: 1.9, attico: 2.4, villa: 2.8 } },
        'Napoli':    { basePrice: 90,  occupancy: 0.75, typeMultiplier: { monolocale: 0.9, bilocale: 1, trilocale: 1.2, quadrilocale: 1.5, attico: 1.8, villa: 2.0 } },
        'Venezia':   { basePrice: 180, occupancy: 0.88, typeMultiplier: { monolocale: 0.8, bilocale: 1, trilocale: 1.6, quadrilocale: 2.0, attico: 2.8, villa: 3.0 } },
        'Bologna':   { basePrice: 100, occupancy: 0.72, typeMultiplier: { monolocale: 0.85, bilocale: 1, trilocale: 1.3, quadrilocale: 1.6, attico: 2.0, villa: 2.3 } },
        'Torino':    { basePrice: 95,  occupancy: 0.68, typeMultiplier: { monolocale: 0.9, bilocale: 1, trilocale: 1.25, quadrilocale: 1.5, attico: 1.9, villa: 2.1 } },
        'Palermo':   { basePrice: 85,  occupancy: 0.70, typeMultiplier: { monolocale: 0.9, bilocale: 1, trilocale: 1.2, quadrilocale: 1.4, attico: 1.7, villa: 1.9 } },
        'Verona':    { basePrice: 115, occupancy: 0.76, typeMultiplier: { monolocale: 0.8, bilocale: 1, trilocale: 1.35, quadrilocale: 1.7, attico: 2.1, villa: 2.4 } },
        'Costiera Amalfitana': { basePrice: 250, occupancy: 0.80, typeMultiplier: { monolocale: 0.7, bilocale: 1, trilocale: 1.8, quadrilocale: 2.5, attico: 3.5, villa: 4.0 } },
        'Cinque Terre': { basePrice: 180, occupancy: 0.85, typeMultiplier: { monolocale: 0.75, bilocale: 1, trilocale: 1.6, quadrilocale: 2.2, attico: 2.9, villa: 3.2 } },
        'Lago di Como': { basePrice: 200, occupancy: 0.78, typeMultiplier: { monolocale: 0.7, bilocale: 1, trilocale: 1.7, quadrilocale: 2.4, attico: 3.0, villa: 3.5 } },
        'Siena':     { basePrice: 130, occupancy: 0.80, typeMultiplier: { monolocale: 0.75, bilocale: 1, trilocale: 1.4, quadrilocale: 1.8, attico: 2.2, villa: 2.5 } },
        'Pisa':      { basePrice: 100, occupancy: 0.75, typeMultiplier: { monolocale: 0.8, bilocale: 1, trilocale: 1.3, quadrilocale: 1.6, attico: 1.9, villa: 2.1 } },
        'Catania':   { basePrice: 80, occupancy: 0.68, typeMultiplier: { monolocale: 0.9, bilocale: 1, trilocale: 1.2, quadrilocale: 1.4, attico: 1.6, villa: 1.8 } },
        'Taormina':  { basePrice: 190, occupancy: 0.82, typeMultiplier: { monolocale: 0.7, bilocale: 1, trilocale: 1.7, quadrilocale: 2.3, attico: 3.0, villa: 3.4 } },
        'Lecce':     { basePrice: 95, occupancy: 0.72, typeMultiplier: { monolocale: 0.85, bilocale: 1, trilocale: 1.25, quadrilocale: 1.5, attico: 1.8, villa: 2.0 } },
        'Matera':    { basePrice: 120, occupancy: 0.80, typeMultiplier: { monolocale: 0.8, bilocale: 1, trilocale: 1.4, quadrilocale: 1.7, attico: 2.0, villa: 2.3 } },
        'Genova':    { basePrice: 105, occupancy: 0.70, typeMultiplier: { monolocale: 0.85, bilocale: 1, trilocale: 1.3, quadrilocale: 1.6, attico: 1.9, villa: 2.2 } },
        'Cagliari':  { basePrice: 90, occupancy: 0.70, typeMultiplier: { monolocale: 0.9, bilocale: 1, trilocale: 1.2, quadrilocale: 1.4, attico: 1.7, villa: 1.9 } },
        'Costa Smeralda': { basePrice: 300, occupancy: 0.75, typeMultiplier: { monolocale: 0.6, bilocale: 1, trilocale: 2.0, quadrilocale: 3.0, attico: 4.0, villa: 5.0 } },
        'Rimini':    { basePrice: 90, occupancy: 0.65, typeMultiplier: { monolocale: 0.9, bilocale: 1, trilocale: 1.1, quadrilocale: 1.3, attico: 1.5, villa: 1.8 } },
        'Padova':    { basePrice: 100, occupancy: 0.74, typeMultiplier: { monolocale: 0.8, bilocale: 1, trilocale: 1.3, quadrilocale: 1.6, attico: 1.9, villa: 2.2 } },
        'Treviso':   { basePrice: 95,  occupancy: 0.70, typeMultiplier: { monolocale: 0.85, bilocale: 1, trilocale: 1.25, quadrilocale: 1.5, attico: 1.8, villa: 2.0 } },
        'Vicenza':   { basePrice: 90,  occupancy: 0.65, typeMultiplier: { monolocale: 0.9, bilocale: 1, trilocale: 1.2, quadrilocale: 1.4, attico: 1.7, villa: 1.9 } },
        'Cortina d\'Ampezzo': { basePrice: 280, occupancy: 0.70, typeMultiplier: { monolocale: 0.7, bilocale: 1, trilocale: 1.9, quadrilocale: 2.8, attico: 3.8, villa: 4.5 } },
        'Lago di Garda': { basePrice: 160, occupancy: 0.78, typeMultiplier: { monolocale: 0.7, bilocale: 1, trilocale: 1.6, quadrilocale: 2.2, attico: 2.8, villa: 3.3 } },
        'Trento':    { basePrice: 90,  occupancy: 0.68, typeMultiplier: { monolocale: 0.85, bilocale: 1, trilocale: 1.2, quadrilocale: 1.4, attico: 1.7, villa: 1.9 } },
        'Bolzano':   { basePrice: 110, occupancy: 0.72, typeMultiplier: { monolocale: 0.8, bilocale: 1, trilocale: 1.3, quadrilocale: 1.6, attico: 1.9, villa: 2.2 } },
        'Trieste':   { basePrice: 95,  occupancy: 0.67, typeMultiplier: { monolocale: 0.85, bilocale: 1, trilocale: 1.2, quadrilocale: 1.5, attico: 1.8, villa: 2.0 } },
        'Udine':     { basePrice: 85,  occupancy: 0.60, typeMultiplier: { monolocale: 0.9, bilocale: 1, trilocale: 1.15, quadrilocale: 1.3, attico: 1.6, villa: 1.8 } }
    };

    calculateBtn.addEventListener('click', () => {
        // Mostra il loader e nasconde i risultati precedenti
        roiLoader.classList.remove('hidden');
        roiResultDiv.classList.add('hidden');
        disclaimer.classList.add('hidden');
        calculateBtn.disabled = true;

        // Simula un piccolo ritardo per dare l'idea di un calcolo complesso
        setTimeout(() => {
            const city = document.getElementById('city-select').value;
            const propertyType = document.getElementById('property-type-select').value;
            const guestCount = parseInt(document.getElementById('guest-count-input').value, 10);

            const data = marketData[city];
            const typeMultiplier = data.typeMultiplier[propertyType] || 1;
            const guestMultiplier = 1 + ((guestCount - 2) * 0.1); // +10% per ogni ospite oltre i 2

            const avgNightlyRate = data.basePrice * typeMultiplier * guestMultiplier;
            const monthlyGrossRevenue = avgNightlyRate * data.occupancy * 30;
            
            const moorentPmCommission = monthlyGrossRevenue * 0.275;
            const monthlyNetRevenue = monthlyGrossRevenue - moorentPmCommission;

            // Formattazione in valuta
            const formatCurrency = (value) => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(value);

            // Mostra i risultati
            roiResultDiv.innerHTML = `
                <h3 class="text-xl font-bold text-center text-accent mb-4">Stima del Rendimento</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                    <div>
                        <p class="text-sm text-gray-500">Prezzo Medio a Notte</p>
                        <p class="text-2xl font-bold text-primary">${formatCurrency(avgNightlyRate)}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Tasso di Occupazione Stimato</p>
                        <p class="text-2xl font-bold text-primary">${(data.occupancy * 100).toFixed(0)}%</p>
                    </div>
                </div>
                <div class="mt-6 text-center">
                    <p class="text-md text-gray-600">Guadagno Lordo Mensile Stimato:</p>
                    <p class="text-4xl font-extrabold text-accent my-2">${formatCurrency(monthlyGrossRevenue)}</p>
                    <p class="text-sm text-gray-500">Al lordo della nostra commissione e della cedolare secca.</p>
                </div>
                <div class="mt-6 text-center bg-white p-4 rounded-lg">
                     <p class="text-md font-semibold text-success">Guadagno Netto Stimato con MoorentPm:</p>
                    <p class="text-3xl font-bold text-success my-2">${formatCurrency(monthlyNetRevenue)}</p>
                     <p class="text-xs text-gray-500">(Dopo la nostra commissione, al lordo della cedolare secca)</p>
                </div>
            `;
            
            roiLoader.classList.add('hidden');
            roiResultDiv.classList.remove('hidden');
            disclaimer.classList.remove('hidden');
            calculateBtn.disabled = false;

        }, 1000); // Ritardo di 1 secondo
    });

    // --- Logica Toggle Pacchetto Attivazione ---
    const packageToggleBtn = document.getElementById('packageToggleBtn');
    const packageContent = document.getElementById('packageContent');
    if (packageToggleBtn && packageContent) {
        packageToggleBtn.addEventListener('click', () => {
            packageToggleBtn.classList.toggle('active');
            packageContent.classList.toggle('active');
        });
    }

        // --- Autoplay video on scroll ---
        const videos = document.querySelectorAll('.autoplay-video');
        if (videos.length > 0) {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const video = entry.target;
                    if (entry.isIntersecting) {
                        video.play().catch(() => {});
                    } else {
                        video.pause();
                    }
                });
            }, { threshold: 0.5 });

            videos.forEach(video => videoObserver.observe(video));
        }

        // --- Toggle mute/unmute sincronizzato su tutti i video ---
        const allMuteBtns = document.querySelectorAll('.video-mute-btn');

        function setAllVideosMuted(muted) {
            document.querySelectorAll('.autoplay-video').forEach(v => { v.muted = muted; });
            allMuteBtns.forEach(b => {
                const icon = b.querySelector('i');
                if (muted) {
                    icon.className = 'fas fa-volume-mute';
                    b.classList.remove('is-unmuted');
                } else {
                    icon.className = 'fas fa-volume-up';
                    b.classList.add('is-unmuted');
                }
            });
        }

        allMuteBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const currentlyMuted = btn.closest('.video-portrait-wrapper').querySelector('video').muted;
                setAllVideosMuted(!currentlyMuted);
            });
        });
    });
