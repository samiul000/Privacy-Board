function detectTrackers() {
  const trackers = ["google-analytics.com", "doubleclick.net"];
  const scripts = document.getElementsByTagName('script');
  let detectedTrackers = [];

  try {
    for (let script of scripts) {
      if (script.src) {
        for (let tracker of trackers) {
          if (script.src.includes(tracker)) {
            detectedTrackers.push(script.src);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error detecting trackers:', error);
  }

  return detectedTrackers;
}


function getCookies() {
  try {
    return document.cookie.split(';').map(cookie => cookie.trim());
  } catch (error) {
    console.error('Error reading cookies:', error);
    return [];
  }
}

chrome.runtime.sendMessage({
  type: "privacyData",
  trackers: detectTrackers(),
  cookies: getCookies()
});
