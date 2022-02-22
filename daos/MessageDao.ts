import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/messages/MessageModel";

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    private constructor() { }
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao == null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    findMessagesSentByUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({ from: uid })
        .populate("from")
        .populate("to")
        .exec();

    findMessagesReceivedByUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({ to: uid })
        .populate("from")
        .populate("to")
        .exec();

    sendMessageBetweenUsers = async (senderId: string, receiverId: string, message: Message): Promise<Message> => {
        return MessageModel.create({ ...message, from: senderId, to: receiverId });
    }

    deleteMessage = async (messageId: string): Promise<any> =>
        MessageModel.deleteOne({ _id: messageId });

    updateMessage = async (messageId: string, message: Message): Promise<any> =>
        MessageModel.updateOne({ _id: messageId }, { $set: message })

    deleteAllMessagesForUser = async (uid: string): Promise<any> =>
        MessageModel.deleteMany({ from: { $eq: uid }});
}