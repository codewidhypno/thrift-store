const Category = require('../Models/category.model')
const Response = require('../Helper/response')


exports.createCategory = (req,res) => {
   try {

        const { category_name } = req.body

        if(!isNaN(category_name)) {
            return Response.sendFailedmsg(res,'Invalid Category Name')
        }

        const category = new Category({
            category_name
        })

        category.save().then((data) => {
            return Response.sendSuccesmsg(res,'Category Created')
        })
        .catch(err =>{
            return Response.sendFailedmsg(res,'Failed to Add Category',err.message)
        })
   }

   catch(err) {
    return Response.sendFailedmsg(res,'Failed Ta Add Category',err.message)
   }
}



exports.getCategory = (req, res) => {
    try {

        Category.find().then((data) => {
           res.send(data)
        })
        .catch(err => {
            res.send([])
        })
    }
    catch(err) {
        res.send([])
    }
}