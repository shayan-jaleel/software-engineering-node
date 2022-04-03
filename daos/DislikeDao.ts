/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */

import DislikeDaoI from "../interfaces/DislikeDaoI";
import Dislike from "../models/dislikes/Dislike";
import DislikeModel from "../mongoose/dislike/DislikeModel";

 
  /**
   * @class DislikeDao Implements Data Access Object managing data storage
   * of Likes
   * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
   */
 export default class DislikeDao implements DislikeDaoI {
     private static dislikeDao: DislikeDao | null = null;
     /**
      * Creates singleton DAO instance
      * @returns DislikeDao
      */
     public static getInstance = (): DislikeDao => {
         if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
         }
         return DislikeDao.dislikeDao;
     }
     private constructor() {}
     
     /**
      * Uses DislikeModel to retrieve users that disliked a tuit
      * @param {string} tid Tuit's primary key
      * @returns Promise To be notified when users are retrieved from the database
      */
     findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
         DislikeModel
             .find({tuit: tid})
             .populate("dislikedBy")
             .exec();
     /**
      * Uses DislikeModel to retrieve tuits disliked by a user
      * @param {string} uid User's primary key
      * @returns Promise To be notified when tuits are retrieved from the database
      */
     findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
     DislikeModel
             .find({dislikedBy: uid})
             .populate("tuit")
             .exec();
     /**
      * Uses DislikeModel to record disliking of a tuit
      * @param {string} uid User's primary key
      * @param {string} tid tuit's primary key
      * @returns Promise To be notified when like is recorded
      */
     userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
     DislikeModel.create({tuit: tid, dislikedBy: uid});
     /**
      * Uses DislikeModel to record undisliking of a tuit
      * @param {string} uid User's primary key
      * @param {string} tid Tuit's primary key
      * @returns Promise To be notified when like is deleted
      */
     userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
     DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});
 
    /**
     * Uses DislikeModel to find if user dislikes a tuit
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when entry found
     */ 
     findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
         DislikeModel.findOne({tuit: tid, dislikedBy: uid});
         
    /**
     * Uses DislikeModel to count dislikes on tuits
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when count found
     */  
     countHowManyDislikedTuit = async (tid: string): Promise<any> =>
         DislikeModel.count({tuit: tid});
 }