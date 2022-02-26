/**
 * @file Declares API for Users related data access object methods
 */
import Tuit from "../models/tuits/Tuit";
import User from "../models/users/User";

export default interface UserDaoI {

   /**
    * Uses UserModel to retrieve all user documents from users collection
    * @returns Promise To be notified when the users are retrieved from
    * database
    */
   findAllUsers(): Promise<User[]>;

   /**
    * Uses UserModel to retrieve single user document from users collection
    * @param {string} uid User's primary key
    * @returns Promise To be notified when user is retrieved from the database
    */
   findUserById(uid: string): Promise<any>;
    
   /**
    * Inserts user instance into the database
    * @param {User} user Instance to be inserted into the database
    * @returns Promise To be notified when user is inserted into the database
    */
   createUser(user: User): Promise<User>;


    /**
     * Updates user in the database.
     * @param {string} uid Primary key of user to be removed
     * @param {User} user updated User instance
     * @returns Promise To be notified when user is updated in the database
     */
   updateUser(uid: string, user: User): Promise<any>;

    /**
     * Removes user from the database.
     * @param {string} uid Primary key of user to be removed
     * @returns Promise To be notified when user is removed from the database
     */
   deleteUser(uid: string): Promise<any>;    
   /**
    * Finds bookmark for user in the db
    * @param {string} uid Primary key of user to be removed
    * @returns Promise To be notified when bookmarks are found in the database
    */
   findBookmarksForUser(uid: string) : Promise<any>;
   /**
    * Creates bookmark for user in the db
    * @param {string} uid Primary key of user to be removed
    * @param {string} tid tuit id
    * @returns Promise To be notified when bookmark created in the database
    */
   createBookmarkForUser(uid: string, tid: string) : Promise<any>;
    
   /**
    * Removes bookmark for user in the db
    * @param {string} uid Primary key of user to be removed
    * @param {string} tid tuit id
    * @returns Promise To be notified when bookmark deleted in the database
    */
   deleteBookmarkForUser(uid: string, tid: string) : Promise<any>;
    
   /**
    * Removes all bookmarks for user in the db
    * @param {string} uid Primary key of user to be removed
    * @returns Promise To be notified when bookmarks removed in the database
    */
   deleteAllBookmarksForUser(uid: string) : Promise<any>;
    
   /**
    * Checks if user has bookmarked a tuit
    * @param {string} uid Primary key of user
    * @param {string} tid tuit id
    * @returns Promise To be notified about the result
    */
   hasUserBookmarkedTuit(uid: string, tid: string) : Promise<any>;
    
   /**
    * Creates a following
    * @param {string} followerId Primary key of user
    * @param {string} followeeId tuit id
    * @returns Promise To be notified about the result
    */
   userFollowsAnotherUser(followerId: string, followeeId: string) : Promise<any>;
   /**
    * Deletes a following
    * @param {string} followerId Primary key of user
    * @param {string} followeeId tuit id
    * @returns Promise To be notified about the result
    */
   userUnfollowsAnotherUser(followerId: string, followeeId: string) : Promise<any>;
   /**
    * Returns all followers for user
    * @param {string} uid Primary key of user
    * @returns Promise To be notified about the followers
    */
   findAllFollowersForUser(uid: string) : Promise<any>;
   /**
    * Returns all followees for user
    * @param {string} uid Primary key of user
    * @returns Promise To be notified about the followees
    */
   findAllFolloweesForUser(uid: string) : Promise<any>;
    
   /**
    * Checks if user follows another user
    * @param {string} followerId Primary key of user
    * @param {string} followeeId Primary key of user
    * @returns Promise to be notified about the result
    */
   doesUserfollowAnotherUser(followerId: string, followeeId: string) : Promise<any>;
   /**
    * Delete followees for user
    * @param {string} uid Primary key of user
    * @returns Promise to be notified about the result
    */
   deleteAllFolloweesForUser(uid: string) : Promise<any>;
}
