//for working with form state:
// import { useState } from 'react';


import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
//multi-page routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import all pages/xxx.js
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Event from "./pages/Event";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Activate from "./pages/Activate";
import AuthReset from "./pages/AuthReset";
import NoPage from "./pages/NoPage";

//define page routes as a component:
export default function App() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="events" element={<Events />} />
                <Route path="event/:id" element={<Event />} />
                <Route path="blogs" element={<Blogs />} />
                <Route path="contact" element={<Contact />} />
                <Route path="register" element={<Register />} />
                <Route path="activate" element={<Activate />} />
                <Route path="reset" element={<AuthReset />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);


// const root = ReactDOM.createRoot(document.getElementById('root'));

//const myFirstElement = <h1>Hello React!</h1>
//root.render(myFirstElement);

// //define a component using a class or a function where return is render output:
// // class Car extends React.Component {
// //     render() {
// //         return <h2>This is a car</h2>
// //     }
// // }
// //this does the same
// function Car() {
//     return <h2>Hi, I am a Car!</h2>;
// }
// root.render(<Car/>)

// //pass properties into the component as function arguments:
// //Use an attribute to pass a color to the Car component, and use it in the render() function:
// function Car(props) {
//   return <h2>I am a {props.color} Car!</h2>;
// }
// root.render(<Car color="red"/>);

// //Display a list of cars
// function Car(props) {
//     return <li>I am a { props.brand }</li>;
// }

// function Garage() {
//     const cars = ['Ford', 'BMW', 'Audi'];
//     return (
//         <>
//             <h1>Who lives in my garage?</h1>
//             <ul>
//                 {cars.map((car) => <Car brand={car} />)}
//             </ul>
//         </>
//     );
// }
  
// root.render(<Garage />);
  
// // Let's refactor our previous example to include keys:
// function Car(props) {
//   return <li>I am a { props.brand }</li>;
// }

// function Garage() {
//   const cars = [
//     {id: 1, brand: 'Ford'},
//     {id: 2, brand: 'BMW'},
//     {id: 3, brand: 'Audi'}
//   ];
//   return (
//     <>
//       <h1>Who lives in my garage?</h1>
//       <ul>
//         {cars.map((car) => <Car key={car.id} brand={car.brand} />)}
//       </ul>
//     </>
//   );
// }

// root.render(<Garage />);  

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();


// //display a form with one field:
// function MyForm() {
//     const [name, setName] = useState("");

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         alert(`The name you entered was: ${name}`)
//     }
    
//     return (
//       <form onSubmit={handleSubmit}>
//         <label>Enter your name:
//           <input
//             type="text" 
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </label>
//         <input type="submit" />
//       </form>
//     )
// }
  
// root.render(<MyForm />);

// //display multiple field form:
// function MyForm() {
//     //initialise state with an empty object:
//     const [inputs, setInputs] = useState({});//note {} instead of "" in previous example with one field
//     const [myCar, setMyCar] = useState("Volvo");
//     const [textarea, setTextarea] = useState(
//         "The content of a textarea goes in the value attribute"
//     );

//     const handleChange = (event) => {
//         const name = event.target.name;
//         const value = event.target.value;
//         setInputs(values => ({...values, [name]: value}))
//     }
//     const handleCarChange = (event) => {
//         setMyCar(event.target.value)
//     }
//     const handleTextChange = (event) => {
//         setTextarea(event.target.value)
//     }

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // let text=""
//         // inputs.map((item) => text += "("+item+")")
//         alert("ALERT: name:"+inputs.username+", age:"+inputs.age+", car:"+myCar+", text:"+textarea);
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>Enter Name:
//                 <input
//                     type="text"
//                     name="username"
//                     value={inputs.username || ""}
//                     onChange={handleChange}
//                     />
//             </label><br/>
//             <label>Enter Age:
//                 <input
//                     type="number"
//                     name="age"
//                     value={inputs.age || ""}
//                     onChange={handleChange}
//                     />
//             </label><br/>
//             <label>My Car:
//                 <select value={myCar} onChange={handleCarChange}>
//                     <option value="Ford">Ford</option>
//                     <option value="Volvo">Volvo</option>
//                     <option value="Fiat">Fiat</option>
//                 </select>
//             </label><br/>
//             <label>Text:
//                 <textarea value={textarea} onChange={handleTextChange} />
//             </label><br/>
//             <input type="submit"/>
//         </form>
//     )
// }

// root.render(<MyForm/>)



