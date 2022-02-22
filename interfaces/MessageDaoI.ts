import Message from "../models/messages/Message";

export default interface MessageDaoI {
    findMessagesSentByUser(uid: string) : Promise<Message[]>;
    findMessagesReceivedByUser(uid: string) : Promise<Message[]>;
    sendMessageBetweenUsers(senderId: string, receiverId: string, message: Message) : Promise<Message>;
    deleteMessage(messageId: string) : Promise<any>;
    updateMessage(messageId: string, message: Message) : Promise<any>;
    deleteAllMessagesForUser(uid: string) : Promise<any>;
}