import Message from "../models/messages/Message";
/**
 * @file Declares API for Message related data access object methods
 */
export default interface MessageDaoI {
    /**
     * Uses MessageModel to retrieve messages sent by user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when messages are retrieved from the database
     */
    findMessagesSentByUser(uid: string) : Promise<Message[]>;

    /**
     * Uses MessageModel to retrieve messages received by user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when messages are retrieved from the database
     */
    findMessagesReceivedByUser(uid: string) : Promise<Message[]>;

    /**
     * Uses MessageModel to record message sent by user to another user
     * @param {string} senderId sender's primary key
     * @param {string} receiverId receiver's primary key
     * @returns Promise To be notified when messages are sent from the database
     */
    sendMessageBetweenUsers(senderId: string, receiverId: string, message: Message) : Promise<Message>;

    /**
     * Uses MessageModel to delete message sent by user to another user
     * @param {string} messageId sender's primary key
     * @returns Promise To be notified when message is deleted from the database
     */
    deleteMessage(messageId: string) : Promise<any>;

    /**
     * Uses MessageModel to update message sent by user to another user
     * @param {string} messageId sender's primary key
     * @returns Promise To be notified when message is updated from the database
     */
    updateMessage(messageId: string, message: Message) : Promise<any>;
    
    /**
     * Uses MessageModel to delete all messages sent by user to anyone
     * @param {string} uid sender's primary key
     * @returns Promise To be notified when messages are deleted from the database
     */
    deleteAllMessagesForUser(uid: string) : Promise<any>;
}