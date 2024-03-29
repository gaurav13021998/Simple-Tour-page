import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'

const url = 'https://course-api.com/react-tours-project'
function App() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const remove = (id) =>{
    const newTour = tours.filter((tour) => tour.id !== id);
    setTours(newTour);
  }

  const fetchTours = async () => {
    setLoading(true);
  try{
    const response = await fetch(url);
    const tour = await response.json();
    setLoading(false)
    setTours(tour)
  }catch (error){
    setLoading(false);
    console.log(error);
  }
  }
  useEffect(() => {
    fetchTours();
  }, []);
  if(loading){
    return( 
    <main>
      <Loading />
    </main>
    )
  }
  if(tours.length === 0){
    return(
      <main>
        <div className="title">
          <h2>No tours left</h2>
          <button className="btn" onClick={fetchTours}>Refresh</button>
        </div>
      </main>
    )
  }
  return(
    <main>
      <Tours tours={tours} remove={remove} />
    </main>
  ) 
}

export default App
