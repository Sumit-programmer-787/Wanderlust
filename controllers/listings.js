const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { 
        listing,
        maptilerApiKey: process.env.MAPTILER_API_KEY

    });
};

module.exports.createListing = async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    // MapTiler Geocoding
    const searchQuery = `${newListing.location}, ${newListing.country}`;

    const geoResponse = await fetch(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(searchQuery)}.json?key=${process.env.MAPTILER_API_KEY}&limit=1`
    );

    const geoData = await geoResponse.json();

    if (!geoResponse.ok || !geoData.features || geoData.features.length === 0) {
        req.flash("error", "Location not found. Please enter a valid location.");
        return res.redirect("/listings/new");
    }

    newListing.geometry = {
        type: "Point",
        coordinates: geoData.features[0].geometry.coordinates,
    };

    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        newListing.image = { url, filename};
    }
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image ? listing.image.url : "";
    originalImageUrl = originalImageUrl.replace("/upload","/upload","upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};


module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    Object.assign(listing, req.body.listing);

    // MapTiler Geocoding
    const searchQuery = `${listing.location}, ${listing.country}`;

    const geoResponse = await fetch(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(searchQuery)}.json?key=${process.env.MAPTILER_API_KEY}&limit=1`
    );

    const geoData = await geoResponse.json();

    if (!geoResponse.ok || !geoData.features || geoData.features.length === 0) {
        req.flash("error", "Location not found. Please enter a valid location.");
        return res.redirect(`/listings/${id}/edit`);
    }

    listing.geometry = {
        type: "Point",
        coordinates: geoData.features[0].geometry.coordinates,
    };

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
    }

    await listing.save();

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};




module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};