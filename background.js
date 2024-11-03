const keywordsForDamages = [
   "Danificado",
    "Falha",
    "Marcas",
    "Marcas de Uso",
    "Trincado",
    "Riscado",
    "Danos",
    "Manchas",
    "Marca de Agua",
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
    "Fendido",
    "Não Vincula",
    "Falha Opercional",
    "Falha Estrutural",
    "Dano Estético",
    "Não Funciona",
    "Não apresenta Funcionamento",
    "Não Liga",
];
const keywordsNoDamages = [
    "Sem Falha",
    "Leves Marcas de Uso",
    "Pequenos Arranhões",
    "Sinais Normais de Uso",
    "Levemente Desgastado",
    "Pequenas Imperfeições",
    "Nenhum Dano Significativo",
    "Sem Danos Graves",
    "Sem Danos Visíveis",
    "Leve Desbotamento",
    "Funcionalidade Completa",
    "Conservado",
    "Sem Rachaduras",
    "Operacional",
    "Sem Trincas",
    "Não Apresenta Danos",
    "Não Apresenta Falhas",
];

const othersKeyword = [
    // Direction
    "Direito",
    "Esquerdo",
    "Traseiro",
    "Frontal",
    "Dianteiro",
    "Central",
    "Superior",
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
    // Itens
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
]
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const allKeyWords = [...keywordsForDamages,...keywordsNoDamages,...othersKeyword]
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     console.log("Mensagem recebida:", request);
//     if (request.type === "damagedAssets") {
//         console.log("Informações do Laudo Técnico:", request.content);
//     } else if (request.type === "repairSolution") {
//         console.log("O botão Repair Solution foi clicado.");
//     }
// });


// // Listener para receber a mensagem do popup.js
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.type === "damagedAssets") {
//         const reportText = request.content;
//         const processedData = processReportText(reportText);

//         console.log("Variável Principal:", processedData.mainStatus);
//         console.table(processedData.damagedItems);
//         console.log("Array de itens danificados:", processedData.damagedItemsArray);
//     }
// });

// function processReportText(reportText) {
//     const damagedItemsArray = [];
//     const damagedItems = [];

//     const regex = /\[(.*?)\]/g;
//     const matches = [...reportText.matchAll(regex)];

//     let mainStatus = '';
//     if (matches[0]) {
//         const firstItem = matches[0][1];
//         if (firstItem.includes("não Apresenta Danos")) {
//             mainStatus = "Dogo";
//         } else if (firstItem.includes("Aeronave Apresenta Danos Fisicos")) {
//             mainStatus = "Account";
//         }
//     }

//     for (let i = 1; i < matches.length; i++) {
//         const item = matches[i][1];

//         const hasDamage = keywordsForDamages.some(keyword => item.includes(keyword));
        
//         const isFalseDamage = keywordsNoDamages.some(keyword => item.includes(keyword));

//         if (hasDamage && !isFalseDamage) {
//             damagedItems.push({ item });
//             damagedItemsArray.push(item);
//         }
//     }

//     return { mainStatus, damagedItems, damagedItemsArray };
// }


/*
[Sujestão Aeronave não Apresenta Danos][Cover Central Danificado][Cover Inferior Danificado][CoreBoard com falha][Necessario troca da Aeronave]

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
