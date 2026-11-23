const mongoose = require("mongoose");
require("dotenv").config();

const Listing = require("../models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function verify() {
    await mongoose.connect(MONGO_URL);

    const total = await Listing.countDocuments();

    const withCoordinates = await Listing.countDocuments({
        "geometry.type": "Point",
        "geometry.coordinates.0": { $exists: true },
        "geometry.coordinates.1": { $exists: true }
    });

    const withoutCoordinates = total - withCoordinates;

    console.log("Total listings:", total);
    console.log("Listings with coordinates:", withCoordinates);
    console.log("Listings without coordinates:", withoutCoordinates);

    await mongoose.disconnect();
}

verify();