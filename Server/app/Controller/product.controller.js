const Product = require('../Models/product.model')
const Response = require('../Helper/response') 
const shortid = require('shortid')

exports.createProduct = (req, res) => {
    // res.status(200).json({file:req.files,body:req.body})
    try { 
        const { product_name , product_brand, product_price, product_description, original_price,product_category,quantity } = req.body 
        let product_images = []
    
        if(req.files.length > 0) {
            product_images = req.files.map(file => {
                return {image:file.filename}
            })
        }
    
        const product = new Product({
            product_name,
            product_brand,
            product_price,
            product_description,
            original_price,
            product_category,
            quantity,
            product_images,
            createdBy:req.user._id
    
        })
    
        product.save().then((result) => {
            return Response.sendSuccesmsg(res,'product added',{result})
        })
        .catch(err => {
            return Response.sendFailedmsg(res,'Failed to add product',err.message)
        })
    }
    catch(err) {
        return Response.sendFailedmsg(res,'Failed to add product', err.message)
    }

} 