// ================================================
// ORI - Interactive JavaScript for ARG Website
// Windows 2000s era functionality with ARG elements
// ================================================

// === AUDIO SETUP ===
const introSound = new Audio('data/intro.mp3');
const glitchSound = new Audio('data/Glitch.mp3');

introSound.preload = 'auto';
glitchSound.preload = 'auto';

introSound.load();
glitchSound.load();

function playGlitchSound() {
    try {
        const sound = glitchSound.cloneNode();
        sound.volume = glitchSound.volume;
        sound.currentTime = 0;
        sound.play().catch(err => console.log('Glitch sound error:', err));
    } catch (err) {
        glitchSound.currentTime = 0;
        glitchSound.play().catch(error => console.log('Fallback glitch sound error:', error));
    }
}

// === ACCESS DENIED POP-UP ===
function showAccessDenied(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const messages = [
        '🚫 KEIN ZUTRITT!\n\nBitte melden Sie sich an, um auf diesen Bereich zuzugreifen.',
        '⚠ ZUGRIFF VERWEIGERT!\n\nNur autorisierte Mitglieder haben Zugang.\nBitte melden Sie sich an.',
        '🔒 GESPERRT!\n\nDieser Bereich ist geschützt.\nBitte melden Sie sich zuerst an.',
        '❌ AUTHENTIFIZIERUNG ERFORDERLICH!\n\nSie müssen sich anmelden, um fortzufahren.',
        '🛡️ SICHERHEITSWARNUNG!\n\nUnbefugter Zugriff nicht gestattet.\nBitte melden Sie sich an.'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    alert(randomMessage);
    
    return false;
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    initDateTime();
    initTitleBarButtons();
    initLoginForm();
    initEasterEggs();
    initVisitorCounter();
    initMysteryBox();
    initGlitchEffects();
    initNavigation();
    initRandomGlitches();
    initLoginBlockGlitch();
    
    // Play intro sound on first visit
    let hasPlayedIntro = sessionStorage.getItem('oriIntroPlayed');
    if (!hasPlayedIntro) {
        // Small delay to ensure page is ready
        setTimeout(() => {
            introSound.play().then(() => {
                console.log('Intro sound playing');
                sessionStorage.setItem('oriIntroPlayed', 'true');
            }).catch(e => {
                console.log('Audio autoplay prevented - click anywhere to enable sound');
                // Try to play on first user interaction
                document.addEventListener('click', function playOnClick() {
                    introSound.play().catch(e => console.log('Audio error:', e));
                    sessionStorage.setItem('oriIntroPlayed', 'true');
                    document.removeEventListener('click', playOnClick);
                }, { once: true });
            });
        }, 500);
    }
});

// === CREDENTIAL OBFUSCATION ===
const encodedUsername = [119, 116, 102, 97, 124, 114, 125, 114];
const encodedPassword = [123, 126, 113, 126];
const USER_KEY = 21;
const PASS_KEY = 73;

function decodeCredential(encoded, key) {
    return encoded.map(code => String.fromCharCode(code ^ key)).join('');
}

