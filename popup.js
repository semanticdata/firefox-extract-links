document.addEventListener("DOMContentLoaded", () => {
    chrome.tabs.executeScript(
        { code: 'Array.from(document.querySelectorAll("a")).map(a => [a.innerText, a.href])' },
        results => {
            const linksTable = document.getElementById("linksTable");
            const totalLinksElement = document.getElementById("totalLinks");
            const uniqueLinks = new Set();  // Set to track unique URLs

            results[0].forEach(([text, url]) => {
                if (!uniqueLinks.has(url)) {  // Check if URL is already added
                    uniqueLinks.add(url);       // Add URL to the Set

                    let row = linksTable.insertRow();
                    let textCell = row.insertCell(0);
                    let urlCell = row.insertCell(1);

                    // Set text cell content
                    textCell.textContent = text || "(No Text)";

                    // Create a clickable link for the URL cell
                    let link = document.createElement("a");
                    link.href = url;
                    link.textContent = url;
                    link.target = "_blank";  // Opens link in a new tab
                    urlCell.appendChild(link);
                }
            });

            // Update the total links counter with the number of unique links
            totalLinksElement.textContent = uniqueLinks.size;
        }
    );
});
