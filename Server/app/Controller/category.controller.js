const Category = require('../Models/category.model')
const Response = require('../Helper/response')
const slugify = require('slugify')


exports.createCategory = (req,res) => {
   try {

       const categoryObj = {
           category_name : req.body.category_name,
           slug:slugify(req.body.category_name)
       }

        if(req.body.parent_id) {
           categoryObj.parent_id = req.body.parent_id
        }
        const category = new Category(categoryObj)

        category.save().then((data) => {
            
            return Response.sendSuccesmsg(res,'Category Created',{data})
            
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


exports.deleteCategory = (req,res) => {
    try {

        Category.deleteMany({}).then((data) => {
            res.status(200).json({message : 'Deleted'})
        })
    }
    catch(err) {
        res.send(err.message)
    }
}