// === DATE & TIME ===
function initDateTime() {
    const datetimeElement = document.getElementById('datetime');
    
    function updateDateTime() {
        const now = new Date();
        const dateStr = now.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        const timeStr = now.toLocaleTimeString('de-DE', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        if (datetimeElement) {
            datetimeElement.textContent = `${dateStr} - ${timeStr}`;
        }
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

// === TITLE BAR BUTTONS ===
function initTitleBarButtons() {
    const minimizeBtn = document.getElementById('minimize');
    const maximizeBtn = document.getElementById('maximize');
    const closeBtn = document.getElementById('close');
    const container = document.querySelector('.container');
    
    let isMinimized = false;
    let isMaximized = false;
    let originalStyle = {};
    
    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', function() {
            if (!isMinimized) {
                container.style.transform = 'scale(0.95)';
                container.style.opacity = '0.5';
                isMinimized = true;
                
                setTimeout(() => {
                    container.style.transform = 'scale(1)';
                    container.style.opacity = '1';
                    isMinimized = false;
                }, 500);
            }
        });
    }
    
    if (maximizeBtn) {
        maximizeBtn.addEventListener('click', function() {
            if (!isMaximized) {
                originalStyle = {
                    maxWidth: container.style.maxWidth,
                    margin: container.style.margin
                };
                container.style.maxWidth = '100%';
                container.style.margin = '0';
                isMaximized = true;
            } else {
                container.style.maxWidth = originalStyle.maxWidth || '';
                container.style.margin = originalStyle.margin || '';
                isMaximized = false;
            }
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (confirm('Möchten Sie die Ori-Datenbank wirklich verlassen?\n\nAlle ungespeicherten Daten gehen verloren.')) {
                // Create a fake "shutdown" effect
                document.body.style.transition = 'all 0.5s';
                document.body.style.opacity = '0';
                
                setTimeout(() => {
                    showBlueScreen();
                }, 500);
            }
        });
    }
}

