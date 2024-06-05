// // import React,{useState} from 'react';
// // import { Link,useNavigate } from 'react-router-dom';

// // const Login = () => {

// //   let navigate=useNavigate();

// //   const [credentials, setcredentials] = useState({email:"",password:""})

// //     const handleSubmit=async(e)=>{
// //         e.preventDefault();
// //         const response= await
// //         fetch("http://localhost:9090/api/loginuser",{
// //             method: 'POST',
// //             headers:{
// //                 'Content-Type':'application/json'
// //             },
// //             body:JSON.stringify({email:credentials.email,password:credentials.password})
// //         });

// //         const json=await response.json();
// //         console.log(json);

// //         if (!response.ok) {
// //           // Handle non-successful responses
// //           if (response.status === 400) {
// //               alert("Invalid request. Please check your input.");
// //           } else if (response.status === 401) {
// //               alert("Unauthorized. Please log in.");
// //           } else {
// //               alert("An error occurred. Please try again later.");
// //           }
// //           return;
// //       }

// //         if(response.status===200){

// //           localStorage.setItem("userEmail",credentials.email);          
// //           localStorage.setItem("authToken",json.authToken)
// //           navigate("/");
// //       }
// //     }


// //     const onChange=(event)=>{
// //         setcredentials({...credentials,[event.target.name]:event.target.value})
// //     }




// //   return (
// //     <>
// //       <section onSubmit={handleSubmit} className="vh-100">
// //   <div className="container-fluid h-custom">
// //     <div className="row d-flex justify-content-center align-items-center h-100">
// //       <div className="col-md-9 col-lg-6 col-xl-5">
// //         <img
// //           src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
// //           className="img-fluid"
// //           alt="Sample "
// //           width={1000}
// //           height={300}
// //         />
// //       </div>
// //       <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
// //         <form >
// //           <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
// //           </div>
// //           <div className="divider d-flex align-items-center my-4">
            
// //           </div>
// //           {/* Email input */}
// //           <div className="form-outline mb-4">
// //             <input
// //               type="email"
// //               id="form3Example3"
// //               className="form-control form-control-lg"
// //               placeholder="Enter a valid email address"
// //               name='email'
// //               value={credentials.email}
// //               onChange={onChange}
// //             />
// //             <label className="form-label" htmlFor="form3Example3">
// //               Email address
// //             </label>
// //           </div>
// //           {/* Password input */}
// //           <div className="form-outline mb-3">
// //             <input
// //               type="password"
// //               id="form3Example4"
// //               className="form-control form-control-lg"
// //               placeholder="Enter password"
// //               name='password'
// //               value={credentials.password}
// //               onChange={onChange}
// //             />
// //             <label className="form-label" htmlFor="form3Example4">
// //               Password
// //             </label>
// //           </div>
// //           <div className="d-flex justify-content-between align-items-center">
// //             {/* Checkbox */}
// //             <div className="form-check mb-0">
// //               <input
// //                 className="form-check-input me-2"
// //                 type="checkbox"
// //                 defaultValue=""
// //                 id="form2Example3"
// //               />
// //               <label className="form-check-label" htmlFor="form2Example3">
// //                 Remember me
// //               </label>
// //             </div>
            
// //           </div>
// //           <div className="text-center text-lg-start mt-4 pt-2">
// //             <button
// //               type="submit"
// //               className="btn btn-primary btn-lg login_btn"
// //               style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
// //             >
// //               Login
// //             </button>
// //             <p className="small fw-bold mt-2 pt-1 mb-0">
// //               Don't have an account?{" "}
              
// //             </p>
// //             <Link
// //               to={"/signup"}
// //               className="mt-3 btn btn-primary btn-sm login_btn"
// //               style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
// //             >
// //               I'am a new user
// //             </Link>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   </div>
// //   <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5">
// //     {/* Copyright */}
// //     <div className="text-white mb-3 mb-md-0">
// //       Copyright © 2020. All rights reserved.
// //     </div>
// //     {/* Copyright */}
// //     {/* Right */}
// //     <div>
// //       <a href="#!" className="text-white me-4">
// //         <i className="fab fa-facebook-f" />
// //       </a>
// //       <a href="#!" className="text-white me-4">
// //         <i className="fab fa-twitter" />
// //       </a>
// //       <a href="#!" className="text-white me-4">
// //         <i className="fab fa-google" />
// //       </a>
// //       <a href="#!" className="text-white">
// //         <i className="fab fa-linkedin-in" />
// //       </a>
// //     </div>
// //     {/* Right */}
// //   </div>
// // </section>

// //     </>
// //   );
// // }

// // export default Login;




// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   let navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:9090/api/loginuser", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email: credentials.email, password: credentials.password }),
//         credentials: 'include' // Ensure cookies are included
//       });
  
