import mongoose from 'mongoose'

const NewsletterSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        index: true
    }
}, {
    timestamps: true
})

const NewsletterModel = mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema)

export default NewsletterModel