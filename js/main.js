/**
 * AI Strategic Planning - Presentation Controller
 */

// ================================================
// Presentation State
// ================================================
const presentation = {
    currentSlide: 1,
    totalSlides: 8,
    isAnimating: false,
    overviewActive: false
};

// ================================================
// DOM Elements
// ================================================
const slidesContainer = document.getElementById('slidesContainer');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSlideEl = document.getElementById('currentSlide');
const totalSlidesEl = document.getElementById('totalSlides');
const progressFill = document.getElementById('progressFill');
const overviewModal = document.getElementById('overviewModal');
const overviewGrid = document.getElementById('overviewGrid');

// ================================================
// Slide Titles for Overview
// ================================================
const slideTitles = {
    1: '封面',
    2: '为什么（政策）',
    3: '成熟度模型',
    4: '竞争对手对比',
    5: '我们去哪',
    6: '怎么做',
    7: '投入产出',
    8: '总结'
};

// ================================================
// Initialize
// ================================================
function init() {
    totalSlidesEl.textContent = presentation.totalSlides;
    updateProgress();
    updateNavButtons();
    createOverviewGrid();
    initParticles();
    initCharts();
    bindEvents();
    handleHash();
}

// ================================================
// Navigation
// ================================================
function goToSlide(slideNum, direction = 'next') {
    if (presentation.isAnimating || slideNum < 1 || slideNum > presentation.totalSlides) {
        return;
    }

    presentation.isAnimating = true;

    // Update slides
    slides.forEach((slide, index) => {
        const slideNumeral = index + 1;
        slide.classList.remove('active', 'prev');

        if (slideNumeral === slideNum) {
            slide.classList.add('active');
        } else if (slideNumeral < slideNum) {
            slide.classList.add('prev');
        }
    });

    presentation.currentSlide = slideNum;
    currentSlideEl.textContent = slideNum;
    updateProgress();
    updateNavButtons();
    updateOverview();

    // Trigger chart animations for specific slides
    setTimeout(() => {
        if (slideNum === 2) {
            animatePolicyTimelineChart();
            animateSubsidyROIChart();
        }
        if (slideNum === 3) {
            animateRadarChart();
        }
        if (slideNum === 4) animateCompetitorChart();
        if (slideNum === 5) animateTimelineChart();
        if (slideNum === 6) animateFactorsChart();
        if (slideNum === 7) animatePieChart();
        if (slideNum === 8) animateROIChart();
    }, 300);

    setTimeout(() => {
        presentation.isAnimating = false;
    }, 600);
}

function nextSlide() {
    if (presentation.currentSlide < presentation.totalSlides) {
        goToSlide(presentation.currentSlide + 1);
    }
}

function prevSlide() {
    if (presentation.currentSlide > 1) {
        goToSlide(presentation.currentSlide - 1, 'prev');
    }
}

function toggleOverview() {
    presentation.overviewActive = !presentation.overviewActive;

    if (presentation.overviewActive) {
        overviewModal.classList.add('active');
    } else {
        overviewModal.classList.remove('active');
    }
}

function goToSlideFromOverview(num) {
    toggleOverview();
    goToSlide(num);
}

// ================================================
// UI Updates
// ================================================
function updateProgress() {
    const progress = (presentation.currentSlide / presentation.totalSlides) * 100;
    progressFill.style.width = `${progress}%`;
}

function updateNavButtons() {
    prevBtn.disabled = presentation.currentSlide === 1;
    nextBtn.disabled = presentation.currentSlide === presentation.totalSlides;
}

function updateOverview() {
    document.querySelectorAll('.overview-item').forEach((item, index) => {
        item.classList.toggle('active', index + 1 === presentation.currentSlide);
    });
}

// ================================================
// Overview Grid
// ================================================
function createOverviewGrid() {
    overviewGrid.innerHTML = '';

    for (let i = 1; i <= presentation.totalSlides; i++) {
        const item = document.createElement('div');
        item.className = 'overview-item' + (i === 1 ? ' active' : '');
        item.innerHTML = `
            <div class="overview-num">${i}</div>
            <div class="overview-title">${slideTitles[i]}</div>
        `;
        item.addEventListener('click', () => goToSlideFromOverview(i));
        overviewGrid.appendChild(item);
    }
}

