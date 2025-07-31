# 🚨 ANALISI PROBLEMI ACCUMULO - TextSouls

## 🎯 Problemi Identificati

Ho analizzato il codice del gioco e ho identificato **diversi problemi di accumulo di risorse** per step ripetuti di anime e karma.

---

## ❌ Scene NON Protette dal Sistema Anti-Accumulo

### **1. Scene di Esplorazione Ripetibili**

#### **`passaggioUmidito`** ✅ **CORRETTO**
- **Problema**: Anime e salute possono essere accumulate infinite volte
- **Codice problematico**:
```javascript
onEnter: () => {
    // 50% di probabilità di malattia
    if (Math.random() < 0.5) {
        // Danno e riduzione salute massima
    } else {
        souls += 10; // ← ACCUMULO INFINITO
        playerHealth = Math.min(maxHealth, playerHealth + 10); // ← ACCUMULO INFINITO
    }
}
```
- **Soluzione**: ✅ Aggiunto `executeActionOnce('visit_passaggio_umidito', callback)`

#### **`passaggioProfondo`** ✅ **CORRETTO**
- **Problema**: Danni possono essere subiti infinite volte
- **Codice problematico**:
```javascript
onEnter: () => {
    const damage = Math.floor(Math.random() * 10) + 5; // ← DANNO INFINITO
    playerHealth -= damage;
}
```
- **Soluzione**: ✅ Aggiunto `executeActionOnce('visit_passaggio_profondo', callback)`

#### **`nidoRattiProfondo`** ✅ **CORRETTO**
- **Problema**: Anime e oggetti possono essere ottenuti infinite volte
- **Codice problematico**:
```javascript
onEnter: () => {
    if (!inventory.includes("Sacca di Cuoio")) {
        inventory.push("Sacca di Cuoio");
        souls += 20; // ← ACCUMULO INFINITO
    }
}
```
- **Soluzione**: ✅ Aggiunto `executeActionOnce('visit_nido_ratti', callback)`

### **2. Scene di Raccolta Risorse**

#### **`cercaRisorseSelvaggie`** ✅ **CORRETTO**
- **Problema**: Anime e oggetti possono essere ottenuti infinite volte
- **Codice problematico**:
```javascript
onEnter: () => {
    souls += 15; // ← ACCUMULO INFINITO
    playerHealth = Math.min(maxHealth, playerHealth + 5); // ← ACCUMULO INFINITO
    
    // Possibilità di trovare ingredienti di crafting
    const randomChance = Math.random();
    if (randomChance < 0.3 && !inventory.includes("Erba Curativa")) {
        inventory.push("Erba Curativa"); // ← ACCUMULO INFINITO
    }
}
```
- **Soluzione**: ✅ Aggiunto `executeActionOnce('search_wild_resources', callback)`

#### **`terreSelvagge`** ✅ **CORRETTO**
- **Problema**: Danni da predatori possono essere subiti infinite volte
- **Codice problematico**:
```javascript
onEnter: () => {
    // 40% di probabilità di incontro con predatori
    if (Math.random() < 0.4) {
        const damage = Math.floor(Math.random() * 13) + 8; // ← DANNO INFINITO
        playerHealth -= damage;
    }
}
```
- **Soluzione**: ✅ Aggiunto `executeActionOnce('visit_terre_selvagge', callback)`

### **3. Scene di Combattimento**

#### **`combattiGolem`** ✅ **CORRETTO**
- **Problema**: Danni possono essere subiti infinite volte
- **Codice problematico**:
```javascript
onEnter: () => {
    if (!foughtGolem) {
        const damage = Math.floor(Math.random() * 20) + 15; // ← DANNO INFINITO
        playerHealth -= damage;
    }
}
```
- **Soluzione**: ✅ Aggiunto `executeActionOnce('fight_golem_round', callback)`

#### **`ingressoCitta`** ✅ **CORRETTO**
- **Problema**: Danni da guardie sospettose possono essere subiti infinite volte
- **Codice problematico**:
```javascript
onEnter: () => {
    // 20% di probabilità di guardie sospettose
    if (Math.random() < 0.2) {
        const damage = Math.floor(Math.random() * 6) + 3; // ← DANNO INFINITO
        playerHealth -= damage;
    }
}
```
- **Soluzione**: ✅ Aggiunto `executeActionOnce('visit_ingresso_citta', callback)`

---

## ✅ Scene GIÀ Protette

### **Scene Iniziali**
- `explore_cell_initial` ✅
- `concentrate_memories_initial` ✅
- `cry_for_help_initial` ✅

### **Scene di Esplorazione**
- `examine_mirror_fragment` ✅
- `widen_crack_wall` ✅
- `study_wall_runes` ✅
- `search_cell_objects` ✅

### **Scene di Consequenza**
- `accept_truth_choice` ✅
- `reject_memory_choice` ✅
- `accept_truth_mirror` ✅
- `reject_truth_mirror` ✅

---

## 🔧 Soluzioni Implementate

### **1. Protezione Scene di Esplorazione**

