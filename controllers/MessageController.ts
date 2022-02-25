import { Express, Request, Response } from "express";
import Message from "../models/messages/Message";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";

export default class MessageController implements MessageControllerI{
    private static messageDao: MessageDao = MessageDao.getInstance()
    private static messageController: MessageController | null = null;

    private constructor() { }

    public static getInstance = (app: Express) : MessageController => {
        if(MessageController.messageController == null) {
            MessageController.messageController = new MessageController();
            app.get("/api/users/:uid/sentMessages", MessageController.messageController.findMessagesSentByUser);
            app.get("/api/users/:uid/receivedMessages", MessageController.messageController.findMessagesReceivedByUser);
            app.post("/api/users/:senderId/sentMessages/:receiverId", MessageController.messageController.sendMessageBetweenUsers);
            app.delete("/api/messages/:mid", MessageController.messageController.deleteMessage);
            app.put("/api/messages/:mid", MessageController.messageController.updateMessage);
            app.delete("/api/users/:uid/messages", MessageController.messageController.deleteAllMessagesForUser);
        }
        return MessageController.messageController;
    }
    findMessagesSentByUser = (req: Request, res: Response): void => {
        MessageController.messageDao.findMessagesSentByUser(req.params.uid).then((messages: Message[]) => res.json(messages));
    }
    
    findMessagesReceivedByUser = (req: Request, res: Response): void => {
        MessageController.messageDao.findMessagesReceivedByUser(req.params.uid).then((messages: Message[]) => res.json(messages));
    }
    sendMessageBetweenUsers = (req: Request, res: Response): void => {
        MessageController.messageDao.sendMessageBetweenUsers(req.params.senderId, req.params.receiverId, req.body).then((message) => res.json(message));
    }
    deleteMessage = (req: Request, res: Response) : void => {
        MessageController.messageDao.deleteMessage(req.params.mid).then(status => res.send(status));
    }
    updateMessage = (req: Request, res: Response) : void => {
        MessageController.messageDao.updateMessage(req.params.mid, req.body).then(status => res.send(status));
    }
    deleteAllMessagesForUser = (req: Request, res: Response) : void => {
        MessageController.messageDao.deleteAllMessagesForUser(req.params.uid).then(status => res.send(status));
    }

}