// === BLUE SCREEN EASTER EGG ===
function showBlueScreen() {
    const blueScreen = document.createElement('div');
    blueScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0000AA;
        color: #FFFFFF;
        font-family: 'Courier New', monospace;
        padding: 50px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        justify-content: center;
    `;
    
    blueScreen.innerHTML = `
        <div style="max-width: 800px;">
            <h1 style="font-size: 24px; margin-bottom: 20px;">Windows</h1>
            <p style="line-height: 1.8; font-size: 14px;">
                Ein kritischer Fehler ist aufgetreten und Ori wurde beendet, um eine<br>
                Beschädigung des Systems zu verhindern.<br><br>
                
                ORI_KOFFER_BREACH_DETECTED<br><br>
                
                Fehlercode: 0x<span class="redacted">██</span>13_ORI<br>
                Server: CLASSIFIED<br>
                Status: KOFFER_VERSIEGELT<br>
                Wächter: 5/5 AKTIV<br><br>
                
                *** STOPP: 0x0000BASTI (0xF78D2524, 0xC0FFEE13, 0x00000000, 0x00000000)<br><br>
                
                Das größte Geheimnis bleibt bewacht...<br>
                Team Omega Zugriff: VERWEIGERT<br><br>
                
                <span style="color: #FFD700;">Hinweis: "Drei Fragezeichen. Ein Koffergeheim."</span>
            </p>
            <p style="margin-top: 30px; font-size: 12px; opacity: 0.7;">
                Drücken Sie eine beliebige Taste, um fortzufahren...<br>
                Oder warten Sie 10 Sekunden für automatischen Neustart...
            </p>
        </div>
    `;
    
    document.body.appendChild(blueScreen);
    
    const restart = () => {
        blueScreen.style.transition = 'opacity 0.5s';
        blueScreen.style.opacity = '0';
        setTimeout(() => {
            location.reload();
        }, 500);
    };
    
    document.addEventListener('keydown', restart, { once: true });
    setTimeout(restart, 10000);
}

// === LOGIN FORM ===
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = loginForm.querySelector('input[type="text"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;
            const normalizedUsername = (username || '').trim().toLowerCase();
            const normalizedPassword = (password || '').trim();

            const validUsername = decodeCredential(encodedUsername, USER_KEY);
            const validPassword = decodeCredential(encodedPassword, PASS_KEY);

            if (normalizedUsername === validUsername && normalizedPassword === validPassword) {
                showSecretMessage('✔ Administrator-Zugang bestätigt.<br><br>Willkommen zurück, Basti.<br>Der Koffer bleibt versiegelt.');
                setTimeout(() => {
                    window.location.href = 'log.html';
                }, 1500);
                return;
            }
            
            // Easter egg passwords - Ori Lore
            const secretCodes = {
                'bastigbg': '✓ Zugriff gewährt. Willkommen, BastiGHG.',
                'koffer': 'Drei Fragezeichen. Ein Koffergeheim ist das größte Geheimnis. Niemand schaut in ihn rein.',
                'omega': '⚠ TEAM OMEGA ERKANNT! Eindringversuch protokolliert. Sicherheitsstufe erhöht.',
                'totemofdying': 'Das verzauberte Totem aus Holz - Symbol von Ori. Eine Macht unbegreiflich.',
                'fünfhüter': 'nooreax • Faister • NQRMAN • byStegi • CastCrafter - Sie beschützen ihn mit ihrem Leben.',
                'server': 'Der Server der Geheimnisse. Oktober 20██.',
                'macht': 'Die primäre Emotion von Ori ist MACHT. Macht durch Geheimnis.',
                '5hüter': 'Die fünf Hüter wurden heimlich auserwählt, den Koffer zu bewachen.',
                'candy': '🎵 Der Ori-Song von Candy enthüllt die mystische Geschichte...',
                'basis': 'Alles Hightech vernetzt. Redstone Kamerasystem. Die Ori Basis ist geheim.'
            };
            
            const secretKey = normalizedPassword.toLowerCase();

            if (secretCodes[secretKey]) {
                showSecretMessage(secretCodes[secretKey]);
            } else if (normalizedUsername && normalizedPassword) {
                showAccessDenied();
            } else {
                alert('Bitte geben Sie Ihre Zugangsdaten ein.');
            }
        });
    }
}

function showSecretMessage(message) {
    const overlay = createOverlay();
    const box = document.createElement('div');
    box.style.cssText = `
        background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);
        border: 3px solid #FFD700;
        padding: 30px;
        border-radius: 8px;
        max-width: 400px;
        text-align: center;
        box-shadow: 0 0 50px rgba(255, 215, 0, 0.5);
        animation: fadeIn 0.5s;
    `;
    
    box.innerHTML = `
        <div style="color: #FFD700; font-size: 48px; margin-bottom: 20px;">◈</div>
        <h2 style="color: #FFFFFF; font-family: Georgia, serif; margin-bottom: 15px;">Zugriff gewährt</h2>
        <p style="color: #E0E0E0; font-size: 14px; line-height: 1.6;">${message}</p>
        <button onclick="this.parentElement.parentElement.remove()" style="
            margin-top: 20px;
            padding: 10px 20px;
            background: linear-gradient(180deg, #F0F0F0 0%, #C0C0C0 100%);
            border: 1px solid #808080;
            border-radius: 3px;
            cursor: pointer;
            font-weight: bold;
        ">Schließen</button>
    `;
    
    overlay.appendChild(box);
    document.body.appendChild(overlay);
}

function showAccessDenied() {
    const overlay = createOverlay();
    const box = document.createElement('div');
    box.style.cssText = `
        background: #C0C0C0;
        border: 2px solid #000;
        padding: 20px;
        max-width: 400px;
        font-family: Arial, sans-serif;
        box-shadow: 4px 4px 0 rgba(0,0,0,0.5);
    `;
    
    box.innerHTML = `
        <div style="background: linear-gradient(90deg, #000080 0%, #1084d0 100%); color: white; padding: 5px 10px; margin: -20px -20px 15px -20px; font-weight: bold;">
            ⚠ Sicherheitswarnung
        </div>
        <p style="margin-bottom: 15px;">Zugriff verweigert.</p>
        <p style="margin-bottom: 20px; font-size: 11px; color: #666;">
            Die eingegebenen Anmeldedaten konnten nicht verifiziert werden.<br>
            Dieser Vorgang wurde protokolliert.
        </p>
        <button onclick="this.parentElement.parentElement.remove()" style="
            padding: 5px 20px;
            background: #C0C0C0;
            border: 2px outset #DFDFDF;
            cursor: pointer;
            font-weight: bold;
        ">OK</button>
    `;
    
    overlay.appendChild(box);
    document.body.appendChild(overlay);
}

function createOverlay() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        cursor: pointer;
    `;
    
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
    
    return overlay;
}

