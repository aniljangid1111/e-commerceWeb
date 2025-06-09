import React, { useEffect, useState } from 'react'
import Header from './common/Header'
import Breadcrumb from './common/Breadcrumb'
import Footer from './common/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
import Product from './Product'
import { Pagination } from 'react-bootstrap'
import ResponsivePagination from 'react-responsive-pagination';
import { useParams } from 'react-router'
import PlaceHolder from './PlaceHolder'
import dataNotFound from './../assets/noData.jpg'



export default function ProductListing() {
  const [categories, setCategories] = useState([])
  const [brand, setBrand] = useState([])
  const [products, setProducts] = useState([])
  var [currentPage, setCurrentPage] = useState(1)
  const [totalProduct, setTotalProduct] = useState(0)
  const [sorting, setSorting] = useState(1)
  const [allFilterCategory, setAllFilterCategory] = useState([])
  const [allFilterBrand, setAllFilterBrand] = useState([])
  const [priceTo, setPriceTo] = useState('')
  const [priceFrom, setPriceFrom] = useState('')
  const [discountTo, setDiscountTo] = useState('')
  const [discountFrom, setDiscountFrom] = useState('')
  const [searchItem, setSearchItem] = useState('')
  const [totalPage, setTotalPage] = useState('')
  const [allPage, setAllPage] = useState([])

  const [loading, setLoading] = useState(true)

  const params = useParams();

  useEffect(() => {
    if (params.slug) {
      setAllFilterCategory([params.slug]);
    }
  }, [params]);

  useEffect(() => {
    axios.get('https://wscubetech.co/ecommerce-api/categories.php')
      .then((response) => {
        setCategories(response.data.data)
      })
      .catch(() => {
        toast.error('Somthing Want wrong!')
      })
  }, [])
  useEffect(() => {
    axios.get('https://wscubetech.co/ecommerce-api/brands.php')
      .then((response) => {
        setBrand(response.data.data)
      })
      .catch(() => {
        toast.error('Somthing Want wrong!')
      })
  }, [])
  // useEffect(() => {
  //   axios.get(`https://wscubetech.co/ecommerce-api/products.php?page=${currentPage}`)
  //     .then((response) => {
  //       setProducts(response.data.data)

  //     })
  //     .catch(() => {
  //       toast.error('Somthing Want wrong!')
  //     })
  // }, [currentPage])



  // This is For Product Facthing Use Effect and function
  useEffect(() => {
    axios.get(`https://wscubetech.co/ecommerce-api/products.php`, {
      params: {
        page: currentPage,
        limit: 15,
        sorting: sorting,
        name: searchItem,
        price_from: priceFrom,
        price_to: priceTo,
        discount_from: discountFrom,
        discount_to: discountTo,
        rating: '',
        brands: allFilterBrand.toString(),
        categories: allFilterCategory.toString()
      }
    })
      .then((response) => {
        setProducts(response.data.data)
        setTotalProduct(response.data.total_records)
        setTotalPage(response.data.total_pages)
        setLoading(false)

      })
      .catch(() => {
        toast.error('Somthing Want wrong!')
      })
  }, [currentPage, sorting, allFilterCategory, allFilterBrand, priceTo, priceFrom, discountFrom, discountTo, searchItem])


  // This is Pagination UseEffect and function
  useEffect(() => {
    var allPage = []

    for (let i = 1; i <= totalPage; i++) {
      allPage.push(i)

    }
    setAllPage(allPage);

  }, [totalPage])



  const filterProduct = (event) => {
    setSorting(event.target.value)
  }

  const filterCategryData = (slug) => {
    setCurrentPage(1)
    if (allFilterCategory.includes(slug)) {
      var data = allFilterCategory.filter((v) => {
        if (slug != v) {
          return v;
        }
      })
      var data = [...data]
      setAllFilterCategory(data)

    } else {
      const data = [...allFilterCategory, slug]
      setAllFilterCategory(data)


    }
  }
  const filterBrandyData = (slug) => {
    if (allFilterBrand.includes(slug)) {
      var data = allFilterBrand.filter((v) => {
        if (slug != v) {
          return v;
        }
      })
      var data = [...data]
      setAllFilterBrand(data)


    } else {
      const data = [...allFilterBrand, slug]
      setAllFilterBrand(data)
    }
  }

  const clearAll = () => {
    setAllFilterCategory([])
    setAllFilterBrand([])
    setPriceTo('')
    setPriceFrom('')
    setSearchItem('')
    setDiscountFrom('')
    setDiscountTo('')

  }


  const priceChange = (event) => {
    setPriceTo(event.target.value)

  }


  const minprice = (event) => {
    setPriceFrom(event.target.value);
  }

  const maxPrice = (event) => {
    setPriceTo(event.target.value);
  }
  const minDiscount = (event) => {
    setDiscountFrom(event.target.value);
  }

  const maxDiscount = (event) => {
    setDiscountTo(event.target.value);
  }
  const searchProduct = (event) => {
    setSearchItem(event.target.value);
  }
  const firstPage = () => {
    setCurrentPage(1)
  }
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage--)
    }
  }
  const nextPage = () => {
    if (currentPage <= totalPage) {
      setCurrentPage(currentPage++)
    }
  }
  const lastPage = () => {
    setCurrentPage(totalPage)
  }



  return (
    <>
      <Breadcrumb />


      {/* <!-- Main Content --> */}
      <div className="container py-5">
        <div className="row">
          {/* <!-- Filter Button (Mobile) --> */}
          <div className="col-12 d-lg-none mb-3">
            <button className="btn btn-outline-secondary w-100 d-flex justify-content-center align-items-center gap-2"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#filterSidebar">
              <i className="fa fa-filter"></i> Filter Products
            </button>
          </div>

          {/* <!-- Sidebar Filters --> */}
          <div className="col-lg-3">
            {/* <!-- Desktop Filters --> */}
            <div className="card shadow-sm d-none d-lg-block">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">Filters</h5>
                  <button className="btn btn-sm btn-link text-decoration-none p-0" onClick={clearAll}>Clear All</button>
                </div>

                {/* <!-- Categories Filter --> */}
                <div className="mb-4 section-filter ">
                  <h6 className="fw-bold mb-3">Categories</h6>
                  {
                    categories.map((v, i) => {
                      return (
                        <FilterCategory key={i} data={v} filterCategryData={filterCategryData} allFilterCategory={allFilterCategory} />
                      )
                    })
                  }
                </div>

                {/* <!-- Brands Filter --> */}
                <div className="mb-4 section-filter">
                  <h6 className="fw-bold mb-3">Brands</h6>
                  {
                    brand.map((v, i) => {
                      return (
                        <FilterBrand key={i} data={v} filterBrandyData={filterBrandyData} allFilterBrand={allFilterBrand} />
                      )
                    })
                  }
                </div>

                {/* <!-- Price Range Filter --> */}
                <div className="mb-3">
                  <h6 className="fw-bold mb-3">Price Range</h6>
                  <div className="d-flex justify-content-between mb-2">
                    <span>$0</span>
                    <span>
                      {
                        (priceTo != '')
                          ?
                          priceTo
                          :
                          '$1500'
                      }
                    </span>
                  </div>
                  <input type="range" className="form-range" min="0" max="1500" step="10" id="priceRange" onChange={priceChange} />
                  <div className="row g-2 mt-2">
                    <div className="col-6">
                      <div className="input-group input-group-sm">
                        <span className="input-group-text">$</span>
                        <input type="number" className="form-control" placeholder="Min" min="0" onKeyUp={minprice} />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group input-group-sm">
                        <span className="input-group-text">$</span>
                        <input type="number" className="form-control" placeholder="Max" min="0" onKeyUp={maxPrice} />
                      </div>
                    </div>
                  </div>
                  <div className="row g-2 mt-2">
                    <div className="col-6">
                      <div className="input-group input-group-sm">
                        <span className="input-group-text">%</span>
                        <input type="number" className="form-control" placeholder="MinDiscount" min="0" onKeyUp={minDiscount} />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group input-group-sm">
                        <span className="input-group-text">%</span>
                        <input type="number" className="form-control" placeholder="MaxDiscount" min="0" onKeyUp={maxDiscount} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Mobile Filters (Offcanvas) --> */}
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="filterSidebar">
              <div className="offcanvas-header d-flex justify-content-between">
                <h5 className="offcanvas-title">Filters</h5>

                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className='text-center shadow-sm'>  <button className="btn btn-sm btn-link text-decoration-none p-0 " onClick={clearAll}>Clear All</button></div>

              <div className="offcanvas-body">
                {/* <!-- Categories Filter --> */}
                <div className="mb-4 section-filter">
                  <h6 className="fw-bold mb-3">Categories</h6>
                  {
                    categories.map((v, i) => {
                      return (
                        <FilterCategory key={i} data={v} filterCategryData={filterCategryData} allFilterCategory={allFilterCategory} />
                      )
                    })
                  }
                </div>

                {/* <!-- Brands Filter --> */}
                <div className="mb-4 section-filter">
                  <h6 className="fw-bold mb-3">Brands</h6>
                  {
                    brand.map((v, i) => {
                      return (
                        <FilterBrand key={i} data={v} filterBrandyData={filterBrandyData} allFilterBrand={allFilterBrand} />
                      )
                    })
                  }
                </div>

                {/* <!-- Price Range Filter --> */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Price Range</h6>
                  <div className="d-flex justify-content-between mb-2">
                    <span>$0</span>
                    <span>
                      {
                        (priceTo != '')
                          ?
                          priceTo
                          :
                          '$1500'
                      }
                    </span>
                  </div>
                  <input type="range" className="form-range" min="0" max="1500" step="10" id="mobilePriceRange" onChange={priceChange} />
                  <div className="row g-2 mt-2" />
                  <div className="col-6">
                    <div className="input-group input-group-sm">
                      <span className="input-group-text">$</span>
                      <input type="number" className="form-control" placeholder="Min" min="0" onKeyUp={minprice} />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group input-group-sm">
                      <span className="input-group-text">$</span>
                      <input type="number" className="form-control" placeholder="Max" min="0" onKeyUp={maxPrice} />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group input-group-sm">
                      <span className="input-group-text">$</span>
                      <input type="number" className="form-control" placeholder="MinDiscount" min="0" onKeyUp={minDiscount} />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group input-group-sm">
                      <span className="input-group-text">$</span>
                      <input type="number" className="form-control" placeholder="MaxDiscount" min="0" onKeyUp={maxDiscount} />
                    </div>
                  </div>
                </div>
              </div>

              {/* <button className="btn btn-primary w-100" onClick={clearAll} >Clear All</button> */}
              <button className="btn btn-primary w-100" >Apply Filters</button>
            </div>
          </div>


          {/* <!-- Main Product Content --> */}
          <div className="col-lg-9">
            {/* <!-- Top bar with results count and sorting --> */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">


                <div>   {/* <!-- Search --> */}
                  <div className="col-12  order-md-1 order-3 mt-2 mt-md-0">
                    <div className="input-group  mb-2 ">
                      <span className="input-group-text bg-white border-end-0">
                        <i className="fa fa-search text-muted"></i>
                      </span>
                      <input type="text" className="form-control border-start-0 search-items" placeholder="Search products..." onKeyUp={searchProduct} />
                    </div>
                  </div>
                </div>

                <div className="row align-items-center  ">
                  <div className="col-md-6 col-sm-5 col-4 mb-2 mb-md-0">
                    <h6 className="mb-0">{totalProduct} Products</h6>
                    <small className="text-muted">Filtered results</small>
                  </div>
                  <div className="col-md-6 col-sm-5 col-4">
                    <div className="d-flex align-items-center justify-content-md-end ">
                      <i className="fa fa-sort text-muted me-2"></i>
                      <span className="text-nowrap me-2 d-none d-sm-inline">Sort by:</span>
                      <select className="form-select form-select-sm w-auto" onChange={filterProduct}>
                        <option value=''>Sort Option :-</option>
                        <option value="1">Name:A to Z</option>
                        <option value="2">Name:Z to A</option>
                        <option value="3">Price: Low to High</option>
                        <option value="4">Price: High to Low</option>
                        <option value="5">Discount :Low to High</option>
                        <option value="6">Discount :High to Low</option>
                        <option value="7">Rating :Low to High</option>
                        <option value="8">Rating :High to Low</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {

              (products.length > 0)
                ?
                <>
                  {/* <!-- Product Grid --> */}
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4">

                    {loading
                      ?
                      <>
                        <PlaceHolder /> <PlaceHolder /> <PlaceHolder />
                      </>
                      :

                      products.map((v, i) => {
                        return (
                          <Product key={i} data={v} />
                        )
                      })
                    }

                  </div>
                  <div className='row m-auto w-100 '>
                    <div className='cols-12 m-auto  '>
                      {/* Manualy Pagination */}
                      {/* <Pagination>
                        <Pagination.First onClick={firstPage} />
                        <Pagination.Prev onClick={previousPage} />

                        {
                          allPage.map((v, i) => {
                            return (
                              <Pagination.Item
                                key={i}
                                active={currentPage === v}
                                onClick={() => setCurrentPage(v)}>{v}</Pagination.Item>

                            )
                          })
                        }
                        {/* <Pagination.Ellipsis /> */}
                        {/* <Pagination.Next onClick={nextPage} /> */}
                        {/* <Pagination.Last onClick={lastPage} /> */}
                      {/* </Pagination> */}

                      {/* react Pagination auto */}
                      <ResponsivePagination
                        current={currentPage}
                        total={totalPage}
                        onPageChange={setCurrentPage}
                      />
                    </div>
                  </div>
                </>
                :
                <figure className='w-75 h-70 p-0 m-auto position-relative top-0 left-0'>
                  <img src={dataNotFound} alt="NoDataimg" className='w-100 h-100' />
                  <h3 className='no-product'>No Product Found</h3>
                </figure>
            }

          </div>
        </div>
      </div >

    </>



  )
}
var FilterCategory = ({ data, filterCategryData, allFilterCategory }) => {
  return (
    <div className="form-check mb-2">
      <input className="form-check-input" onChange={() => filterCategryData(data.slug)} type="checkbox" checked={allFilterCategory.includes(data.slug) ? 'checked' : ''} id={data.slug} />
      <label className="form-check-label" htmlFor={data.slug}>{data.name}</label>
    </div>
  )
}
var FilterBrand = ({ data, filterBrandyData, allFilterBrand }) => {
  return (
    <div className="form-check mb-2">
      <input className="form-check-input" onChange={() => filterBrandyData(data.slug)} checked={allFilterBrand.includes(data.slug) ? 'checked' : ''} type="checkbox" id={data.slug} />
      <label className="form-check-label" htmlFor={data.slug}>{data.name}</label>
    </div>
  )
}
