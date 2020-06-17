'use strict'
var fs = require('fs')
const configDir = '/etc/redwood/categories/'
const axios = require('axios')
const CancelToken = axios.CancelToken
const Helpers = use('Helpers')
const Config = use('Config')
const configPath = Helpers.configPath()
// const redwoodConfig = Helpers.configPath('redwood.js')

class ConfigEditorController {
  
  async setupStatus({ request, response }) {
    console.log(Config.get('redwood'))
   if (typeof Config.get('redwood.address') != undefined && typeof Config.get('redwood.categories') != undefined) {
     return {status: true}
   } else {
     return {status: false}
   }
  }

  async saveConfig({ request, response }) {
    const { serverAddress, categoryDirectory } = request.all()
    Config.set('redwood.address', serverAddress)
    Config.set('redwood.categories', categoryDirectory)

    return response.send({updated: Config.get('redwood.address')})
  }

  async axiosGetStatusCode(url) {
    let source = CancelToken.source();
    setTimeout(() => {
      source.cancel();
    }, 5000);
    return axios.get(url, { cancelToken: source.token }).then((result) => {
      return result.status
    }).catch(thrown => {
      if (axios.isCancel(thrown)) {
        return 'Offline'
        console.log(thrown.message);
      } else {
        // handle error
      }
    });
  }
  async checkRedwoodStatus({ request, response }) {
    var resData = this.axiosGetStatusCode('http://10.10.30.12:6520/proxy.pac').then(data => {
      return data
    })
    return response.send({ status: await resData })
  }

  async listConfigDirectories({ request, response }) {
    var dir = fs.readdirSync('/etc/redwood/categories')
    return dir
  }
  async listFiles({ request, response, params }) {
    var files = fs.readdirSync(`/etc/redwood/categories/${params.category}`)
    return files
  }

  async listConfig({ request, response, params, view }) {
    try {

      let data = fs.readFileSync(`${configDir}${params.category}/${params.file}`, 'utf8')
      data = data.split('\n')
      var sites = []
      data.map(d => sites.push({ value: d }))
      // data.map(d => sites.push(d)
      return sites

    } catch (err) {
      console.error(err)
    }
  }
  async postConfig({ request, response, params }) {
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
