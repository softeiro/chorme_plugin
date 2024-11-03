const similarWords = {
    ["CoreBoard"]:"Placa Principal",
    ["Flight Controller"]: "Controlador de voo",
}
const ignoreWords = [
    "Danificado",
    "Trincado",
    "Falha",
    "Marcas",
    "Danos",
    "Riscado",
    "Amassado",
    "Marca de Uso",
    "Marca",
    "Uso",
    "Ausente",
    "com",
    "Folga",
    "Desgaste",
    "Enferrujado",
    "Corroído",
    "Deformado",
    "Desbotado",
    "Oxidado",
]

const separateBrackets = (input) => {
    const matches = input.match(/\[[^\[\]]+\]/g);
    return matches ? matches.map(match => match.replace(/[\[\]]/g, '')) : [];
}
const organizeData = (replace,sales,dji) => {
    let allArray = {
        sales:separateBrackets(sales),
        replace:separateBrackets(replace),
        dji:separateBrackets(dji)
    }
    const organizedArray = [];
    Object.keys(allArray).forEach(type => {
        allArray[type].forEach(item => {
            let tempArray = {
                item: item,
                quantity: 1,
                type: type
            };
            
            // Verifica e define a quantidade, se houver um número no item
            const quantityMatch = item.match(/(\d+)/);
            tempArray.quantity = quantityMatch ? parseInt(quantityMatch[0], 10) : 1;
            
            organizedArray.push(tempArray);
        });
    });
    
    // Atualiza allArray com organizedArray, organizando os itens por tipo
    Object.keys(allArray).forEach(type => {
        allArray[type] = organizedArray.filter(entry => entry.type === type);
    });
    return organizedArray;
}

console.log(JSON.stringify(organizeData("[ESC com Falha][Braço Frontal Direito Danificado][Braço Frontal Esquerdo Danificado]","[2 Helices CW Ausentes][1 Protetor de Gimbal Ausente]","")))
