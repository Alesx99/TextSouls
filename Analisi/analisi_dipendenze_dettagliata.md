# ANALISI DETTAGLIATA DELLE DIPENDENZE E COLLEGAMENTI

## 🔗 MAPPA DEI COLLEGAMENTI TRA SCENE

### 📍 SCENE PRINCIPALI E LORO DIPENDENZE

#### 1. **Cella Iniziale** (Hub principale)
- **Dipendenze**: Nessuna
- **Collegamenti**: 
  - → `esploraCella` (sempre disponibile)
  - → `ricordaPassato` (sempre disponibile)
  - → `gridaAiuto` (sempre disponibile)
- **Problemi**: Tutti i percorsi tornano indietro (loop)

#### 2. **Esplora Cella** (Punto di decisione)
- **Dipendenze**: Nessuna
- **Collegamenti**:
  - → `tunnelSegreto` (sempre disponibile)
  - → `cercaNellaCella` (sempre disponibile)
- **Flag**: `foundSecretTunnel` (salvato automaticamente)

#### 3. **Tunnel Segreto** (Percorso A)
- **Dipendenze**: Nessuna
- **Collegamenti**:
  - → `cunicoloBuio` (sempre disponibile)
  - → `esploraCella` (ritorno)
- **Flag**: `foundSecretTunnel = true`

#### 4. **Cerca nella Cella** (Percorso B)
- **Dipendenze**: Nessuna
- **Collegamenti**:
  - → `tentativoPorta` (richiede "Chiave Arrugginita")
  - → `esploraCella` (ritorno)
- **Oggetti**: Aggiunge "Chiave Arrugginita" all'inventario

#### 5. **Tentativo Porta** (Checkpoint)
- **Dipendenze**: `requiredItems: ["Chiave Arrugginita"]`
- **Collegamenti**:
  - → `corridoioOscuro` (se ha la chiave)
- **Problemi**: Se non ha la chiave, rimane bloccato

## 🎯 SISTEMA DI FLAG E STATI

### Flag Principali
```javascript
let hasKey = false;           // Chiave Arrugginita
let hasMap = false;           // Mappa Rudimentale
let foundSecretTunnel = false; // Tunnel segreto scoperto
let foughtGolem = false;      // Golem sconfitto
let exploredDeepCrypt = false; // Cripta profonda esplorata
```

### Stati del Giocatore
```javascript
let playerHealth;     // Salute attuale (0-100)
let souls;           // Valuta di gioco
let inventory;       // Array di oggetti
let currentScene;    // Scena attuale
let lastSacredFire;  // Ultimo punto di salvataggio
```

## 🔄 ANALISI DEI LOOP E DEAD-END

### ❌ LOOP IDENTIFICATI

#### 1. **Loop Ricorda Passato**
```
cellaIniziale → ricordaPassato → cellaIniziale
```
**Problema**: Nessuna progressione, solo frustrazione

#### 2. **Loop Grida Aiuto**
```
cellaIniziale → gridaAiuto → esploraCella → cellaIniziale
```
**Problema**: Nessuna conseguenza, nessuna progressione

#### 3. **Loop Cerca Manufatti**
```
rovineTempio → cercaManufatti → rovineTempio
```
**Problema**: Solo ricompensa, nessuna progressione

#### 4. **Loop Combattimento Mummia**
```
criptaAntica → apriSarcofago → criptaAntica
```
**Problema**: Combattimento non implementato

### ❌ DEAD-END IDENTIFICATI

#### 1. **Finale Vittoria**
```
santuarioFinale → finaleVittoria → Schermata Iniziale
```
**Problema**: Non è un vero finale, riporta all'inizio

#### 2. **Mercante Pozioni**
```
distrettoMercantile → mercantePozioni → distrettoMercantile
```
**Problema**: Solo acquisti, nessuna progressione

## 🎮 SISTEMA DI OGGETTI E DIPENDENZE

### Oggetti Implementati
1. **Chiave Arrugginita**
   - **Ottenuto**: `cercaNellaCella`
   - **Utilizzato**: `tentativoPorta`
   - **Status**: ✅ Funzionante

