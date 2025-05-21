import React, { useEffect, useState } from 'react';


const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  const handleAdd = (id) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleRemove = (id) => {
    setCart(prev => {
      const count = prev[id] || 0;
      if (count <= 1) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: count - 1 };
    });
  };

  return (
    <div className="container-fluid bg-dark text-white min-vh-100 py-5">
      <div className="container">
        <h2 className="text-center text-light mb-4">Our Products</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {products.map(product => (
            <div className="col" key={product.id}>
              <div className="card h-100 bg-light text-dark">
                <img
                  src={product.image}
                  alt={product.title}
                  className="card-img-top p-3"
                  style={{ height: '200px', objectFit: 'contain' }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                  <p className="card-text"><strong>Category:</strong> {product.category}</p>
                  <p className="card-text">
                    <strong>Rating:</strong> {product.rating.rate} ⭐
                  </p>
                  <p className="card-text">
                    <strong>Stock:</strong> {product.rating.count}
                  </p>
                </div>
                <div className="card-footer bg-white d-flex justify-content-between align-items-center">
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleRemove(product.id)}
                      disabled={!cart[product.id]}
                    >−</button>
                    <span className="px-3 align-self-center">{cart[product.id] || 0}</span>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleAdd(product.id)}
                    >+</button>
                  </div>
                  <button
                    className="btn btn-primary ms-3"
                    onClick={() => handleAdd(product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
