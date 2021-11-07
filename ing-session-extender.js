console.log('Session extender content_script was called');

const config = {};

(async () => {
	await fetchLatestSessionExtenderConfig();
	if (config.isActivated) {
		extendSession();
	}
})();

function extendSession() {
	// let sessionButtons = document.getElementsByClassName('ing-sn-session-button__timer');
	// ingde-sn-search-input__placeholder ingde-sn-search-input__placeholder-desktop
	let sessionButtons = document.getElementsByClassName(config.refreshBtnCssClass);

	console.log('#2 sessionButtons:', sessionButtons);

	let sessionButton;
	try {
		sessionButton = sessionButtons[0];
	} catch (error) {
		console.error('[ING Session Extender] No session button found!');
	}

	if (sessionButton !== undefined) {
		window.setInterval(async function() {
			await fetchLatestSessionExtenderConfig();
			if (config.isActivated) {
				console.log('#2 5 seconds passed...');

				console.log('#2 session-button__timer element:', sessionButton);
				sessionButton.click();
				console.log('simulated click on button');
			}
		}, config.refreshInterval * 1000);
	}
}

async function fetchLatestSessionExtenderConfig() {
	return new Promise(function(resolve, reject) {
		chrome.storage.sync.get('ingSessionExtenderConfig', ({ ingSessionExtenderConfig }) => {
			Object.assign(config, ingSessionExtenderConfig);
			console.log('#2 ingSessionExtenderActivated:', config.isActivated);
			resolve(config);
		});
	});
}
