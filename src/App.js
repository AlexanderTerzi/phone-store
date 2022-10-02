import { useEffect, useState } from 'react';
import axios from 'axios';

import Categories from './components/Categories';
import Header from './components/Header';
import Sort from './components/Sort';
import PhoneBlock from './components/PhoneBlock';
import Footer from './components/Footer';

import './scss/app.scss';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`https://6331ae2c3ea4956cfb64b9b1.mockapi.io/products`)
      .then((res) => setProducts(res.data))
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
          </div>
          <h2 className="content__title">Все смартфоны</h2>
          <Sort />
          <div className="content__items">
            {products && products.map((obj) => (
              <PhoneBlock
                key={obj.id}
                {...obj}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
