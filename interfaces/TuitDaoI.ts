import Tuit from "../models/tuits/Tuit";
/**
 * @file Declares API for Tuits related data access object methods
 */
 export default interface TuitDaoI {     
  /**
   * Uses TuitModel to retrieve all tuits
   * @returns Promise To be notified when tuits are retrieved from the database
   */
   findAllTuits (): Promise<Tuit[]>;        

   /**
    * Uses TuitModel to retrieve tuits poosted by user
    * @param {string} uid User's primary key
    * @returns Promise To be notified when tuits are retrieved from the database
    */
   findAllTuitsByUser (uid: string): Promise<Tuit[]>;    

   /**
    * Uses TuitModel to retrieve tuit by its id
    * @param {string} uid tuit's primary key
    * @returns Promise To be notified when tuit is retrieved from the database
    */
   findTuitById (tid: string): Promise<Tuit>;         

   /**
    * Uses TuitModel to create tuit for user
    * @param {string} uid User's primary key
    * @returns Promise To be notified when tuit created in the database
    */
   createTuitByUser (uid: string, tuit: Tuit): Promise<Tuit>;      
        
   /**
    * Uses TuitModel to update a tuit
    * @param {string} tid tuit's primary key
    * @param {Tuit} tuit updated tuit
    * @returns Promise To be notified when tuits are updated from the database
    */
   updateTuit (tid: string, tuit: Tuit): Promise<any>;               

    /**
     * Uses TuitModel to delete a tuit
     * @param {string} tid tuit's primary key
     * @returns Promise To be notified when tuits are deleted from the database
     */
   deleteTuit (tid: string): Promise<any>;
};