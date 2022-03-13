/**
 * @file Controller RESTful Web service API for tuits resource
 */
import { Express, Request, Response } from "express";
import Message from "../models/messages/Message";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";

 /**
  * @class MessageController Implements RESTful Web service API for message resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /api/users/:uid/sentMessages to find messages sent by
  *     a given user</li>
  *     <li>GET /api/users/:uid/receivedMessages to retrieve all the messages received by a user</li>
  *     <li>POST /api/users/:senderId/sentMessages/:receiverId to send a message between users</li>
  *     <li>DELETE /api/messages/:mid to delete a message </li>
  *     <li>PUT /api/messages/:mid to modify an individual message instance </li>
  *     <li>DELETE /api/users/:uid/messages to remove all messages sent by a user</li>
  * </ul>
  * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
  * @property {MessageController} messageController Singleton controller implementing
  * RESTful Web service API
  */
export default class MessageController implements MessageControllerI{
    private static messageDao: MessageDao = MessageDao.getInstance()
    private static messageController: MessageController | null = null;

    private constructor() { }
 
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return {MessageController}
      */
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
     
     /**
      * Retrieves all messages from the database sent by a particular user.
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the message objects
      */
    findMessagesSentByUser = (req: Request, res: Response): void => {
        MessageController.messageDao.findMessagesSentByUser(req.params.uid).then((messages: Message[]) => res.json(messages));
    }     

    /**
     * Retrieves all messages from the database received by a particular user.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findMessagesReceivedByUser = (req: Request, res: Response): void => {
        MessageController.messageDao.findMessagesReceivedByUser(req.params.uid).then((messages: Message[]) => res.json(messages));
    }
         
     /**
      * Sends a message between two users.
      * @param {Request} req Represents request from client including the sender and receiver ids
      * @param {Response} res Represents response to client
      */
    sendMessageBetweenUsers = (req: Request, res: Response): void => {
        MessageController.messageDao.sendMessageBetweenUsers(req.params.senderId, req.params.receiverId, req.body).then((message) => res.json(message));
    }
         
     /**
      * Deletes a particular message instance from the database based on its id.
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON status
      */
    deleteMessage = (req: Request, res: Response) : void => {
        MessageController.messageDao.deleteMessage(req.params.mid).then(status => res.send(status));
    }
         
     /**
      * Updates a particular message instance from the database based on its id.
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON status.
      */
    updateMessage = (req: Request, res: Response) : void => {
        MessageController.messageDao.updateMessage(req.params.mid, req.body).then(status => res.send(status));
    }
    /**
      * Deletes all messages for a user.
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * delete status in the body.
      */
    deleteAllMessagesForUser = (req: Request, res: Response) : void => {
        MessageController.messageDao.deleteAllMessagesForUser(req.params.uid).then(status => res.send(status));
    }

}