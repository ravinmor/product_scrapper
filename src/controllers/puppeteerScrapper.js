import puppeteerScrapperService from "../services/puppeteerScrapper.js";
import petloveSelector from '../resources/selectors/petloveProductSelectors.json' assert {type: 'json'}

export default {
    async getPetLoveProductInfo (req, res) {
        const { url } = req.body
        const productInfo = await puppeteerScrapperService.scrapper(petloveSelector, url)
        console.log(productInfo)
        res.status(200).json(productInfo)
    },
}