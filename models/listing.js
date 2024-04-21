const mongoose=require('mongoose');
const{Schema}=mongoose;
const Review=require('./review.js');

const listingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image: {
        url:String,
        filename:String,
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews:
        [
            {
                type:Schema.Types.ObjectId,
                ref:'Review',
            }
        ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    geometry:{
        // go to mongoose geoJSON Website for this below code
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
    }
    
})
// jaise hi app.js mein app.delete('/listing/:id')call hoga woise hi ye niche bala middle ware
// v call ho jayega
listingSchema.post('findOneAndDelete',async(listing)=>{
if(listing){
    // _id belong to review id aur wo khoj rha h listing.reviews me kyu wo v sare review ka id hi contain
    // kr rha h
    await Review.deleteMany({_id:{$in:listing.reviews}});

}
})
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;