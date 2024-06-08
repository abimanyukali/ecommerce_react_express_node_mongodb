import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { popularProducts } from '../data';
import Product from './Product';
import axios from 'axios';
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
function Products({ cat, filters, sort }) {
  console.log(cat,filters,sort);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : 'http://localhost:5000/api/products'
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [cat]);
  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);
  console.log(filteredProducts);

  useEffect(() => {
    console.log(sort);
    if (sort === 'newest') {
      setFilteredProducts((pre) =>
        [...pre].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === 'asc') {
      setFilteredProducts((pre) => [...pre].sort((a, b) => a.price - b.price));
    } else {
      setFilteredProducts((pre) => [...pre].sort((a, b) => b.price - a.price));
    }
  }, [sort]);
  return (
    <div>
      <Container>
        {cat
          ? filteredProducts.map((item) => (
              <Product item={item} key={item.id} />
            ))
          : products
              .slice(0, 8)
              .map((item) => <Product item={item} key={item.id} />)}
      </Container>
    </div>
  );
}

export default Products;
