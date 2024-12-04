const puppeteer = require('puppeteer');

async function scrapeGymOccupancy() {
    const browser = await puppeteer.launch({
        headless: true,
        // slowMo: 500,
        timeout: 60000,  // Increase the timeout for loading
    });
    const page = await browser.newPage();

    // Block unnecessary resources to speed up loading
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if (['image', 'stylesheet', 'font', 'script'].includes(req.resourceType())) {
            req.abort();  // Block these resources
        } else {
            req.continue();
        }
    });

    // Navigate to the page
    await page.goto('https://recreation.ucla.edu/facilities/jwc', { waitUntil: 'domcontentloaded' });

    // Wait for the iframe to load
    await page.waitForSelector('iframe', { visible: true }); // Ensure the iframe is visible

    // Switch to iframe content
    const iframe = await page.$('iframe');
    const iframeContent = await iframe.contentFrame();

    // Wait for occupancy data inside the iframe to load
    await iframeContent.waitForSelector('.barChart', { timeout: 60000 }); // Wait for barChart elements

    // Scrape occupancy percentages for different zones inside the iframe
    const occupancyData = await iframeContent.evaluate(() => {
        const zones = Array.from(document.querySelectorAll('.barChart'));
        return zones.map(zone => {
            const zoneInfo = zone.textContent.trim();

            let info = [];
            let rawStr = zoneInfo;
            let str = "";

            str = rawStr.substring(0, rawStr.indexOf('(')).replace("*","");
            rawStr = rawStr.substring(rawStr.indexOf('('));
            info.push(str);

            str = rawStr.substring(0, rawStr.indexOf(')')+1);
            rawStr = rawStr.substring(rawStr.indexOf(')')+1);
            info.push(str);

            str = rawStr.substring(0, rawStr.indexOf('U'))
            rawStr = rawStr.substring(rawStr.indexOf('U'));
            info.push(str);

            str = rawStr.substring(0, rawStr.indexOf('M')+1)
            rawStr = rawStr.substring(rawStr.indexOf('M')+1);
            info.push(str);

            str = rawStr.match(/\d+%/)[0];
            info.push(str);

            return { occupancy: info};
        });
    });

    await browser.close();

    return occupancyData;
}

// get Data with occupancyData[i].info[j] where i is the exact info and j is the part inside info
(async () => { 
    const occupancy = await scrapeGymOccupancy();
    console.log(occupancy); // Log the resolved data
})();
