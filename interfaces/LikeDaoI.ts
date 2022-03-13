import Like from "../models/likes/Like";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface LikeDaoI {
    /**
     * Uses LikeModel to retrieve users that liked a tuit
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when users are retrieved from the database
     */

    findAllUsersThatLikedTuit (tid: string): Promise<Like[]>;
    /**
     * Uses LikeModel to retrieve tuits liked by a user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    findAllTuitsLikedByUser (uid: string): Promise<Like[]>;

    /**
     * Uses LikeModel to record liking of a tuit
     * @param {string} uid User's primary key
     * @param {string} tid tuit's primary key
     * @returns Promise To be notified when like is recorded
     */
    userUnlikesTuit (tid: string, uid: string): Promise<any>;
    
    /**
     * Uses LikeModel to record unliking of a tuit
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when like is deleted
     */
    userLikesTuit (tid: string, uid: string): Promise<Like>;
};