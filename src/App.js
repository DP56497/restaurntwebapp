

// import React, { useState } from "react";
// import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import RestaurantInfoForm from "./components/RestaurantInfoForm";
// import HomePage1 from "./components/HomePage1";
// import HomePage2 from "./components/HomePage2";
// import Orders from "./pages/Orders";
// import Dashboard from "./pages/Dashboard";
// import Menu from "./pages/Menu";
// import AddFoodItem from "./pages/AddFoodItem";
// import OrderRecords from "./pages/OrderRecords";
// import System from "./pages/System";
// import ForgotPassword from "./components/ForgotPassword";



// function App() {
//   const [ownerLoginData, setOwnerLoginData] = useState({ email: "", password: "" });
//   const [ownerJustLoggedIn, setOwnerJustLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   const handleSignupComplete = (category, email, password) => {
//     localStorage.setItem("category", category);
//     localStorage.setItem("email", email);
//     localStorage.setItem("password", password);
//  if (category === "owner") {
//   setOwnerLoginData({ email, password });
//   setOwnerJustLoggedIn(true);
//   navigate("/restaurant-info");
// }
//  else if (category === "customer") {
//       localStorage.setItem("isAuthenticated", "true");
//       navigate("/home2");
//     }
//   };

//    const handleLoginSuccess = (category) => {
//     localStorage.setItem("isAuthenticated", "true");
//     if (category === "owner") {
//       setOwnerJustLoggedIn(true);
//       navigate("/restaurant-info");
//     } else {
//       navigate("/home2");
//     }
//   };

//   const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
//   const userCategory = localStorage.getItem("category");

//   const ProtectedRoute = ({ element, allowedCategories }) => {
//     if (!isAuthenticated) return <Navigate to="/" replace />;
//     if (!allowedCategories.includes(userCategory)) return <Navigate to="/" replace />;
//     return element;
//   };

//   return (
//     <Routes>
      
        
//       <Route path="/" element={<Signup onSignupComplete={handleSignupComplete} />} />
//       <Route
//         path="/login"
//         element={
//           <Login
//             goBack={() => navigate("/")}
//             onLoginSuccess={handleLoginSuccess}
//             prefillEmail={ownerLoginData.email}
//             prefillPassword={ownerLoginData.password}
//           />
//         }
//       />
//       <Route
//         path="/restaurant-info"
//         element={
//           ownerJustLoggedIn ? (
//             <RestaurantInfoForm onSubmitComplete={() => navigate("/home1")} />
//           ) : (
//             <Navigate to="/" replace />
//           )
//         }
//       />
//       <Route path="/home1" element={<ProtectedRoute element={<HomePage1 />} allowedCategories={["owner"]} />} />
//       <Route path="/home2" element={<ProtectedRoute element={<HomePage2 />} allowedCategories={["customer"]} />} />
//       <Route path="/orders" element={<ProtectedRoute element={<Orders />} allowedCategories={["customer"]} />} />
//       <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} allowedCategories={["owner", "customer"]} />} />
//       <Route path="/menu" element={<ProtectedRoute element={<Menu />} allowedCategories={["owner", "customer"]} />} />
//       <Route path="/system" element={<ProtectedRoute element={<System />} allowedCategories={["owner"]} />} />
//       <Route path="/addfooditem" element={<ProtectedRoute element={<AddFoodItem />} allowedCategories={["owner"]} />} />
//       <Route path="/orderrecords" element={<ProtectedRoute element={<OrderRecords />} allowedCategories={["owner"]} />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//     </Routes>
//   );
// }

// export default App;

import React, { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import RestaurantInfoForm from "./components/RestaurantInfoForm";
import HomePage1 from "./components/HomePage1";
import HomePage2 from "./components/HomePage2";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import AddFoodItem from "./pages/AddFoodItem";
import OrderRecords from "./pages/OrderRecords";
import System from "./pages/System";
import ForgotPassword from "./components/ForgotPassword";



function App() {
  const [ownerLoginData, setOwnerLoginData] = useState({ email: "", password: "" });
  const [ownerJustLoggedIn, setOwnerJustLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSignupComplete = (category, email, password) => {
    localStorage.setItem("category", category);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
 if (category === "owner") {
  setOwnerLoginData({ email, password });
  setOwnerJustLoggedIn(true);
  navigate("/restaurant-info");
}
 else if (category === "customer") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/home2");
    }
  };

   const handleLoginSuccess = (category) => {
    localStorage.setItem("isAuthenticated", "true");
    if (category === "owner") {
      setOwnerJustLoggedIn(true);
      navigate("/restaurant-info");
    } else {
      navigate("/home2");
    }
  };

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userCategory = localStorage.getItem("category");

  const ProtectedRoute = ({ element, allowedCategories }) => {
    if (!isAuthenticated) return <Navigate to="/" replace />;
    if (!allowedCategories.includes(userCategory)) return <Navigate to="/" replace />;
    return element;
  };

  return (
    <Routes>
      
        
      <Route path="/" element={<Signup onSignupComplete={handleSignupComplete} />} />
      <Route
        path="/login"
        element={
          <Login
            goBack={() => navigate("/")}
            onLoginSuccess={handleLoginSuccess}
            prefillEmail={ownerLoginData.email}
            prefillPassword={ownerLoginData.password}
          />
        }
      />
      <Route
        path="/restaurant-info"
        element={
          ownerJustLoggedIn ? (
            <RestaurantInfoForm onSubmitComplete={() => navigate("/home1")} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route path="/home1" element={<ProtectedRoute element={<HomePage1 />} allowedCategories={["owner"]} />} />
      <Route path="/home2" element={<ProtectedRoute element={<HomePage2 />} allowedCategories={["customer"]} />} />
      <Route path="/orders" element={<ProtectedRoute element={<Orders />} allowedCategories={["customer"]} />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} allowedCategories={["owner", "customer"]} />} />
      <Route path="/menu" element={<ProtectedRoute element={<Menu />} allowedCategories={["owner", "customer"]} />} />
      <Route path="/system" element={<ProtectedRoute element={<System />} allowedCategories={["owner"]} />} />
      <Route path="/addfooditem" element={<ProtectedRoute element={<AddFoodItem />} allowedCategories={["owner"]} />} />
      <Route path="/orderrecords" element={<ProtectedRoute element={<OrderRecords />} allowedCategories={["owner"]} />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;