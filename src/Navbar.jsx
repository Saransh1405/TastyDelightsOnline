import React,{useState} from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import Cart from './Cart';
import Modal from './Modal';
import { useCart } from './components/ContextReducer';



const Navbar = () => {

  const navigate=useNavigate();

  const [cartView, setcartView] = useState(false);

  let data=useCart();

  const handlelogout= ()=>{
    localStorage.removeItem("authToken");
    navigate("/login")
  }

  return (
    <>
    <div className='container-fluid nav-bg'>
        <div className='row'>
            <div className='col-10 mx-auto'>
            <nav
  className="navbar navbar-expand-lg navbar-light bg-light 
">
  <div className="container-fluid">
    <NavLink  className="navbar-brand" to="/">
                  
      <NavLink to='/'><img className='navbar-logo' src='https://cdn-icons-png.flaticon.com/128/9561/9561688.png ' alt='logo'/></NavLink>
      GoFood
    </NavLink>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <NavLink  className="nav-link home" to="/">
            Home
        </NavLink>
        </li>
  

      {(localStorage.getItem("authToken")) ? 
      <li className="nav-item">
      <NavLink className="signup  btn  mb-2 mb-lg-0" to="/myorder">
            My Orders
            </NavLink>
        </li>
        :""
}
      </ul>

      {(!localStorage.getItem("authToken"))  ? 
      <div className='d-flex classss'>
        <li className="nav-item w-100">
        <NavLink className="signup  btn  mb-2 mb-lg-0" to="/signup">
            Signup
            </NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="signup_log btn  mb-2 mb-lg-0" to="/login">
            Login
            </NavLink>
        </li>
      </div>
      : <div className='d-flex'> 
        <div className='crt'>
        <NavLink className="signup_crt  btn  mb-2 mb-lg-0" onClick={()=>{setcartView(true)}}>
      Cart {" "}
      
      <Badge className='badge' pill> {data.length}</Badge>
      </NavLink>
    </div>
    {cartView ? <Modal onClose={()=> setcartView(false)}> <Cart/></Modal> : null}
    <div className='lot' >
      <NavLink className="signup_lot  btn  mb-2 mb-lg-0" to={"/"} onClick={handlelogout}>
      LogOut
      </NavLink>
  </div>
  </div>
         }
    </div>
  </div>
</nav>

</div>
        </div>
    </div>

    </>
  )
}

export default Navbar