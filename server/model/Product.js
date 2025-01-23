const mongoose = require('mongoose');
const {Schema} = mongoose;


const productSchema = new Schema({
    title: { type : String, required: true, unique: true},
    description: { type : String, required: true},
    price: { type: Number,required:true, min:[0, 'wrong min price'], max:[1000000, 'wrong max price']},
    discountPercentage: { type: Number,required:true, min:[0, 'wrong min discount'], max:[100, 'wrong max discount']},
    rating: { type: Number, min:[0, 'wrong min rating'], max:[5, 'wrong max price'], default: 0},
    stock: { type: Number, min:[0, 'wrong min stock'], default: 0},
    brand: { type : String, required: true,default:'general'},
    category: { type : String, required: true , default:'general'},
    thumbnail: { type : String, required: true},
    images:{ type : [String], required: true},
    colors:{ type : [Schema.Types.Mixed] },
    sizes:{ type : [Schema.Types.Mixed] },
    highlights:{ type : [String] },
    discountedPrice: { type: Number },
    deleted: { type : Boolean, default: false },
    tags: { type: [String] }, // New field to store product tags
    sku: { type: String }, // New field for SKU
    weight: { type: Number }, // New field for product weight
    dimensions: { 
        width: { type: Number },
        height: { type: Number },
        depth: { type: Number }
    }, // New field for dimensions
    warrantyInformation: { type: String }, // New field for warranty info
    shippingInformation: { type: String }, // New field for shipping info
    availabilityStatus: { type: String }, // New field for stock status
    reviews: [
        {
            rating: { type: Number },
            comment: { type: String },
            date: { type: Date },
            reviewerName: { type: String },
            reviewerEmail: { type: String }
        }
    ], // New field for reviews
    returnPolicy: { type: String }, // New field for return policy
    minimumOrderQuantity: { type: Number }, // New field for minimum order quantity
    meta: {
        createdAt: { type: Date },
        updatedAt: { type: Date },
        barcode: { type: String },
        qrCode: { type: String }
    } // New field for meta data
});

const virtualId  = productSchema.virtual('id');
virtualId.get(function(){
    return this._id;
})
// we can't sort using the virtual fields. better to make this field at time of doc creation
// const virtualDiscountPrice =  productSchema.virtual('discountPrice');
// virtualDiscountPrice.get(function(){
//     return Math.round(this.price*(1-this.discountPercentage/100));
// })
productSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})


exports.Product = mongoose.model('Product',productSchema)