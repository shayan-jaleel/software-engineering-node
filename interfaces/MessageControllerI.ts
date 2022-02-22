import {Request, Response} from "express";

export default interface MessageControllerI {
    findMessagesSentByUser (req: Request, res: Response): void;
    findMessagesReceivedByUser (req: Request, res: Response): void;
    sendMessageBetweenUsers (req: Request, res: Response): void;
    deleteMessage (req: Request, res: Response): void;
    updateMessage (req: Request, res: Response): void;
    deleteAllMessagesForUser (req: Request, res: Response): void;
};