const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1770&auto=format&fit=crop";

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: {
            type: String,
            default: DEFAULT_IMAGE,
            set: (v) => (v === "" ? DEFAULT_IMAGE : v),
        },
        filename: String,
    },
    price: {
        type: Number,
        required: true,
    },
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.post("findOneandDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: {$in: listing.reviews }});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;