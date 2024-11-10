import mongoose from 'mongoose';

const { Schema } = mongoose;

const shipSchema = new Schema({
    shipName: {
        type: String,
        required: true,
        trim: true,
    },
    licenseNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    engineNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    engineType: {
        type: String,
        required: true,
        trim: true,
    },
    registeredEmails: {
        type: [String],
        required: true,
        validate: {
            validator: function (emails) {
                const emailSet = new Set(emails);
                return emails.every(email => /\S+@\S+\.\S+/.test(email)) && emailSet.size === emails.length;
            },
            message: 'Each email must be valid and unique.'
        }
    },
    excelTemplates: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExcelTemplate'
    }]
}, {
    timestamps: true
});

export default mongoose.model('Ship', shipSchema);
