const defaultConfig = {
	isEnabled: true,
	refreshInterval: 60,
	refreshBtnCssClass: 'ing-sn-session-button__timer'
};

let configForm = document.getElementById('configForm');
const config = {};

// Load initial form data
chrome.storage.sync.get('ingSessionExtenderConfig', ({ ingSessionExtenderConfig }) => {
	Object.assign(config, ingSessionExtenderConfig);
	configForm.enableCheckbox.checked = config.isEnabled;
	configForm.intervalInput.value = config.refreshInterval;
	configForm.cssClassInput.value = config.refreshBtnCssClass;
});

// Save button
configForm.saveButton.addEventListener('click', async () => {
	saveForm();
});

// Save & Apply button
configForm.saveAndApplyButton.addEventListener('click', async () => {
	saveForm();
	reloadAllIngTabs();
});

// Reset button (set form data to defaultConfig)
configForm.resetButton.addEventListener('click', async () => {
	configForm.enableCheckbox.checked = defaultConfig.isEnabled;
	configForm.intervalInput.value = defaultConfig.refreshInterval;
	configForm.cssClassInput.value = defaultConfig.refreshBtnCssClass;
	chrome.storage.sync.set({ ingSessionExtenderConfig: defaultConfig });
	setExtensionIcon(defaultConfig.isEnabled);
});

function saveForm() {
	config.isEnabled = configForm.enableCheckbox.checked;
	config.refreshInterval = configForm.intervalInput.value;
	config.refreshBtnCssClass = configForm.cssClassInput.value;
	chrome.storage.sync.set({ ingSessionExtenderConfig: config });
	setExtensionIcon(config.isEnabled);
}

function setExtensionIcon(isEnabled) {
	if (isEnabled) {
		chrome.action.setIcon({
			path: {
			16: '/images/extension_icon/on/icon_on_16.png',
			32: '/images/extension_icon/on/icon_on_32.png',
			48: '/images/extension_icon/on/icon_on_48.png',
			128: '/images/extension_icon/on/icon_on_128.png',
		}
		});
	} else {
		chrome.action.setIcon({
			path: {
			16: '/images/extension_icon/off/icon_off_16.png',
			32: '/images/extension_icon/off/icon_off_32.png',
			48: '/images/extension_icon/off/icon_off_48.png',
			128: '/images/extension_icon/off/icon_off_128.png',
		}
		});
	}
}

function reloadAllIngTabs() {
	let ingTabs = [];
	chrome.tabs.query({}, function(tabs) {
		tabs.forEach((tab) => {
			if (tab.url.startsWith('https://banking.ing.de/')) {
				ingTabs.push(tab);
				chrome.tabs.reload(tab.id);
			}
		});
	});
}
