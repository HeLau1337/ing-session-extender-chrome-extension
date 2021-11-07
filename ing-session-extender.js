console.log('[ING Session Extender] content_script has been started.');

const config = {};

(async () => {
	await fetchLatestSessionExtenderConfig();
	if (config.isEnabled) {
		extendSession();
	}
})();

function extendSession() {
	let sessionButtons = document.getElementsByClassName(config.refreshBtnCssClass);
	let sessionButton;
	try {
		sessionButton = sessionButtons[0];
	} catch (error) {
		console.error('[ING Session Extender] No session button found!');
	}

	if (sessionButton !== undefined) {
		window.setInterval(async function() {
			await fetchLatestSessionExtenderConfig();
			if (config.isEnabled) {
				sessionButton.click();
			}
		}, config.refreshInterval * 1000);
	}
}

async function fetchLatestSessionExtenderConfig() {
	return new Promise(function(resolve, reject) {
		chrome.storage.sync.get('ingSessionExtenderConfig', ({ ingSessionExtenderConfig }) => {
			Object.assign(config, ingSessionExtenderConfig);
			resolve(config);
		});
	});
}
