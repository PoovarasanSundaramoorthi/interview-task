import express from "express";
import multer from "multer";
import { uploadChatHistory } from "../controller/chatController";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

const chatRouter = express.Router();

// Route for uploading the Excel file with chat history
chatRouter.post('/import-chat', upload.single('file'), uploadChatHistory);

export default chatRouter;
