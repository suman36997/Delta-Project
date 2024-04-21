const express=require('express');
const router=express.Router();
const wrapAsync=require('../utils/wrapAsync.js');
const {isOwner,isLoggedIn,validateListing}=require('../middleware.js');
const listingController=require('../controllers/listings.js');
const multer = require('multer');
const {storage}=require('../cloudConfig.js');
const upload = multer({storage});

// index route and create route
router
.route('/')
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing,listingController.createListing);



// New route
router.get('/new',isLoggedIn,listingController.renderNewForm);

// show route, update route and delete route
router
.route('/:id')
.get(wrapAsync(listingController.showListing))
.patch(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))


// edit route
router.get('/:id/edit',isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm))




module.exports=router;