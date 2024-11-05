const technicalReport = [
    "Trem de Pouso do Braço Esquerdo Frontal Danificado",
    "Corpo Principal do Braço Direito Danificado",
    "Cobertura do Braço Traseiro Danificado",
    "Aeronave - Placa principal Falha",
    "RC - Placa Principal com Falha",
    "RC - Conector USB com Intermitente",
    "Bateria RC-Plus Inchada",
    "RC-N1 Falha",
    "Bateria RC-N2 Ausente",
    "Hélice CCW Danificada",
    "Hélice de Baixo Ruído com Marcas",
    "Hélice CW danificada",
    "Hélice Preta sem marcas",
    "Hélice Azul com riscos",
    "(2) Bateria - Inchada",
    "Compartimento de Bateria Danificado",
    "Caixa de Bateria Danificada"
];

const keywords = {
    outOfWarranty: ["danificado", "danificada", "marcas", "riscos", "oxidação", "marca de agua", "desmontagem não autorizada"],
    underWarranty: ["falha", "intermitente", "inchada"],
    forSale: ["ausente", "não original"],
    withoutDamage: ["sem riscos", "sem marcas", "sem falha"]
};

const propellerTypes = ["CCW", "CW", "de Baixo Ruído", "Preta", "Azul"];
const propellerRegex = new RegExp(`Hélice (${propellerTypes.join("|")})`, "i");

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

function identifyComponent(description) {
    if (/RC(?:-\w+)?/.test(description)) {
        const match = description.match(/RC(?:-\w+)?/)[0];
        return `Controle ${match}`; 
    }
    if (/^Bateria(?:\s+\w+)*\s*-\s*\w+/i.test(description)) {
        const match = description.match(/^Bateria(?:\s+\w+)*(?=\s*-\s*\w+)/i);
        return `${match[0]}`; 
    }
    if (propellerRegex.test(description)) {
        const match = description.match(propellerRegex)[1];
        return `Hélice ${match}`;
    }
    return "Aircraft"; 
}

const globalStatus = {
    "Controller": {}, 
    "Aircraft": "Undetermined" 
};

const groupedResult = technicalReport.reduce((acc, item) => {
    const component = identifyComponent(item);
    const status = determineStatus(item);

    const quantityMatch = item.match(/\((\d+)\)/)
    const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;

    if (component.startsWith("Controle")) {
        const controllerType = component;
        if (status.status === "Out of Warranty") {
            globalStatus["Controller"][controllerType] = "Out of Warranty";
        }
    }
    if (component === "Aircraft" && status.status === "Out of Warranty") {
        globalStatus["Aircraft"] = "Out of Warranty";
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
    if (component.startsWith("Controle")) {
        const controllerType = component;
        if (globalStatus["Controller"][controllerType] === "Out of Warranty") {
            finalResult[component].forEach(item => {
                item.status = "Out of Warranty";
                item.type = "Replacement";
            });
        }
    }
    if (component === "Aircraft" && globalStatus["Aircraft"] === "Out of Warranty") {
        finalResult[component].forEach(item => {
            item.status = "Out of Warranty";
            item.type = "Replacement";
        });
    }
}

//console.log(finalResult);


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

console.log(formatComponentStatus(finalResult));
console.log(formatComponentStatus(groupedResult));

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.data) {
        if(request.data !== "getInfoPage") return;
        const info = "Bolsonaro e Norte"; // Substitua isso pela informação real que você deseja retornar
        sendResponse({ message: info });
    }
    return true;
});

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