'use strict'
var fs = require('fs')
var testVar = 't'
const configDir = '/etc/redwood/categories/'

class ConfigEditorController {
    
    async listConfigDirectories ({request, response}) {
        var dir = fs.readdirSync('/etc/redwood/categories')
        return dir
    }
    async listFiles ({request, response, params}){
        var files = fs.readdirSync(`/etc/redwood/categories/${params.category}`)
        return files
    }

    async listConfig ({request, response, params, view}) {
        try {

            let data = fs.readFileSync(`${configDir}${params.category}/${params.file}`, 'utf8')
            data = data.split('\n')
            var sites = []
            data.map(d => sites.push({value:d}))
            // data.map(d => sites.push(d)
            return sites

          } catch (err) {
            console.error(err)
          }
    }
    async postConfig ({ request, response, params }){
        var req = request.all()
        let sites = req.sites

        let defaultWeight = sites.shift()
        function compare(a, b) {
            // Use toUpperCase() to ignore character casing
            const siteA = a.value.toUpperCase();
            const siteB = b.value.toUpperCase();
          
            let comparison = 0;
            
            if (siteA > siteB) {
              comparison = 1;
            } else if (siteA < siteB) {
              comparison = -1;
            }
            return comparison;
          }
          
        sites.sort(compare);
        sites.unshift(defaultWeight)
        const updateStream = fs.createWriteStream(`${configDir}${params.category}/${params.file}`)
        sites.map(site => updateStream.write(site.value + '\n'))
        return sites
    }
}

module.exports = ConfigEditorController