// === VISITOR COUNTER ===
function initVisitorCounter() {
    const counterElement = document.getElementById('visitorCount');
    
    if (counterElement) {
        // Get or create visitor count
        let count = localStorage.getItem('ori_visitor_count');
        if (!count) {
            count = Math.floor(Math.random() * 100) + 42;
        }
        count = parseInt(count) + 1;
        localStorage.setItem('ori_visitor_count', count);
        
        // Animate counter
        animateCounter(counterElement, count);
    }
}

function animateCounter(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 20);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = current.toString().padStart(5, '0');
    }, 50);
}

// === MYSTERY BOX ===
function initMysteryBox() {
    const mysteryBox = document.getElementById('mysteryBox');
    
    if (mysteryBox) {
        let clickCount = 0;
        
        mysteryBox.addEventListener('click', function() {
            clickCount++;
            
            if (clickCount === 1) {
                mysteryBox.style.transform = 'scale(1.05)';
                setTimeout(() => mysteryBox.style.transform = 'scale(1)', 200);
            }
            
            if (clickCount === 5) {
                showSecretMessage('🛡️ Die fünf Hüter wachen. Das Geheimnis ist sicher. 🛡️');
            }
            
            if (clickCount === 7) {
                showSecretMessage('◈ Sie haben das Ori-Protokoll entdeckt. BastiGHG wurde benachrichtigt. ◈');
                clickCount = 0;
            }
        });
    }
}

// === GLITCH EFFECTS ===
function initGlitchEffects() {
    const encryptedElements = document.querySelectorAll('.encrypted');
    
    encryptedElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const original = element.textContent;
            let glitchInterval;
            let count = 0;
            
            glitchInterval = setInterval(() => {
                if (count < 5) {
                    element.textContent = generateRandomChars(original.length);
                    count++;
                } else {
                    element.textContent = original;
                    clearInterval(glitchInterval);
                }
            }, 50);
        });
    });
}

function generateRandomChars(length) {
    const chars = '█▓▒░01#@$%&*';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

// === NAVIGATION ===
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Don't prevent default if it's a real link
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Play a subtle click sound effect (simulated with style change)
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
}

// === EASTER EGG: Konami Code ===
function initEasterEggs() {
    const easterEggElement = document.getElementById('easterEgg');
    
    if (easterEggElement) {
        easterEggElement.addEventListener('click', function() {
            this.style.animation = 'spin 1s';
            setTimeout(() => {
                this.style.animation = '';
            }, 1000);
            
            // Random messages - Ori Lore
            const messages = [
                'Der Koffer bleibt versiegelt.',
                'Drei Fragezeichen. Ein Koffergeheim.',
                'Die 5 Hüter wachen.',
                'Team Omega lauert...',
                'Oktober 20██ - Der Anfang.',
                'Macht durch Geheimnis.',
                'Eine sehr, sehr große Sache.',
                'BastiGHG weiß alles.',
                'Der Server der Geheimnisse.',
                'Das Totem aus Holz bewacht das Geheimnis.',
                'Redstone Kamerasystem: AKTIV',
                'Die Ori Basis ist geheim.'
            ];
            
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            
            const tooltip = document.createElement('div');
            tooltip.textContent = randomMsg;
            tooltip.style.cssText = `
                position: fixed;
                bottom: 100px;
                left: 50%;
                transform: translateX(-50%);
                background: #2C3E50;
                color: #FFD700;
                padding: 15px 30px;
                border-radius: 4px;
                border: 2px solid #FFD700;
                font-family: Georgia, serif;
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
                z-index: 10000;
                animation: fadeIn 0.5s;
            `;
            
            document.body.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.style.transition = 'opacity 0.5s';
                tooltip.style.opacity = '0';
                setTimeout(() => tooltip.remove(), 500);
            }, 3000);
        });
    }
    
    // Konami Code listener
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateSecretMode();
        }
    });
}

