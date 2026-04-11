import { Category } from '@/types'
import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema<Category>({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        unique: true,
        index: true,
    },
    slug: {
        type: String,
        required: [true, 'Category slug is required'],
        unique: true,
        trim: true,
        index: true,
    },
    description: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    },
    order: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
})


const CategoryModel = mongoose.models.Category || mongoose.model<Category>('Category', CategorySchema)

export default CategoryModel
