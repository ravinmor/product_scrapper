import fetch from 'node-fetch'
import utils from '../utils/commonRegexFunctions.js';

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
                productName: await utils.getStringInsideTags(productNameRE.exec(text)[0]),
                productPriceInCash: await utils.getRealMonetaryString(productPriceInCashRE.exec(text)[0]) ?? '',
                productPrice: await utils.getRealMonetaryString(productPriceRE.exec(text)[0]) ?? '',
                productDescont: await utils.getStringInsideTags(productDiscountRE.exec(text)[0])
            }

        });

        return data
    }
}