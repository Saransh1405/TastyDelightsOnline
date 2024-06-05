import React,{useState, useRef, useEffect } from 'react'
import { useDispatchCart,useCart } from './ContextReducer';

const Card = (props) => {

  const priceRef=useRef();
  let dispatch=useDispatchCart();
  let data=useCart();
  let options = props.option ?? {};
  let priceOptions = Object.keys(options || {});
  const [qty, setqty] = useState(1);
  const [size, setsize] = useState("");

  
  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())

    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props._id, name: props.foodname, price: props.finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: props._id, name: props.foodname, price: finalPrice, qty: qty, size: size })

  }


  let finalPrice=qty*parseInt(options[size]);
  useEffect(()=>{
    setsize(priceRef.current.value)
  },[])

  return (
    <>
    <div>
      <div>
        <div className="card cardee mt-3 " style={{"width": "16.5rem","height":"400px"}}>
  <img className="card-img-top " src={props.imgsrc} alt="Card cap" style={{height:"170px",objectfit:"fill"}} />
  <div className="card-body">
    <h5 className="card-title">{props.foodname}</h5>
    <p className="card-text text-muted " style={{ fontSize: '11px' }}>{props.description} </p>
    <div className='container w-100'>
        <select className='m-2 h-100 rounded text-white btn-card' onChange={(e)=>setqty(e.target.value)}>
            {Array.from(Array(6),(e,i)=>{
                return(
                    <option key={i+1} value={i+1}>{i+1}</option>
                )
            })}
        </select>
            <select className='m-2 h-100  rounded text-white btn-card' ref={priceRef} onChange={(e)=>setsize(e.target.value)}>
            {/* {priceOptions.map((data) => (
  <option key={data} value={data}>
    {data}
  </option>
))} */} <option>half</option>
  <option>full</option>
            </select>

            <div className='d-inline h-100 fs-10'>
            ₹{finalPrice}/-
            </div>
    </div>
    <hr></hr>
            <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add To Cart</button>
  </div>
</div>
</div>
</div>
    </>
  )
}

export default Card