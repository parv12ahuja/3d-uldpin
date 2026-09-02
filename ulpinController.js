import { generate3DULPIN } from './ulpinUtil.js'; // Note: Node requires the .js extension for ES6 imports
import uidModel from './uidModel.js'; 

export const generateUlpinController = async (req, res) => {
    try {
        // Extract data from the incoming POST request body
        const { stateCode, districtCode, xAxis, yAxis, zAxis, floor, propertyOwner } = req.body;

        // Validation: Catch bad data before it hits the generator
        if (xAxis === undefined || yAxis === undefined || zAxis === undefined || floor === undefined) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing critical spatial parameters: xAxis, yAxis, zAxis, or floor." 
            });
        }

        // Fallbacks
        const finalState = stateCode || "HR";
        const finalDistrict = districtCode || "06";
        const owner = propertyOwner || "Demo User"; // Fallback owner for the demo

        // 1. Generate the ULPIN using your utility
        const ulpin = generate3DULPIN(finalState, finalDistrict, xAxis, yAxis, zAxis, floor);

        // 2. Create the MongoDB Document
        const newPropertyRecord = new uidModel({
            propertyOwner: owner,
            ulpin: ulpin,
            xAxis: xAxis,
            yAxis: yAxis,
            zAxis: zAxis,
            stateCode: finalState,
            districtCode: finalDistrict,
            floor: floor
        });

        // 3. Save to MongoDB (Requires await)
        await newPropertyRecord.save();

        // 4. Return the saved record to the frontend
        return res.status(201).json({
            success: true,
            message: "3D ULPIN successfully generated and registered.",
            data: newPropertyRecord
        });

    } catch (error) {
        // Catch MongoDB Duplicate Key Error (Someone already registered this exact 3D space)
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Spatial Collision: A property with this exact ULPIN is already registered in the database."
            });
        }

        console.error("ULPIN Controller Error:", error.message);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error during ULPIN registration.",
            error: error.message
        });
    }
};