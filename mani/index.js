// State Data
const bikeData = {
    'rs457': {
        name: 'Aprilia RS 457',
        slogan: 'The new generation of riders',
        basePrice: 6799,
        image: 'assets/rs_457.png',
        specs: {
            engine: '457 cc',
            hp: '47.6 HP',
            weight: '175 kg',
            electronics: 'Ride by Wire'
        },
        versions: {
            base: {
                name: 'Standard',
                multiplier: 1,
                colorOptions: ['#E22B29', '#1A1A1A', '#F8F9FA']
            },
            replica: {
                name: 'Racing Replica',
                multiplier: 1.15,
                colorOptions: ['#E22B29', '#0d0d0d']
            }
        },
        glowColor: 'rgba(226,43,41,0.2)'
    },
    'rs660': {
        name: 'Aprilia RS 660',
        slogan: 'A new era begins',
        basePrice: 11499,
        image: 'assets/rs_660.png',
        specs: {
            engine: '659 cc',
            hp: '100 HP',
            weight: '183 kg',
            electronics: 'APRC System'
        },
        versions: {
            base: {
                name: 'Standard',
                multiplier: 1,
                colorOptions: ['#FFD700', '#E22B29', '#1A1A1A']
            },
            extrema: {
                name: 'Extrema',
                multiplier: 1.2,
                colorOptions: ['#ffffff', '#E22B29']
            }
        },
        glowColor: 'rgba(255,215,0,0.2)'
    },
    'tuono660': {
        name: 'Aprilia Tuono 660',
        slogan: 'Master of all roads',
        basePrice: 10499,
        image: 'assets/tuono_660.png',
        specs: {
            engine: '659 cc',
            hp: '95 HP',
            weight: '183 kg',
            electronics: 'APRC System'
        },
        versions: {
            base: {
                name: 'Standard',
                multiplier: 1,
                colorOptions: ['#111111', '#E22B29', '#FFD700']
            },
            factory: {
                name: 'Factory',
                multiplier: 1.1,
                colorOptions: ['#E22B29', '#111111']
            }
        },
        glowColor: 'rgba(17,17,17,0.2)'
    },
    'tuareg660': {
        name: 'Aprilia Tuareg 660',
        slogan: 'Designed to explore',
        basePrice: 12299,
        image: 'assets/tuareg_660.png',
        specs: {
            engine: '659 cc',
            hp: '80 HP',
            weight: '204 kg',
            electronics: 'APRC System + Offroad'
        },
        versions: {
            base: {
                name: 'Standard',
                multiplier: 1,
                colorOptions: ['#1F3A93', '#1A1A1A', '#E22B29']
            },
            rally: {
                name: 'Dakar Replica',
                multiplier: 1.15,
                colorOptions: ['#1F3A93', '#F8F9FA']
            }
        },
        glowColor: 'rgba(31,58,147,0.2)'
    },
    'rsv4': {
        name: 'Aprilia RSV4 Factory',
        slogan: 'The ultimate superbike',
        basePrice: 25999,
        image: 'assets/rsv4_factory.png',
        specs: {
            engine: '1099 cc',
            hp: '217 HP',
            weight: '202 kg',
            electronics: 'APRC System + Öhlins'
        },
        versions: {
            factory: {
                name: 'Factory',
                multiplier: 1,
                colorOptions: ['#111111', '#E22B29', '#800080']
            },
            xtrenta: {
                name: 'XTrenta',
                multiplier: 1.5,
                colorOptions: ['#ffffff', '#E22B29']
            }
        },
        glowColor: 'rgba(128,0,128,0.2)'
    },
    'tuonov4': {
        name: 'Aprilia Tuono V4',
        slogan: 'As fast as lightning',
        basePrice: 16199,
        image: 'assets/tuono_v4.png',
        specs: {
            engine: '1077 cc',
            hp: '175 HP',
            weight: '209 kg',
            electronics: 'APRC System'
        },
        versions: {
            base: {
                name: 'Standard',
                multiplier: 1,
                colorOptions: ['#1A1A1A', '#7A7A7A']
            },
            factory: {
                name: 'Factory',
                multiplier: 1.25,
                colorOptions: ['#E22B29', '#111111']
            }
        },
        glowColor: 'rgba(122,122,122,0.2)'
    }
};

