/**
 * @jest-environment jsdom
 */

import {createUser, deleteUsersByUsername} from "../services/users-service";
import {createTuitByUser, deleteTuit} from "../services/tuits-service";
import {findAllTuitsDislikedByUser, userDislikesTuit} from "../services/dislike-service";
import {render,screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import Tuits from "../components/tuits";


// mocked user and tuit to test dislike button
const mockTuit = {tuit: 'tuit for dislike button'};
const mockUser = {username: 'user', password: 'passpass', credential: 'me', email: '123@gmail.com'}


test('test my dislike screen works', async () => {
    // create new user
    const userInserted = await createUser(mockUser);

    // tuits a new tuit
    const tuitInserted = await createTuitByUser(userInserted._id, mockTuit);

    // dislike that tuit
    await userDislikesTuit(userInserted._id, tuitInserted._id);

    const tuits = await findAllTuitsDislikedByUser(userInserted._id);
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);
    const linkElement = screen.getByText(/tuit for dislike button/i);
    expect(linkElement).toBeInTheDocument();
    // clean up tuit inserted
    await deleteTuit(tuitInserted._id);

    // clean up user inserted
    await deleteUsersByUsername(mockUser.username);

})