function activateSecretMode() {
    document.body.style.animation = 'rainbow 2s infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
    
    showSecretMessage('🎮 KONAMI CODE AKTIVIERT! 🎮<br><br>◈ Ori-Protokoll entsperrt ◈<br>Die verborgenen Schichten des Koffers werden sichtbar...');
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 10000);
}

// === RANDOM GLITCHES (Ambient) ===
setInterval(() => {
    if (Math.random() < 0.05) { // 5% chance every 5 seconds
        const allText = document.querySelectorAll('p, span, li, td');
        if (allText.length > 0) {
            const randomElement = allText[Math.floor(Math.random() * allText.length)];
            const original = randomElement.textContent;
            
            randomElement.style.transition = 'all 0.1s';
            randomElement.style.color = '#F0F';
            
            setTimeout(() => {
                randomElement.style.color = '';
            }, 100);
        }
    }
}, 5000);

// === RANDOM OBJECT GLITCHES ===
function initRandomGlitches() {
    function applyRandomGlitch() {
        // Select random elements that can glitch
        const glitchableElements = document.querySelectorAll(
            '.panel, .widget, .info-box, .guardian-card, .nav-btn, h1, h2, h3, .logo, .status-badge, button, .data-table tr'
        );
        
    if (glitchableElements.length === 0) return;
        
    // Play glitch sound synced with visual frame
    requestAnimationFrame(() => playGlitchSound());
        
        // Pick random element
        const randomElement = glitchableElements[Math.floor(Math.random() * glitchableElements.length)];
        
        // Random glitch duration between 0.2-1 seconds
        const duration = 200 + Math.random() * 800;
        
        // Random glitch effect
        const glitchEffects = [
            // Color glitch
            () => {
                const originalColor = randomElement.style.color;
                const originalBg = randomElement.style.background;
                randomElement.style.color = '#F0F';
                randomElement.style.background = '#0F0';
                randomElement.style.mixBlendMode = 'difference';
                setTimeout(() => {
                    randomElement.style.color = originalColor;
                    randomElement.style.background = originalBg;
                    randomElement.style.mixBlendMode = '';
                }, duration);
            },
            // Shake glitch
            () => {
                randomElement.style.animation = 'glitchShake 0.1s infinite';
                setTimeout(() => {
                    randomElement.style.animation = '';
                }, duration);
            },
            // Scale glitch
            () => {
                const originalTransform = randomElement.style.transform;
                randomElement.style.transform = 'scale(1.05) skew(2deg)';
                randomElement.style.filter = 'hue-rotate(180deg)';
                setTimeout(() => {
                    randomElement.style.transform = originalTransform;
                    randomElement.style.filter = '';
                }, duration);
            },
            // RGB Split glitch
            () => {
                randomElement.style.textShadow = '2px 0 #F00, -2px 0 #0FF';
                randomElement.style.filter = 'blur(1px)';
                setTimeout(() => {
                    randomElement.style.textShadow = '';
                    randomElement.style.filter = '';
                }, duration);
            },
            // Invert glitch
            () => {
                randomElement.style.filter = 'invert(1) hue-rotate(180deg)';
                setTimeout(() => {
                    randomElement.style.filter = '';
                }, duration);
            },
            // Opacity flicker
            () => {
                let flickerCount = 0;
                const flickerInterval = setInterval(() => {
                    randomElement.style.opacity = Math.random() > 0.5 ? '1' : '0.3';
                    flickerCount++;
                    if (flickerCount > duration / 50) {
                        clearInterval(flickerInterval);
                        randomElement.style.opacity = '1';
                    }
                }, 50);
            }
        ];
        
        // Apply random glitch effect
        const randomGlitch = glitchEffects[Math.floor(Math.random() * glitchEffects.length)];
        randomGlitch();
    }
    
    // Random interval between 10-30 seconds
    function scheduleNextGlitch() {
        const nextGlitch = 10000 + Math.random() * 20000; // 10-30 seconds
        setTimeout(() => {
            applyRandomGlitch();
            scheduleNextGlitch();
        }, nextGlitch);
    }
    
    scheduleNextGlitch();
}

