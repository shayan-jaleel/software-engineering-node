import Tuit from "../models/tuits/Tuit";
import User from "../models/users/User";

export default interface UserDaoI {
   findAllUsers(): Promise<User[]>;
   findUserById(uid: string): Promise<any>;
   createUser(user: User): Promise<User>;
   updateUser(uid: string, user: User): Promise<any>;
   deleteUser(uid: string): Promise<any>;
   findBookmarksForUser(uid: string) : Promise<any>;
   createBookmarkForUser(uid: string, tid: string) : Promise<any>;
   deleteBookmarkForUser(uid: string, tid: string) : Promise<any>;
   deleteAllBookmarksForUser(uid: string) : Promise<any>;
   hasUserBookmarkedTuit(uid: string, tid: string) : Promise<any>;
   userFollowsAnotherUser(followerId: string, followeeId: string) : Promise<any>;
   userUnfollowsAnotherUser(followerId: string, followeeId: string) : Promise<any>;
   findAllFollowersForUser(uid: string) : Promise<any>;
   findAllFolloweesForUser(uid: string) : Promise<any>;
   doesUserfollowAnotherUser(followerId: string, followeeId: string) : Promise<any>;
   deleteAllFolloweesForUser(uid: string) : Promise<any>;
}