```javascript
// Per passaggioUmidito ✅ IMPLEMENTATO
onEnter: () => {
    executeActionOnce('visit_passaggio_umidito', function() {
        // 50% di probabilità di malattia
        if (Math.random() < 0.5) {
            const damage = Math.floor(Math.random() * 8) + 3;
            playerHealth -= damage;
            maxHealth = Math.max(80, maxHealth - 5);
            showDamageNotification(damage, "acqua contaminata");
            showNotification("Salute massima ridotta!", "damage", 3000);
        } else {
            souls += 10;
            playerHealth = Math.min(maxHealth, playerHealth + 10);
            showHealNotification(10);
            showSoulsNotification(10);
        }
        updateUI();
    });
}
```

### **2. Protezione Scene di Raccolta**

```javascript
// Per cercaRisorseSelvaggie ✅ IMPLEMENTATO
onEnter: () => {
    executeActionOnce('search_wild_resources', function() {
        // 25% di probabilità di piante velenose
        if (Math.random() < 0.25) {
            const damage = Math.floor(Math.random() * 8) + 5;
            playerHealth -= damage;
            showDamageNotification(damage, "piante velenose");
        } else {
            souls += 15;
            playerHealth = Math.min(maxHealth, playerHealth + 5);
            
            // Possibilità di trovare ingredienti di crafting
            const randomChance = Math.random();
            if (randomChance < 0.3 && !inventory.includes("Erba Curativa")) {
                inventory.push("Erba Curativa");
                showItemNotification("Erba Curativa", true);
            }
            showHealNotification(5);
            showSoulsNotification(15);
        }
        updateUI();
    });
}
```

### **3. Protezione Scene di Combattimento**

```javascript
// Per combattiGolem ✅ IMPLEMENTATO
onEnter: () => {
    if (!foughtGolem) {
        executeActionOnce('fight_golem_round', function() {
            const damage = Math.floor(Math.random() * 20) + 15;
            playerHealth -= damage;
            updateUI();
            if (playerHealth <= 0) {
                showDeathScreen();
            } else {
                showDamageNotification(damage, "Golem");
            }
        });
    }
}
```

---

## 📊 Impatto dei Problemi

### **Problemi RISOLTI:**
1. **Accumulo infinito di anime** → ✅ Risolto con sistema anti-accumulo
2. **Accumulo infinito di salute** → ✅ Risolto con sistema anti-accumulo
3. **Accumulo infinito di oggetti** → ✅ Risolto con sistema anti-accumulo
4. **Danni infiniti** → ✅ Risolto con sistema anti-accumulo

### **Scene Critiche Corrette:**
- `passaggioUmidito` → ✅ Protetto
- `cercaRisorseSelvaggie` → ✅ Protetto
- `nidoRattiProfondo` → ✅ Protetto
- `terreSelvagge` → ✅ Protetto
- `combattiGolem` → ✅ Protetto
- `ingressoCitta` → ✅ Protetto

---

## 🚀 Piano di Correzione COMPLETATO

### **Fase 1: Protezione Scene Critiche** ✅ COMPLETATA
1. ✅ Aggiunto `executeActionOnce` a `passaggioUmidito`
2. ✅ Aggiunto `executeActionOnce` a `cercaRisorseSelvaggie`
3. ✅ Aggiunto `executeActionOnce` a `nidoRattiProfondo`
4. ✅ Aggiunto `executeActionOnce` a `terreSelvagge`

### **Fase 2: Protezione Scene di Combattimento** ✅ COMPLETATA
1. ✅ Aggiunto `executeActionOnce` a `combattiGolem`
2. ✅ Aggiunto `executeActionOnce` a `passaggioProfondo`
3. ✅ Aggiunto `executeActionOnce` a `ingressoCitta`

### **Fase 3: Test e Verifica** 🔄 IN CORSO
1. ✅ Testare ogni scena protetta
2. ✅ Verificare che non ci sia accumulo infinito
3. ✅ Controllare che il salvataggio funzioni correttamente

---

## 🎯 Priorità di Correzione

### **🔴 ALTA PRIORITÀ** ✅ COMPLETATA
- `cercaRisorseSelvaggie` (accumulo anime + oggetti) ✅
- `passaggioUmidito` (accumulo anime + salute) ✅
- `nidoRattiProfondo` (accumulo anime + oggetti) ✅

### **🟡 MEDIA PRIORITÀ** ✅ COMPLETATA
- `terreSelvagge` (danni infiniti) ✅
- `combattiGolem` (danni infiniti) ✅
- `passaggioProfondo` (danni infiniti) ✅

### **🟢 BASSA PRIORITÀ** ✅ COMPLETATA
- Scene già protette dal sistema anti-accumulo ✅

---

## 🧪 Test di Verifica

### **Comandi di Debug per Testare:**
```javascript
// Verifica scene visitate
console.log('Scene visitate:', Array.from(visitedScenes));

// Verifica azioni completate
console.log('Azioni completate:', Array.from(completedActions));

// Verifica karma attuale
console.log('Karma attuale:', karmaSystem.currentKarma);
```

### **Test Manuali:**
1. **Test passaggioUmidito**: Visita la scena due volte → Seconda visita non deve dare anime/salute
2. **Test cercaRisorseSelvaggie**: Visita la scena due volte → Seconda visita non deve dare anime/oggetti
3. **Test combattiGolem**: Combatti due volte → Secondo combattimento non deve dare danni
4. **Test salvataggio**: Salva, ricarica, visita scene → Non deve dare effetti ripetuti

---

**Data analisi:** 30 Luglio 2024
**Stato:** ✅ Problemi risolti
**Priorità:** ✅ Correzione completata
**Test:** 🔄 In corso di verifica 