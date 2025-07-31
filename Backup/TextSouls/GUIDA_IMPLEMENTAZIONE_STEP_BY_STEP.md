# 🎭 GUIDA IMPLEMENTAZIONE STEP-BY-STEP - TextSouls

## 📋 PANORAMICA

Questa guida ti accompagnerà nell'implementazione dei miglioramenti narrativi nel tuo `game.html` esistente. I miglioramenti includono:

1. **Sistema di Flashback e Memorie**
2. **Sistema di Karma Dinamico**
3. **Scelte Consequenziali**
4. **Descrizioni Migliorate**

---

## 🎯 FASE 1: PREPARAZIONE (30 minuti)

### **Passo 1.1: Backup del File**
```bash
# Crea una copia di backup del game.html
cp game.html game_backup_$(date +%Y%m%d_%H%M%S).html
```

### **Passo 1.2: Analisi della Struttura**
Apri `game.html` e identifica:
- Dove sono dichiarate le variabili globali (cerca `let`, `const`, `var`)
- Dove sono definite le funzioni principali
- Dove sono gestite le scene del gioco

---

## 🎯 FASE 2: IMPLEMENTAZIONE SISTEMI BASE (2 ore)

### **Passo 2.1: Aggiungere i Sistemi di Base**

Cerca nel `game.html` la sezione dove sono dichiarate le variabili globali (solitamente dopo `<script>` e prima delle funzioni). Aggiungi questo codice:

```javascript
// ============================================================================
// SISTEMI NARRATIVI AVANZATI - AGGIUNTI
// ============================================================================

// Sistema di memorie e flashback
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
        }
    },
    
    showFlashback: function(flashbackId) {
        const flashbacks = {
            'memory_awakening': {
                title: "Frammento di Memoria",
                text: "Un'immagine ti attraversa la mente: sei in una sala maestosa, circondato da altri Guardiani delle Anime. 'Devo farlo,' dici a te stesso, 'anche se significa condannare tutti noi a questo ciclo infinito.'",
                choices: [
                    {
                        text: "Concentrati sul ricordo",
                        action: function() {
                            karmaSystem.addKarma(5);
                            // Torna alla scena precedente
                            if (window.sceneHistory && window.sceneHistory.length > 0) {
                                const previousScene = window.sceneHistory.pop();
                                document.getElementById('story-text').innerHTML = previousScene.text;
                                // Ripristina le scelte precedenti
                                restoreChoices(previousScene.choices);
                            }
                        }
                    },
                    {
                        text: "Respingi il dolore",
                        action: function() {
                            karmaSystem.addKarma(-5);
                            playerHealth -= 10;
                            updateUI();
                            // Torna alla scena precedente
                            if (window.sceneHistory && window.sceneHistory.length > 0) {
                                const previousScene = window.sceneHistory.pop();
                                document.getElementById('story-text').innerHTML = previousScene.text;
                                restoreChoices(previousScene.choices);
                            }
                        }
                    }
                ]
            }
        };
        
        const flashback = flashbacks[flashbackId];
        if (flashback) {
            showMemoryScene(flashback);
        }
    }
};

// Sistema di karma dinamico
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
        this.showKarmaChange(amount);
        
        console.log(`Karma cambiato: ${oldKarma} → ${this.currentKarma} (${amount > 0 ? '+' : ''}${amount})`);
    },
    
    updateWorldState: function() {
        // Cambia reazioni NPC basato su karma
        if (this.currentKarma > 50) {
            window.npcAttitude = 'friendly';
        } else if (this.currentKarma < -50) {
            window.npcAttitude = 'hostile';
        } else {
            window.npcAttitude = 'neutral';
        }
    },
    
    showKarmaChange: function(amount) {
        // Mostra un indicatore visivo del cambiamento di karma
        const karmaIndicator = document.createElement('div');
        karmaIndicator.className = 'karma-change';
        karmaIndicator.textContent = amount > 0 ? `+${amount} Karma` : `${amount} Karma`;
        karmaIndicator.style.cssText = `
            color: ${amount > 0 ? '#8aff8a' : '#ff6b6b'};
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px;
            background: rgba(0,0,0,0.8);
            border-radius: 5px;
            z-index: 1000;
            font-family: 'Cinzel', serif;
            font-weight: bold;
            text-shadow: 0 0 10px currentColor;
        `;
        
        document.body.appendChild(karmaIndicator);
        
        setTimeout(() => {
            karmaIndicator.remove();
        }, 2000);
    }
};
```

### **Passo 2.2: Aggiungere Funzioni di Supporto**

Cerca la fine della sezione `<script>` e aggiungi prima di `</script>`:

```javascript
// ============================================================================
// FUNZIONI DI SUPPORTO PER I SISTEMI NARRATIVI
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

function restoreChoices(choices) {
    // Ripristina le scelte precedenti (da implementare in base al tuo sistema)
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    // Qui dovrai implementare la logica per ricreare i pulsanti delle scelte
    console.log('Ripristinando scelte:', choices);
}

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
        
        .karma-change {
            animation: fadeInOut 2s ease-in-out;
        }
        
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-20px); }
            20% { opacity: 1; transform: translateY(0); }
            80% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-20px); }
        }
    </style>
`;

// Inserisci gli stili nel documento
document.head.insertAdjacentHTML('beforeend', additionalStyles);
```

---

## 🎯 FASE 3: MODIFICARE LE SCENE ESISTENTI (3 ore)

### **Passo 3.1: Trovare la Cella Iniziale**

Cerca nel codice la scena della cella iniziale. Dovrebbe essere simile a:

```javascript
// Cerca qualcosa come:
function startGame() {
    // ... codice esistente ...
    document.getElementById('story-text').innerHTML = "Ti risvegli su un giaciglio...";
    // ... altre scelte ...
}
```

### **Passo 3.2: Sostituire la Descrizione della Cella**

Sostituisci la descrizione esistente con questa versione migliorata:

```javascript
document.getElementById('story-text').innerHTML = `
    <div class="story-content">
        <p>Ti risvegli su un giaciglio di paglia putrescente, il corpo indolenzito da un sonno che sembra essere durato un'eternità. Le pareti di pietra grezza della cella sono ricoperte di rune antiche che pulsano di una luce sinistra, e l'aria è pesante dell'odore di morte e disperazione.</p>
        
        <p>Un piccolo spiraglio in alto lascia filtrare una luce grigia e malaticcia, l'unico segno che esiste ancora un mondo al di fuori di queste mura. Ma è la sensazione più strana che ti tormenta: un vuoto nel petto, come se qualcosa di fondamentale ti fosse stato strappato via.</p>
        
        <p>I tuoi occhi si posano su una parete dove, tra le rune, riconosci il tuo nome inciso con mano tremante: <strong>"Aric"</strong>. È tutto quello che ricordi di te stesso.</p>
    </div>
`;
```

### **Passo 3.3: Modificare le Scelte della Cella**

Trova le scelte della cella e sostituiscile con:

```javascript
// Sostituisci le scelte esistenti con queste:
const choices = [
    {
        text: "Esplora la cella con attenzione",
        action: function() {
            memorySystem.triggerMemory('cella_iniziale');
            // Continua con la logica esistente per l'esplorazione
            exploreCell();
        }
    },
    {
        text: "Concentrati sui frammenti di memoria",
        action: function() {
            playerHealth -= 5; // Sforzo mentale
            karmaSystem.addKarma(5);
            updateUI();
            // Continua con la logica esistente
            focusOnMemories();
        }
    },
    {
        text: "Grida per aiuto, disperato",
        action: function() {
            karmaSystem.addKarma(-5);
            // Continua con la logica esistente
            callForHelp();
        }
    }
];

// Funzione per creare i pulsanti delle scelte
function createChoiceButtons(choices) {
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    
    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.textContent = choice.text;
        button.onclick = choice.action;
        choicesContainer.appendChild(button);
    });
}

// Chiama la funzione per creare i pulsanti
createChoiceButtons(choices);
```

---

## 🎯 FASE 4: AGGIUNGERE SCENE MIGLIORATE (2 ore)

### **Passo 4.1: Creare Scene di Flashback**

Aggiungi queste funzioni per gestire le scene di flashback:

```javascript
function exploreCell() {
    document.getElementById('story-text').innerHTML = `
        <div class="story-content">
            <p>Esplori la cella con attenzione, e i tuoi occhi si posano su oggetti che sembrano familiari. Un frammento di specchio riflette la tua immagine, ma per un momento vedi un'altra persona: un uomo in armatura dorata, con il volto segnato dalla determinazione e dal dolore.</p>
            
            <p>Le rune sulle pareti ora sembrano più chiare, e riconosci alcuni simboli che ti parlano di un tempo passato. Qualcosa di importante è successo qui, e tu sei al centro di tutto.</p>
        </div>
    `;
    
    const choices = [
        {
            text: "Prendi il frammento di specchio",
            action: function() {
                memorySystem.triggerMemory('frammento_specchio');
                inventory.push('Frammento di Specchio');
                updateUI();
                continueJourney();
            }
        },
        {
            text: "Studia le rune più da vicino",
            action: function() {
                karmaSystem.addKarma(10);
                updateUI();
                studyRunes();
            }
        },
        {
            text: "Cerca una via d'uscita",
            action: function() {
                karmaSystem.addKarma(-5);
                updateUI();
                findExit();
            }
        }
    ];
    
    createChoiceButtons(choices);
}