// === LOGIN BLOCK GLITCH ===
function initLoginBlockGlitch() {
    const widget = document.querySelector('.login-widget-glitch');
    if (!widget) {
        return;
    }

    widget.style.position = widget.style.position || 'relative';

    const scheduleNext = () => {
        const delay = 10000 + Math.random() * 10000; // 10-20 seconds
        setTimeout(() => {
            trigger();
            scheduleNext();
        }, delay);
    };

    const trigger = () => {
        // Start sound slightly before the visual effect
        playGlitchSound();

        setTimeout(() => {
            const pieces = 3 + Math.floor(Math.random() * 3); // 3-5 slices
            widget.classList.add('login-glitching');

            for (let i = 0; i < pieces; i++) {
                const clone = widget.cloneNode(true);
                clone.classList.remove('login-widget-glitch');
                clone.classList.add('login-glitch-clone');

                const form = clone.querySelector('#loginForm');
                if (form) {
                    form.removeAttribute('id');
                }

                const top = Math.random() * 80;
                const height = 5 + Math.random() * 15;
                const bottom = Math.max(0, 100 - top - height);
                const offset = (Math.random() - 0.5) * 20; // -10px to 10px horizontal shift
                const hue = Math.floor(Math.random() * 360);

                clone.style.clipPath = `inset(${top}% 0% ${bottom}% 0%)`;
                clone.style.transform = `translate(${offset}px, 0)`;
                clone.style.filter = `hue-rotate(${hue}deg)`;
                clone.style.opacity = '0.7';

                widget.appendChild(clone);

                setTimeout(() => {
                    clone.remove();
                }, 180);
            }

            setTimeout(() => {
                widget.classList.remove('login-glitching');
            }, 200);
        }, 300); // delay visuals to let the audio lead
    };

    scheduleNext();
}

// Add glitch shake animation to stylesheet
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitchShake {
        0%, 100% { transform: translate(0, 0); }
        25% { transform: translate(-2px, 2px); }
        50% { transform: translate(2px, -2px); }
        75% { transform: translate(-2px, -2px); }
    }
`;
document.head.appendChild(glitchStyle);

// Console Easter Egg
console.log('%c◈ ORI SYSTEM ◈', 'color: #FFD700; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px rgba(255,215,0,0.5);');
console.log('%cDas größte Geheimnis', 'color: #0054E3; font-size: 14px;');
console.log('%cDrei Fragezeichen. Ein Koffergeheim.', 'color: #666; font-style: italic;');
console.log('%cORI-Code: 0x███', 'font-family: monospace; color: #0F0; background: #000; padding: 5px;');
console.log('%cBewacht von BastiGHG seit Oktober 20██', 'color: #999; font-size: 11px;');
console.log(' ');
console.log('%c🛡️ Die 5 Hüter:', 'font-weight: bold; color: #FFD700;');
console.log('   nooreax • Faister • NQRMAN • byStegi • CastCrafter');
console.log(' ');
console.log('%c⚠ Team Omega: BEDROHUNG ERKANNT', 'color: #FF4500; font-weight: bold;');
console.log(' ');
console.log('%cPasswort-Hinweis:', 'color: #0054E3;');
console.log('Achte auf das Video.');
console.log(' ');
console.log('%cMacht durch Geheimnis.', 'color: #FFD700; font-weight: bold; font-size: 16px;');
console.log(' ');
console.log('%c⚠️ ACHTUNG: HACKER-VERSUCH GEFUNDEN!', 'color: #FF0000; font-size: 14px; font-weight: bold; background: #000; padding: 5px;');
console.log('%cUnbefugter Zugriff auf Console erkannt. Ihr Zugang wird protokolliert.', 'color: #FF4500; font-size: 11px;');

