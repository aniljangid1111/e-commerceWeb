import React from 'react'

export default function Footer() {
    return (
        <>
            {/* <!-- Footer --> */}
            <footer className="bg-light border-top mt-5">
                <div className="container py-5">
                    <div className="row g-4">
                        {/* <!-- Company Info --> */}
                        <div className="col-lg-3 col-md-6">
                            <h5 className="fw-bold mb-3">ShopHub</h5>
                            <p className="text-muted">Your one-stop destination for quality products at competitive prices.</p>
                            <div className="d-flex gap-3">
                                <a href="#" className="text-muted"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="text-muted"><i className="fab fa-instagram"></i></a>
                                <a href="#" className="text-muted"><i className="fab fa-twitter"></i></a>
                            </div>
                        </div>

                        {/* <!-- Quick Links --> */}
                        <div className="col-lg-3 col-md-6">
                            <h5 className="fw-bold mb-3">Shop</h5>
                            <ul className="list-unstyled">
                                <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Electronics</a></li>
                                <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Clothing</a></li>
                                <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Home Appliances</a></li>
                                <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Deals</a></li>
                                <li><a href="#" className="text-decoration-none text-muted">New Arrivals</a></li>
                            </ul>
                        </div>

                        {/* <!-- Customer Service --> */}
                        <div className="col-lg-3 col-md-6">
                            <h5 className="fw-bold mb-3">Customer Service</h5>
                            <ul className="list-unstyled">
                                <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Contact Us</a></li>
                                <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Shipping Policy</a></li>
                                <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Returns & Exchanges</a></li>
                                <li><a href="#" className="text-decoration-none text-muted">FAQs</a></li>
                            </ul>
                        </div>

                        {/* <!-- Newsletter --> */}
                        <div className="col-lg-3 col-md-6">
                            <h5 className="fw-bold mb-3">Stay Updated</h5>
                            <p className="text-muted mb-3">Subscribe for the latest products and deals.</p>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" placeholder="Your email" />
                                    <button className="btn btn-primary" type="button">Subscribe</button>
                            </div>
                        </div>
                    </div>

                    <div className="border-top mt-4 pt-4 d-flex flex-column flex-md-row justify-content-between">
                        <p className="text-muted small">© 2025 ShopHub. All rights reserved.</p>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-decoration-none text-muted small">Privacy Policy</a>
                            <a href="#" className="text-decoration-none text-muted small">Terms of Service</a>
                            <a href="#" className="text-decoration-none text-muted small">Sitemap</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
