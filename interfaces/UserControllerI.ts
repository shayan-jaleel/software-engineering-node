import {Request, Response} from "express";

export default interface UserControllerI {
   findAllUsers(req: Request, res: Response): void;
   findUserById(req: Request, res: Response): void;
   createUser(req: Request, res: Response): void;
   deleteUser(req: Request, res: Response): void;
   updateUser(req: Request, res: Response): void;
   findBookmarksForUser(req: Request, res: Response): void;
   createBookmarkForUser(req: Request, res: Response): void;
   deleteBookmarkForUser(req: Request, res: Response): void;
   deleteAllBookmarksForUser(req: Request, res: Response): void;
   hasUserBookmarkedTuit(req: Request, res: Response): void;
}
