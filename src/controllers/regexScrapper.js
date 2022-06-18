import regexScrapperService from "../services/regexScrapper.js";

export default {
    async getPetLoveProductInfo (req, res) {
        const { url } = req.body
        const productInfo = await regexScrapperService.scrapper(url)
        console.log(productInfo)
        res.status(200).json(productInfo)
    },
}