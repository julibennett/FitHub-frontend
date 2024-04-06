// import React from 'react'
// import { useEffect, useState} from 'react'
// import { Route, Routes } from 'react-router-dom'
// import Home from '../pages/Home'
// import ClassShow from '../pages/ClassShow'


// const Class = (props) => {

//     const [workoutClass, setWorkoutClass] = useState(null)

//     const URL = 'http://localhost:4000/class'

//     const getClasses = async() => {
//         const response = await fetch(URL)
//         const data = await response.json()
//         setWorkoutClass(data.data)
//         console.log(data.data)
//     }

//     const singularClass = async(classes, id) => {
//         await fetch(URL + id, {
//             method: 'GET',
//             headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify(classes),
//         })
//         getClasses()
//     }

//   return (
//     <div>
//         <Routes>
//             <Route path='/' element={<Home getClasses={getClasses}/>}/>
//             <Route path='/:id' element={<ClassShow />}/>
//         </Routes>
//     </div>
//   )
// }

// export default Class