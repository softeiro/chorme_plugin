const technicalReport = [
    "Trem de Pouso do Braço Esquerdo Frontal Danificado",
    "Corpo Principal do Braço Direito Danificado",
    "Cobertura do Braço Traseiro Danificado",
    "Aeronave - Placa principal Falha",
    "RC - Placa Principal com Falha",
    "RC - Conector USB com Intermitente",
    "Bateria RC-Plus Inchada",
    "RC-N1 - com marcas na capa superior",
    "RC-N1 - Falha na Placa Principal",
    "RC-N2 - Bateria RC-N2 Ausente",
    "Hélice CCW - Danificada",
    "Hélice de Baixo Ruído - com Marcas",
    "Hélice CW - ausente",
    "Hélice Preta - sem marcas",
    "Hélice Azul - com riscos",
    "(2) Bateria - Inchada",
    "Bateria 02 - Danificada",
    "Compartimento de Bateria Danificado",
    "Caixa de Bateria Danificada"
];

const keywords = {
    outOfWarranty: ["danificado", "danificada", "marcas", "riscos", "oxidação", "marca de agua", "desmontagem não autorizada"],
    underWarranty: ["falha", "intermitente", "inchada"],
    forSale: ["ausente", "não original"],
    withoutDamage: ["sem riscos", "sem marcas", "sem falha"]
};


function determineStatus(description) {
    const lowerDesc = description.toLowerCase();
    if (keywords.withoutDamage.some(word => lowerDesc.includes(word))) {
        return { status: "Without Damage", type: "Undetermined" };
    }
    if (keywords.outOfWarranty.some(word => lowerDesc.includes(word))) {
        return { status: "Out of Warranty", type: "Replacement" };
    }
    if (keywords.underWarranty.some(word => lowerDesc.includes(word))) {
        return { status: "Under Warranty", type: "Replacement" };
    }
    if (keywords.forSale.some(word => lowerDesc.includes(word))) {
        return { status: "Out of Warranty", type: "For Sale" };
    }
    return { status: "Undetermined", type: "Undetermined" };
}

function extractBeforeDash(sentence) {
    if (sentence.includes(" - ")) {
        return sentence.split(" - ")[0].replace(/\(.*?\)/g, '').trim();
    }
    return sentence;
}

function identifyComponent(description) {
    const regexComponents = /^(?:\(\d+\)\s*)?([^\-]+(?:-[^\-]+)*)\s+-\s+.+$/m;
    if(regexComponents.test(description)) {
        let match = extractBeforeDash(description);
        if (match) {
            match = match.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            return match !== "aeronave" && match !== "ac" && match !== "drone" ? match : "Aeronave";
        }
    }
    return "Aeronave"; 
}

let globalStatus = {
};

const groupedResult = technicalReport.reduce((acc, item) => {
    const component = identifyComponent(item);
    const status = determineStatus(item);

    const quantityMatch = item.match(/\((\d+)\)/)
    const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;
    if (status.status === "Out of Warranty") {
        globalStatus[component] = "Out of Warranty";
    }
    if (!acc[component]) {
        acc[component] = [];
    }

    acc[component].push({ ...status, quantity, description: item });

    return acc;
}, {});

const countedResult = {};
for (const component in groupedResult) {
    countedResult[component] = {};

    groupedResult[component].forEach(item => {
        const description = item.description.toLowerCase();
        if (!countedResult[component][description]) {
            countedResult[component][description] = { ...item, quantity: item.quantity };
        } else {
            countedResult[component][description].quantity += item.quantity; 
        }
    });
}

const finalResult = {};
for (const component in countedResult) {
    finalResult[component] = Object.values(countedResult[component]).map(item => ({
        ...item,
        description: `${item.description}`
    }));
}

for (const component in finalResult) {
    if (component === "Aircraft" && globalStatus["Aircraft"] === "Out of Warranty") {
        finalResult[component].forEach(item => {
            item.status = "Out of Warranty";
            item.type = "Replacement";
        });
    } else {
        if (globalStatus[component] === "Out of Warranty") {
            finalResult[component].forEach(item => {
                item.status = "Out of Warranty";
                item.type = "Replacement";
            });
        }
    }
}

console.log(finalResult);


function formatComponentStatus(groupedResult) {
    let formattedResult = "";
    let mainStatusMessage = "";

    for (const component in groupedResult) {
        const items = groupedResult[component];

        if (items.some(item => item.status === "Out of Warranty")) {
            mainStatusMessage = `${mainStatusMessage}[${component} Apresenta Danos Físicos]`;
        } else if (items.some(item => item.status === "Under Warranty")) {
            mainStatusMessage = `${mainStatusMessage}[${component} Não Apresenta Danos]`;
        } else if (items.some(item => item.status === "Without Damage")) {
            mainStatusMessage = `${mainStatusMessage}[${component} Está Funcionando Perfeitamente]`;
        }

        const descriptions = items.map(item => `[${item.description}]`).join("");
        formattedResult = `${formattedResult}${descriptions}`;
    }
    formattedResult = `${mainStatusMessage}${formattedResult}`;
    return formattedResult;
}

// console.log(formatComponentStatus(finalResult));
// console.log(formatComponentStatus(groupedResult));

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.data) {
//         if(request.data !== "getInfoPage") return;
//         const info = "Bolsonaro e Norte"; // Substitua isso pela informação real que você deseja retornar
//         sendResponse({ message: info });
//     }
//     return true;
// });

/*
popup.js
 chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { data: "getInfoPage" }, (response) => {
        if (response) {
            const value = textArea.value + response.message;
            chrome.storage.local.set({ savedText: value });

        }
    });
});

*/
/* if (window.location.href.includes('da')) {} */

/*
document.querySelectorAll('iframe').forEach(iframe => {
  iframe.addEventListener('load', () => {
    // codiguin
  });
});
window.addEventListener('load', () => {
  console.log('A página foi completamente carregada');
});
MutationObserver // Mudanças DOM
*/