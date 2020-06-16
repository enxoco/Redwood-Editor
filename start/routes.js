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

Route.get('/api/list', 'ConfigEditController.listConfigDirectories')
Route.get('/api/redwood/status', 'ConfigEditController.checkRedwoodStatus')
Route.get('/api/list/:category/', 'ConfigEditController.listFiles')
Route.get('/api/config/:category/:file', 'ConfigEditController.listConfig')
Route.post('/api/config/:category/:file', 'ConfigEditController.postConfig')
Route.any('*', 'NuxtController.render')
