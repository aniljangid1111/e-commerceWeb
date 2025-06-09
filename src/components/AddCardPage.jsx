import React, { useContext, useEffect, useState } from 'react'
import { commonContex } from './contex Api/Contex'
import { Link } from 'react-router'
import { toast } from 'react-toastify';
import { getDatabase, ref, set } from 'firebase/database';
import app from './configFiles/FireBase';

export default function AddCardPage() {

    const { cardItem, setCardItem, isLogin } = useContext(commonContex)
    const [subAmount, setSubAmount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [shipment, setShipment] = useState(10);

    useEffect(() => {
        var sum = 0;
        cardItem.forEach((amount) => {
            sum += amount.price * amount.quantity
        })
        setSubAmount(sum)
        setTotalPrice(sum + shipment);
    }, [cardItem])

    const changeQty = (cardId, type) => {
        if (type == 'minus') {
            const cartData = cardItem.map((data) => {
                if (cardId == data.id) {
                    if (data.quantity > 1) {
                        data.quantity--;
                        return data;
                    } else {
                        toast.info('Oops! Minmum quantity already.')
                        return data;
                    }
                }
                else {
                    return data;
                }

            })
            const finalData = [...cartData];
            setCardItem(finalData);
            localStorage.setItem('cardItem', JSON.stringify(finalData));


            // Fire Base Data Write Work
            const db = getDatabase(app);
            set(ref(db, 'users_cart/' + isLogin), finalData)

        } else if (type == 'plus') {
            const cartData = cardItem.map((data) => {
                if (cardId == data.id) {
                    if (data.quantity < 3) {
                        data.quantity++;
                        return data;
                    } else {
                        toast.info('Oops! You’ve reached the maximum quantity for this item.')
                        return data;
                    }
                }
                else {
                    return data;
                }

            })
            const finalData = [...cartData];
            setCardItem(finalData);
            localStorage.setItem('cardItem', JSON.stringify(finalData));

            // Fire Base Data Write Work
            const db = getDatabase(app);
            set(ref(db, 'users_cart/' + isLogin), finalData)



        }
    }
    const removeItem = (cardId) => {
        if (confirm('Are you sure you want to remove this product?')) {
            const updatedCart = cardItem.filter(item => item.id !== cardId); // keep all except the one to remove
            setCardItem(updatedCart); // update state
            localStorage.setItem('cardItem', JSON.stringify(updatedCart)); // update localStorage
            toast.info('Removed from cart.');

            // Fire Base Data Write Work
            const db = getDatabase(app);
            set(ref(db, 'users_cart/' + isLogin), updatedCart)
        }
    };

    return (
        <>
            <div className="container my-4">

                {
                    cardItem.length > 0
                        ?
                        <>
                            <h2 className="text-center mb-4">Your Shopping Cart</h2>
                            {
                                cardItem.map((card, index) => {
                                    return (
                                        <div className="card shadow-sm p-3 mb-4 " key={index}>
                                            <div className="row g-3 align-items-center">
                                                {/* Product Image */}
                                                <div className="col-4 col-md-2">
                                                    <Link to={`/details-product/${card.id}`}>
                                                        <img src={card.image} alt="Product" className="img-fluid rounded" />
                                                    </Link>
                                                </div>

                                                {/* Product Info */}
                                                <div className="col-8 col-md-3 text-start">
                                                    <Link to={`/details-product/${card.id}`}>  <h5 className="mb-1">{card.name}</h5> </Link>
                                                    <p className="mb-1 small text-muted">Brand: <strong>{card.brand_name}</strong></p>
                                                    <p className="mb-1 small text-muted">Category: {card.category_name}</p>
                                                    <p className="d-none d-md-block small text-muted">
                                                        {card.description}
                                                    </p>
                                                </div>

                                                {/* Quantity */}
                                                <div className="col-6 col-md-2 text-center">
                                                    <p className="mb-1 fw-bold">Quantity</p>
                                                    <div className="btn-group" role="group">
                                                        <button onClick={() => changeQty(card.id, 'minus')} className="btn btn-sm btn-outline-secondary">-</button>
                                                        <input
                                                            type="number"
                                                            className="form-control form-control-sm text-center"
                                                            value={card.quantity}
                                                            readOnly
                                                            style={{ width: "50px" }}
                                                        />
                                                        <button onClick={() => changeQty(card.id, 'plus')} className="btn btn-sm btn-outline-secondary">+</button>
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <div className="col-6 col-md-2 text-center">
                                                    <p className="mb-1 fw-bold">Price</p>
                                                    <p className="mb-0">${card.price}</p>
                                                </div>

                                                {/* Total Price (Qty * Price) */}
                                                <div className="col-6 col-md-2 text-center">
                                                    <p className="mb-1 fw-bold">Total</p>
                                                    <p className="mb-0">${card.price * card.quantity}</p>
                                                </div>

                                                {/* Remove Button */}
                                                <div className="col-6 col-md-1 text-center">
                                                    <p className="mb-1 invisible">Remove</p> {/* For alignment */}
                                                    <button onClick={() => removeItem(card.id)} className="btn btn-sm btn-danger">Remove</button>
                                                </div>
                                            </div>
                                        </div>


                                    )
                                })
                            }
                            < div className="row mt-4">
                                <div className="col-md-6 offset-md-6">
                                    <ul className="list-group">
                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Subtotal</span>
                                            <strong>${subAmount}</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Shipping</span>
                                            <strong>${shipment}</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Total</span>
                                            <strong>${totalPrice}</strong>
                                        </li>
                                    </ul>

                                    <div className="d-flex justify-content-between mt-3">
                                        <Link to="/Product-Listing">
                                            <button className="btn btn-outline-primary">

                                                <i className="bi bi-cart"></i> Continue Shopping

                                            </button>
                                        </Link>
                                        <button className="btn btn-success">
                                            Checkout <i className="bi bi-arrow-right-circle"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <div className="text-center text-muted mt-5">
                            <h4>Your Shopping Cart is empty</h4>
                            <Link to={"/Product-Listing"} className="btn btn-outline-primary mt-3">Go Shopping</Link>
                        </div>
                }
            </div >




        </>
    )
}
