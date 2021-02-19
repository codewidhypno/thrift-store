const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const product = new Schema({
  product_name: {
    type: String
  },
  product_brand: {
    type: String
  },
  product_price: {
    type: Number
  },
  product_description: {
    type: String
  },
  original_price: {
    type: Number
  },
  product_category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'product_category'
  },
  quantity: {
    type:Number,
    require:true
  },
  offer : {
    type:Number
  },
  product_images:[
    {
      image:{
        type:String
      }
    }
  ],
  reviews: [
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        review: String
    }
],
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
updatedAt: Date,
  product_status: {
    type: Boolean
  }
});

module.exports = mongoose.model('product',product)