let currentModel = 'rs457';
let currentVersion = 'base';
let currentColor = '#E22B29';

// DOM Elements
const elements = {
    modelBtns: document.querySelectorAll('.model-btn'),
    bikeName: document.getElementById('bike-name'),
    bikeSlogan: document.getElementById('bike-slogan'),
    bikePrice: document.getElementById('bike-price'),
    mainImg: document.getElementById('main-bike-img'),
    bikeGlow: document.getElementById('bike-glow'),
    versionContainer: document.getElementById('version-container'),
    colorContainer: document.getElementById('color-container'),
    specEngine: document.getElementById('spec-engine'),
    specHp: document.getElementById('spec-hp'),
    specWeight: document.getElementById('spec-weight'),
    specElectronics: document.getElementById('spec-electronics')
};

// Initialization
function init() {
    setupEventListeners();
    updateUI();
}

// Event Listeners
function setupEventListeners() {
    elements.modelBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            elements.modelBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            currentModel = e.target.dataset.model;
            // Reset version to first available when switching models
            const firstVersion = Object.keys(bikeData[currentModel].versions)[0];
            currentVersion = firstVersion;

            triggerModelChangeAnimation();
            setTimeout(() => {
                updateUI();
                renderVersions();
                renderColors();
            }, 300); // Wait for fade out
        });
    });
}

function renderVersions() {
    elements.versionContainer.innerHTML = '';
    const versions = bikeData[currentModel].versions;

    for (const [key, value] of Object.entries(versions)) {
        const btn = document.createElement('button');
        btn.className = `version-btn ${key === currentVersion ? 'active' : ''}`;
        btn.dataset.version = key;
        btn.textContent = value.name;

        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.version-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentVersion = e.target.dataset.version;
            updatePrice();
            renderColors(); // colors might change based on version
        });

        elements.versionContainer.appendChild(btn);
    }
}

function renderColors() {
    elements.colorContainer.innerHTML = '';
    const colors = bikeData[currentModel].versions[currentVersion].colorOptions;

    // Auto select first color if current is not in array
    if (!colors.includes(currentColor)) {
        currentColor = colors[0];
    }

    colors.forEach(color => {
        const btn = document.createElement('button');
        btn.className = `color-btn ${color === currentColor ? 'active' : ''}`;
        btn.dataset.color = color;
        btn.style.backgroundColor = color;

        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentColor = color;

            // Re-trigger glow animation & change color
            elements.bikeGlow.style.background = `radial-gradient(circle, ${hexToRgbA(color, 0.2)} 0%, rgba(7,7,7,0) 70%)`;
            elements.mainImg.style.transform = 'scale(1.02)';
            setTimeout(() => {
                elements.mainImg.style.transform = 'scale(1)';
            }, 200);
        });

        elements.colorContainer.appendChild(btn);
    });
}

function updateUI() {
    const data = bikeData[currentModel];

    elements.bikeName.textContent = data.name;
    elements.bikeSlogan.textContent = data.slogan;
    elements.mainImg.src = data.image;
    elements.bikeGlow.style.background = `radial-gradient(circle, ${data.glowColor} 0%, rgba(7,7,7,0) 70%)`;

    // Update Specs
    elements.specEngine.textContent = data.specs.engine;
    elements.specHp.textContent = data.specs.hp;
    elements.specWeight.textContent = data.specs.weight;
    elements.specElectronics.textContent = data.specs.electronics;

    updatePrice();
}

function updatePrice() {
    const data = bikeData[currentModel];
    const versionData = data.versions[currentVersion];

    const finalPrice = Math.round(data.basePrice * versionData.multiplier);

    // Animate Number logic
    animateValue(elements.bikePrice, parseInt(elements.bikePrice.textContent.replace(/,/g, '')) || 0, finalPrice, 500);
}

// Animations
function triggerModelChangeAnimation() {
    elements.mainImg.style.opacity = '0';
    elements.mainImg.style.transform = 'translateX(50px)';

    setTimeout(() => {
        elements.mainImg.style.opacity = '1';
        elements.mainImg.style.transform = 'translateX(0)';
    }, 350);
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Helper
function hexToRgbA(hex, alpha) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
    }
    return `rgba(226,43,41,${alpha})`; // fallback red
}

// Run
document.addEventListener('DOMContentLoaded', init);