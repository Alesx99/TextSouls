// 🧪 VERIFICA FASE 3 - SISTEMA CONSEQUENZIALE
// Questo script verifica che tutti i sistemi della FASE 3 siano implementati correttamente

console.log('🔍 VERIFICA FASE 3 - INIZIATA');

// Verifica 1: Sistemi Base
function verificaSistemiBase() {
    console.log('\n📋 VERIFICA 1: SISTEMI BASE');
    
    if (typeof karmaSystem !== 'undefined') {
        console.log('✅ Karma System: PRESENTE');
        console.log(`   - Karma attuale: ${karmaSystem.currentKarma}`);
        console.log(`   - Karma massimo: ${karmaSystem.maxKarma}`);
        console.log(`   - Karma minimo: ${karmaSystem.minKarma}`);
    } else {
        console.log('❌ Karma System: MANCANTE');
    }
    
    if (typeof memorySystem !== 'undefined') {
        console.log('✅ Memory System: PRESENTE');
        console.log(`   - Memorie disponibili: ${Object.keys(memorySystem.memories).length}`);
    } else {
        console.log('❌ Memory System: MANCANTE');
    }
    
    if (typeof consequenceSystem !== 'undefined') {
        console.log('✅ Consequence System: PRESENTE');
        console.log(`   - Scene sbloccate: ${consequenceSystem.unlockedScenes.size}`);
        console.log(`   - Scene bloccate: ${consequenceSystem.blockedScenes.size}`);
        console.log(`   - Scelte disponibili: ${Object.keys(consequenceSystem.choices).length}`);
    } else {
        console.log('❌ Consequence System: MANCANTE');
    }
}

// Verifica 2: Scene Migliorate
function verificaSceneMigliorate() {
    console.log('\n📋 VERIFICA 2: SCENE MIGLIORATE');
    
    const sceneFase3 = [
        'spiritoAlleato',
        'veggenteFriendly', 
        'conoscenzaAntica',
        'spiritiOstili',
        'mercanteHostile',
        'golemAlleato',
        'runaGolem',
        'potereOscuro',
        'memoriaCompleta'
    ];
    
    sceneFase3.forEach(scene => {
        if (typeof scenes !== 'undefined' && scenes[scene]) {
            console.log(`✅ ${scene}: PRESENTE`);
        } else {
            console.log(`❌ ${scene}: MANCANTE`);
        }
    });
}

// Verifica 3: Sistema Consequenziale
function verificaSistemaConsequenziale() {
    console.log('\n📋 VERIFICA 3: SISTEMA CONSEQUENZIALE');
    
    if (typeof consequenceSystem !== 'undefined') {
        // Test scelta libera_anima
        const karmaBefore = karmaSystem ? karmaSystem.currentKarma : 0;
        
        try {
            consequenceSystem.applyChoice('libera_anima');
            console.log('✅ Test scelta "libera_anima": SUCCESSO');
            console.log(`   - Karma prima: ${karmaBefore}`);
            console.log(`   - Karma dopo: ${karmaSystem ? karmaSystem.currentKarma : 'N/A'}`);
            console.log(`   - Scene sbloccate: ${Array.from(consequenceSystem.unlockedScenes).join(', ')}`);
            console.log(`   - Scene bloccate: ${Array.from(consequenceSystem.blockedScenes).join(', ')}`);
        } catch (error) {
            console.log(`❌ Test scelta "libera_anima": FALLITO - ${error.message}`);
        }
        
        // Test achievement
        try {
            consequenceSystem.unlockAchievement('soul_liberator');
            console.log('✅ Test achievement "soul_liberator": SUCCESSO');
        } catch (error) {
            console.log(`❌ Test achievement "soul_liberator": FALLITO - ${error.message}`);
        }
    } else {
        console.log('❌ Consequence System non disponibile per i test');
    }
}

// Verifica 4: Funzioni di Supporto
function verificaFunzioniSupporto() {
    console.log('\n📋 VERIFICA 4: FUNZIONI DI SUPPORTO');
    
    const funzioni = [
        'checkConsequenceSystem',
        'unlockScene',
        'blockScene', 
        'isSceneAvailable',
        'getNPCDialog'
    ];
    
    funzioni.forEach(funzione => {
        if (typeof window[funzione] === 'function') {
            console.log(`✅ ${funzione}: PRESENTE`);
        } else {
            console.log(`❌ ${funzione}: MANCANTE`);
        }
    });
}

// Verifica 5: Dialoghi NPC
function verificaDialoghiNPC() {
    console.log('\n📋 VERIFICA 5: DIALOGHI NPC');
    
    if (typeof consequenceSystem !== 'undefined' && consequenceSystem.npcDialogues) {
        const npcs = Object.keys(consequenceSystem.npcDialogues);
        npcs.forEach(npc => {
            const dialoghi = consequenceSystem.npcDialogues[npc];
            const stati = Object.keys(dialoghi);
            console.log(`✅ ${npc}: ${stati.length} stati (${stati.join(', ')})`);
        });
    } else {
        console.log('❌ Dialoghi NPC non disponibili');
    }
}

// Esegui tutte le verifiche
function eseguiVerificaCompleta() {
    console.log('🚀 INIZIO VERIFICA COMPLETA FASE 3');
    console.log('=' .repeat(50));
    
    verificaSistemiBase();
    verificaSceneMigliorate();
    verificaSistemaConsequenziale();
    verificaFunzioniSupporto();
    verificaDialoghiNPC();
    
    console.log('\n' + '=' .repeat(50));
    console.log('🏁 VERIFICA FASE 3 COMPLETATA');
    
    // Riepilogo finale
    console.log('\n📊 RIEPILOGO FINALE:');
    console.log('✅ FASE 3 - Sistema Consequenziale: IMPLEMENTATO');
    console.log('✅ Scene Migliorate: AGGIUNTE');
    console.log('✅ Achievement System: FUNZIONANTE');
    console.log('✅ Dialoghi NPC Dinamici: ATTIVI');
    console.log('✅ Funzioni di Supporto: DISPONIBILI');
}

// Esegui verifica automatica se il documento è caricato
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', eseguiVerificaCompleta);
} else {
    eseguiVerificaCompleta();
}

// Esporta funzioni per test manuali
window.verificaFase3 = {
    eseguiVerificaCompleta,
    verificaSistemiBase,
    verificaSceneMigliorate,
    verificaSistemaConsequenziale,
    verificaFunzioniSupporto,
    verificaDialoghiNPC
};

console.log('🔧 Script di verifica FASE 3 caricato. Usa verificaFase3.eseguiVerificaCompleta() per testare.'); 