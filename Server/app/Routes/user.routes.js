const { validateRegistrationRequest, isRequestValidated, requireAuthorization } = require('../validators/auth')

module.exports = (app) => {
    const user = require('../Controller/user.controller')

    app.post('/user/Registration',validateRegistrationRequest,isRequestValidated,user.signup)
    app.post('/user/signin',user.signin)

    app.get('/user/profile',requireAuthorization,user.profile)
   
}