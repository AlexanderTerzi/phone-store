import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import SingleProduct from './pages/SingleProduct';

export const routes = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/cart",
        element: <Cart />
    },
    {
        path: "/products/:id",
        element: <SingleProduct />
    },
    {
        path: "*",
        element: <NotFound />
    }
]