console.log(`[ING Session Extender] Initializing content_script`);

const config = {};

(async () => {
	await fetchLatestSessionExtenderConfig();
	if (config.isEnabled) {
		extendSession();
	}
})();

let failedAttemptsCounter = 0;
const maxAttempts = 10;

function extendSession() {
	console.debug('[ING Session Extender] Starting extendSession()');

	let intervalId = window.setInterval(async function() {
		let sessionButton;
		try {
			sessionButton = findSessionButton();
		} catch (error) {
			console.error('[ING Session Extender] sessionButton not found! Reason:', error);
		}
		if (sessionButton) {
			failedAttemptsCounter = 0;
			await fetchLatestSessionExtenderConfig();
			if (config.isEnabled) {
				sessionButton.click();
				console.debug('[ING Session Extender] sessionButton has been clicked programmatically');
			}
		} else {
			console.debug('[ING Session Extender] sessionButton is undefined');
			if (failedAttemptsCounter === maxAttempts) {
				clearInterval(intervalId);
				console.error(`[ING Session Extender] Stopped trying to find the sessionButton after ${maxAttempts} attempts. Cannot automatically extend session :(`)
			}
		}
	}, config.refreshInterval * 1000);
}

async function fetchLatestSessionExtenderConfig() {
	return new Promise(function(resolve, reject) {
		chrome.storage.sync.get('ingSessionExtenderConfig', ({ ingSessionExtenderConfig }) => {
			console.debug('[ING Session Extender] Config was fetched:', ingSessionExtenderConfig);
			Object.assign(config, ingSessionExtenderConfig);
			resolve(config);
		});
	});
}

function findSessionButton() {
	let sessionButton;
	try {
		sessionButton = document.getElementsByClassName(config.refreshBtnCssClass)[0];
		if (sessionButton) return sessionButton;
	} catch (error) {
		console.debug('[ING Session Extender] findSessionButton method no. 1 error:', error);
	}
	console.debug('[ING Session Extender] findSessionButton method no. 1 failed!');

	try {
		sessionButton = document
			.querySelector('ing-header')
			.shadowRoot
			.querySelector('ing-session-button')
			.shadowRoot
			.querySelector(`.${config.refreshBtnCssClass}`);

		if (sessionButton) return sessionButton;
	} catch (error) {
		console.debug('[ING Session Extender] findSessionButton method no. 2 error:', error);
	}
	console.debug('[ING Session Extender] findSessionButton method no. 2 failed!');

	try {
		function findElementByClass(className, rootNode = document) {
			let elements = Array.from(rootNode.querySelectorAll('*'));

			for (let element of elements) {
				if (element.shadowRoot) {
					let foundElement = findElementByClass(className, element.shadowRoot);
					if (foundElement) {
						return foundElement;
					}
				}

				if (element.classList.contains(className)) {
					return element;
				}
			}

			return undefined;
		}

		sessionButton = findElementByClass(config.refreshBtnCssClass);
		if (sessionButton) return sessionButton;
	} catch (error) {
		console.error('[ING Session Extender] findSessionButton final method no. 3 error:', error);
	}
	failedAttemptsCounter++;
	console.warn(`[ING Session Extender] findSessionButton final method no. 3 failed! (failed attempt number ${failedAttemptsCounter} of ${maxAttempts})`);
}
