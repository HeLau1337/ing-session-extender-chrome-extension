const defaultConfig = {
	isActivated: true,
	refreshInterval: 60,
	refreshBtnCssClass: 'ing-sn-session-button__timer'
};

chrome.runtime.onInstalled.addListener(() => {
	console.log('ING Session Extender was installed.');
	chrome.storage.sync.set({ ingSessionExtenderConfig: defaultConfig });
	if (defaultConfig.isActivated === true) {
		chrome.action.setBadgeText({ text: 'ON' });
	} else {
		chrome.action.setBadgeText({ text: 'OFF' });
	}
});