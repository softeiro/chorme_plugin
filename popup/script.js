document.addEventListener('DOMContentLoaded', function() {
    const uwReportTextArea = document.getElementById('UW_report');
    const oowReportTextArea = document.getElementById('OOW_report');
    const salesReportTextArea = document.getElementById('SALES_report');
    const saveButton = document.getElementById('saveButton');
    const damagedAssetsButton = document.getElementById('damagedAssetsButton');
    const repairSolutionButton = document.getElementById('repairSolutionButton');

    chrome.storage.local.get(['reports'], function(result) {
        if (result.reports) {
            uwReportTextArea.value = result.reports.uwReport || '';
            oowReportTextArea.value = result.reports.oowReport || '';
            salesReportTextArea.value = result.reports.salesReport || '';
        }
    });

    const saveReports = () => {
        const reports = {
            uwReport: uwReportTextArea.value,
            oowReport: oowReportTextArea.value,
            salesReport: salesReportTextArea.value
        };
        chrome.storage.local.set({ reports: reports }, function() {
            console.log('Relatórios salvos:', reports);
        });
    };

    uwReportTextArea.addEventListener('input', saveReports);
    oowReportTextArea.addEventListener('input', saveReports);
    salesReportTextArea.addEventListener('input', saveReports);

    damagedAssetsButton.addEventListener('click', function() {
        const reportText = uwReportTextArea.value; // ou qualquer textarea desejada
        chrome.runtime.sendMessage({ type: "damagedAssets", content: reportText });
    });

    repairSolutionButton.addEventListener('click', function() {
        chrome.storage.local.set({ reports: { uwReport: "", oowReport: "", salesReport: "" } }, function() {
            console.log('Relatórios limpos.');
        });
        chrome.runtime.sendMessage({ type: "repairSolution" });
    });
    const copyAllButton = document.getElementById('copyAllButton');
    function copyAll() {
        const allText = `${uwReportTextArea.value}${oowReportTextArea.value}${salesReportTextArea.value}`;
        
        navigator.clipboard.writeText(allText).then(() => {
            window.close()        
        }).catch(err => {
            console.error("Erro ao copiar texto: ", err);
        });
    }

    // Associa a função ao botão "Copy All"
    copyAllButton.addEventListener('click', copyAll);
});