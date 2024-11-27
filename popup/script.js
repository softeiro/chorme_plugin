document.addEventListener('DOMContentLoaded', function() {
    const textArea = document.getElementById('report');
    const damagedAssetsButton = document.getElementById('damagedAssetsButton');
    const repairSolutionButton = document.getElementById('repairSolutionButton');
    const copyAllButton = document.getElementById('copyAllButton');

    chrome.storage.local.get(['savedText'], function(result) {
        if (result.savedText) {
            textArea.value = result.savedText;
        }
    });

    if (textArea) {
        textArea.addEventListener('input', function() {
            chrome.storage.local.set({ savedText: textArea.value });
        });
    }

    if (damagedAssetsButton) {
        damagedAssetsButton.addEventListener('click', async function() {    
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { data: "getInfoPage" }, (response) => {
                    if (response) {
                        const value = textArea.value + response.message;
                        chrome.storage.local.set({ savedText: value });

                    }
                });
            });
        
            // let infoBack = ""; 
            // if (response && response.text) {
            //     infoBack = response.text; 
            // } else {
            //     console.log("Nenhuma resposta ou resposta inválida recebida do background script.");
            // }

            // const reportText = textArea.value + infoBack; // Construindo o texto do relatório
            //chrome.runtime.sendMessage({ type: "damagedAssets", content: reportText });
        });
    }

    if (repairSolutionButton) {
        repairSolutionButton.addEventListener('click', function() {
            chrome.storage.local.set({ savedText: "" });
            chrome.runtime.sendMessage({ type: "repairSolution" });
        });
    }

    function copyAll() {
        const allText = `${textArea.value}`;
        navigator.clipboard.writeText(allText).then(() => {
            window.close();        
        }).catch(err => {
            console.error("Erro ao copiar texto: ", err);
        });
    }

    if (copyAllButton) {
        copyAllButton.addEventListener('click', copyAll);
    }
});


