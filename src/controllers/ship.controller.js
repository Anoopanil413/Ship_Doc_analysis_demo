import Ship from '../models/ship.model.js';

export const registerShip = async (req, res) => {
    try {
        const { shipName, licenseNumber, engineNumber, engineType, registeredEmails } = req.body;

        const existingShip = await Ship.findOne({ 
            $or: [{ licenseNumber }, { engineNumber }] 
        });
        
        if (existingShip) {
            return res.status(400).json({ message: 'A ship with this license or engine number already exists.' });
        }

        // Create a new ship entry
        const newShip = new Ship({
            shipName,
            licenseNumber,
            engineNumber,
            engineType,
            registeredEmails
        });

        // Save the new ship to the database
        await newShip.save();

        res.status(201).json({ message: 'Ship registered successfully', data: newShip });
    } catch (error) {
        console.error('Error registering ship:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};
