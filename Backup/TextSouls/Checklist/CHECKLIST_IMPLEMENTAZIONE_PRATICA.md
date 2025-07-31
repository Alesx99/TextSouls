# ✅ CHECKLIST IMPLEMENTAZIONE PRATICA - "Il Viaggio dell'Anima Perduta"

## 🎯 PRIORITÀ IMMEDIATE (Settimana 1-2)

### **0. SOSTITUZIONE POPUP CON NOTIFICHE IN-GAME (PRIORITÀ CRITICA)**

#### **0.1 Sistema di Notifiche Integrate**
- [ ] **Creare CSS per notifiche Dark Souls**
  ```css
  .game-notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(145deg, rgba(43, 43, 43, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%);
      border: 2px solid var(--ds-gold);
      border-radius: 8px;
      padding: 15px 20px;
      color: var(--ds-gold-light);
      font-family: 'Cinzel', serif;
      font-size: 1em;
      box-shadow: 0 0 20px var(--ds-gold-glow);
      z-index: 1000;
      transform: translateX(400px);
      transition: all 0.5s ease-in-out;
      max-width: 300px;
  }
  
  .game-notification.show {
      transform: translateX(0);
  }
  
  .game-notification.achievement {
      border-color: var(--ds-gold-light);
      box-shadow: 0 0 25px var(--ds-gold-glow);
  }
  
  .game-notification.damage {
      border-color: var(--ds-blood);
      box-shadow: 0 0 25px var(--ds-blood-glow);
  }
  
  .game-notification.heal {
      border-color: var(--ds-poison-light);
      box-shadow: 0 0 25px var(--ds-poison-glow);
  }
  
  .game-notification.item {
      border-color: var(--ds-magic-light);
      box-shadow: 0 0 25px var(--ds-magic-glow);
  }
  ```

- [ ] **Implementare coda di notifiche**
  ```javascript
  let notificationQueue = [];
  let isShowingNotification = false;
  
  function showNotification(message, type = 'info', duration = 3000) {
      notificationQueue.push({ message, type, duration });
      if (!isShowingNotification) {
          processNotificationQueue();
      }
  }
  
  function processNotificationQueue() {
      if (notificationQueue.length === 0) {
          isShowingNotification = false;
          return;
      }
      
      isShowingNotification = true;
      const notification = notificationQueue.shift();
      displayNotification(notification.message, notification.type, notification.duration);
  }
  ```

#### **0.2 Funzioni Specifiche per Tipo**
- [ ] **Notifiche Achievement**
  ```javascript
  function showAchievementNotification(achievementName) {
      const message = `🏆 ACHIEVEMENT: ${achievementName}`;
      showNotification(message, 'achievement', 4000);
  }
  ```

- [ ] **Notifiche Danno**
  ```javascript
  function showDamageNotification(damage, enemyType = '') {
      const message = `⚔️ Hai subito ${damage} danni${enemyType ? ` da ${enemyType}` : ''}`;
      showNotification(message, 'damage', 2500);
  }
  ```

- [ ] **Notifiche Cura**
  ```javascript
  function showHealNotification(healAmount) {
      const message = `💚 Hai recuperato ${healAmount} HP`;
      showNotification(message, 'heal', 2500);
  }
  ```

- [ ] **Notifiche Oggetti**
  ```javascript
  function showItemNotification(itemName, isNew = true) {
      const prefix = isNew ? '🎁 Nuovo oggetto:' : '📦 Oggetto:';
      const message = `${prefix} ${itemName}`;
      showNotification(message, 'item', 3000);
  }
  ```

- [ ] **Notifiche Anime**
  ```javascript
  function showSoulsNotification(soulsAmount) {
      const message = `💀 +${soulsAmount} anime`;
      showNotification(message, 'souls', 2000);
  }
  ```

#### **0.3 Sostituzioni Specifiche**
- [ ] **Sostituire alert in ricordaPassato**
  ```javascript
  // PRIMA
  alert("Hai ottenuto un frammento di memoria e 5 anime!");
  
  // DOPO
  showAchievementNotification("Frammento di Memoria");
  showSoulsNotification(5);
  ```

