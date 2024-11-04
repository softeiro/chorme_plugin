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