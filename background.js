const defaultConfig = {
	isEnabled: true,
	refreshInterval: 60,
	refreshBtnCssClass: 'ing-sn-session-button__timer'
};

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({ ingSessionExtenderConfig: defaultConfig });
	if (defaultConfig.isEnabled === true) {
		chrome.action.setBadgeText({ text: 'ON' });
	} else {
		chrome.action.setBadgeText({ text: 'OFF' });
	}
});
