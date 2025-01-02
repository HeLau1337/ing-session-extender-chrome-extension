import { defaultConfig, setExtensionIcon } from "../background.js";

let configForm = document.getElementById('configForm');

import('../manifest.json')
	.then((module) => {
		const manifest = module.default;
		document.getElementById('versionNumber').innerHTML = manifest.version;
	})
	.catch((error) => {
		console.error('Error:', error);
		document.getElementById('versionNumber').innerHTML = "unknown";
	});

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
