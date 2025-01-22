# 🔗 Link Extractor

A Firefox extension that extracts all links from the current page and displays them in a clean, searchable interface. Perfect for content research, web scraping, or simply organizing links from complex pages.

## ✨ Features

- **Real-time Search**: Instantly filter links by text or URL
- **Copy Functionality**: 
  - Copy individual links with one click
  - Copy all visible links (respects search filter)
  - Maintains link text and URL formatting when copying
- **Clean Interface**:
  - Modern, responsive design
  - Clear visual hierarchy
  - External link indicators (↗)
- **Smart Processing**:
  - Automatic duplicate removal
  - Link count display
  - Loading state indicator
  - Handles empty link text gracefully

## 🛠️ Installation

1. Clone the repository
2. Go to `about:debugging#addons`
3. Click "Load Temporary Add-on"
4. Select the cloned repository

## ⚙️ Usage

1. Navigate to any webpage you want to extract links from
2. Click the extension icon in the toolbar
3. The popup will display all unique links from the current page
4. Use the search box to filter links
5. Click the copy button next to any link to copy its URL
6. Use "Copy All" to copy all visible links with their text

## 🔄 Recent Changes

- Added real-time search functionality
- Implemented copy buttons for individual links
- Added "Copy All" functionality with formatted output
- Added loading state indicator
- Improved duplicate link handling
- Enhanced UI with modern styling
- Added responsive design to prevent overflow
- Improved external link indicators

## 🐛 Known Issues

- The list resets if you close and reopen the popup (workaround: reload the page)
- Some dynamically loaded links might not be captured on initial load

## 🚀 Planned Features

- Filter links by domain
- Export links to CSV/JSON
- Categorize links by content type
- Check for broken links
- Save links to local storage for later reference
- Group links by domain
- Dark mode support
- Keyboard shortcuts for navigation
- Custom link formatting options
- Link preview on hover

## © License

Source code in this repository is available under the [MIT License](./LICENSE).
