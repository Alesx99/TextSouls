# 🧪 TEST SISTEMA ANTI-ACCUMULO - TextSouls

## 🎯 Obiettivo del Test

Verificare che il sistema anti-accumulo funzioni correttamente e prevenga l'accumulo infinito di karma e anime.

---

## 📋 Checklist di Test

### **1. Test Scene Iniziali**
- [ ] Avvia nuova partita
- [ ] Scegli "Esplora la cella con attenzione"
- [ ] Verifica che il flashback si attivi (prima volta)
- [ ] Torna alla cella e ripeti la scelta
- [ ] Verifica che il flashback NON si attivi (seconda volta)
- [ ] Controlla che il karma non aumenti

### **2. Test Scene di Esplorazione**
- [ ] Scegli "Studia le rune sulle pareti"
- [ ] Verifica che il karma aumenti di +15 (prima volta)
- [ ] Torna a "esploraCella" e ripeti la scelta
- [ ] Verifica che il karma NON aumenti (seconda volta)

### **3. Test Scene di Consequenza**
- [ ] Scegli "Continua a leggere, devi sapere tutto"
- [ ] Verifica che il karma aumenti di +25 (prima volta)
- [ ] Torna indietro e ripeti la scelta
- [ ] Verifica che il karma NON aumenti (seconda volta)

### **4. Test Salvataggio**
- [ ] Completa alcune azioni
- [ ] Salva il gioco
- [ ] Ricarica la pagina
- [ ] Carica il salvataggio
- [ ] Verifica che le azioni completate non diano più karma

### **5. Test Reset**
- [ ] Avvia una nuova partita
- [ ] Verifica che tutte le azioni siano disponibili di nuovo
- [ ] Controlla che il karma sia a 0

---

## 🔍 Verifica Console

### **Comandi di Debug**
```javascript
// Verifica scene visitate
console.log('Scene visitate:', Array.from(visitedScenes));

// Verifica azioni completate
console.log('Azioni completate:', Array.from(completedActions));

// Verifica karma attuale
console.log('Karma attuale:', karmaSystem.currentKarma);
```

### **Risultati Attesi**
- **Prima volta:** Azione eseguita + effetti applicati
- **Ripetizione:** Azione eseguita ma senza effetti
- **Nuova partita:** Tutti i flag resettati

---

## 🚨 Problemi da Verificare

### **Se il sistema non funziona:**
1. **Controlla console** per errori JavaScript
2. **Verifica localStorage** per salvataggio corretto
3. **Testa una scena alla volta** per isolare il problema
4. **Controlla i flag** con i comandi di debug

### **Se il karma continua ad accumularsi:**
1. **Verifica che `executeActionOnce` sia chiamata**
2. **Controlla che gli ID delle azioni siano univoci**
3. **Verifica che i flag siano salvati correttamente**

---

## 📊 Risultati del Test

### **✅ Se tutto funziona:**
- Nessun accumulo infinito di karma
- Scene ripetibili ma senza effetti
- Salvataggio e caricamento corretti
- Reset completo con nuova partita

### **❌ Se ci sono problemi:**
- Identificare quale azione non è protetta
- Verificare la sintassi del codice
- Controllare la logica di salvataggio

---

**Data test:** [DATA]
**Testato da:** [NOME]
**Stato:** [SUCCESSO/PROBLEMI] 