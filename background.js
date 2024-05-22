chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.clear();
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "privacyData") {
    chrome.storage.local.get({ trackers: [], cookies: [] }, function(result) {
      const newTrackers = result.trackers.concat(message.trackers);
      const newCookies = result.cookies.concat(message.cookies);

      chrome.storage.local.set({ trackers: newTrackers, cookies: newCookies });
    });
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    const trackers = ["google-analytics.com", "doubleclick.net"];
    const url = new URL(details.url);

    if (trackers.some(tracker => url.hostname.includes(tracker))) {
      console.log(`Tracker detected: ${url.hostname}`);
      chrome.storage.local.get({ trackers: [] }, function(result) {
        const newTrackers = result.trackers;
        newTrackers.push(url.hostname);
        chrome.storage.local.set({ trackers: newTrackers });
      });
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

chrome.cookies.onChanged.addListener(function(changeInfo) {
  if (changeInfo.cause === "explicit") return;

  chrome.storage.local.get({ cookies: [] }, function(result) {
    const newCookies = result.cookies;
    newCookies.push(changeInfo.cookie);
    chrome.storage.local.set({ cookies: newCookies });
  });
});
