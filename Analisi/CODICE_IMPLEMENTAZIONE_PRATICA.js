// 🎭 CODICE IMPLEMENTAZIONE MIGLIORAMENTI NARRATIVI - TextSouls
// Questo file contiene il codice da aggiungere al game.html esistente

// ============================================================================
// SISTEMA DI MEMORIE E FLASHBACK
// ============================================================================

const memorySystem = {
    memories: {
        'cella_iniziale': {
            trigger: 'explore_cell',
            flashback: 'memory_awakening',
            karmaEffect: 0,
            unlockScene: 'personal_items'
        },
        'frammento_specchio': {
            trigger: 'find_mirror',
            flashback: 'memory_golden_armor',
            karmaEffect: 5,
            healthEffect: -10,
            unlockScene: 'guardian_revelation'
        },
        'runa_familiare': {
            trigger: 'read_rune',
            flashback: 'memory_council',
            karmaEffect: 10,
            unlockScene: 'truth_revelation'
        },
        'pozza_anima': {
            trigger: 'see_pool',
            flashback: 'memory_sacrifice',
            karmaEffect: 15,
            healthEffect: -15,
            unlockScene: 'spirit_ally'
        }
    },
    
    triggeredMemories: new Set(),
    
    triggerMemory: function(memoryId) {
        const memory = this.memories[memoryId];
        if (memory && !this.triggeredMemories.has(memoryId)) {
            this.triggeredMemories.add(memoryId);
            this.showFlashback(memory.flashback);
            
            if (memory.karmaEffect) {
                karmaSystem.addKarma(memory.karmaEffect);
            }
            if (memory.healthEffect) {
                playerHealth = Math.max(0, playerHealth + memory.healthEffect);
                updateUI();
            }
            if (memory.unlockScene) {
                this.unlockScene(memory.unlockScene);
            }
        }
    },
    
    showFlashback: function(flashbackId) {
        const flashbacks = {
            'memory_awakening': {
                title: "Frammento di Memoria",
                text: "Un'immagine ti attraversa la mente: sei in una sala maestosa, circondato da altri Guardiani delle Anime. 'Devo farlo,' dici a te stesso, 'anche se significa condannare tutti noi a questo ciclo infinito. È l'unico modo per salvare Eldoria da quello che sta arrivando.'",
                choices: [
                    {
                        text: "Concentrati sul ricordo",
                        action: function() {
                            karmaSystem.addKarma(5);
                            showScene('memory_awakening_continue');
                        }
                    },
                    {
                        text: "Respingi il dolore",
                        action: function() {
                            karmaSystem.addKarma(-5);
                            playerHealth -= 10;
                            showScene('memory_awakening_reject');
                        }
                    },
                    {
                        text: "Cerca di capire di più",
                        action: function() {
                            karmaSystem.addKarma(10);
                            showScene('memory_awakening_understand');
                        }
                    }
                ]
            },
            'memory_golden_armor': {
                title: "L'Armatura Dorata",
                text: "Nel frammento di specchio vedi un uomo in armatura dorata, con il volto segnato dalla determinazione e dal dolore. Ricordi il momento in cui hai preso la decisione più difficile della tua vita. L'armatura brilla con rune antiche che ora riconosci come tue.",
                choices: [
                    {
                        text: "Accetta la verità",
                        action: function() {
                            karmaSystem.addKarma(15);
                            showScene('memory_armor_accept');
                        }
                    },
                    {
                        text: "Rifiuta il ricordo",
                        action: function() {
                            karmaSystem.addKarma(-10);
                            showScene('memory_armor_reject');
                        }
                    },
                    {
                        text: "Cerca di capire il perché",
                        action: function() {
                            karmaSystem.addKarma(5);
                            showScene('memory_armor_understand');
                        }
                    }
                ]
            },
            'memory_council': {
                title: "Il Consiglio dei Guardiani",
                text: "Le rune ti trasportano in un altro tempo. Vedi te stesso in una sala maestosa, circondato da altri Guardiani delle Anime. 'La maledizione è l'unica soluzione,' dice una voce che riconosci come tua, 'ma il prezzo sarà alto. Tutti noi dovremo rinunciare alla nostra umanità per proteggere Eldoria.'",
                choices: [
                    {
                        text: "Comprendi la necessità",
                        action: function() {
                            karmaSystem.addKarma(20);
                            showScene('memory_council_understand');
                        }
                    },
                    {
                        text: "Condanna la scelta",
                        action: function() {
                            karmaSystem.addKarma(-15);
                            showScene('memory_council_condemn');
                        }
                    },
                    {
                        text: "Cerca un'alternativa",
                        action: function() {
                            karmaSystem.addKarma(10);
                            showScene('memory_council_alternative');
                        }
                    }
                ]
            },
            'memory_sacrifice': {
                title: "Il Sacrificio",
                text: "L'anima nella pozza ti mostra un ricordo: sei tu, cento anni fa, che incidi le rune della maledizione. Le lacrime ti rigano il volto mentre condanni migliaia di anime innocenti. 'Perdonatemi,' sussurri, 'è l'unico modo per salvarvi tutti.'",
                choices: [
                    {
                        text: "Accetta la responsabilità",
                        action: function() {
                            karmaSystem.addKarma(25);
                            showScene('memory_sacrifice_accept');
                        }
                    },
                    {
                        text: "Rifiuta la colpa",
                        action: function() {
                            karmaSystem.addKarma(-20);
                            showScene('memory_sacrifice_reject');
                        }
                    },
                    {
                        text: "Cerca la redenzione",
                        action: function() {
                            karmaSystem.addKarma(15);
                            showScene('memory_sacrifice_redemption');
                        }
                    }
                ]
            }
        };
        
        const flashback = flashbacks[flashbackId];
        if (flashback) {
            showMemoryScene(flashback);
        }
    },
    
    unlockScene: function(sceneId) {
        // Aggiunge la scena alla lista delle scene sbloccate
        if (!window.unlockedScenes) {
            window.unlockedScenes = new Set();
        }
        window.unlockedScenes.add(sceneId);
    }
};

