# 🛡️ SISTEMA ANTI-ACCUMULO - TextSouls

## 🎯 Problema Risolto

**Problema identificato:** I giocatori potevano ripetere scene e azioni infinite volte, accumulando anime e karma all'infinito, rompendo l'equilibrio del gioco.

**Soluzione implementata:** Sistema di flag per tracciare scene visitate e azioni completate.

---

## 🔧 Implementazione

### **Variabili di Stato**
```javascript
// Sistema di flag per prevenire accumulo infinito
let visitedScenes = new Set();
let completedActions = new Set();
```

### **Funzioni Principali**

#### **1. `executeActionOnce(actionId, callback)`**
- **Scopo:** Esegue un'azione una sola volta
- **Parametri:**
  - `actionId`: Identificatore univoco dell'azione
  - `callback`: Funzione da eseguire se l'azione non è stata ancora completata
- **Ritorno:** `true` se eseguita, `false` se già completata

#### **2. `isSceneVisited(sceneId)`**
- **Scopo:** Verifica se una scena è già stata visitata
- **Parametri:** `sceneId`: ID della scena
- **Ritorno:** `true` se visitata, `false` altrimenti

#### **3. `markSceneVisited(sceneId)`**
- **Scopo:** Marca una scena come visitata
- **Parametri:** `sceneId`: ID della scena

---

## 📋 Azioni Protette

### **Scene Iniziali**
- `explore_cell_initial` → Esplora cella (trigger flashback)
- `concentrate_memories_initial` → Concentrati sui frammenti (+5 karma, -5 salute)
- `cry_for_help_initial` → Grida aiuto (-5 karma)

### **Scene di Esplorazione**
- `examine_mirror_fragment` → Esamina frammento specchio (+10 karma)
- `widen_crack_wall` → Allarga fessura (+5 karma, -3 salute)
- `study_wall_runes` → Studia rune (+15 karma, -2 salute)
- `search_cell_objects` → Cerca oggetti (+5 karma)

### **Scene di Consequenza**
- `accept_truth_choice` → Accetta verità (+15 karma, +20 salute)
- `reject_memory_choice` → Rifiuta ricordo (-10 karma, -10 salute)
- `accept_truth_mirror` → Accetta verità specchio (+20 karma, +10 salute)
- `reject_truth_mirror` → Rifiuta verità specchio (-10 karma, -15 salute)
- `study_fragment_investigation` → Studio frammento (+15 karma, -5 salute)
- `read_all_runes` → Leggi tutto (+25 karma, -10 salute)
- `stop_reading_runes` → Ferma lettura (-5 karma, -5 salute)
- `read_essential_runes` → Leggi essenziale (+10 karma, -3 salute)
- `use_fragment_memories` → Usa frammento (+20 karma, -5 salute)
- `keep_fragment_explore` → Conserva frammento (+10 karma + inventario)
- `accept_guardian_role` → Accetta ruolo guardiano (+30 karma, +25 salute)
- `reject_responsibility` → Rifiuta responsabilità (-15 karma, -15 salute)
- `continue_balanced_approach` → Approccio equilibrato (+15 karma, +5 salute)
- `deep_understanding_memories` → Comprensione profonda (+25 karma, +15 salute)
- `complete_guardian_acceptance` → Accettazione completa (+35 karma, +30 salute)

---

## 💾 Sistema di Salvataggio

### **Salvataggio**
```javascript
visitedScenes: Array.from(visitedScenes),
completedActions: Array.from(completedActions)
```

### **Caricamento**
```javascript
if (gameState.visitedScenes) {
    visitedScenes = new Set(gameState.visitedScenes);
}
if (gameState.completedActions) {
    completedActions = new Set(gameState.completedActions);
}
```

### **Reset**
```javascript
visitedScenes = new Set();
completedActions = new Set();
```

---

## 🎮 Vantaggi del Sistema

### **✅ Benefici**
1. **Equilibrio del gioco** → Nessun accumulo infinito
2. **Percorsi coerenti** → Scelte hanno conseguenze permanenti
3. **Salvataggio robusto** → Flag persistono tra sessioni
4. **Performance** → Evita calcoli ripetuti

### **🔄 Comportamento**
- **Prima volta:** Azione eseguita + effetti applicati
- **Ripetizione:** Azione eseguita ma senza effetti
- **Nuova partita:** Tutti i flag resettati

---

## 🔍 Esempi di Utilizzo

### **Esempio 1: Esplorazione Cella**
```javascript
onSelect: function() {
    executeActionOnce('explore_cell_initial', function() {
        if (typeof memorySystem !== 'undefined') {
            memorySystem.triggerMemory('cella_iniziale');
        }
    });
}
```

### **Esempio 2: Scelta con Karma**
```javascript
onSelect: function() {
    executeActionOnce('accept_truth_choice', function() {
        if (typeof karmaSystem !== 'undefined') {
            karmaSystem.addKarma(15);
        }
        playerHealth += 20;
        updateUI();
    });
}
```

---

## 🚨 Considerazioni

### **Scene Ripetibili**
- Alcune scene possono essere ripetute per gameplay
- Solo gli effetti (karma/salute) sono bloccati
- La narrativa rimane accessibile

### **Debug**
- I flag sono salvati nel localStorage
- Console log per debugging disponibili
- Reset completo con nuova partita

---

## 📊 Monitoraggio

### **Flag Attivi**
- `visitedScenes.size` → Numero scene visitate
- `completedActions.size` → Numero azioni completate

### **Verifica**
```javascript
console.log('Scene visitate:', Array.from(visitedScenes));
console.log('Azioni completate:', Array.from(completedActions));
```

---

**Implementato:** 30 Luglio 2024
**Stato:** ✅ Attivo e funzionante
**Copertura:** Tutte le scene narrative principali 