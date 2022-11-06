import {createTuit, deleteTuit, findAllTuits, findTuitById} from "../services/tuits-service";
import {deleteUsersByUsername} from "../services/users-service";


describe('can create tuit with REST API', () => {
    const tuitEx = {
        tuit: 'Two asteroid missions launched to the skies, and another began its journey home to Earth.'
    };
    const uid = '63347b027d0ca1f025fc20da'

    test('can insert new tuit with REST API', async () => {
        // insert new tuit in the database
        const newTuit = await createTuit(uid, tuitEx);
        const tuitId = newTuit._id;
        // verify inserted user's properties match parameter tuit
        expect(newTuit.tuit).toEqual(tuitEx.tuit);
        expect(newTuit.postedBy).toEqual(uid);

        // clean up the inserted tuit
        await deleteTuit(tuitId);
    });
});

describe('can delete tuit wtih REST API', () => {
    const tuitEx = {
        tuit: 'Two asteroid missions launched to the skies, and another began its journey home to Earth.'
    };
    const uid = '63347b027d0ca1f025fc20da'


    test('can delete tuit with REST API', async () => {
        // insert new tuit in the database
        const newTuit = await createTuit(uid, tuitEx);
        const tuitId = newTuit._id;
        expect(newTuit.tuit).toEqual(tuitEx.tuit);
        expect(newTuit.postedBy).toEqual(uid);
        // delete that tuit
        await deleteTuit(tuitId);
        const noObjectFound = {}
        // that tuit should not be found
        expect(findTuitById(tuitId)).toMatchObject(noObjectFound);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    const tuitEx = {
        tuit: 'Two asteroid missions launched to the skies.'
    };
    const uid = '63347b027d0ca1f025fc20da'


    test('can retrieve a tuit by their primary key with REST API', async () => {
        // insert new tuit in the database
        const newTuit = await createTuit(uid, tuitEx);
        const tuitId = newTuit._id;
        const tuitFound = await findTuitById(tuitId)

        expect(newTuit.tuit).toEqual(tuitFound.tuit);
        // clean up the inserted tuit
        await deleteTuit(tuitId);


    });
});

describe('can retrieve all tuits with REST API', () => {
    const tuitEx = [{tuit: 'tuit 1'},
        {tuit: 'tuit2'},
        {tuit: 'tuit3'}];

    const uid = '63347b027d0ca1f025fc20da'

    test('can retrieve all tuits', async () => {

        tuitEx.map(tuit =>
            createTuit(uid, tuit))

        // check the length
        const tuits = await findAllTuits();
        expect(tuits.length).toBeGreaterThanOrEqual(tuitEx.length);

        //check each tuit
        const tuitsInserted = tuits.filter(tuit => tuitEx.indexOf(tuit.tuit)>=0);
        tuitsInserted.forEach(tuit =>{
            const tuitContent = tuitEx.find(tuit=>tuit===tuit.tuit);
            expect(tuit.tuit).toEqual(tuitContent);
            expect(tuit.postedBy).toEqual(uid);
            // clean up inserted
            deleteTuit(tuit._id);
        })



    })
});