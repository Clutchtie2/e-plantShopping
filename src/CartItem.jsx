import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {

    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // ✅ total cart amount
    const calculateTotalAmount = () => {
        let total = 0;

        cart.forEach(item => {
            const price = parseFloat(item.cost.substring(1));
            total += price * item.quantity;
        });

        return total.toFixed(2);
    };

    // ✅ subtotal per item
    const calculateTotalCost = (item) => {
        const price = parseFloat(item.cost.substring(1));
        return (price * item.quantity).toFixed(2);
    };

    // ✅ continue shopping
    const handleContinueShopping = (e) => {
        onContinueShopping(e);
    };

    // ✅ increment
    const handleIncrement = (item) => {
        dispatch(updateQuantity({
            name: item.name,
            quantity: item.quantity + 1
        }));
    };

    // ✅ decrement / remove
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({
                name: item.name,
                quantity: item.quantity - 1
            }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    // ✅ remove item
    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    return (
        <div className="cart-container">

            <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>

            {cart.map(item => (
                <div className="cart-item" key={item.name}>

                    <img src={item.image} alt={item.name} />

                    <h3>{item.name}</h3>

                    <p>{item.cost}</p>

                    <div>

                        <button onClick={() => handleDecrement(item)}>-</button>

                        <span>{item.quantity}</span>

                        <button onClick={() => handleIncrement(item)}>+</button>

                    </div>

                    <p>Subtotal: ${calculateTotalCost(item)}</p>

                    <button onClick={() => handleRemove(item)}>
                        Delete
                    </button>

                </div>
            ))}

            <button onClick={handleContinueShopping}>
                Continue Shopping
            </button>

            <button onClick={() =>
                alert("Functionality to be added for future reference")
            }>
                Checkout
            </button>

        </div>
    );
};

export default CartItem;

//testing for commiting 