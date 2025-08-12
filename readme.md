---

# 🌉 Guaíba Bridge Status Chrome Extension

This Chrome extension provides quick updates on the lifting status of the **Guaíba Bridge (Ponte do Guaíba)**, based on information from CCR ViaSul. Get daily updates directly in your browser popup!

---

## ✨ Features

* **Real-time Status:** Fetches and displays the current lifting status of the Guaíba Bridge.
* **Modern UI:** Clean and modern design for an improved user experience.
* **"Made by Rafa Muller" Watermark:** A subtle personal touch within the extension's popup.

---

## 🚀 Installation

Follow these steps to load the extension in your Chrome browser:

1.  **Download the files:**
    * `manifest.json`
    * `popup.html`
    * `popup.js`
    * *(Optional)* `icon16.png`, `icon48.png`, `icon128.png` (for the extension icons)
    Place all these files in a single folder (e.g., `guaiba-bridge-status-extension`).

2.  **Open Chrome Extensions page:**
    * Type `chrome://extensions` in your Chrome address bar and press Enter.

3.  **Enable Developer Mode:**
    * Toggle on the **"Developer mode"** switch, usually located in the top-right corner of the extensions page.

4.  **Load the unpacked extension:**
    * Click on the **"Load unpacked"** button that appears.
    * Navigate to and select the folder where you saved your extension files (e.g., `guaiba-bridge-status-extension`).

5.  **Pin the extension (Optional):**
    * After loading, you'll see your extension in the list. To easily access it, click the puzzle piece icon (Extensions) in your Chrome toolbar, and then click the pin icon next to "Guaíba Bridge Status" to pin it to the toolbar.

---

## 💡 Usage

Simply click on the **Guaíba Bridge Status** extension icon in your Chrome toolbar. A small popup will appear, displaying the latest information regarding the bridge's lifting schedule from the CCR ViaSul website.

---

## ⚙️ How It Works

The extension works by:

1.  Making an asynchronous request (using `fetch`) to the CCR ViaSul website (`https://rodovias.grupoccr.com.br/viasul/`).
2.  Parsing the returned HTML content using JavaScript's `DOMParser`.
3.  Searching for relevant information about the "Guaíba Bridge" and its "lifting" status based on contextual keywords.
4.  Displaying the extracted text directly in the extension's popup.

**Note on Character Encoding:** The HTML file includes `<meta charset="utf-8">` to ensure all special characters are displayed correctly.

**Note on CORS:** The `host_permissions` in `manifest.json` are crucial for the extension to be able to fetch content directly from `rodovias.grupoccr.com.br` due to Cross-Origin Resource Sharing (CORS) security policies.

---

## 🛠️ Technologies Used

* **HTML:** For the structure and UI of the popup.
* **CSS:** For styling and modern aesthetics.
* **JavaScript:** For fetching data, parsing HTML, and dynamic content updates.
