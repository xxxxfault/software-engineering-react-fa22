import {createUser, deleteUsersByUsername} from "../services/users-service";
import {createTuit, createTuitByUser, deleteTuit} from "../services/tuits-service";
import {userDislikesTuit, userTogglesTuitDislikes} from "../services/dislike-service";
import {login, signup} from "../services/auth-service";

// mocked user and tuit to test dislike button
const mockTuit={tuit:'tuit for dislike button'};
const mockUser={username:'user',password:'passpass',credential: 'me',email:'123@gmail.com'}


describe('test  dislike button works',()=>{

    beforeAll(()=>{
        return deleteUsersByUsername(mockUser.username);
    })

    afterAll(()=>{
        return deleteUsersByUsername(mockUser.username);
    })

    test('test  dislike button works',async ()=>{
        // create new user
        const userInserted = await createUser(mockUser);

        // tuits a new tuit
        const tuitInserted = await createTuitByUser(userInserted._id,mockTuit);

        // dislike that tuit
        await userDislikesTuit(userInserted._id, tuitInserted._id);
        expect(tuitInserted.stats.dislikes).toEqual(1);


        // undislike that tuit
        await userTogglesTuitDislikes(userInserted._id, tuitInserted._id);
        expect(tuitInserted.stats.dislikes).toEqual(0);

        // clean up tuit inserted
        await deleteTuit(tuitInserted._id);

    })








})