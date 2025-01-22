document.addEventListener("DOMContentLoaded", () => {
    const linksTable = document.getElementById("linksTable");
    const totalLinksElement = document.getElementById("totalLinks");
    const searchInput = document.getElementById("searchInput");
    const copyAllBtn = document.getElementById("copyAllBtn");
    const loadingElement = document.getElementById("loading");
    const noResultsElement = document.getElementById("noResults");

    let allLinks = [];  // Store all links for filtering

    // Show loading state
    loadingElement.style.display = "block";
    linksTable.style.display = "none";

    chrome.tabs.executeScript(
        {
            code: `
        const currentDomain = window.location.hostname;
        Array.from(document.querySelectorAll("a")).map(a => [a.innerText.trim(), a.href, a.hostname !== currentDomain]);
      ` },
        results => {
            // Hide loading state
            loadingElement.style.display = "none";
            linksTable.style.display = "table";

            const uniqueLinks = new Map();  // Use Map to track unique URLs

            results[0].forEach(([text, url, isExternal]) => {
                if (!uniqueLinks.has(url)) {
                    uniqueLinks.set(url, { text: text || "(No Text)", isExternal });
                }
            });

            allLinks = Array.from(uniqueLinks.entries()).map(([url, data]) => ({
                text: data.text,
                url,
                isExternal: data.isExternal
            }));

            renderLinks(allLinks);
            totalLinksElement.textContent = allLinks.length;
        }
    );

    // Search functionality
    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredLinks = allLinks.filter(link =>
            link.text.toLowerCase().includes(searchTerm) ||
            link.url.toLowerCase().includes(searchTerm)
        );
        renderLinks(filteredLinks);
        noResultsElement.style.display = filteredLinks.length === 0 ? "block" : "none";
    });

    // Copy all links
    copyAllBtn.addEventListener("click", () => {
        const visibleLinks = allLinks.filter(link => {
            const searchTerm = searchInput.value.toLowerCase();
            return link.text.toLowerCase().includes(searchTerm) ||
                link.url.toLowerCase().includes(searchTerm);
        });

        const textToCopy = visibleLinks
            .map(link => `${link.text}\n${link.url}`)
            .join('\n\n');

        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = copyAllBtn.textContent;
            copyAllBtn.textContent = "Copied!";
            setTimeout(() => {
                copyAllBtn.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy All
                `;
            }, 2000);
        });
    });

    function renderLinks(links) {
        // Clear existing rows except header
        while (linksTable.rows.length > 1) {
            linksTable.deleteRow(1);
        }

        links.forEach(({ text, url, isExternal }) => {
            let row = linksTable.insertRow();

            // Copy button cell
            let copyCell = row.insertCell(0);
            let copyButton = document.createElement("button");
            copyButton.className = "copy-button";
            copyButton.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
            `;
            copyButton.addEventListener("click", () => {
                navigator.clipboard.writeText(url).then(() => {
                    copyButton.innerHTML = `
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                    `;
                    setTimeout(() => {
                        copyButton.innerHTML = `
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                            </svg>
                        `;
                    }, 2000);
                });
            });
            copyCell.appendChild(copyButton);

            // Text cell
            let textCell = row.insertCell(1);
            textCell.textContent = text;

            // URL cell with link
            let urlCell = row.insertCell(2);
            let link = document.createElement("a");
            link.href = url;
            link.textContent = url;
            link.target = "_blank";
            urlCell.appendChild(link);

            if (isExternal) {
                const externalSymbol = document.createElement("span");
                externalSymbol.className = "external-symbol";
                externalSymbol.textContent = "↗";
                urlCell.appendChild(externalSymbol);
            }
        });

        totalLinksElement.textContent = links.length;
    }
});