- [ ] **Sostituire alert in gridaAiuto**
  ```javascript
  // PRIMA
  alert(`Le tue grida hanno attirato l'attenzione! Hai subito ${damage} danni.`);
  
  // DOPO
  showDamageNotification(damage, "rumore");
  ```

- [ ] **Sostituire alert in combattimenti**
  ```javascript
  // PRIMA
  alert(`Hai subito ${damage} danni dal ${enemyName}!`);
  
  // DOPO
  showDamageNotification(damage, enemyName);
  ```

### **1. SISTEMA CRAFTING ESPANSO**

#### **1.1 Nuove Ricette Base**
- [ ] **Implementare Ricette Livello 1**
  ```javascript
  // Aggiungere a craftingRecipes
  "Pozione di Salute Minore": {
      ingredients: ["Erba Curativa", "Acqua Pura"],
      soulsCost: 5,
      description: "Ripristina 25 HP"
  },
  "Unguento Curativo": {
      ingredients: ["Erba Curativa", "Grasso Animale"],
      soulsCost: 8,
      description: "Ripristina 40 HP"
  },
  "Elixir di Vigore": {
      ingredients: ["Erba di Forza", "Acqua Pura"],
      soulsCost: 12,
      description: "Aumenta temporaneamente la resistenza"
  }
  ```

- [ ] **Implementare Ricette Livello 2**
  ```javascript
  "Pozione di Salute Maggiore": {
      ingredients: ["Erba Curativa", "Cristallo di Potenza"],
      soulsCost: 20,
      description: "Ripristina 75 HP"
  },
  "Elixir di Forza": {
      ingredients: ["Erba di Forza", "Cristallo di Potenza"],
      soulsCost: 25,
      description: "Aumenta temporaneamente la forza"
  },
  "Amuleto di Protezione": {
      ingredients: ["Amuleto Antico", "Pergamena di Rune"],
      soulsCost: 30,
      description: "Protezione arcana base"
  }
  ```

#### **1.2 Sistema Ingredienti Migliorato**
- [ ] **Aggiungere Ingredienti nelle Scene**
  - [ ] `terreSelvagge` - Aggiungere "Erba Curativa" e "Erba di Forza"
  - [ ] `fontanaAntica` - Aggiungere "Acqua Pura"
  - [ ] `minieraAbbandonata` - Aggiungere "Cristallo di Potenza"
  - [ ] `criptaAntica` - Aggiungere "Gemma Preziosa"

- [ ] **Implementare Sistema Rarità**
  ```javascript
  let ingredientRarity = {
      "Erba Curativa": "comune",
      "Acqua Pura": "comune", 
      "Cristallo di Potenza": "raro",
      "Gemma Preziosa": "leggendario"
  };
  ```

#### **1.3 Interfaccia Crafting Migliorata**
- [ ] **Aggiungere Filtri**
  - [ ] Filtro per livello di ricetta
  - [ ] Filtro per tipo (pozioni, amuleti, armi)
  - [ ] Filtro per ingredienti disponibili

- [ ] **Aggiungere Informazioni Dettagliate**
  - [ ] Mostrare ingredienti mancanti
  - [ ] Mostrare costo in anime
  - [ ] Mostrare effetti dell'oggetto

### **2. COMPLESSITÀ NARRATIVA**

#### **2.1 Sistema Indizi Nascosti**
- [ ] **Aggiungere Indizi nelle Scene Esistenti**
  ```javascript
  // In cellaIniziale
  onEnter: () => {
      if (!hasFoundWallInscription) {
          addChoice("Esamina le pareti", "trovaIscrizione");
      }
  }
  ```

- [ ] **Implementare Sistema Memoria**
  ```javascript
  let discoveredClues = {
      wallInscription: false,
      ancientSymbols: false,
      whisperedVoices: false,
      propheticDreams: false
  };
  ```

#### **2.2 Conseguenze delle Scelte**
- [ ] **Sistema Reputazione Base**
  ```javascript
  let reputation = {
      alchemist: 0,    // -100 a +100
      merchants: 0,    // -100 a +100
      guards: 0,       // -100 a +100
      curse: 0         // -100 a +100
  };
  ```

- [ ] **Modificare Dialoghi in Base alla Reputazione**
  ```javascript
  function getAlchemistDialogue() {
      if (reputation.alchemist > 50) {
          return "Amico mio! Hai dimostrato grande saggezza...";
      } else if (reputation.alchemist < -50) {
          return "Non ti fido di te, straniero...";
      } else {
          return "Sei tu quello della maledizione...";
      }
  }
  ```

## 🚀 PRIORITÀ MEDIE (Settimana 3-4)

### **3. ESPANSIONE ROUTE**

#### **3.1 Route A - Tunnel Segreto Migliorato**
- [ ] **Aggiungere Nuove Scene**
  ```javascript
  cameraSegreta: {
      title: "Camera Segreta",
      text: "Una stanza nascosta dietro un muro crollato. Iscrizioni antiche ricoprono le pareti, e un bagliore blu emana da un cristallo incastonato nel pavimento.",
      onEnter: () => {
          souls += 50;
          addToInventory("Cristallo di Anima");
          discoveredClues.wallInscription = true;
          updateUI();
      },
      choices: [
          { text: "Studia le iscrizioni", nextScene: "decifraIscrizioni" },
          { text: "Prendi il cristallo", nextScene: "prendiCristallo" },
          { text: "Torna indietro", nextScene: "tunnelSegreto" }
      ]
  }
  ```

- [ ] **Implementare Sistema Stealth**
  ```javascript
  let stealthLevel = 100; // 0-100
  
  function updateStealth(action) {
      switch(action) {
          case "move": stealthLevel -= 10; break;
          case "open": stealthLevel -= 20; break;
          case "fight": stealthLevel = 0; break;
          case "hide": stealthLevel += 15; break;
      }
      if (stealthLevel <= 0) {
          loadScene("guardieArrivano");
      }
  }
  ```

#### **3.2 Route B - Combattimento Avanzato**
- [ ] **Sistema di Parry/Block**
  ```javascript
  let combatOptions = {
      attack: { damage: 15, risk: 0 },
      parry: { damage: 25, risk: 50 },
      block: { damage: 5, risk: 10 },
      special: { damage: 35, risk: 75 }
  };
  ```

- [ ] **Fasi di Combattimento**
  ```javascript
  let combatPhase = "preparation"; // preparation, combat, recovery
  
  function startCombat() {
      combatPhase = "combat";
      showCombatOptions();
  }
  ```

#### **3.3 Route C - Sistema Commercio**
- [ ] **Mercanti Specializzati**
  ```javascript
  let merchants = {
      potionMaster: {
          name: "Maestro Pozioni",
          items: ["Pozione di Salute", "Elixir di Forza"],
          prices: { "Pozione di Salute": 15, "Elixir di Forza": 30 }
      },
      weaponSmith: {
          name: "Fabbro d'Armi", 
          items: ["Spada Arrugginita", "Scudo di Legno"],
          prices: { "Spada Arrugginita": 25, "Scudo di Legno": 20 }
      }
  };
  ```

### **4. SISTEMA FINALI MIGLIORATO**

#### **4.1 Finali Diversificati**
- [ ] **Implementare Finale Buono Espanso**
  ```javascript
  finaleBuonoEspanso: {
      title: "La Redenzione Completa",
      text: "Un silenzio sacro avvolge il santuario mentre posizioni gli antichi artefatti nei loro luoghi sacri...",
      requirements: {
          artifacts: ["Amuleto Antico", "Pergamena di Rune", "Gemma Preziosa", "Corona dell'Anima"],
          reputation: { curse: 50 },
          karma: 75
      },
      onEnter: () => {
          if (checkRequirements()) {
              showVictoryScreen("BUONO_ESPANSO");
          } else {
              loadScene("santuarioFinale");
          }
      }
  }
  ```

- [ ] **Implementare Finale Oscuro Espanso**
  ```javascript
  finaleOscuroEspanso: {
      title: "L'Ascensione delle Tenebre", 
      text: "La maledizione ti parla con una voce che sembra provenire dalle profondità del tempo stesso...",
      requirements: {
          artifacts: [],
          reputation: { curse: -50 },
          karma: -25
      }
  }
  ```

## 🎯 PRIORITÀ AVANZATE (Settimana 5-6)

### **5. SISTEMI AVANZATI**

#### **5.1 Sistema Achievement Espanso**
- [ ] **Achievement Nascosti**
  ```javascript
  let hiddenAchievements = {
      stealthMaster: {
          name: "Maestro del Silenzio",
          description: "Completa il tunnel segreto senza essere scoperto",
          condition: () => stealthLevel >= 80 && currentRoute === "tunnel"
      },
      artifactCollector: {
          name: "Collezionista di Artefatti",
          description: "Trova tutti gli artefatti leggendari",
          condition: () => inventory.includes("Amuleto Antico") && 
                         inventory.includes("Pergamena di Rune") &&
                         inventory.includes("Gemma Preziosa") &&
                         inventory.includes("Corona dell'Anima")
      }
  };
  ```

#### **5.2 Sistema Difficoltà**
- [ ] **Livelli di Difficoltà**
  ```javascript
  let difficultySettings = {
      easy: {
          soulMultiplier: 1.5,
          enemyDamage: 0.7,
          itemDropRate: 1.3
      },
      normal: {
          soulMultiplier: 1.0,
          enemyDamage: 1.0,
          itemDropRate: 1.0
      },
      hard: {
          soulMultiplier: 0.7,
          enemyDamage: 1.3,
          itemDropRate: 0.7
      }
  };
  ```

#### **5.3 Sistema Salvataggio Avanzato**
- [ ] **Slot Multipli**
  ```javascript
  let saveSlots = {
      slot1: null,
      slot2: null,
      slot3: null
  };
  
  function saveGame(slot) {
      saveSlots[slot] = {
          playerHealth: playerHealth,
          souls: souls,
          inventory: inventory,
          reputation: reputation,
          discoveredClues: discoveredClues,
          currentScene: currentScene,
          timestamp: Date.now()
      };
      localStorage.setItem('saveSlot' + slot, JSON.stringify(saveSlots[slot]));
  }
  ```

## 📊 TIMELINE DETTAGLIATA

### **SETTIMANA 1**
- [ ] **Giorno 1-2**: Sostituire popup con notifiche in-game (PRIORITÀ CRITICA)
- [ ] **Giorno 3-4**: Implementare ricette base e sistema ingredienti
- [ ] **Giorno 5-7**: Migliorare interfaccia crafting

### **SETTIMANA 2**
- [ ] **Giorno 1-3**: Aggiungere indizi nascosti e sistema memoria
- [ ] **Giorno 4-5**: Implementare conseguenze delle scelte
- [ ] **Giorno 6-7**: Test e bilanciamento

### **SETTIMANA 3**
- [ ] **Giorno 1-3**: Espandere Route A (Tunnel Segreto)
- [ ] **Giorno 4-5**: Migliorare Route B (Combattimento)
- [ ] **Giorno 6-7**: Implementare sistema commercio Route C

### **SETTIMANA 4**
- [ ] **Giorno 1-3**: Implementare finali diversificati
- [ ] **Giorno 4-5**: Aggiungere achievement nascosti
- [ ] **Giorno 6-7**: Test completi e bugfix

### **SETTIMANA 5**
- [ ] **Giorno 1-3**: Sistema difficoltà e modificatori
- [ ] **Giorno 4-5**: Salvataggio avanzato e statistiche
- [ ] **Giorno 6-7**: Ottimizzazioni e performance

### **SETTIMANA 6**
- [ ] **Giorno 1-3**: Contenuti esclusivi e finali segreti
- [ ] **Giorno 4-5**: Test estensivi e bilanciamento finale
- [ ] **Giorno 6-7**: Preparazione rilascio e documentazione

## 🎯 METRICHE DI SUCCESSO

### **COMPLETAMENTO TECNICO**
- [ ] **90% delle funzionalità implementate**
- [ ] **Tutti i bug critici risolti**
- [ ] **Performance ottimizzata**
- [ ] **Compatibilità cross-browser**

### **QUALITÀ GAMEPLAY**
- [ ] **Sistema crafting funzionale e bilanciato**
- [ ] **Route diverse e gratificanti**
- [ ] **Finali unici e memorabili**
- [ ] **Achievement system completo**

### **ESPERIENZA UTENTE**
- [ ] **Interfaccia intuitiva e responsive**
- [ ] **Progressione chiara e gratificante**
- [ ] **Feedback immediato e utile**
- [ ] **Accessibilità per tutti i livelli**

## 🚀 PROSSIMI PASSI IMMEDIATI

### **AZIONI IMMEDIATE (Oggi)**
1. **Iniziare implementazione ricette base**
2. **Aggiungere ingredienti nelle scene esistenti**
3. **Implementare sistema reputazione base**
4. **Creare sistema indizi nascosti**

### **AZIONI SETTIMANALI**
1. **Settimana 1**: Sistema crafting completo
2. **Settimana 2**: Complessità narrativa
3. **Settimana 3**: Espansione route
4. **Settimana 4**: Finali diversificati
5. **Settimana 5**: Sistemi avanzati
6. **Settimana 6**: Test e rilascio

### **AZIONI MENSILI**
1. **Mese 1**: Implementazione core features
2. **Mese 2**: Espansione contenuti
3. **Mese 3**: Ottimizzazione e rilascio

---

## 📈 RISULTATI ATTESI

### **AL COMPLETAMENTO DELLA FASE 1 (Settimana 2)**
- ✅ Sistema crafting con 15+ ricette
- ✅ 20+ ingredienti con rarità
- ✅ Sistema reputazione funzionante
- ✅ Indizi nascosti implementati

### **AL COMPLETAMENTO DELLA FASE 2 (Settimana 4)**
- ✅ Route A espansa con stealth
- ✅ Route B con combattimento avanzato
- ✅ Route C con commercio specializzato
- ✅ Finali diversificati implementati

### **AL COMPLETAMENTO DELLA FASE 3 (Settimana 6)**
- ✅ Tutti i sistemi avanzati implementati
- ✅ Achievement nascosti funzionanti
- ✅ Sistema difficoltà completo
- ✅ Gioco pronto per il rilascio

**Obiettivo Finale**: Trasformare "Il Viaggio dell'Anima Perduta" in un'esperienza di gioco completa, complessa e gratificante che offre centinaia di ore di gameplay e infinite possibilità di scoperta.