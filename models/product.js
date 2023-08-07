const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new Schema({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
  },
  items: [
    {
      size: {
        type: Number,
        required: [true, 'Size is required'],
      },
      price: {
        type: Number,
        required: [true, 'Size is required'],
      },
      sale: {
        type: Number,
      },
      count: {
        type: Number,
        required: [true, 'Count is required'],
      },
      productCode: {
        type: String,
        unique: true,
      },
    }
  ],
  shortDescription: {
    type: String,
  },
  fullDescription: {
    type: String,
  },
  ingredients: {
    type: String,
  },
  mainImage: {
    type: String,
  },
  images: {
    type: [String],
  },
  favorite: {
    type: Boolean,
    required: true,
    default: false,
  },
  reviews: {
    type: [String],
  },
  // productCode: {
  //   type: String,
  //   unique: true,
  // },
  _pet: {
    type: Schema.Types.ObjectId,
    ref: 'Pet'
  },
  _category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  _variant: {
    type: Schema.Types.ObjectId,
    ref: 'Variant'
  },
  _country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
  },
},
{
  versionKey: false,
  timestamps: true,
});

productSchema.plugin(mongoosePaginate);

const Product = model('product', productSchema);

module.exports = {
  Product,
};
