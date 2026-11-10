import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  
  const cartItems = useSelector(state => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", cost: "$14" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", cost: "$20" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/09/16/aloe-vera-3283389_1280.jpg", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2017/07/18/18/24/lavender-2516492_1280.jpg", cost: "$22" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2015/06/08/15/02/jasmine-801859_1280.jpg", cost: "$25" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/11/40/mint-1125712_1280.jpg", cost: "$10" },
        { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2017/08/21/20/03/eucalyptus-2666735_1280.jpg", cost: "$18" },
        { name: "Sweet Basil", image: "https://cdn.pixabay.com/photo/2016/07/22/16/54/basil-1535227_1280.jpg", cost: "$12" }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Calendula", image: "https://cdn.pixabay.com/photo/2019/07/15/18/27/calendula-4340122_1280.jpg", cost: "$12" },
        { name: "Peppermint", image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg", cost: "$14" },
        { name: "Echinacea", image: "https://cdn.pixabay.com/photo/2014/12/04/14/46/coneflower-556708_1280.jpg", cost: "$16" },
        { name: "Chamomile", image: "https://cdn.pixabay.com/photo/2016/08/18/11/06/chamomile-1602690_1280.jpg", cost: "$15" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2015/05/15/14/38/lemon-balm-768729_1280.jpg", cost: "$13" },
        { name: "Thyme", image: "https://cdn.pixabay.com/photo/2017/06/15/10/05/thyme-2404780_1280.jpg", cost: "$11" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-brand" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
          <h3>Paradise Nursery</h3>
        </div>
        <div className="nav-links">
          <a href="#plants" onClick={() => setShowCart(false)}>Plants</a>
          <div className="cart-icon" onClick={() => setShowCart(true)}>
            🛒 <span className="cart-count">{totalQuantity}</span>
          </div>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid-container">
          {plantsArray.map((categoryObj, index) => (
            <div key={index} className="category-section">
              <h2>{categoryObj.category}</h2>
              <div className="product-list">
                {categoryObj.plants.map((plant, plantIdx) => {
                  const isAdded = addedToCart[plant.name] || cartItems.some(item => item.name === plant.name);
                  return (
                    <div className="product-card" key={plantIdx}>
                      <img src={plant.image} alt={plant.name} className="product-image" />
                      <h3>{plant.name}</h3>
                      <p>{plant.cost}</p>
                      <button
                        className="add-to-cart-btn"
                        disabled={isAdded}
                        onClick={() => handleAddToCart(plant)}
                      >
                        {isAdded ? "Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
