import Puppeteer from "puppeteer";

export default {
    async scrapper(productSelectors, link) {
        const browser = await Puppeteer.launch({ headless: true })
        const page = await browser.newPage();
        await page.goto(link)
    
        const data = await page.evaluate((productSelectors) => {
            return {
                productName: document.querySelector(productSelectors.productName).innerText,
                productPriceInCash: document.querySelector(productSelectors.productPriceInCash).innerText,
                productPrice: document.querySelector(productSelectors.productPrice).innerText,
                productDiscount: document.querySelector(productSelectors.productDiscount).innerText
            }
        }, productSelectors)
    
        await browser.close()
        return data
    }
}