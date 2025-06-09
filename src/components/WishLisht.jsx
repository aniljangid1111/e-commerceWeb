import React, { useContext } from 'react'
import { commonContex } from './contex Api/Contex';
import { Link } from 'react-router';
import { toast } from 'react-toastify';

export default function WishLisht() {
    const { wishList, setWishList } = useContext(commonContex)

    const removeItem = (cardId) => {
        if (confirm('Are you sure you want to remove this product?')) {
            const updatedCart = wishList.filter(item => item.id !== cardId); // keep all except the one to remove
            setWishList(updatedCart); // update state
            localStorage.setItem('wishitem', JSON.stringify(updatedCart)); // update localStorage
            toast.info('Removed from cart.');
        }
    };

    return (
        <>

            <div className="container py-5">
                <h2 className="text-center fw-bold mb-5">My Wishlist</h2>
                <div className="row g-4">
                    {
                        wishList.length > 0
                            ?

                            wishList.map((card, index) => {
                                return (

                                    <div key={index} className="col-sm-12 col-md-12 col-lg-4">
                                        <div className="card h-100 border-0 shadow rounded-4">
                                            <img src={card.image} className="card-img-top rounded-top-4" alt="Product"
                                            />
                                            <div className="card-body d-flex flex-column">
                                                <h5 className="card-title fw-semibold">{card.name}</h5>
                                                <p className="card-text text-muted small">
                                                    {card.brand_name}
                                                </p>
                                                <h6 className="text-primary fw-bold mb-3">$129.99</h6>
                                                <div className="d-flex gap-2 mt-auto">
                                                    <button onClick={() => removeItem(card.id)} className="btn btn-outline-danger w-50">
                                                        Remove
                                                    </button>
                                                    <button className="btn btn-dark w-50">Add to Cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )

                            })

                            :
                            <div className="text-center text-muted mt-5">
                                <h4>Your Shopping Cart is empty</h4>
                                <Link to={"/Product-Listing"} className="btn btn-outline-primary mt-3">Go Shopping</Link>
                            </div>
                    }
                </div>
            </div >
        </>
    );
};

