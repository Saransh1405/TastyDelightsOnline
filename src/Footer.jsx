import React from 'react'
import {NavLink} from 'react-router-dom';

const Footer = () => {
  return (
    <>

<footer className="footer-section">
  <div className="container">
    <div className="footer-cta pt-5 pb-5">
      <div className="row">
        <div className="col-xl-4 col-md-4 mb-30">
          <div className="single-cta">
            <i className="fas fa-map-marker-alt" />
            <div className="cta-text">
              <h4>Find us</h4>
              <span>1010 Avenue, sw 54321, London</span>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-4 mb-30">
          <div className="single-cta">
            <i className="fas fa-phone" />
            <div className="cta-text">
              <h4>Call us</h4>
              <span>9027642077</span>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-4 mb-30">
          <div className="single-cta">
            <i className="far fa-envelope-open" />
            <div className="cta-text">
              <h4>Mail us</h4>
              <span>mail@info.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-content pt-5 pb-5">
      <div className="row">
        <div className="col-xl-4 col-lg-4 mb-50">
          <div className="footer-widget">
            <div className="footer-logo">
              <NavLink to="/">
                <img
                  src='https://cdn-icons-png.flaticon.com/128/9561/9561688.png'
                  className="img-fluid"
                  alt="logo"
                />
              </NavLink>
            </div>
            <div className="footer-text">
              <p>
              "Indulge in culinary delights with just a click! Savor mouthwatering dishes from the comfort of your home. Delivered fresh, fast, and hassle-free. Discover a world of flavors at your fingertips. Order now and treat yourself to a feast fit for a foodie. Bon appétit!"
              </p>
            </div>
           
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
          <div className="footer-widget">
            <div className="footer-widget-heading">
              <h3>Useful Links</h3>
            </div>
            <ul className='footer-ul'>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/">about</NavLink>
              </li>
              <li>
                <NavLink to="/">services</NavLink>
              </li>
              <li>
                <NavLink to="/">portfolio</NavLink>
              </li>
              <li>
                <NavLink to="/">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/">About us</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
          <div className="footer-widget">
            <div className="footer-widget-heading">
              <h3>Write below if you have any complain</h3>
            </div>
            <div className="footer-text mb-25">
            </div>
            <div className="subscribe-form">
              <form action="/">
                <input type="text" placeholder="Complain" />
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="copyright-area">
    <div className="container">
      <div className="row">
        <div className="col-xl-6 col-lg-6 text-center text-lg-left">
          <div className="copyright-text">
            <p>
              Copyright © 2018, All Right Reserved{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>


    </>
  )
}

export default Footer