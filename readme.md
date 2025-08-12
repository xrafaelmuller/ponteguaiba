# 🌉 Guaíba Bridge Status - Chrome Extension

This Chrome extension provides quick updates on the lifting status of the **Guaíba Bridge**, based on information from CCR ViaSul. Get the schedules directly in your browser!

---

## ✨ Features

* **Real-time Status**: Fetches and displays the Guaíba Bridge's lifting schedules.
* **Bridge Animation**: A CSS animation shows the bridge opening and closing when there are scheduled lifts for the day.
* **Smart Status**: Sorts and displays schedules as "Next lift," "Scheduled lift," or "Completed lift."
* **Modern UI**: Clean and pleasant design for a better user experience.
* **"Made by RMS" Watermark**: A subtle, personal touch in the extension's popup.

---

## 🚀 Installation

Follow these steps to load the extension in your Chrome browser:

1.  **Download the files:**
    * `manifest.json`
    * `popup.html`
    * `popup.js`
    * `style.css`
    * *(Optional)* `img/icon16.png`, `img/icon48.png`, `img/icon128.png` (for the extension icons)
    Place all files and the `img` folder into a single directory (e.g., `guaiba-bridge-status-extension`).

2.  **Open the Chrome Extensions page:**
    * Type `chrome://extensions` into your Chrome address bar and press Enter.

3.  **Enable Developer Mode:**
    * Toggle on the **"Developer mode"** switch, usually located in the top-right corner of the page.

4.  **Load unpacked extension:**
    * Click the **"Load unpacked"** button.
    * Navigate to the folder where you saved the extension files and select it.

5.  **Pin the extension (Optional):**
    * For easy access, click the puzzle piece icon (Extensions) in your Chrome toolbar, and then click the pin icon next to "Guaíba Bridge Status".

---

## 💡 How to Use

Just click the **Guaíba Bridge Status** extension icon in your Chrome toolbar. A small popup will appear, showing the latest information about the bridge's lifting schedules, directly from the CCR ViaSul website.

---

## ⚙️ How It Works

The extension operates as follows:

1.  It makes an asynchronous request (`fetch`) to the CCR ViaSul website (`https://rodovias.grupoccr.com.br/viasul/`).
2.  It parses the returned HTML content using JavaScript's `DOMParser`.
3.  It searches for schedules in the `(XXhXX)` format and organizes them chronologically.
4.  It checks the current time to determine if a lift is completed, is the next one up, or is scheduled for later.
5.  It activates a visual animation of the bridge if there are future lifts scheduled for the day.
6.  It displays the formatted schedules directly in the extension's popup.

**Host Permissions (`host_permissions`):** The permission in `manifest.json` is crucial for the extension to access content from the CCR ViaSul website, bypassing Cross-Origin Resource Sharing (CORS) security policies.

---

## 🛠️ Technologies Used

* **HTML**: Structure and UI of the popup.
* **CSS**: Styling, modern design, and bridge animations.
* **JavaScript**: Logic for data fetching, HTML parsing, and dynamic content updates.