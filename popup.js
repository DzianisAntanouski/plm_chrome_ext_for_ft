// document.addEventListener('DOMContentLoaded', function() {
//     chrome.storage.local.get(['data'], function(result) {
//         if (result.data) {
//             document.getElementById('data').textContent = JSON.stringify(result.data, null, 2);
//         } else {
//             document.getElementById('data').textContent = 'No data available.';
//         }
//     });
// });
document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length > 0) {
      let key = "data_" + tabs[0].id;
      chrome.storage.local.get([key], function (result) {
        if (result[key]) {
          document.getElementById("data").textContent = JSON.stringify(result[key], null, 2);
        } else {
          document.getElementById("data").textContent = "No data available for this tab.";
        }
      });
    }
  });
});
