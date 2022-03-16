/**
 * @file Implements DAO managing data storage of users. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import User from "../models/users/User";
import UserModel from "../mongoose/users/UserModel";
import UserDaoI from "../interfaces/UserDaoI";
 
 /**
  * @class UserDao Implements Data Access Object managing data storage
  * of Users
  * @property {UserDao} userDao Private single instance of UserDao
  */
export default class UserDao implements UserDaoI {
    private static userDao: UserDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns UserDao
     */
    public static getInstance = (): UserDao => {
        if (UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }

    private constructor() { }

    /**
     * Uses UserModel to retrieve all user documents from users collection
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    async findAllUsers(): Promise<User[]> {
        return await UserModel.find();
    }

    /**
     * Uses UserModel to retrieve single user document from users collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    async findUserById(uid: string): Promise<any> {
        return await UserModel.findById(uid);
    }
    
    /**
     * Inserts user instance into the database
     * @param {User} user Instance to be inserted into the database
     * @returns Promise To be notified when user is inserted into the database
     */
    async createUser(user: User): Promise<User> {
        return await UserModel.create(user);
    }

    /**
     * Removes user from the database.
     * @param {string} uid Primary key of user to be removed
     * @returns Promise To be notified when user is removed from the database
     */
    async deleteUser(uid: string): Promise<any> {
        return await UserModel.deleteOne({ _id: uid });
    }
    
    /**
     * Updates user in the database.
     * @param {string} uid Primary key of user to be removed
     * @param {User} user updated User instance
     * @returns Promise To be notified when user is updated in the database
     */
    async updateUser(uid: string, user: User): Promise<any> {
        return await UserModel.updateOne({ _id: uid }, { $set: user });
    }
    
   /**
    * Remove user by username in the db.
    * @param {string} username for the user to be removed.
    * @returns Status of delete request
    */
   async deleteUserByUsername(uname: string) : Promise<any> {
       return await UserModel.deleteOne({username: uname});
   }
    
    /**
     * Finds bookmark for user in the db
     * @param {string} uid Primary key of user to be removed
     * @returns Promise To be notified when bookmarks are found in the database
     */
    async findBookmarksForUser(uid: string): Promise<any> {
        const user: User | null = await UserModel.findById(uid).populate("bookmarks").exec();
        return (user === null) ? null : user.bookmarks;
    }    

    /**
     * Creates bookmark for user in the db
     * @param {string} uid Primary key of user to be removed
     * @param {string} tid tuit id
     * @returns Promise To be notified when bookmark created in the database
     */
    async createBookmarkForUser(uid: string, tid: string): Promise<any> {
        const user: User | null = await UserModel.findById(uid);
        //    console.log(JSON.stringify(user))
        //    console.log()
        //    console.log(JSON.stringify(Object.assign(user.bookmarks)))
        //    console.log(JSON.stringify({...user}))
        if (user === null || !user.bookmarks) return null;
        //    const returnedTuit: Tuit|null = await TuitModel.findById(tid)
        //    if(returnedTuit == null) return null;
        //    user.
        //    const newUser:User = user;
        user.bookmarks?.push(tid);
        //    console.log(JSON.stringify(newUser))
        await UserModel.updateOne({ _id: uid }, { $set: user });
        return await UserModel.findById(uid).populate("bookmarks").exec();
    }
    
    /**
     * Removes bookmark for user in the db
     * @param {string} uid Primary key of user to be removed
     * @param {string} tid tuit id
     * @returns Promise To be notified when bookmark deleted in the database
     */
    async deleteBookmarkForUser(uid: string, tid: string): Promise<any> {
        const user: User | null = await UserModel.findById(uid);
        if (!user || !user.bookmarks) return null;
        const newBookmarks: string[] = user?.bookmarks?.filter(tuit => tuit !== tid);
        user.bookmarks = newBookmarks;
        return await UserModel.updateOne({ _id: uid }, { $set: user });
    }
    
    /**
     * Removes all bookmarks for user in the db
     * @param {string} uid Primary key of user to be removed
     * @returns Promise To be notified when bookmarks removed in the database
     */
    async deleteAllBookmarksForUser(uid: string): Promise<any> {
        const user: User | null = await UserModel.findById(uid);
        if(!user || !user.bookmarks) return null;
        user.bookmarks = [];
        return UserModel.updateOne({_id: uid}, {$set: user});
    }
    
    /**
     * Checks if user has bookmarked a tuit
     * @param {string} uid Primary key of user
     * @param {string} tid tuit id
     * @returns Promise To be notified about the result
     */
    async hasUserBookmarkedTuit(uid: string, tid: string): Promise<any> {
        const user : User | null = await UserModel.findById(uid);
        let hasBookmarked: boolean = false;
        if (user && user.bookmarks) {
            hasBookmarked = user.bookmarks.includes(tid)
        }
        return hasBookmarked;
    }
    
    /**
     * Creates a following
     * @param {string} followerId Primary key of user
     * @param {string} followeeId tuit id
     * @returns Promise To be notified about the result
     */
    async userFollowsAnotherUser(followerId: string, followeeId: string): Promise<any> {
        const follower: User | null = await UserModel.findById(followerId);
        const followee: User | null = await UserModel.findById(followeeId);
        if(!follower || !followee) {
            throw new Error("Invalid Users");
        }
        if(!follower.followees) {
            follower.followees = [];
        }
        if(!followee.followers) {
            followee.followers = [];
        }
        follower.followees.push(followeeId);
        followee.followers.push(followerId);
        await UserModel.updateOne({_id: followerId}, {$set: follower});
        return UserModel.updateOne({_id: followeeId}, {$set: followee});
    }
    /**
     * Deletes a following
     * @param {string} followerId Primary key of user
     * @param {string} followeeId tuit id
     * @returns Promise To be notified about the result
     */
    async userUnfollowsAnotherUser(followerId: string, followeeId: string): Promise<any> {
        const follower: User | null = await UserModel.findById(followerId);
        const followee: User | null = await UserModel.findById(followeeId);
        if(!follower || !followee) {
            throw new Error("Invalid Users!");
        }
        if(!follower.followees) {
            follower.followees = [];
        }
        if(!followee.followers) {
            followee.followers = [];
        }
        const followeeIndexForFollower:number = follower.followees.findIndex(id => id === followeeId);
        const followerIndexForFollowee:number = followee.followers.findIndex(id => id === followerId);
        followee.followers.splice(followerIndexForFollowee, 1);
        follower.followees.splice(followeeIndexForFollower, 1);
        await UserModel.updateOne({_id: followerId}, {$set: follower});
        return UserModel.updateOne({_id: followeeId}, {$set: followee});
    }
    /**
     * Returns all followers for user
     * @param {string} uid Primary key of user
     * @returns Promise To be notified about the followers
     */
    async findAllFollowersForUser(uid: string): Promise<any[]> {
        const user: User | null = await UserModel.findById(uid).populate("followers").exec();
        if(!user) {
            throw new Error("User not found!");
        }
        return user.followers;
    }
    /**
     * Returns all followees for user
     * @param {string} uid Primary key of user
     * @returns Promise To be notified about the followees
     */
    async findAllFolloweesForUser(uid: string): Promise<any[]> {
        const user: User | null = await UserModel.findById(uid).populate("followees").exec();
        if(!user) {
            throw new Error("User not found!");
        }
        return user.followees;
    }
    
    /**
     * Checks if user follows another user
     * @param {string} followerId Primary key of user
     * @param {string} followeeId Primary key of user
     * @returns Promise to be notified about the result
     */
    async doesUserfollowAnotherUser(followerId: string, followeeId: string): Promise<any> {
        const user: User | null = await UserModel.findById(followerId);
        // if(!user) {
        //     throw new Error("User not found!");
        // }
        if(user && user.followees && user.followees.includes(followeeId))  {
            return true;
        }
        return false;
    }
    /**
     * Delete followees for user
     * @param {string} uid Primary key of user
     * @returns Promise to be notified about the result
     */
    async deleteAllFolloweesForUser(uid: string): Promise<any> {
        const user: User | null = await UserModel.findById(uid);
        if(!user || !user.followees) {
            return;
        }
        user.followees.forEach(async curUid => {
            const curUser: User|null = await UserModel.findById(curUid);
            if(!curUser || !curUser.followers) {
                return;
            }
            const index:number = curUser.followers.findIndex(id => id === uid);
            // console.log("found index " + index);
            curUser.followers.splice(index, 1);
            await UserModel.updateOne({_id: curUid}, {$set: curUser});
        })
        user.followees = [];
        return UserModel.updateOne({_id: uid}, {$set : user});
    }
}
