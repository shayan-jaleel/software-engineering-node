import Dislike from "../models/dislikes/Dislike";

/**
 * @file Declares API for Dislikes related data access object methods
 */
export default interface DislikeDaoI {
    /**
     * Uses DislikeModel to retrieve users that disliked a tuit
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when users are retrieved from the database
     */

    findAllUsersThatDislikedTuit (tid: string): Promise<Dislike[]>;
    /**
     * Uses DislikeModel to retrieve tuits disliked by a user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    findAllTuitsDislikedByUser (uid: string): Promise<Dislike[]>;

    /**
     * Uses DislikeModel to record disliking of a tuit
     * @param {string} uid User's primary key
     * @param {string} tid tuit's primary key
     * @returns Promise To be notified when dislike is recorded
     */
    userUndislikesTuit (tid: string, uid: string): Promise<any>;
    
    /**
     * Uses DislikeModel to record unliking of a tuit
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when dislike is deleted
     */
    userDislikesTuit (tid: string, uid: string): Promise<Dislike>;
};