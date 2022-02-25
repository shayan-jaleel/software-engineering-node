/**
 * @file Controller RESTful Web service API for users resource
 */
 import UserDao from "../daos/UserDao";
 import User from "../models/users/User";
 import {Express, Request, Response} from "express";
 import UserControllerI from "../interfaces/UserControllerI";
import Tuit from "../models/tuits/Tuit";
 
 /**
  * @class UserController Implements RESTful Web service API for users resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>POST /api/users to create a new user instance</li>
  *     <li>GET /api/users to retrieve all the user instances</li>
  *     <li>GET /api/users/:uid to retrieve an individual user instance </li>
  *     <li>PUT /api/users to modify an individual user instance </li>
  *     <li>DELETE /api/users/:uid to remove a particular user instance</li>
  * </ul>
  * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
  * @property {UserController} userController Singleton controller implementing
  * RESTful Web service API
  */
 export default class UserController implements UserControllerI {
     private static userDao: UserDao = UserDao.getInstance();
     private static userController: UserController | null = null;
 
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @returns UserController
      */
     public static getInstance = (app: Express): UserController => {
         if(UserController.userController === null) {
             UserController.userController = new UserController();
             // RESTful User Web service API
             app.get("/api/users",
                 UserController.userController.findAllUsers);
             app.get("/api/users/:uid",
                 UserController.userController.findUserById);
             app.post("/api/users",
                 UserController.userController.createUser);
             app.put("/api/users/:uid",
                 UserController.userController.updateUser);
             app.delete("/api/users/:uid",
                 UserController.userController.deleteUser);
            app.get("/api/users/:uid/bookmarks",
                UserController.userController.findBookmarksForUser);
            app.post("/api/users/:uid/bookmarks/:tid",
                UserController.userController.createBookmarkForUser);
            app.delete("/api/users/:uid/bookmarks/:tid",
                UserController.userController.deleteBookmarkForUser);
            app.delete("/api/users/:uid/bookmarks",
                UserController.userController.deleteAllBookmarksForUser);
            app.head("/api/users/:uid/bookmarks/:tid",
                UserController.userController.hasUserBookmarkedTuit);
            app.post("/api/users/:followerId/followees/:followeeId",
                UserController.userController.userFollowsAnotherUser);
            app.delete("/api/users/:followerId/followees/:followeeId",
                UserController.userController.userUnfollowsAnotherUser);
            app.get("/api/users/:uid/followers",
                UserController.userController.findAllFollowersForUser);
            app.get("/api/users/:uid/followees",
                UserController.userController.findAllFolloweesForUser);
            app.head("/api/users/:followerId/followees/:followeeId",
                UserController.userController.doesUserFollowAnotherUser);
            app.delete("/api/users/:uid/followees",
                UserController.userController.deleteAllFolloweesForUser);
         }
         return UserController.userController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all users from the database and returns an array of users.
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
     findAllUsers = (req: Request, res: Response) =>
         UserController.userDao.findAllUsers()
             .then((users: User[]) => res.json(users));
 
     /**
      * Retrieves the user by their primary key
      * @param {Request} req Represents request from client, including path
      * parameter uid identifying the primary key of the user to be retrieved
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the user that matches the user ID
      */
     findUserById = (req: Request, res: Response) =>
         UserController.userDao.findUserById(req.params.uid)
             .then((user: User) => res.json(user));
     
     /**
      * Creates a new user instance
      * @param {Request} req Represents request from client, including body
      * containing the JSON object for the new user to be inserted in the
      * database
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new user that was inserted in the
      * database
      */
     createUser = (req: Request, res: Response) =>
         UserController.userDao.createUser(req.body)
             .then((user: User) => res.json(user));
     
     /**
      * Modifies an existing user instance
      * @param {Request} req Represents request from client, including path
      * parameter uid identifying the primary key of the user to be modified
      * @param {Response} res Represents response to client, including status
      * on whether updating a user was successful or not
      */
     updateUser = (req: Request, res: Response) =>
         UserController.userDao.updateUser(req.params.uid, req.body)
             .then((status) => res.send(status));
     
     /**
      * Removes a user instance from the database
      * @param {Request} req Represents request from client, including path
      * parameter uid identifying the primary key of the user to be removed
      * @param {Response} res Represents response to client, including status
      * on whether deleting a user was successful or not
      */
     deleteUser = (req: Request, res: Response) =>
         UserController.userDao.deleteUser(req.params.uid)
             .then((status) => res.send(status));

    findBookmarksForUser = (req: Request, res: Response) =>
    UserController.userDao.findBookmarksForUser(req.params.uid)
        .then((tuits : Tuit[]) => res.json(tuits));

    createBookmarkForUser = (req: Request, res: Response) => {
        UserController.userDao.createBookmarkForUser(req.params.uid, req.params.tid)
        .then(status => res.send(status));
    }
    deleteBookmarkForUser = (req: Request, res: Response) => {
        UserController.userDao.deleteBookmarkForUser(req.params.uid, req.params.tid)
        .then(status => res.send(status));
    }
    deleteAllBookmarksForUser = (req: Request, res:Response) => {
        UserController.userDao.deleteAllBookmarksForUser(req.params.uid)
        .then(status => res.send(status));
    }
    hasUserBookmarkedTuit = (req: Request, res: Response) => {
        UserController.userDao.hasUserBookmarkedTuit(req.params.uid, req.params.tid)
        .then(hasBookmarked => hasBookmarked? res.sendStatus(200) : res.sendStatus(404));
    }
    userFollowsAnotherUser = (req: Request, res: Response) => {
        UserController.userDao.userFollowsAnotherUser(req.params.followerId, req.params.followeeId)
        .then(status => res.send(status)).catch(e => res.sendStatus(404).send(e));
    }
    userUnfollowsAnotherUser = (req: Request, res: Response) => {
        UserController.userDao.userUnfollowsAnotherUser(req.params.followerId, req.params.followeeId)
        .then(status => res.send(status)).catch(e => res.sendStatus(404).send(e));;
    }
    findAllFollowersForUser = (req: Request, res: Response) => {
        UserController.userDao.findAllFollowersForUser(req.params.uid)
        .then(followers => res.json(followers)).catch(e => res.sendStatus(404).send(e));;
    }
    findAllFolloweesForUser = (req: Request, res: Response) => {
        UserController.userDao.findAllFolloweesForUser(req.params.uid)
        .then(followees => res.json(followees)).catch(e => res.sendStatus(404).send(e));
    }
    doesUserFollowAnotherUser = (req: Request, res: Response) => {
        UserController.userDao.doesUserfollowAnotherUser(req.params.followerId, req.params.followeeId)
        .then(doesUserFollow => doesUserFollow ? res.sendStatus(200) : res.sendStatus(404));
    }
    deleteAllFolloweesForUser = (req: Request, res: Response) => {
        UserController.userDao.deleteAllFolloweesForUser(req.params.uid)
        .then(status => res.send(status));
    }
};