const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const product_category = new Schema({
  category_name: {
    type: String,
    required:true
  },
  slug :{ 
    type:String,
    required:true,
    unique:true
  },
  parent_id : {
    type:String
  },
  category_status: {
    type: Boolean,
    default:true
  }
}, {timestamps:true });

module.exports = mongoose.model('product_category',product_category); 