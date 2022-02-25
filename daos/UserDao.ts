import User from "../models/users/User";
import UserModel from "../mongoose/users/UserModel";
import UserDaoI from "../interfaces/UserDaoI";

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
    async findAllUsers(): Promise<User[]> {
        return await UserModel.find();
    }
    async findUserById(uid: string): Promise<any> {
        return await UserModel.findById(uid);
    }
    async createUser(user: User): Promise<User> {
        return await UserModel.create(user);
    }
    async deleteUser(uid: string): Promise<any> {
        return await UserModel.deleteOne({ _id: uid });
    }
    async updateUser(uid: string, user: User): Promise<any> {
        return await UserModel.updateOne({ _id: uid }, { $set: user });
    }
    async findBookmarksForUser(uid: string): Promise<any> {
        const user: User | null = await UserModel.findById(uid).populate("bookmarks").exec();
        return (user === null) ? null : user.bookmarks;
    }
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
    async deleteBookmarkForUser(uid: string, tid: string): Promise<any> {
        const user: User | null = await UserModel.findById(uid);
        if (!user || !user.bookmarks) return null;
        const newBookmarks: string[] = user?.bookmarks?.filter(tuit => tuit !== tid);
        user.bookmarks = newBookmarks;
        return await UserModel.updateOne({ _id: uid }, { $set: user });
    }
    async deleteAllBookmarksForUser(uid: string): Promise<any> {
        const user: User | null = await UserModel.findById(uid);
        if(!user || !user.bookmarks) return null;
        user.bookmarks = [];
        return UserModel.updateOne({_id: uid}, {$set: user});
    }
    async hasUserBookmarkedTuit(uid: string, tid: string): Promise<any> {
        const user : User | null = await UserModel.findById(uid);
        let hasBookmarked: boolean = false;
        if (user && user.bookmarks) {
            hasBookmarked = user.bookmarks.includes(tid)
        }
        return hasBookmarked;
    }
}
