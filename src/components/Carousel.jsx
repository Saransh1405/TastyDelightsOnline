import React from 'react'

const Carousel = () => {
  return (
    <div>

<div
  id="carouselExampleFade"
  className="carousel slide carousel-fade"
  data-bs-ride="carousel"
  style={{objectFit:"contain !important"}}
>

<div className="carousel-inner" id= "carousel">

  < div className='carousel-caption' style={{zIndex:"10"}}>

  <form className="d-flex">
    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
    <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
  </form>
  </div>

  
    <div className="carousel-item active">
      <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D" style={{filter: "brightness(50%)",width:"1300px",height:"700px"}} alt="..." />
    </div>
    <div className="carousel-item">
      <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style={{filter: "brightness(50%)",width:"1300px",height:"700px"}} alt="..." />
    </div>
    <div className="carousel-item">
      <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D" style={{filter: "brightness(50%)",width:"1300px",height:"700px"}} alt="..." />

     
    </div>
  </div>
  <button
    className="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExampleFade"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button
    className="carousel-control-next"
    type="button"
    data-bs-target="#carouselExampleFade"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>



    </div>
  )
}

export default Carousel