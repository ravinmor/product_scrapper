import regexScrapperService from "../services/regexScrapper.js";
import path from 'path'

export default {
    async getPetLoveProductInfo (req, res) {
        const { url } = req.body
        const productInfo = await regexScrapperService.scrapper(url)
        console.log(productInfo)
        res.status(200).json(productInfo)
    },
    async getMagazineProductData (req, res) {
        const { url } = req.body
        const productInfo = await regexScrapperService.getMagazineProductData(url)
        console.log(productInfo)
        res.status(200).json(productInfo)
    },
}