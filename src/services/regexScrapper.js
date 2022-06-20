import fetch from 'node-fetch'
import utils from '../utils/commonRegexFunctions.js';
import magazineJson from '../resources/json.json' assert {type: 'json'}

export default {
    async scrapper(url) {
        const data = fetch(url)
        .then(res => res.text())
        .then(async text => {

            const productNameRE = /class=\"h1\" itemprop=\"name\">(.*?)<\/h1>/g
            const productPriceInCashRE = /<div class=\"variant-list-price mr-3\"(.*?)<\/div>/g
            const productPriceRE = /<div class=\"product-price\"(.*?)<\/div>/g
            const productDiscountRE = /<div class=\"flag product-discount-flag mr-2\"(.*?)<\/div>/g

            return {
                productName: await utils.getStringInsideTags(productNameRE.exec(text)[0]) ?? '',
                productPriceInCash: await utils.getRealMonetaryString(productPriceInCashRE.exec(text)[0]) ?? '',
                productPrice: await utils.getRealMonetaryString(productPriceRE.exec(text)[0]) ?? '',
                productDiscount: await utils.getStringInsideTags(productDiscountRE.exec(text)[0]) ?? ''
            }

        });

        return data
    },
    async getMagazineProductData(url) {
        const productNameRE = /<h1(.*?)<\/h1>/g
        const productPriceInCashRE = /<p data-testid=\"price-original\"(.*?)<\/p>/g
        const productPriceRE = /<p data-testid=\"price-value\"(.*?)<\/p>/g
        const productDiscountRE = /<span class=\"sc-emDsmM cTzKnz\"(.*?)<\/span>/g
        if(url == null) {
            const html = magazineJson.results[0].html
            return {
                productName: await utils.getStringInsideTags(productNameRE.exec(html)[0]) ?? '',
                productPriceInCash: await utils.getRealMonetaryString(productPriceInCashRE.exec(html)[0]),
                productPrice: await utils.getRealMonetaryString(productPriceRE.exec(html)[0]),
                productDiscount: await utils.getPercentage(productDiscountRE.exec(html)[0])
            }
        }

        const data = fetch(url)
        .then(res => res.text())
        .then(async text => {
            return {
                productName: await utils.getStringInsideTags(productNameRE.exec(text)[0]) ?? '',
                productPriceInCash: await utils.getRealMonetaryString(productPriceInCashRE.exec(text)[0]),
                productPrice: await utils.getRealMonetaryString(productPriceRE.exec(text)[0]),
                productDiscount: await utils.getPercentage(productDiscountRE.exec(text)[0])
            }
        });

        return data

    }
}