function focusOnMemories() {
    document.getElementById('story-text').innerHTML = `
        <div class="story-content">
            <p>Ti concentri sui frammenti di memoria che affiorano alla mente. Il dolore è intenso, ma necessario. Vedi immagini confuse: una sala maestosa, volti familiari, una decisione terribile che hai dovuto prendere.</p>
            
            <p>Il nome "Aric" risuona nella tua mente come un'eco di un tempo perduto. Chi eri? Cosa hai fatto per finire qui?</p>
        </div>
    `;
    
    const choices = [
        {
            text: "Continua a concentrarti",
            action: function() {
                playerHealth -= 10;
                karmaSystem.addKarma(15);
                updateUI();
                deepMemoryDive();
            }
        },
        {
            text: "Fermati, è troppo doloroso",
            action: function() {
                karmaSystem.addKarma(-10);
                updateUI();
                stopMemoryFocus();
            }
        }
    ];
    
    createChoiceButtons(choices);
}
```

### **Passo 4.2: Aggiungere Scene di Continuazione**

```javascript
function continueJourney() {
    document.getElementById('story-text').innerHTML = `
        <div class="story-content">
            <p>Con il frammento di specchio in mano, ti senti più sicuro. Le memorie che hai risvegliato ti danno una direzione, anche se confusa. È ora di lasciare questa cella e scoprire la verità.</p>
            
            <p>La porta della cella è aperta, e oltre vedi un corridoio buio che si estende nell'oscurità. Il ronzio che hai sentito prima si fa più forte.</p>
        </div>
    `;
    
    const choices = [
        {
            text: "Procedi nel corridoio",
            action: function() {
                // Continua con la logica esistente per il corridoio
                enterCorridor();
            }
        },
        {
            text: "Aspetta e ascolta",
            action: function() {
                karmaSystem.addKarma(5);
                updateUI();
                listenCarefully();
            }
        }
    ];
    
    createChoiceButtons(choices);
}
```

---

## 🎯 FASE 5: TESTARE E RIFINIRE (1 ora)

### **Passo 5.1: Test di Base**

1. **Apri il gioco** nel browser
2. **Avvia una nuova partita**
3. **Verifica che**:
   - La descrizione della cella sia migliorata
   - I sistemi di karma funzionino
   - I flashback si attivino correttamente
   - L'UI si aggiorni correttamente

### **Passo 5.2: Debug**

Apri la console del browser (F12) e verifica che non ci siano errori. Se ci sono errori, controlla:

1. **Sintassi JavaScript**: Parentesi, virgole, ecc.
2. **Funzioni mancanti**: Assicurati che tutte le funzioni siano definite
3. **Elementi DOM**: Verifica che gli ID degli elementi esistano

### **Passo 5.3: Rifinire i Valori**

Modifica i valori di karma e salute se necessario:

```javascript
// Esempio di bilanciamento
karmaSystem.addKarma(5);  // Riduci se troppo alto
playerHealth -= 5;        // Riduci se troppo dannoso
```

---

## 🎯 FASE 6: ESPANDERE (OBBLIGATORIO)

### **Passo 6.1: Aggiungere Altre Scene**

Una volta che il sistema base funziona, puoi aggiungere:

1. **Scene del Golem migliorate**
2. **Dialoghi NPC dinamici**
3. **Finali basati sul karma**
4. **Più flashback e memorie**

### **Passo 6.2: Integrare con il Sistema Esistente**

Assicurati che i nuovi sistemi si integrino con:
- Sistema di salvataggio
- Sistema di inventario
- Sistema di combattimento
- Finali esistenti

---

## 📊 CHECKLIST DI COMPLETAMENTO

- [ ] Backup del file creato
- [ ] Sistemi base implementati
- [ ] Cella iniziale migliorata
- [ ] Sistema di karma funzionante
- [ ] Flashback implementati
- [ ] Test completati senza errori
- [ ] Valori bilanciati
- [ ] UI aggiornata correttamente

---

## 🚨 RISOLUZIONE PROBLEMI COMUNI

### **Problema: "memorySystem is not defined"**
**Soluzione**: Assicurati che il codice dei sistemi sia aggiunto prima delle funzioni che li usano.

### **Problema: I flashback non si attivano**
**Soluzione**: Verifica che `memorySystem.triggerMemory()` sia chiamato correttamente.

### **Problema: L'UI non si aggiorna**
**Soluzione**: Assicurati che `updateUI()` sia chiamato dopo ogni cambiamento di karma/salute.

### **Problema: Errori di sintassi**
**Soluzione**: Usa un editor con evidenziazione della sintassi e controlla le parentesi/virgole.

---

## 🎯 PROSSIMI PASSI

Dopo aver completato questa implementazione base, puoi:

1. **Aggiungere più scene migliorate**
2. **Implementare il sistema di conseguenze**
3. **Creare finali dinamici**
4. **Aggiungere effetti sonori e visivi**

Il risultato sarà un TextSouls con una narrativa molto più coinvolgente e profonda! 