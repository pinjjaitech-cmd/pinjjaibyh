import mongoose from 'mongoose'



const storeSettingsSchema = new mongoose.Schema({

    marqueeTexts: [String],

    heroBanners: {

        type: [{

            desktopImg: String,

            mobileImg: String,

        }],

        default: []

    },

    featuredProducts: {

        type: [Object],

        default: []

    },

    browseByCategory: {

        type: [{

            categoryName: String,

            categoryImage: String,

            categorySlug: String

        }]

    },

    testimonials: {

        type: {

            testimonialSectionHeading: String,

            testimonialSectionDescription: String,

            reviews: [{

                customerName: String,

                customerProfile: String,

                customerMessage: String,

                customerRating: Number

            }]

        }

    }

})



export const StoreSettings = mongoose.models.StoreSettings || mongoose.model('StoreSettings', storeSettingsSchema)