// ============================================================================
// SISTEMA DI KARMA DINAMICO
// ============================================================================

const karmaSystem = {
    currentKarma: 0,
    maxKarma: 100,
    minKarma: -100,
    
    addKarma: function(amount) {
        const oldKarma = this.currentKarma;
        this.currentKarma = Math.max(this.minKarma, 
                                    Math.min(this.maxKarma, 
                                    this.currentKarma + amount));
        
        this.updateWorldState();
        this.updateDialogs();
        this.showKarmaChange(amount);
        
        console.log(`Karma cambiato: ${oldKarma} → ${this.currentKarma} (${amount > 0 ? '+' : ''}${amount})`);
    },
    
    updateWorldState: function() {
        // Cambia reazioni NPC basato su karma
        if (this.currentKarma > 50) {
            window.npcAttitude = 'friendly';
            this.applyFriendlyEffects();
        } else if (this.currentKarma < -50) {
            window.npcAttitude = 'hostile';
            this.applyHostileEffects();
        } else {
            window.npcAttitude = 'neutral';
            this.applyNeutralEffects();
        }
    },
    
    updateDialogs: function() {
        // Aggiorna dialoghi esistenti basato su karma
        const dialogChanges = {
            'veggente': this.getVeggenteDialog(),
            'mercante': this.getMercanteDialog(),
            'golem': this.getGolemDialog()
        };
        
        // Applica cambiamenti ai dialoghi
        Object.keys(dialogChanges).forEach(npc => {
            if (dialogChanges[npc]) {
                this.updateNPCDialog(npc, dialogChanges[npc]);
            }
        });
    },
    
    getVeggenteDialog: function() {
        if (this.currentKarma > 30) {
            return {
                greeting: "Vedo che hai scelto la via della compassione. Forse c'è ancora speranza per te.",
                advice: "Continua su questa strada. La redenzione è possibile.",
                warning: "Ma ricorda: il passato non può essere cambiato, solo accettato."
            };
        } else if (this.currentKarma < -30) {
            return {
                greeting: "Le tue azioni mi preoccupano. Stai scivolando nell'oscurità.",
                advice: "Fai attenzione. Il potere oscuro ti consumerà.",
                warning: "Se continui così, diventerai quello che hai combattuto."
            };
        } else {
            return {
                greeting: "Sei ancora in equilibrio. La scelta è tua.",
                advice: "Scegli saggiamente. Ogni decisione ha conseguenze.",
                warning: "Il tempo stringe. Presto dovrai fare la tua scelta finale."
            };
        }
    },
    
    getMercanteDialog: function() {
        if (this.currentKarma > 20) {
            return {
                greeting: "Un cliente rispettabile! Hai il mio rispetto.",
                trade: "Per te, prezzi speciali. La bontà va ricompensata."
            };
        } else if (this.currentKarma < -20) {
            return {
                greeting: "Hmm... vedo oscurità in te. Prezzi più alti per i rischi.",
                trade: "Il male ha un prezzo, sai. E tu lo stai pagando."
            };
        } else {
            return {
                greeting: "Benvenuto, viaggiatore. Cosa ti serve?",
                trade: "Prezzi equi per tutti. È la mia filosofia."
            };
        }
    },
    
    getGolemDialog: function() {
        if (this.currentKarma > 40) {
            return {
                greeting: "Un'anima pura... forse sei degno di conoscere la verità.",
                challenge: "Ma prima, dimostra la tua saggezza."
            };
        } else if (this.currentKarma < -40) {
            return {
                greeting: "Oscurità... non sei degno di passare.",
                challenge: "Combatti, se osi. Ma non vincerai."
            };
        } else {
            return {
                greeting: "Un'anima in equilibrio... interessante.",
                challenge: "Dimostra il tuo valore."
            };
        }
    },
    
    updateNPCDialog: function(npcId, dialog) {
        // Aggiorna i dialoghi degli NPC nel gioco
        if (window.npcDialogs) {
            window.npcDialogs[npcId] = dialog;
        }
    },
    
    showKarmaChange: function(amount) {
        // Mostra un indicatore visivo del cambiamento di karma
        const karmaIndicator = document.createElement('div');
        karmaIndicator.className = 'karma-change';
        karmaIndicator.textContent = amount > 0 ? `+${amount} Karma` : `${amount} Karma`;
        karmaIndicator.style.color = amount > 0 ? '#8aff8a' : '#ff6b6b';
        karmaIndicator.style.position = 'fixed';
        karmaIndicator.style.top = '20px';
        karmaIndicator.style.right = '20px';
        karmaIndicator.style.padding = '10px';
        karmaIndicator.style.background = 'rgba(0,0,0,0.8)';
        karmaIndicator.style.borderRadius = '5px';
        karmaIndicator.style.zIndex = '1000';
        karmaIndicator.style.animation = 'fadeInOut 2s ease-in-out';
        
        document.body.appendChild(karmaIndicator);
        
        setTimeout(() => {
            karmaIndicator.remove();
        }, 2000);
    },
    
    applyFriendlyEffects: function() {
        // Effetti per karma positivo
        if (window.playerHealth) {
            playerHealth = Math.min(maxHealth, playerHealth + 10);
        }
    },
    
    applyHostileEffects: function() {
        // Effetti per karma negativo
        if (window.playerHealth) {
            playerHealth = Math.max(0, playerHealth - 5);
        }
    },
    
    applyNeutralEffects: function() {
        // Effetti per karma neutrale
        // Nessun effetto speciale
    }
};

