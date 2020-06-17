'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.get('/api/list', 'APIController.listConfigDirectories')
Route.get('/api/redwood/status', 'APIController.checkRedwoodStatus')
Route.get('/api/redwood/setup/', 'APIController.setupStatus')
Route.post('/api/redwood/setup', 'APIController.saveConfig')
Route.get('/api/list/:category/', 'APIController.listFiles')
Route.get('/api/config/:category/:file', 'APIController.listConfig')
Route.post('/api/config/:category/:file', 'APIController.postConfig')
Route.any('*', 'NuxtController.render')
