/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
 import TuitModel from "../mongoose/tuits/TuitModel";
 import Tuit from "../models/tuits/Tuit";
 import TuitDaoI from "../interfaces/TuitDaoI";
 
 /**
  * @class TuitDao Implements Data Access Object managing data storage
  * of Tuits
  * @property {TuitDao} tuitDai Private single instance of TuitDai
  */
 export default class TuitDao implements TuitDaoI{
     private static tuitDao: TuitDao | null = null;
     
    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
     public static getInstance = (): TuitDao => {
         if(TuitDao.tuitDao === null) {
             TuitDao.tuitDao = new TuitDao();
         }
         return TuitDao.tuitDao;
     }
     private constructor() {}
     
    /**
     * Uses TuitModel to retrieve all tuits
     * @returns Promise To be notified when tuits are retrieved from the database
     */
     findAllTuits = async (): Promise<Tuit[]> =>
         TuitModel.find();
         
    /**
     * Uses TuitModel to retrieve tuits poosted by user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when tuits are retrieved from the database
     */
     findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
         TuitModel.find({postedBy: uid});
           
    /**
     * Uses TuitModel to retrieve tuit by its id
     * @param {string} uid tuit's primary key
     * @returns Promise To be notified when tuit is retrieved from the database
     */
     findTuitById = async (uid: string): Promise<any> =>
         TuitModel.findById(uid)
             .populate("postedBy")
             .exec();
               
    /**
     * Uses TuitModel to create tuit for user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when tuit created in the database
     */
     createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
         TuitModel.create({...tuit, postedBy: uid});
           
    /**
     * Uses TuitModel to update a tuit
     * @param {string} tid tuit's primary key
     * @param {Tuit} tuit updated tuit
     * @returns Promise To be notified when tuits are updated from the database
     */
     updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
         TuitModel.updateOne(
             {_id: uid},
             {$set: tuit});
               
    /**
     * Uses TuitModel to delete a tuit
     * @param {string} tid tuit's primary key
     * @returns Promise To be notified when tuits are deleted from the database
     */
     deleteTuit = async (uid: string): Promise<any> =>
         TuitModel.deleteOne({_id: uid});
 }