var toggle = false;
chrome.browserAction.onClicked.addListener(function(tab) {
  toggle = !toggle;
  if(toggle){
    chrome.browserAction.setIcon({path: "icon-on.png", tabId:tab.id});
    chrome.tabs.insertCSS(tab.id, {file: "styles.css"});
    chrome.tabs.executeScript(tab.id, {file:"scripts.js"});
  }
  else{
    chrome.browserAction.setIcon({path: "icon-off.png", tabId:tab.id});
    chrome.tabs.executeScript(tab.id, {code:"window.location.reload()"});
  }
});
