// models/ExcelTemplate.js
import mongoose from 'mongoose';

const tabConfigSchema = new mongoose.Schema({
    tabName: {
        type: String,
        required: true,
    },
    startingColumn: {
        type: String, // e.g., 'A', 'B'
        required: true,
    },
    columnHeaders: {
        type: [String], // Expected headers for the table in this tab
        required: true,
    },
});

const excelTemplateSchema = new mongoose.Schema({
    templateName: {
        type: String,
        required: true,
        unique: true, // The name of the incoming Excel file
    },
    ship: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ship',
        required: true, // Ensures every template is associated with a ship
    },
    tabs: {
        type: [tabConfigSchema], // Array of tab configurations
        required: true,
        validate: {
            validator: (v) => v.length > 0, // Ensure at least one tab
            message: 'At least one tab configuration is required.',
        },
    },
}, { timestamps: true });

export default mongoose.model('ExcelTemplate', excelTemplateSchema);