// ================================================
// Particles
// ================================================
function initParticles() {
    // Hero slide particles
    const heroSlide = document.querySelector('.hero-slide');
    if (heroSlide) {
        const bg = heroSlide.querySelector('.slide-bg-particles');
        if (bg) {
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: ${4 + Math.random() * 6}px;
                    height: ${4 + Math.random() * 6}px;
                    background: var(--accent);
                    border-radius: 50%;
                    opacity: ${0.1 + Math.random() * 0.2};
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: float ${15 + Math.random() * 10}s infinite linear;
                    animation-delay: ${Math.random() * 10}s;
                `;
                bg.appendChild(particle);
            }
        }
    }
}

// ================================================
// Charts
// ================================================
let radarChart, timelineChart, factorsChart, pieChart, roiChart, competitorChart;

function initCharts() {
    // Charts are initialized when their slides are shown
    // This prevents animation issues on load
}

// Competitor Chart (Slide 3)
function animateCompetitorChart() {
    const ctx = document.getElementById('competitorChart');
    if (!ctx) return;

    if (competitorChart) competitorChart.destroy();

    competitorChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['我们', '行业平均', '恒瑞医药', '复星医药', '阿斯利康', '罗氏'],
            datasets: [{
                label: 'AI成熟度等级',
                data: [1, 2.2, 2.5, 3.2, 4, 4.2],
                backgroundColor: [
                    '#e74c3c',
                    '#f39c12',
                    '#9b59b6',
                    '#3498db',
                    '#27ae60',
                    '#1a1a2e'
                ],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            },
            indexAxis: 'y',
            scales: {
                x: {
                    min: 0,
                    max: 5,
                    ticks: {
                        callback: value => 'L' + value,
                        font: { size: 11 }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                },
                y: {
                    grid: { display: false },
                    ticks: { font: { size: 11 } }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Policy Timeline Chart (Slide 2)
function animatePolicyTimelineChart() {
    const ctx = document.getElementById('policyTimelineChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'AI相关政策数量',
                data: [45, 78, 125, 180],
                backgroundColor: [
                    'rgba(201, 162, 39, 0.6)',
                    'rgba(201, 162, 39, 0.7)',
                    'rgba(201, 162, 39, 0.8)',
                    'rgba(201, 162, 39, 0.9)'
                ],
                borderColor: '#c9a227',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: { font: { size: 10 } }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 10 } }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Subsidy ROI Chart (Slide 2)
function animateSubsidyROIChart() {
    const ctx = document.getElementById('subsidyROIChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['设备补贴', '研发补助', '算力补贴', '人才奖励'],
            datasets: [{
                data: [25, 20, 10, 5],
                backgroundColor: [
                    '#3498db',
                    '#27ae60',
                    '#9b59b6',
                    '#f39c12'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            },
            cutout: '60%',
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        padding: 10,
                        font: { size: 10 },
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

// Radar Chart (Slide 4)
function animateRadarChart() {
    const ctx = document.getElementById('radarChart');
    if (!ctx) return;

    if (radarChart) radarChart.destroy();

    radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['战略规划', '组织能力', '数据基础', '技术应用', '流程融合', '治理体系'],
            datasets: [{
                label: '当前状态（L1 探索试验级）',
                data: [20, 25, 20, 30, 15, 15],
                backgroundColor: 'rgba(231, 76, 60, 0.2)',
                borderColor: '#e74c3c',
                pointBackgroundColor: '#e74c3c',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#e74c3c'
            }, {
                label: '目标状态（L3 体系优化级）',
                data: [70, 75, 70, 80, 65, 75],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: '#3498db',
                pointBackgroundColor: '#3498db',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#3498db'
            }, {
                label: 'L5 认知引领级',
                data: [95, 95, 90, 95, 90, 95],
                backgroundColor: 'rgba(201, 162, 39, 0.05)',
                borderColor: 'rgba(201, 162, 39, 0.3)',
                borderDash: [5, 5],
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        font: { size: 10 }
                    },
                    pointLabels: {
                        font: { size: 11 }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.08)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: { size: 11 }
                    }
                }
            }
        }
    });
}

// Timeline Chart (Slide 5)
function animateTimelineChart() {
    const ctx = document.getElementById('timelineChart');
    if (!ctx) return;

    if (timelineChart) timelineChart.destroy();

    timelineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['现在', '6个月', '12个月', '18个月', '2年', '3年', '5年'],
            datasets: [{
                label: '成熟度等级',
                data: [1, 1.3, 1.8, 2.3, 2.8, 3.3, 4.2],
                borderColor: '#c9a227',
                backgroundColor: 'rgba(201, 162, 39, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointBackgroundColor: '#0f2744',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            },
            scales: {
                y: {
                    min: 0,
                    max: 5.5,
                    ticks: {
                        callback: value => 'L' + value,
                        font: { size: 11 }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 11 } }
                }
            },
            plugins: {
                legend: { display: false },
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            xMin: 2,
                            xMax: 2,
                            borderColor: 'rgba(39, 174, 96, 0.5)',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            label: {
                                display: true,
                                content: '+AI边界',
                                position: 'start'
                            }
                        }
                    }
                }
            }
        }
    });
}

// Factors Chart (Slide 6)
function animateFactorsChart() {
    const ctx = document.getElementById('factorsChart');
    if (!ctx) return;

    if (factorsChart) factorsChart.destroy();

    factorsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['高层支持', '业务场景', '数据质量', '技术平台', '组织变革', '持续运营'],
            datasets: [{
                data: [25, 20, 15, 15, 15, 10],
                backgroundColor: [
                    '#0f2744',
                    '#c9a227',
                    '#27ae60',
                    '#3498db',
                    '#9b59b6',
                    '#e67e22'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            },
            cutout: '60%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 12,
                        font: { size: 11 },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                }
            }
        }
    });
}

// Pie Chart (Slide 7)
function animatePieChart() {
    const ctx = document.getElementById('pieChart');
    if (!ctx) return;

    if (pieChart) pieChart.destroy();

    pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['数据治理', 'AIDD研发', 'AI平台', '大模型算力', '办公入口+API'],
            datasets: [{
                data: [80, 80, 60, 50, 28],
                backgroundColor: [
                    '#3498db',
                    '#e74c3c',
                    '#f39c12',
                    '#27ae60',
                    '#9b59b6'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            },
            cutout: '55%',
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// ROI Chart (Slide 8)
function animateROIChart() {
    const ctx = document.getElementById('roiChart');
    if (!ctx) return;

    if (roiChart) roiChart.destroy();

    roiChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['第1年', '第2年', '第3年', '第4年', '第5年'],
            datasets: [{
                label: '累计投入',
                data: [350, 600, 850, 1100, 1350],
                backgroundColor: '#e74c3c',
                borderRadius: 6
            }, {
                label: '累计收益',
                data: [420, 920, 1550, 2350, 3300],
                backgroundColor: '#27ae60',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => value + '万',
                        font: { size: 11 }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 11 } }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: { size: 11 }
                    }
                }
            }
        }
    });
}

// ================================================
// Event Bindings
// ================================================
function bindEvents() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (presentation.overviewActive) {
            if (e.key === 'Escape') {
                toggleOverview();
            }
            return;
        }

        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
            case 'PageDown':
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                prevSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(1);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(presentation.totalSlides);
                break;
            case 'Escape':
                e.preventDefault();
                toggleOverview();
                break;
        }
    });

    // Button navigation
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Overview modal
    overviewModal.addEventListener('click', (e) => {
        if (e.target === overviewModal) {
            toggleOverview();
        }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // URL hash handling
    window.addEventListener('hashchange', handleHash);
}

function handleHash() {
    const hash = window.location.hash;
    if (hash) {
        const slideNum = parseInt(hash.replace('#slide-', ''));
        if (slideNum >= 1 && slideNum <= presentation.totalSlides) {
            goToSlide(slideNum);
        }
    }
}

// ================================================
// Counter Animation
// ================================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const update = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    };

    update();
}

// ================================================
// Initialize on DOM Ready
// ================================================
document.addEventListener('DOMContentLoaded', init);

// Also initialize immediately if DOM is already ready
if (document.readyState !== 'loading') {
    init();
}
