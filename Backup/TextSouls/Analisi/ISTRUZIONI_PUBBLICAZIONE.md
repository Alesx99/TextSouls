# 📋 Istruzioni per la Pubblicazione su GitHub Pages

## 🚀 Passi per Pubblicare TextSouls

### 1. Preparazione Repository
✅ **COMPLETATO**: I file necessari sono già pronti:
- `index.html` - Landing page principale
- `game.html` - Il gioco completo
- `README.md` - Documentazione del progetto
- `.gitignore` - Esclude file non necessari
- `.github/workflows/deploy.yml` - Workflow per deploy automatico

### 2. Push su GitHub
Esegui questi comandi nel terminale:

```bash
# Inizializza il repository Git (se non già fatto)
git init

# Aggiungi tutti i file
git add .

# Fai il primo commit
git commit -m "Initial commit: TextSouls game"

# Aggiungi il repository remoto (sostituisci con il tuo username)
git remote add origin https://github.com/Alesx99/TextSouls.git

# Push sul branch main
git push -u origin main
```

### 3. Configurazione GitHub Pages

1. **Vai su GitHub**: Apri https://github.com/Alesx99/TextSouls
2. **Vai in Settings**: Clicca su "Settings" nella barra superiore
3. **Scorri fino a Pages**: Trova la sezione "Pages" nel menu laterale
4. **Configura il Source**:
   - Source: "Deploy from a branch"
   - Branch: "gh-pages" (verrà creato automaticamente dal workflow)
   - Folder: "/ (root)"
5. **Salva**: Clicca "Save"

### 4. Verifica del Deploy

Dopo il push, GitHub Actions:
1. **Eseguirà automaticamente** il workflow di deploy
2. **Creerà il branch gh-pages** con i file del sito
3. **Pubblicherà il sito** su GitHub Pages

Il sito sarà disponibile a: `https://alesx99.github.io/TextSouls`

### 5. Test del Sito

Una volta pubblicato, testa:
- ✅ La landing page si carica correttamente
- ✅ Il pulsante "Inizia l'Avventura" funziona
- ✅ Il gioco si avvia senza errori
- ✅ Il salvataggio funziona
- ✅ Il design è responsive

## 🔧 Risoluzione Problemi

### Se il sito non si carica:
1. Verifica che il branch `gh-pages` sia stato creato
2. Controlla che i file siano presenti nel branch
3. Aspetta qualche minuto per la propagazione

### Se il gioco non funziona:
1. Controlla la console del browser per errori JavaScript
2. Verifica che tutti i file siano stati caricati
3. Testa localmente prima del push

### Se il workflow fallisce:
1. Controlla i log in Actions > Deploy to GitHub Pages
2. Verifica che il repository sia pubblico
3. Controlla che il token GITHUB_TOKEN sia disponibile

## 📝 Note Importanti

- **Repository Pubblico**: GitHub Pages richiede un repository pubblico per il deploy gratuito
- **Branch gh-pages**: Viene creato automaticamente dal workflow
- **Cache del Browser**: Potrebbe essere necessario svuotare la cache per vedere le modifiche
- **HTTPS**: Il sito sarà automaticamente servito su HTTPS

## 🎯 Prossimi Passi

Dopo la pubblicazione:
1. **Condividi il link** con amici e colleghi
2. **Raccogli feedback** sui social media
3. **Aggiorna il README** con il link al sito live
4. **Considera miglioramenti** basati sui feedback

---

**Buona pubblicazione!** 🚀 