//       if (!response.ok) {
//         // Handle non-successful responses
//         if (response.status === 400) {
//           alert("Invalid request. Please check your input.");
//         } else if (response.status === 401) {
//           alert("Unauthorized. Please log in.");
//         } else {
//           alert("An error occurred. Please try again later.");
//         }
//         return;
//       }
  
//       const json = await response.json().catch(() => {
//         console.log("Non-JSON response received");
//         return {};
//       });
  
//       console.log(json);
  
//       if (response.status === 200) {
//         localStorage.setItem("authToken", json.authToken);
//         localStorage.setItem("userEmail", credentials.email);
//         navigate("/");
//       } else {
//         alert("Login failed. Please try again.");
//       }
//     } catch (err) {
//       console.error("An error occurred while logging in:", err);
//       alert("An error occurred. Please try again later.");
//     }
//   }
  

//   const onChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   }

//   return (
//     <>
//       <section onSubmit={handleSubmit} className="vh-100">
//         <div className="container-fluid h-custom">
//           <div className="row d-flex justify-content-center align-items-center h-100">
//             <div className="col-md-9 col-lg-6 col-xl-5">
//               <img
//                 src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                 className="img-fluid"
//                 alt="Sample"
//                 width={1000}
//                 height={300}
//               />
//             </div>
//             <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
//               <form onSubmit={handleSubmit}>
//                 <div className="form-outline mb-4">
//                   <input
//                     type="email"
//                     id="form3Example3"
//                     className="form-control form-control-lg"
//                     placeholder="Enter a valid email address"
//                     name='email'
//                     value={credentials.email}
//                     onChange={onChange}
//                   />
//                   <label className="form-label" htmlFor="form3Example3">
//                     Email address
//                   </label>
//                 </div>
//                 <div className="form-outline mb-3">
//                   <input
//                     type="password"
//                     id="form3Example4"
//                     className="form-control form-control-lg"
//                     placeholder="Enter password"
//                     name='password'
//                     value={credentials.password}
//                     onChange={onChange}
//                   />
//                   <label className="form-label" htmlFor="form3Example4">
//                     Password
//                   </label>
//                 </div>
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div className="form-check mb-0">
//                     <input
//                       className="form-check-input me-2"
//                       type="checkbox"
//                       defaultValue=""
//                       id="form2Example3"
//                     />
//                     <label className="form-check-label" htmlFor="form2Example3">
//                       Remember me
//                     </label>
//                   </div>
//                 </div>
//                 <div className="text-center text-lg-start mt-4 pt-2">
//                   <button
//                     type="submit"
//                     className="btn btn-primary btn-lg login_btn"
//                     style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
//                   >
//                     Login
//                   </button>
//                   <p className="small fw-bold mt-2 pt-1 mb-0">
//                     Don't have an account?{" "}
//                     <Link
//                       to={"/signup"}
//                       className="mt-3 btn btn-primary btn-sm login_btn"
//                       style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
//                     >
//                       I'm a new user
//                     </Link>
//                   </p>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//         <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5">
//           <div className="text-white mb-3 mb-md-0">
//             Copyright © 2020. All rights reserved.
//           </div>
//           <div>
//             <a href="#!" className="text-white me-4">
//               <i className="fab fa-facebook-f" />
//             </a>
//             <a href="#!" className="text-white me-4">
//               <i className="fab fa-twitter" />
//             </a>
//             <a href="#!" className="text-white me-4">
//               <i className="fab fa-google" />
//             </a>
//             <a href="#!" className="text-white">
//               <i className="fab fa-linkedin-in" />
//             </a>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Login;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9090/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        credentials: 'include' // Ensure cookies are included
      });

      if (!response.ok) {
        if (response.status === 400) {
          alert("Invalid request. Please check your input.");
        } else if (response.status === 401) {
          alert("Unauthorized. Please log in.");
        } else {
          alert("An error occurred. Please try again later.");
        }
        return;
      }

      const json = await response.json();
      console.log(json);

      if (response.status === 200) {
        localStorage.setItem("authToken", json.token);
        localStorage.setItem("userEmail", credentials.email);
        navigate("/");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("An error occurred while logging in:", err);
      alert("An error occurred. Please try again later.");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="img-fluid"
                alt="Sample"
                width={1000}
                height={300}
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    name='email'
                    value={credentials.email}
                    onChange={onChange}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                </div>
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    name='password'
                    value={credentials.password}
                    onChange={onChange}
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      defaultValue=""
                      id="form2Example3"
                    />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg login_btn"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <Link
                      to={"/signup"}
                      className="mt-3 btn btn-primary btn-sm login_btn"
                      style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    >
                      I'm a new user
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5">
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2020. All rights reserved.
          </div>
          <div>
            <a href="#!" className="text-white me-4">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#!" className="text-white me-4">
              <i className="fab fa-twitter" />
            </a>
            <a href="#!" className="text-white me-4">
              <i className="fab fa-google" />
            </a>
            <a href="#!" className="text-white">
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
