var originReq = true;
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (details.method === "GET" && details.url.includes("getFeatureFlags") && originReq) {
      originReq = false;
      // Fetch data directly and store it to local storage or send it to the popup
      fetch(details.url)
        .then((response) => response.json())
        .then((data) => {
          if (details.tabId !== -1) {
            let key = "data_" + details.tabId;
            chrome.storage.local.set({ [key]: data });
          }
          chrome.storage.local.set({ data: data });
          originReq = true;
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  },
  { urls: ["<all_urls>"] },
  ["requestBody"]
);
