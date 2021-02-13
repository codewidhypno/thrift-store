
module.exports = (app) => {
    const category = require('../Controller/category.controller')
    const {isAdminAuthorized,requireAuthorization} = require('../Validators/auth')

    app.post('/category',requireAuthorization,isAdminAuthorized ,category.createCategory)
    app.get('/category',category.getCategory)
    app.delete('/category',category.deleteCategory)
}