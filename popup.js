document.addEventListener('DOMContentLoaded', function() {
  
  chrome.storage.local.get(['trackers', 'cookies'], function(result) {
    const trackersDiv = document.getElementById('trackers');
    const cookiesDiv = document.getElementById('cookies');

    
    trackersDiv.innerHTML = '';
    cookiesDiv.innerHTML = '';

    
    if (result.trackers) {
      result.trackers.forEach(tracker => {
        const trackerElement = document.createElement('div');
        trackerElement.className = 'tracker';
        trackerElement.textContent = tracker;
        trackersDiv.appendChild(trackerElement);
      });
    } else {
      const noTrackersMessage = document.createElement('div');
      noTrackersMessage.textContent = 'No trackers detected.';
      trackersDiv.appendChild(noTrackersMessage);
    }

   
    if (result.cookies) {
      result.cookies.forEach(cookie => {
        const cookieElement = document.createElement('div');
        cookieElement.className = 'cookie';
        cookieElement.textContent = `${cookie.name}=${cookie.value}`;
        cookiesDiv.appendChild(cookieElement);
      });
    } else {
      const noCookiesMessage = document.createElement('div');
      noCookiesMessage.textContent = 'No cookies detected.';
      cookiesDiv.appendChild(noCookiesMessage);
    }
  });
});
