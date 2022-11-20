import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import SingleProduct from './pages/SingleProduct';

export const routes = [
    {
        path: process.env.PUBLIC_URL + "/",
        element: <Home />
    },
    {
        path: process.env.PUBLIC_URL + "/cart",
        element: <Cart />
    },
    {
        path: process.env.PUBLIC_URL + "/products/:id",
        element: <SingleProduct />
    },
    {
        path: process.env.PUBLIC_URL + "*",
        element: <NotFound />
    }
]