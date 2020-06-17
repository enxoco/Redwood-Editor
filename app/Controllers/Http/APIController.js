'use strict'
var fs = require('fs')
const axios = require('axios')
const CancelToken = axios.CancelToken
const Redis = use('Redis')


class ConfigEditorController {
  
  async setupStatus({ request, response }) {
    var server = await Redis.get('redwood.server.address')
    var categories = await Redis.get('redwood.server.categories')
    if (server && categories) {
      // Check to make sure we can connect to Redwood and retrieve a pac file
      try {
        var redwoodStatus = this.axiosGetStatusCode(`http://${server}/proxy.pac`).then(data => {
          if  (data === 200) {
            if (fs.existsSync(`${categories}`)) {
              return {status: true}
              return true
            } else {
              return {status: false, error: `We were able to verify that Redwood is serving a PAC file but we were unable to verify that your categories exist at ${categories}.  Please check your settings and ensure that the user running this server has permission to access that directory`}
            }
          } else {//
            if (fs.existsSync(`${categories}`)) {
              return {status: false, error: `We were able to verify your categories exists but we were unable to verify that Redwood is serving a PAC file at http://${server}/proxy.pac.  Please check your settings and try again.`}
            } else {
              return {status: false, error: `Unable to verify that Redwood is serving PAC files at http://${server}/proxy.pac and unable to verify that ${categories} actually exists.  Please check your settings and try again.`}
            }
            return {status: false, error: 'Unable to connect to Redwood.  Please check your settings and try again'}
          }
        })
      } catch(e) {
        return {error: e}
      }
      return await redwoodStatus

    } else {
      return {status: false}
    }
  }

  async saveConfig({ request, response }) {
    const { serverAddress, categoryDirectory } = request.all()
    await Redis.set('redwood.server.address', serverAddress)
    await Redis.set('redwood.server.categories', categoryDirectory)

    return response.send({updated: true})
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
    var server = await Redis.get('redwood.server.address')
    var categories = await Redis.get('redwood.server.categories')
    var resData = this.axiosGetStatusCode(`http://${server}/proxy.pac`).then(data => {
      return data
    })
    return response.send({ status: await resData })
  }

  async listConfigDirectories({ request, response }) {
    var server = await Redis.get('redwood.server.address')
    var categories = await Redis.get('redwood.server.categories')
    var dir = fs.readdirSync(`${categories}`)
    return dir
  }
  async listFiles({ request, response, params }) {
    var server = await Redis.get('redwood.server.address')
    var categories = await Redis.get('redwood.server.categories')
    var files = fs.readdirSync(`${categories}/${params.category}`)
    return files
  }

  async listConfig({ request, response, params, view }) {
    var server = await Redis.get('redwood.server.address')
    var categories = await Redis.get('redwood.server.categories')
    try {

      let data = fs.readFileSync(`${categories}/${params.category}/${params.file}`, 'utf8')
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
    var server = await Redis.get('redwood.server.address')
    var categories = await Redis.get('redwood.server.categories')
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
    const updateStream = fs.createWriteStream(`${categories}/${params.category}/${params.file}`)
    sites.map(site => updateStream.write(site.value + '\n'))
    return sites
  }
}

module.exports = ConfigEditorController
