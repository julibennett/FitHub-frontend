import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = (props) => {
  const [classes, setClasses] = useState([])
    const HomepageURL = `${props.URL}class`

    const fetchClasses = async () => {
      try{
        const response = await fetch({HomepageURL})
        const data = await response.json()
        setClasses(data.data)
      }catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    }

  useEffect(() => {
      fetchClasses()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className='coolFont m-3 allWorkouts text-white'>All Workout Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classes.map((workoutClass) => (
                    <div key={workoutClass._id} className="border p-4 rounded-lg hover:shadow-lg transition-shadow bg-purple-300">
                      
                        <h2 className="text-xl font-semibold mb-2 coolFont underline">{workoutClass.studio}</h2>
                        <img className="object-contain border-double border-4 rounded-xl mb-3" src={workoutClass.image} alt="image of workout class"/>
                        <p className="mb-2">{workoutClass.typeOfClass}</p>
                        <p className="mb-2">{workoutClass.location}</p>
                        <p className="mb-2">{workoutClass.time}</p>

                        <Link to={`/class/${workoutClass._id}`} className="text-blue-500 hover:text-blue-600 transition-colors">View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home