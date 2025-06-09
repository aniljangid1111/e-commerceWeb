import React, { useEffect, useState } from 'react'
import Header from './common/Header'
import axios from 'axios'
import { toast } from 'react-toastify'
import Product from './Product'
import { Link } from 'react-router'
import PlaceHolder from './PlaceHolder'

export default function Home() {
  const [mensShirt, setMensShirt] = useState([])
  const [girlsTop, setGirlsTop] = useState([])
  const [loading, setLoading] = useState(true)



  // Men's Shirt
  useEffect(() => {
    axios.get(`https://wscubetech.co/ecommerce-api/products.php`, {
      params: {
        limit: 4,
        categories: 'mens-shirts',

      }
    })
      .then((response) => {
        setMensShirt(response.data.data)
        setLoading(false)

      })
      .catch(() => {
        toast.error('ERROR')
      })
  }, [])
  // Girl Top
  useEffect(() => {
    axios.get(`https://wscubetech.co/ecommerce-api/products.php`, {
      params: {
        limit: 4,
        categories: 'Tops',

      }
    })
      .then((response) => {
        setGirlsTop(response.data.data)

      })
      .catch(() => {
        toast.error('ERROR')
      })
  }, [])

  return (
    <>
      <div className="container-fluid p-0 m-0 position-relative" >
        <figure><img src="./src/assets/bannerMen.jpg" alt="" className='w-100 ' /></figure>

        <div className='btn-men-banner'>
          <div><Link to={`/product-listing/mens-shirts`}><button>Men's Shirt</button></Link></div>
          <div><Link to={`/product-listing/mens-shoes`}><button>Men's Shoes</button></Link></div>
          <div><Link to={`/product-listing/mens-watches`}><button>Men's Watches</button></Link></div>
          <div><Link to={`/product-listing/sunglasses`}><button>Sunglasses</button></Link></div>
        </div>

      </div>



      <div className="container-fluid mb-2">
        <div className="container">
          <div className="row home-heading m-0 p-0 ">

            <h3 className=''>Men's Shirt</h3>

          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">

            {
              loading
                ?
                <>
                  <PlaceHolder />
                  <PlaceHolder />
                  <PlaceHolder />
                  <PlaceHolder />
                </>

                :

                mensShirt.map((v, i) => {
                  return (
                    <Product key={i} data={v} />
                  )
                })
            }

          </div>
        </div>
      </div>

      {
        (girlsTop.length > 0)
          ?
          <div className="container-fluid">
            <div className="container">
              <div className="row home-heading m-0 p-0 ">
                <h3>Girls Dress</h3>
              </div>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {/* <!-- Product 1 --> */}
                {
                  girlsTop.map((v, i) => {
                    return (
                      <Product key={i} data={v} />
                    )
                  })
                }
              </div>
            </div>
          </div>
          :
          ''
      }
      {
        (mensShirt.length > 0)
          ?
          <div className='w-50 text-center my-4 m-auto'>
            <Link to="/product-listing"><button className='Btn-home'>All Product</button></Link>
          </div>
          :
          ''
      }

    </>
  )
}
