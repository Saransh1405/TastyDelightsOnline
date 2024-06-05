
import React,{useState,useEffect} from 'react';

import Card from './components/Card';
// import { NavLink } from 'react-router-dom';
import Footer from './Footer'
import Carousel from './components/Carousel';


const Home = () => {

  const [foodItems, setFoodItems] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [search, setSearch] = useState(''); // Assuming you have a search state

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:9090/api/displaydata", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      let data = await response.json();
      setFoodItems(data[0]);
      setFoodCategories(data[1]);

      console.log(data[0], data[1]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);


  return (
    <>

    <div> 

<div><Carousel/></div>




    </div>







    <div className='container'>
      {foodCategories.length ? (
        foodCategories.map((data) => (
          <div className='row mb-3' key={data.ID}>
            <div className='fs-2 mt-3 fw-bold food_item_name'>{data.CategoryName}</div>
            <hr />
            {foodItems.length ? (
              foodItems
                .filter((item) => item.CategoryName === data.CategoryName && item.Name.toLowerCase().includes(search.toLowerCase()))
                .map((filterItems) => (
                  <div key={filterItems.ID} className='col-12 col-md-6 col-lg-3 '>
                    <Card 
                    foodname={filterItems.Name} 
                      _id={filterItems.ID}
                      option={filterItems.Options} 
                      imgsrc={filterItems.Image}
                      description={filterItems.Description}
                    />
                  </div>
                ))
            ) : (
              <div>No such data found</div>
            )}
          </div>
        ))
      ) : (
        <div>No food categories available</div>
      )}
    </div>



        <div>
    <Footer/>

        </div>
    </>
  );
}

export default Home;
