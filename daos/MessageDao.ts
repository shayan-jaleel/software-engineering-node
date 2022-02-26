/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/messages/MessageModel";

 /**
  * @class MessageDao Implements Data Access Object managing data storage
  * of messages
  * @property {MessageDao} messageDao Private single instance of MessageDao
  */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    private constructor() { }
    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao == null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    /**
     * Uses MessageModel to retrieve messages sent by user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when messages are retrieved from the database
     */
    findMessagesSentByUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({ from: uid })
        .populate("from")
        .populate("to")
        .exec();

    /**
     * Uses MessageModel to retrieve messages received by user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when messages are retrieved from the database
     */
    findMessagesReceivedByUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({ to: uid })
        .populate("from")
        .populate("to")
        .exec();

    /**
     * Uses MessageModel to record message sent by user to another user
     * @param {string} senderId sender's primary key
     * @param {string} receiverId receiver's primary key
     * @returns Promise To be notified when messages are sent from the database
     */
    sendMessageBetweenUsers = async (senderId: string, receiverId: string, message: Message): Promise<Message> => {
        return MessageModel.create({ ...message, from: senderId, to: receiverId });
    }
    /**
     * Uses MessageModel to delete message sent by user to another user
     * @param {string} messageId sender's primary key
     * @returns Promise To be notified when message is deleted from the database
     */
    deleteMessage = async (messageId: string): Promise<any> =>
        MessageModel.deleteOne({ _id: messageId });

    /**
     * Uses MessageModel to update message sent by user to another user
     * @param {string} messageId sender's primary key
     * @returns Promise To be notified when message is updated from the database
     */
    updateMessage = async (messageId: string, message: Message): Promise<any> =>
        MessageModel.updateOne({ _id: messageId }, { $set: message })

    /**
     * Uses MessageModel to delete all messages sent by user to anyone
     * @param {string} uid sender's primary key
     * @returns Promise To be notified when messages are deleted from the database
     */
    deleteAllMessagesForUser = async (uid: string): Promise<any> =>
        MessageModel.deleteMany({ from: { $eq: uid }});
}