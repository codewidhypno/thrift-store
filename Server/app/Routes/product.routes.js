
module.exports = (app) => {
    const product = require('../Controller/product.controller')
    const {isAdminAuthorized,requireAuthorization} = require('../Validators/auth')
    const multer = require('multer')
    const shortid = require('shortid')

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
          cb(null, shortid.generate() + '-' + file.originalname)
        }
    })

    const upload = multer({storage})


    app.post('/product',requireAuthorization,isAdminAuthorized ,upload.array('product_images'),product.createProduct)
    
}