2. **Mappa Rudimentale**
   - **Ottenuto**: `grottaLuminosa`
   - **Utilizzato**: `combattiGolem` (punto debole)
   - **Status**: ✅ Funzionante

3. **Pozione di Salute**
   - **Ottenuto**: `mercantePozioni` (acquisto)
   - **Utilizzato**: Sistema di cura automatico
   - **Status**: ✅ Funzionante

### Oggetti Non Utilizzabili
1. **Amuleto Antico**
   - **Ottenuto**: `apriSarcofago`
   - **Utilizzato**: ❌ Nessun uso
   - **Status**: ❌ Incompleto

2. **Pergamena di Rune**
   - **Ottenuto**: `criptaProfonda` o `cercaTesoriCripta`
   - **Utilizzato**: ❌ Nessun uso
   - **Status**: ❌ Incompleto

3. **Sacca di Cuoio**
   - **Ottenuto**: `nidoRattiProfondo`
   - **Utilizzato**: ❌ Solo decorativo
   - **Status**: ❌ Incompleto

## 🔥 SISTEMA FUOCHI SACRI

### Fuochi Sacri Implementati
1. **Cella Iniziale** (default)
   - **Posizione**: `lastSacredFire = "cellaIniziale"`
   - **Status**: ✅ Funzionante

2. **Città Fuoco Sacro**
   - **Posizione**: `cercaFuocoSacro`
   - **Posizione**: `lastSacredFire = "cittaFuocoSacro"`
   - **Status**: ✅ Funzionante

### Fuochi Sacri Mancanti
1. **Fuoco Sacro Prigione** (dopo Golem)
2. **Fuoco Sacro Tempio** (dopo Cripta)
3. **Fuoco Sacro Terre Selvagge** (punto intermedio)

## ⚔️ SISTEMA DI COMBATTIMENTO

### Combattimenti Implementati
1. **Golem**
   - **Posizione**: `salaGolem`
   - **Meccaniche**: Danni casuali, punti deboli
   - **Status**: ✅ Funzionante

2. **Ratti Giganti**
   - **Posizione**: `passaggioProfondo`
   - **Meccaniche**: Danni casuali, fuga possibile
   - **Status**: ✅ Funzionante

### Combattimenti Incompleti
1. **Mummia**
   - **Posizione**: `apriSarcofago`
   - **Meccaniche**: ❌ Non implementato
   - **Status**: ❌ Loop infinito

## 📊 STATISTICHE DETTAGLIATE

### Scene per Percorso
- **Percorso A (Tunnel)**: 6 scene
- **Percorso B (Porta)**: 8 scene
- **Percorso C (Terre)**: 5 scene
- **Percorso D (Città)**: 3 scene
- **Percorso E (Tempio)**: 6 scene

### Dipendenze Critiche
- **Oggetti Richiesti**: 3 scene
- **Flag Richiesti**: 5 scene
- **Salute Minima**: 2 scene
- **Anime Minime**: 1 scena

### Problemi di Bilanciamento
- **Danni Golem**: 20-44 (troppo alti)
- **Danni Ratti**: 5-14 (bilanciati)
- **Danni Mummia**: 10-39 (non testato)
- **Ricompense**: 10-50 anime (bilanciate)

## 🛠️ RACCOMANDAZIONI IMMEDIATE

### Priorità 1 (Critico)
1. **Fix Loop Infiniti**: Completare route incomplete
2. **Fix Salvataggio**: Implementare più fuochi sacri
3. **Fix Combattimento**: Completare sistema mummia
4. **Fix Oggetti**: Rendere utilizzabili Amuleto e Pergamena

### Priorità 2 (Importante)
1. **Bilanciamento Danni**: Ridurre danni Golem
2. **Nuove Scene**: Aggiungere progressione
3. **Sistema Achievement**: Implementare tracking
4. **Multiple Ending**: Creare finali alternativi

### Priorità 3 (Miglioramento)
1. **Animazioni**: Aggiungere transizioni
2. **Effetti Sonori**: Migliorare immersione
3. **Statistiche**: Tracciare progresso
4. **Easter Eggs**: Aggiungere contenuti nascosti 