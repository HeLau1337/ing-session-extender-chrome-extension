
chrome.runtime.onInstalled.addListener(() => {
	console.log('ING Session Extender was installed.');
	const defaultConfig = {
    isActivated: true,
    refreshInterval: 60,
    refreshBtnCssClass: "ing-sn-session-button__timer"
  };

  chrome.storage.sync.set({ ingSessionExtenderConfig: defaultConfig });
});

function extendSession() {
	let sessionButtons = document.getElementsByClassName('ing-sn-session-button__timer');
	// let sessionButtons = document.getElementsByClassName('ingde-sn-search-input__placeholder ingde-sn-search-input__placeholder-desktop');
  console.log('#1 sessionButtons:', sessionButtons);
	
  let sessionButton;
	try {
		sessionButton = sessionButtons[0];
	} catch (error) {
		console.error('[ING Session Extender] No session button found!');
	}

	if (sessionButton !== undefined) {
		window.setInterval(function() {
			console.log('#1 5 seconds passed...');

			// ToDo: wie heißt die CSS-Klasse nochmal richtig?
			console.log('#1 session-button__timer element:', sessionButton);
      sessionButton.click();
			console.log('simulated click on button');
		}, 5000);
	}
}

function getAllIngTabs() {
	let ingTabs = [];
	chrome.tabs.query(
		{
			active: false,
			currentWindow: false
		},
		function(tabs) {
			tabs.forEach((tab) => {
				if (tab.url.startsWith('https://ing.de/')) {
					ingTabs.push(tab);
				}
			});
			return ingTabs;
		}
	);
}
