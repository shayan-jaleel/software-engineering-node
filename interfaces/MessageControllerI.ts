/**
 * @file Declares API for Messages
 */
import {Request, Response} from "express";

export default interface MessageControllerI {   
     /**
    * Retrieves all messages from the database sent by a particular user.
    * @param {Request} req Represents request from client
    * @param {Response} res Represents response to client, including the
    * body formatted as JSON arrays containing the message objects
    */
    findMessagesSentByUser (req: Request, res: Response): void;
    /**
     * Retrieves all messages from the database received by a particular user.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findMessagesReceivedByUser (req: Request, res: Response): void;
         
    /**
     * Sends a message between two users.
     * @param {Request} req Represents request from client including the sender and receiver ids
     * @param {Response} res Represents response to client
     */
    sendMessageBetweenUsers (req: Request, res: Response): void;
         
    /**
     * Deletes a particular message instance from the database based on its id.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON status
     */
    deleteMessage (req: Request, res: Response): void;
         
    /**
     * Updates a particular message instance from the database based on its id.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON status.
     */
    updateMessage (req: Request, res: Response): void;

    /**
      * Deletes all messages for a user.
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * delete status in the body.
      */
    deleteAllMessagesForUser (req: Request, res: Response): void;
};