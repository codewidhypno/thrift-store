const { validateRegistrationRequest, isRequestValidated, requireAuthorization } = require('../../validators/auth')

module.exports = (app) => {
    const user = require('../../Controller/Admin/user.controller')

    app.post('/admin/Registration',validateRegistrationRequest,isRequestValidated,user.signup)
    app.post('/admin/signin',user.signin)

    app.get('/user/profile',requireAuthorization,user.profile)
   
}