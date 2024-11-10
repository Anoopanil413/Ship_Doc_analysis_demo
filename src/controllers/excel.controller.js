import ExcelTemplate from '../models/excel.model.js';
import Ship from '../models/ship.model.js';
import { parseExcelNew } from '../services/excel/parser.js';

export const registerExcelTemplate = async (req, res) => {
    try {
        // const { shipId } = req.body;
        console.log("validate ship om")
        
        // Validate shipId
        // const ship = await Ship.findById(shipId);
        // if (!ship) {
        //     return res.status(404).json({ message: 'Ship not found' });
        // }

        // Validate file upload
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded. Please upload an Excel file.' });
        }

        // Parse Excel file and convert to JSON
        const filePath = req.file.path;
        const parsedData = await parseExcelNew(filePath);
        res.status(200).json({parsedData})


        // // Create a new Template entry in the database with ship reference
        // const template = new ExcelTemplate({
        //     ship: shipId, // Reference the ship
        //     templateName: req.file.originalname,
        //     tabs: parsedData // Parsed data from Excel file
        // });
        // await template.save();

        // // Optionally, add the template to the ship's templates array
        // ship.templates.push(template._id);
        // await ship.save();

        // // Send response back to client
        // res.status(201).json({
        //     message: 'Template registered successfully',
        //     templateId: template._id,
        //     shipId: template.ship,
        //     data: template.tabs
        // });
    } catch (error) {
        console.error('Error registering template:', error);
        res.status(500).json({ message: 'Failed to register template', error: error.message });
    }
};
