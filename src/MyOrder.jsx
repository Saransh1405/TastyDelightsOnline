import React, { useState, useEffect } from 'react';
import Footer from './Footer';

const MyOrder = () => {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        try {
            const response = await fetch("http://localhost:9090/api/myorderdata", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });
            if (response.ok) {
                const data = await response.json();
                setOrderData(data.order_data || []);
            } else {
                console.error('Failed to fetch order data');
            }
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <>
            <div className='container'>
                <div className='row'>
                    {orderData.length > 0 ? orderData.slice(0).reverse().map((order, orderIndex) => (
                        order.map((arrayData, index) => (
                            <div key={`${orderIndex}-${index}`}>
                                {arrayData.Order_date ? (
                                    <div className='m-auto mt-5'>
                                        <div>{arrayData.Order_date}</div>
                                        <hr />
                                    </div>
                                ) : (
                                    <div className='col-12 col-md-6 col-lg-3'>
                                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                            {/* <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
                                            <div className="card-body">
                                                <h5 className="card-title">{arrayData.name}</h5>
                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                    <span className='m-1'>{arrayData.qty}</span>
                                                    <span className='m-1'>{arrayData.size}</span>
                                                    <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                        ₹{arrayData.price}/-
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )) : (
                        <div>No orders found</div>
                    )}
                </div>
            </div>
            <div className='mt-7'>
                <Footer />
            </div>
        </>
    );
};

export default MyOrder;