// ============================================================================
// SISTEMA DI SCELTE CONSEQUENZIALI
// ============================================================================

const consequenceSystem = {
    choices: {
        'libera_anima': {
            text: "Libero l'anima, anche se mi costa",
            karmaEffect: 15,
            healthEffect: -20,
            unlockScenes: ['spirito_alleato'],
            blockScenes: ['spiriti_ostili'],
            dialogChanges: {
                'veggente': 'positive',
                'mercante': 'neutral'
            },
            description: "L'anima ti ringrazia con gratitudine infinita. Hai fatto la scelta giusta."
        },
        'bevi_acqua': {
            text: "Bevo l'acqua per sopravvivere",
            karmaEffect: -10,
            healthEffect: 15,
            unlockScenes: ['spiriti_ostili'],
            blockScenes: ['spirito_alleato'],
            dialogChanges: {
                'veggente': 'negative',
                'mercante': 'cautious'
            },
            description: "L'anima intrappolata urla di dolore mentre bevi. Hai scelto la sopravvivenza."
        },
        'comunica_golem': {
            text: "Cerca di comunicare con il Golem",
            karmaEffect: 10,
            healthEffect: 0,
            unlockScenes: ['dialogo_golem'],
            blockScenes: ['combattimento_golem'],
            dialogChanges: {
                'golem': 'friendly'
            },
            description: "Il Golem riconosce la tua saggezza. La comunicazione è possibile."
        },
        'attacca_golem': {
            text: "Attacca, è solo pietra animata",
            karmaEffect: -15,
            healthEffect: -20,
            unlockScenes: ['combattimento_golem'],
            blockScenes: ['dialogo_golem'],
            dialogChanges: {
                'golem': 'hostile'
            },
            description: "Il Golem si difende con furia antica. La violenza genera violenza."
        },
        'studia_rune': {
            text: "Studia le rune sul suo corpo",
            karmaEffect: 5,
            healthEffect: -5,
            unlockScenes: ['storia_nascosta'],
            blockScenes: [],
            dialogChanges: {
                'golem': 'neutral'
            },
            description: "Le rune raccontano una storia antica. La conoscenza ha un prezzo."
        }
    },
    
    applyChoice: function(choiceId) {
        const choice = this.choices[choiceId];
        if (choice) {
            // Applica effetti immediati
            karmaSystem.addKarma(choice.karmaEffect);
            playerHealth = Math.max(0, Math.min(maxHealth, playerHealth + choice.healthEffect));
            
            // Sblocca/blocca scene
            if (choice.unlockScenes) {
                choice.unlockScenes.forEach(scene => {
                    memorySystem.unlockScene(scene);
                });
            }
            if (choice.blockScenes) {
                choice.blockScenes.forEach(scene => {
                    this.blockScene(scene);
                });
            }
            
            // Cambia dialoghi
            if (choice.dialogChanges) {
                Object.keys(choice.dialogChanges).forEach(npc => {
                    this.updateNPCDialog(npc, choice.dialogChanges[npc]);
                });
            }
            
            // Mostra descrizione della conseguenza
            this.showConsequence(choice.description);
            
            // Aggiorna UI
            updateUI();
        }
    },
    
    blockScene: function(sceneId) {
        // Blocca una scena (non può essere accessibile)
        if (!window.blockedScenes) {
            window.blockedScenes = new Set();
        }
        window.blockedScenes.add(sceneId);
    },
    
    updateNPCDialog: function(npcId, attitude) {
        // Aggiorna l'atteggiamento di un NPC
        if (!window.npcAttitudes) {
            window.npcAttitudes = {};
        }
        window.npcAttitudes[npcId] = attitude;
    },
    
    showConsequence: function(description) {
        // Mostra la conseguenza della scelta
        const consequenceDiv = document.createElement('div');
        consequenceDiv.className = 'consequence-notification';
        consequenceDiv.innerHTML = `
            <div class="consequence-content">
                <h3>Conseguenza della Scelta</h3>
                <p>${description}</p>
            </div>
        `;
        consequenceDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.9);
            color: var(--ds-gold);
            padding: 20px;
            border-radius: 10px;
            border: 2px solid var(--ds-gold);
            z-index: 1000;
            max-width: 400px;
            text-align: center;
        `;
        
        document.body.appendChild(consequenceDiv);
        
        setTimeout(() => {
            consequenceDiv.style.opacity = '0';
            consequenceDiv.style.transition = 'opacity 1s ease-out';
            setTimeout(() => {
                consequenceDiv.remove();
            }, 1000);
        }, 3000);
    }
};

// ============================================================================
// FUNZIONI DI UTILITÀ
// ============================================================================

function showMemoryScene(flashback) {
    // Mostra una scena di flashback
    const gameContainer = document.getElementById('game-container');
    const storyText = document.getElementById('story-text');
    const choicesContainer = document.getElementById('choices-container');
    
    // Salva lo stato corrente
    if (!window.sceneHistory) {
        window.sceneHistory = [];
    }
    window.sceneHistory.push({
        text: storyText.innerHTML,
        choices: Array.from(choicesContainer.children).map(btn => btn.textContent)
    });
    
    // Mostra il flashback
    storyText.innerHTML = `
        <div class="memory-flashback">
            <h2 style="color: var(--ds-gold); text-align: center; margin-bottom: 20px;">
                ${flashback.title}
            </h2>
            <p style="font-style: italic; color: var(--ds-gold-light); line-height: 1.6;">
                ${flashback.text}
            </p>
        </div>
    `;
    
    // Mostra le scelte del flashback
    choicesContainer.innerHTML = '';
    flashback.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-button memory-choice';
        button.textContent = choice.text;
        button.onclick = choice.action;
        choicesContainer.appendChild(button);
    });
    
    // Aggiungi stili speciali per i flashback
    gameContainer.classList.add('memory-mode');
}

function showScene(sceneId) {
    // Funzione per mostrare una scena specifica
    // Questa funzione dovrebbe essere integrata con il sistema di scene esistente
    console.log(`Mostrando scena: ${sceneId}`);
    
    // Qui andrebbe il codice per caricare la scena specifica
    // Per ora, mostriamo un messaggio di debug
    const storyText = document.getElementById('story-text');
    storyText.innerHTML = `<p>Scena: ${sceneId} - In sviluppo</p>`;
}

// ============================================================================
// INIZIALIZZAZIONE
// ============================================================================

// Aggiungi stili CSS per i nuovi elementi
const additionalStyles = `
    <style>
        .memory-flashback {
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
            border: 2px solid var(--ds-gold);
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .memory-choice {
            background: linear-gradient(135deg, var(--ds-gold) 0%, var(--ds-gold-dark) 100%);
            color: var(--ds-black);
            border: 2px solid var(--ds-gold-light);
            font-weight: bold;
        }
        
        .memory-choice:hover {
            background: linear-gradient(135deg, var(--ds-gold-light) 0%, var(--ds-gold) 100%);
            box-shadow: 0 0 15px var(--ds-gold-glow);
        }
        
        .memory-mode {
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(0, 0, 0, 0.95) 100%);
        }
        
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-20px); }
            20% { opacity: 1; transform: translateY(0); }
            80% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-20px); }
        }
        
        .karma-change {
            font-family: 'Cinzel', serif;
            font-weight: bold;
            text-shadow: 0 0 10px currentColor;
        }
        
        .consequence-notification {
            animation: fadeInOut 4s ease-in-out;
        }
    </style>
`;

// Inserisci gli stili nel documento
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Inizializza i sistemi quando il documento è caricato
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistemi narrativi inizializzati');
    console.log('Memory System:', memorySystem);
    console.log('Karma System:', karmaSystem);
    console.log('Consequence System:', consequenceSystem);
});

// Esporta i sistemi per uso globale
window.memorySystem = memorySystem;
window.karmaSystem = karmaSystem;
window.consequenceSystem = consequenceSystem; 