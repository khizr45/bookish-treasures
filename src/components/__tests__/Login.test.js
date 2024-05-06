import {render,screen,cleanup} from '@testing-library/react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import store from '../../app/store'
import Login from '../Login'
import Home from '../Home';

afterEach(()=>{
    cleanup()
})

test('login page should render',()=>{
    render(
        <BrowserRouter>
                <Provider store={store}>

                <Home/>
            </Provider>
        </BrowserRouter>
    )
    const loginElement = screen.getByTestId('login')
    expect(loginElement).toBeInTheDocument()
})