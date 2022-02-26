import {Request, Response} from "express";
/**
 * @file Declares API for Users
 */
export default interface UserControllerI { 
   /**
    * Retrieves all users from the database and returns an array of users.
    * @param {Request} req Represents request from client
    * @param {Response} res Represents response to client, including the
    * body formatted as JSON arrays containing the user objects
    */
   findAllUsers(req: Request, res: Response): void;
 
   /**
    * Retrieves the user by their primary key
    * @param {Request} req Represents request from client, including path
    * parameter uid identifying the primary key of the user to be retrieved
    * @param {Response} res Represents response to client, including the
    * body formatted as JSON containing the user that matches the user ID
    */
   findUserById(req: Request, res: Response): void;
     
   /**
    * Creates a new user instance
    * @param {Request} req Represents request from client, including body
    * containing the JSON object for the new user to be inserted in the
    * database
    * @param {Response} res Represents response to client, including the
    * body formatted as JSON containing the new user that was inserted in the
    * database
    */
   createUser(req: Request, res: Response): void;
     
     /**
      * Removes a user instance from the database
      * @param {Request} req Represents request from client, including path
      * parameter uid identifying the primary key of the user to be removed
      * @param {Response} res Represents response to client, including status
      * on whether deleting a user was successful or not
      */
   deleteUser(req: Request, res: Response): void;
     
   /**
    * Modifies an existing user instance
    * @param {Request} req Represents request from client, including path
    * parameter uid identifying the primary key of the user to be modified
    * @param {Response} res Represents response to client, including status
    * on whether updating a user was successful or not
    */
   updateUser(req: Request, res: Response): void;
 
   /**
    * Find bookmarks for a specific user
    * @param {Request} req Represents request from client, including path
    * parameter uid identifying the primary key of the user with the bookmarks
    * @param {Response} res Represents response to client, including the retrieved bookmarks
    */
   findBookmarksForUser(req: Request, res: Response): void;

   /**
    * Creates a bookmark for a specific user
    * @param {Request} req Represents request from client, including path
    * parameter uid identifying the primary key of the user and tid identifying a tuit
    * @param {Response} res Represents response to client
    */
   createBookmarkForUser(req: Request, res: Response): void;

   /**
    * Deletes a bookmark for a specific user
    * @param {Request} req Represents request from client, including path
    * parameter uid identifying the primary key of the user and tid identifying a bookmarked tuit
    * @param {Response} res Represents response to client
    */
   deleteBookmarkForUser(req: Request, res: Response): void;

    /**
     * Creates all bookmarks for a specific user
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user
     * @param {Response} res Represents response to client
     */
   deleteAllBookmarksForUser(req: Request, res: Response): void;

   /**
    * Determines whether or not a tuit has been bookmarked by a user
    * @param {Request} req Represents request from client, including path
    * parameter uid identifying the primary key of the user and tid identifying a tuit
    * @param {Response} res Represents response to client, status code 200 = yes; 404 = no
    */
   hasUserBookmarkedTuit(req: Request, res: Response): void;

   /**
    * Creates a following between two users
    * @param {Request} req Represents request from client, including path
    * parameters followerId and followeeId identifying the primary keys of the users involved
    * @param {Response} res Represents response to client
    */
   userFollowsAnotherUser(req: Request, res: Response): void;

   /**
    * Deletes a following between two users
    * @param {Request} req Represents request from client, including path
    * parameters followerId and followeeId identifying the primary keys of the users involved
    * @param {Response} res Represents response to client
    */
   userUnfollowsAnotherUser(req: Request, res: Response): void;
   /**
    * Finds all followers for a user
    * @param {Request} req Represents request from client, including path
    * parameter uid identifying the primary key of the user
    * @param {Response} res Represents response to client
    */
   findAllFollowersForUser(req: Request, res: Response): void;
   /**
    * Finds all followees for a user
    * @param {Request} req Represents request from client, including path
    * parameter uid identifying the primary key of the user
    * @param {Response} res Represents response to client
    */
   findAllFolloweesForUser(req: Request, res: Response): void;
   /**
    * Tells us whether or not a user follows another user
    * @param {Request} req Represents request from client, including path
    * parameters followerId and followeeId identifying the primary key of the users involved
    * @param {Response} res Represents response to client
    */
   doesUserFollowAnotherUser(req: Request, res: Response): void;
   /**
    * Deletes all followers for a user
    * @param {Request} req Represents request from client, including path
    * parameter uid identifying the primary key of the user
    * @param {Response} res Represents response to client
    */
   deleteAllFolloweesForUser(req: Request, res: Response): void;
}
