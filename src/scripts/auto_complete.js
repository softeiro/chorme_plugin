
const keywordsForDamages = [
    "Danificado",
    "Falha",
    "Marcas",
    "Uso",
    "Trincado",
    "Riscado",
    "Danos",
    "Manchas",
    "Marca",
    "Uso",
    "Defeituoso",
    "Quebrado",
    "Quebrada",
    "Avariado",
    "Desgastado",
    "Desbotado",
    "Amassado",
    "Arranhado",
    "Encardido",
    "Enferrujado",
    "Rasgado",
    "Corroído",
    "Deformado",
    "Oxidado",
    "Deteriorado",
    "Fragilizado",
    "Descolado",
    "Manchado",
    "Queimado",
    "Desintegrado",
    "Estilhaçado",
    "Desalinhado",
    "Rachado",
    "Desbotamento",
    "Desgaste",
    "Fragilidade",
    "Enrugado",
    "Desmontado",
    "Folga",
    "Solto",
    "Deslocado",
    "Estragado",
    "Vincula",
    "Dano",
    "Opercional",
    "Estrutural",
    "Estético",
    "Não",
    "Funcionamento",
    "Imperfeições"
 ];
 const keywordsNoDamages = [
    "Sem Falha",
    "Descuido",
    "Leves",
    "Pequenos",
    "Normais",
    "Normal",
    "Sinal",
    "Sinais",
    "Liga",
    "Funciona",
    "Levemente",
    "Pequenas",
    "Nenhum",
    "Significativo",
    "Graves",
    "Visíveis",
    "Leve",
    "Funcionalidade Completa",
    "Conservado",
    "Rachaduras",
    "Operacional",
    "Trincas",
    "Fisicos",
    "Ausente",
    "Faltando",
    "Inexistente",
    "Inexistente"
 ];
 
 const othersKeyword = [
     // Direction
     "Placa",
     "Direito",
     "Esquerdo",
     "Traseiro",
     "Frontal",
     "Dianteiro",
     "Central",
     "Superior",
     "Superficie",
     "Inferior",
     "Lateral",
     "Diagonal",
     "Baixo",
     "Meio",
     "Cima",
     "Pitch",
     "Yaw",
     "Roll",
     "Tilt",
     "Pan",
     "Externo",
     "Principal",
     "Apresenta",
     // Itens
     "Controlador de voo",
     "Controle de Radio Frequência",
     "Flight Controller",
     "CoreBoard",
     "ESC",
     "IMU",
     "GPS",
     "Bussola",
     "RTK",
     "Bateria",
     "Motor",
     "Braço",
     "Eixo",
     "Tampa",
     "Cobertura",
     "Concha",
     "Caixa",
     "Compartimento",
     "Armação",
     "Lente",
     "Sensor",
     "Gimbal",
     "Motor",
     "Trem de Pouso",
     "Botão",
     "Conector",
     "Hélices",
     "Carregador",
     "Aeronave"
 ]
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 const allKeyWords = [...keywordsForDamages,...keywordsNoDamages,...othersKeyword]
// content.js

function splitLastWord(inputString) {
    const lastSpaceIndex = inputString.lastIndexOf(' ');

    if (lastSpaceIndex === -1) {
        return [inputString + ' ', false];
    }

    const partBeforeLastWord = inputString.substring(0, lastSpaceIndex + 1);
    const lastWord = inputString.substring(lastSpaceIndex + 1).trim();

    if (lastWord === '') {
        return [partBeforeLastWord, false];
    }

    return [partBeforeLastWord, lastWord];
}

function getTextWidth(text, fontSize, fontFamily) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = `${fontSize} ${fontFamily}`;
    return context.measureText(text).width;
}

function getElementPosition(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.error('Element not found');
        return null;
    }
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        right: rect.right + window.scrollX,
        bottom: rect.bottom + window.scrollY,
        width: rect.width,
        height: rect.height
    };
}

function createSuggestionSpan(inputField, newWord, currentWordLength) {
    const computedStyle = window.getComputedStyle(inputField);
    const fontSize = computedStyle.fontSize;
    const fontFamily = computedStyle.fontFamily;

    const suggestionSpan = document.createElement('span');
    suggestionSpan.id = "TXSUGG13";
    suggestionSpan.textContent = newWord.slice(currentWordLength);
    suggestionSpan.style.opacity = 0.5;
    suggestionSpan.style.position = "absolute";
    suggestionSpan.style.fontSize = fontSize;
    suggestionSpan.style.fontFamily = fontFamily;

    const textWidth = getTextWidth(inputField.value, fontSize, fontFamily);
    const basePosition = getElementPosition(`[jsname="${inputField.getAttribute('jsname')}"]`);

    suggestionSpan.style.top = `${basePosition.top + 3}px`;
    suggestionSpan.style.left = `${basePosition.left + textWidth + 3.9}px`;
    inputField.parentNode.insertBefore(suggestionSpan, inputField.nextSibling);
}

function autocompleteInput(inputField, newWord,afer,before) {
    let [inputText, inputAllText] = [inputField.value, ""];
    if (inputText.includes(' ')) {
        [inputAllText, inputText] = splitLastWord(inputField.value);
        if (inputText === false) return;
    }
    //const trimmedInputText = inputText.replace(/\s+$/, ''); 
    const newCursorPosition = before.length + newWord.length + 1; 
    inputField.value = before+newWord+" "+afer;

    setTimeout(() => {
        inputField.selectionStart = inputField.selectionEnd = newCursorPosition;    
        inputField.focus();
    }, 2);
    
    const existingSuggestion = inputField.parentNode.querySelector('#TXSUGG13');
    if (existingSuggestion) {
        existingSuggestion.remove();
    }
}

document.addEventListener('input', function(event) {
    const inputField = event.target;

    if ((inputField.tagName === 'INPUT' && inputField.type === 'text') || inputField.tagName === 'TEXTAREA') {
        const cursorPosition = inputField.selectionStart;
        const fullText = inputField.value;
        const textBeforeCursor = fullText.substring(0, cursorPosition);
        let [inputText, inputAllText] = [textBeforeCursor, ""];
        const existingSuggestion = inputField.parentNode.querySelector('#TXSUGG13');
        if (existingSuggestion) {
            existingSuggestion.remove();
        }
        if (inputText.includes(' ')) {
            [inputAllText, inputText] = splitLastWord(inputText); 
            if (inputText === false) return;
        } else {
            inputText = inputText.trim().split(/\s/).pop(); 
        }

        inputText = inputText.replace("[", '')
        if (inputText.length <= 0) return;
        console.log("Palavra busca:"+inputText.toLowerCase())
        const matches = allKeyWords.filter(keyword => keyword.toLowerCase().startsWith(inputText.toLowerCase()));
        if (matches.length > 0) {
            createSuggestionSpan(inputField, matches[0], inputText.length);
        }
    }
});

document.addEventListener('keydown', function(event) {
    const inputField = event.target;

    if ((inputField.tagName === 'INPUT' && inputField.type === 'text') || inputField.tagName === 'TEXTAREA') {
        if (event.key === 'Tab') {
            event.preventDefault();
            const existingSuggestion = inputField.parentNode.querySelector('#TXSUGG13');
            console.log(`valor:${ existingSuggestion.textContent}`)
            const cursorPosition = inputField.selectionStart;
            const fullText = inputField.value;
            const textAfterCursor = fullText.substring(cursorPosition);
            const textBeforeCursor = fullText.substring(0, cursorPosition);

            if (existingSuggestion) {
                autocompleteInput(inputField, existingSuggestion.textContent,textAfterCursor,textBeforeCursor);
            }
        }
    }
});
