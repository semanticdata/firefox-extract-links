# 🔗 Link Extractor

<!--
![Mozilla Add-on](https://img.shields.io/amo/v/newtab-bookmarks@semanticdata)
![Add-on rating](https://img.shields.io/amo/rating/newtab-bookmarks@semanticdata)
![Add-on downloads](https://img.shields.io/amo/dw/newtab-bookmarks@semanticdata)
![Add-on users](https://img.shields.io/amo/users/newtab-bookmarks@semanticdata)
![License](https://img.shields.io/github/license/semanticdata/firefox-new-tab-notes)
-->

A Firefox extension to extract all links from the current page and display them in a popup.

## 🛠️ Installation

1. Clone the repository
2. Go to `about:debugging#addons`
3. Click "Load Temporary Add-on"
4. Select the cloned repository

## ⚙️ Usage

1. Navigate to a page you want to extract links from.
2. Click the extension icon in the top right.
3. The popup will display all links on the current page.

## 🔄 Recent Changes

- Convert URLs into actual links.
- Remove duplicate links from list.
- Total links count shown next to the popup title.
- Differentiate external links with `↗`.

## 🐛 Bugs

- The list comes back empty if you exit the popup and click back again. The current workaround is to reload the page.

## 💡 Ideas

- Filter links by domain
- Export links to CSV
- Categorize links by content type
- Check from broken links
- Option to save links to a "Saved Links" list in local storage
- Make the links list searchable

## © License

Source code in this repository is available under the [MIT License](./LICENSE).
