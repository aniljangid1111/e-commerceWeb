import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router';
import { commonContex } from './contex Api/Contex';
import { toast } from 'react-toastify';
import { IoMdHeart } from 'react-icons/io';
import { getDatabase, ref, set } from 'firebase/database';
import app from './configFiles/FireBase';


export default function Product({ data }) {
    const [rating, setRating] = useState([]);

    var finalPrice = data.price * data.discount_percentage / 100;
    var finalPrice = data.price - finalPrice;

    useEffect(() => {
        var rating = []

        for (let i = 1; i <= data.rating; i++) {
            rating.push(i)

        }
        setRating(rating);

    }, [data])

    const { cardItem, setCardItem, wishList, setWishList, isLogin } = useContext(commonContex)

    const addToCard = (productInfo) => {

        const checkCart = cardItem.filter((v) => {
            if (productInfo.id == v.id) {
                return v;
            }
        })
        if (checkCart.length > 0) {

            const cartData = cardItem.map((data) => {
                if (productInfo.id == data.id) {
                    if (data.quantity < 3) {
                        data.quantity++;
                        toast.success('Cart Update successfully !')
                        return data;
                    } else {
                        toast.warn('Oops! Max quantity already in cart.')
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

            // FireBase Data write work
            const db = getDatabase(app);
            set(ref(db, 'users_cart/' + isLogin), finalData)

        } else {
            const info = {
                id: productInfo.id,
                name: productInfo.name,
                price: productInfo.price,
                image: productInfo.image,
                category_name: productInfo.category_name,
                description: productInfo.description,
                brand_name: productInfo.brand_name,
                rating: productInfo.rating,
                quantity: 1
            }
            const finalData = [info, ...cardItem]
            setCardItem(finalData);
            localStorage.setItem('cardItem', JSON.stringify(finalData));
            toast.success('Add To Card :)')

            // FireBase Data write work
            const db = getDatabase(app);
            set(ref(db, 'users_cart/' + isLogin), finalData)

        }
    }


    const wishlistProduct = (productInfo) => {
        const checkWish = wishList.filter((v) => productInfo.id === v.id);

        if (checkWish.length > 0) {
            const updatedWishList = wishList.map((data) => {
                if (productInfo.id === data.id) {
                    toast.warn('Oops! This item is already in your wishlist.');
                    return data; // do not add again
                } else {
                    return data;
                }
            });

            setWishList(updatedWishList);
            localStorage.setItem('wishitem', JSON.stringify(updatedWishList));
        } else {
            const info = {
                id: productInfo.id,
                name: productInfo.name,
                price: productInfo.price,
                image: productInfo.image,
                category_name: productInfo.category_name,
                description: productInfo.description,
                brand_name: productInfo.brand_name,
                rating: productInfo.rating,
                quantity: 1,
            };

            const finalData = [info, ...wishList];
            setWishList(finalData);
            localStorage.setItem('wishitem', JSON.stringify(finalData));
            toast.success('Added to wishlist ❤️');
        }
    };



    return (
        <>
            <div className="col">
                <div className="card h-100 product-card">
                    <Link to={`/details-product/${data.id}`}>
                        <div className="position-relative">
                            <img src={data.image} className="card-img-top" alt="Ultra HD 4K Smart TV" />
                            {
                                (data.discount_percentage > 0)
                                    ?
                                    <span className="position-absolute top-0 start-0 badge bg-danger m-2">{data.discount_percentage}% SALE</span>
                                    :
                                    ''
                            }
                        </div>

                        <div className="card-body">
                            <h5 className="card-title">{data.name}</h5>
                            <div className='d-flex justify-content-between'>
                                <p className="card-text text-muted small mb-0">{data.brand_name}</p>
                                <p className="card-text text-muted small mb-0">{data.category_name}</p>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <div className="text-warning me-1">
                                    {
                                        rating.map((v, i) => {
                                            return (
                                                <i className="fa fa-star" key={i}></i>
                                            )
                                        })
                                    }
                                    {/* 
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star-half-alt"></i> */}
                                </div>
                                <span className="text-muted small">{data.rating}</span>
                            </div>
                        </div>
                    </Link>
                    <div className="d-flex justify-content-between align-items-center px-2 pb-2">
                        <div>
                            <Link to={`/details-product/${data.id}`}>

                                {
                                    (data.discount_percentage > 0)
                                        ?
                                        <>
                                            <div>
                                                <span className="fs-5 fw-bold">${finalPrice.toFixed(2)}</span>
                                                <span className="text-decoration-line-through text-muted ms-2">${data.price}</span>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div>
                                                <span className="fs-5 fw-bold">${data.price}</span>
                                            </div>
                                        </>
                                }
                            </Link>
                        </div>
                        <button className="btn btn-sm btn-outline-primary" onClick={() => addToCard(data)}>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-primary" onClick={() => wishlistProduct(data)}>
                            <IoMdHeart />
                        </button>
                    </div>
                </div>

            </div >

        </>
    )
}
