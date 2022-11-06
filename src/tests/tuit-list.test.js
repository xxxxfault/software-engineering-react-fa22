import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";


const MOCKED_TUITS = [
    { _id:"123",postedBy: {username: "alice"},tuit:"alice's tuit"},
    { _id:"234",postedBy: {username: "bob"},tuit:"bob's tuit"},
    { _id:"345",postedBy: {username: "charlie"},tuit:"charlie's tuit"}
];

test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>);
  const linkElement = screen.getByText(/alice's tuit/i);
  expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
    const tuits = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);
    const linkElement = screen.getAllByText(/Alice's tuit/i);
    expect(linkElement[0]).toBeInTheDocument();


})


describe('tuits list renders mocked',()=>{

    const axios = require('axios')

    beforeAll(() => {
        jest.spyOn(axios, 'get').mockImplementation()
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })
test('tuit list renders mocked', async () => {
    axios.get.mockImplementation(() =>
        Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
    const response = await findAllTuits();
    const tuits = response.tuits;

    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);

    const tuit = screen.getByText(/alice's tuit/i);
    expect(tuit).toBeInTheDocument();
});

})
