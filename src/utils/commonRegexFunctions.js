export default {
    async getRealMonetaryString(htmlString) {
        const realMonetaryRE = /R\$(\d{1,3}(\.\d{3})*|\d+)(\,\d{2})?/
        const value = realMonetaryRE.exec(htmlString)
        
        return value[0]
    },
    async getStringInsideTags(htmlString) {
        const stringInsideTagRE = />(.*?)</
        const value = stringInsideTagRE.exec(htmlString)

        return value[1]
    },
}