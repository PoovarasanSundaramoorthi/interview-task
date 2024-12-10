import { Request, Response, NextFunction } from "express";
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";
import { ChatMessage } from "../models/chatMessage";

// Controller to upload and process the chat history from an Excel file
export const uploadChatHistory = async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    try {
        // Read the uploaded Excel file
        const filePath = path.join(__dirname, '../../uploads', file.filename);
        const workbook = XLSX.readFile(filePath);

        // Get the first sheet of the Excel file
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert the sheet to JSON format
        const chatData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Validate the data (check headers and content)
        const validationResult = validateChatData(chatData);
        if (!validationResult.isValid) {
            return res.status(400).json({ message: "Invalid data format", errors: validationResult.errors });
        }

        // Insert chat data into the database
        await insertChatDataIntoDB(chatData);

        // Clean up the uploaded file
        fs.unlinkSync(filePath);

        res.status(200).json({ message: "Chat history imported successfully" });
    } catch (error) {
        console.error("Error importing chat history:", error);
        next(error);
    }
};

// Function to validate the chat data structure
const validateChatData = (data: any[]): { isValid: boolean, errors: string[] } => {
    const errors: string[] = [];
    // Ensure the first row contains the correct headers
    const requiredHeaders = ['sender', 'message', 'timestamp'];

    const headers = data[0];
    for (let i = 0; i < requiredHeaders.length; i++) {
        if (!headers.includes(requiredHeaders[i])) {
            errors.push(`Missing header: ${requiredHeaders[i]}`);
        }
    }

    // Ensure each row contains the correct number of columns and valid data
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (row.length !== headers.length) {
            errors.push(`Invalid number of columns in row ${i + 1}`);
        }

        // Additional validation can be added for each column, e.g., valid date format for 'timestamp'
        if (isNaN(new Date(row[2]).getTime())) {
            errors.push(`Invalid timestamp format in row ${i + 1}`);
        }
    }

    return { isValid: errors.length === 0, errors };
};

// Function to insert chat data into the database
const insertChatDataIntoDB = async (data: any[]) => {
    const chatMessages = data.slice(1).map((row: any) => ({
        sender: row[0],
        message: row[1],
        timestamp: new Date(row[2]),
    }));

    // Assuming you have a ChatMessage model defined with Sequelize
    await ChatMessage.bulkCreate(chatMessages);
};
