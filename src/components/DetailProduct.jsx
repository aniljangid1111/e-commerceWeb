import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify';
import { commonContex } from './contex Api/Contex';

export default function DetailProduct() {

    const [ratingDetail, setRatingDetail] = useState([]);
    const [productDetails, setProductDetails] = useState('');
    const [currentImg, setCurrentImg] = useState('');


    const { wishlistProduct, addToCard } = useContext(commonContex);

    useEffect(() => {
        if (productDetails && productDetails.rating) {
            const ratingArray = [];
            for (let i = 1; i <= productDetails.rating; i++) {
                ratingArray.push(i);
            }
            setRatingDetail(ratingArray);
        }
    }, [productDetails]); // <-- Add dependency


    const params = useParams();

    useEffect(() => {
        axios.get(`https://wscubetech.co/ecommerce-api/productdetails.php?id=${params.id}`)
            .then((result) => {
                setProductDetails(result.data.product)
                setCurrentImg(result.data.product.multiple_images[0])
            })
            .catch(() => {
                toast.error('Something went wrong !!')
            })
    }, [params]);
    const changeImg = (imgChng) => {
        setCurrentImg(imgChng)
    }
    return (
        <>
            <div className="container py-5">
                <div className="row g-4">
                    {/* Left Column: Images */}
                    <div className="col-md-6">
                        {/* Large Main Image */}
                        <div>
                            <div className="mb-3 text-center">
                                {currentImg ? (
                                    <img
                                        src={currentImg}
                                        alt="Main Product"
                                        className="img-fluid rounded shadow-sm"
                                        style={{ maxHeight: '400px', objectFit: 'contain' }}
                                    />
                                ) : (
                                    <div className="text-muted text-center">Image not available</div>
                                )}
                            </div>

                            {/* Thumbnails (scrollable on mobile) */}
                            <div className="d-flex gap-2 overflow-auto px-2">
                                {
                                    productDetails && productDetails.multiple_images?.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt="Thumbnail"
                                            className="img-thumbnail"
                                            style={{
                                                width: '70px',
                                                height: '70px',
                                                objectFit: 'cover',
                                                cursor: 'pointer',
                                                border: currentImg === img ? '2px solid #007bff' : '1px solid #ccc'
                                            }}
                                            onClick={() => changeImg(img)}
                                        />
                                    ))
                                }
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Product Info */}
                    <div className="col-md-6">
                        <h2 className="fw-bold">{productDetails.name} </h2>
                        <p className="text-muted">{productDetails.description}</p>
                        <h4 className=" my-3"> <strong>Brand:</strong>  {productDetails.brand }</h4>
                        <h4 className=" my-3"> <strong>Category:</strong>  {productDetails.category }</h4>
                        <h4 className=" my-3"> <strong>PRICE:</strong><span className='text-success'> ${productDetails.price}</span></h4>

                        <div className="mb-3 d-flex   gap-1 ">
                            <h4> <strong>RATING:</strong> <span className="text-success ">{productDetails.rating}</span></h4>


                            {
                                ratingDetail.map((value, index) => (
                                    <i className="fa fa-star text-warning fs-5  mt-1 ms-2 " key={index}></i>
                                ))
                            }


                        </div>

                        <div className="d-flex gap-2">
                            <button className="btn btn-primary" onClick={() => addToCard(productDetails)}>
                                <i className="fa fa-shopping-cart me-1"></i> Add to Cart
                            </button>
                            <button className="btn btn-outline-secondary" onClick={() => wishlistProduct(productDetails)}>
                                <i className="fa fa-heart me-1"></i> Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            </div >


        </>
    )
}
