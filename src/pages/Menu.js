import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import DrawerMenu from "../components/DrawerMenu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import bgImage from "../assets/Hote-R.png";

function Menu() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const [quantities, setQuantities] = useState({}); // ✅ For tracking quantities
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const fetchFoodItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/food");
      setFoodItems(res.data);

      // ✅ Initialize quantity for each item to 1
      const initialQuantities = {};
      res.data.forEach(item => {
        initialQuantities[item._id] = 1;
      });
      setQuantities(initialQuantities);
    } catch (err) {
      console.error("Error fetching menu items:", err);
    }
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const handleQuantityChange = (id, value) => {
    const qty = Math.max(1, parseInt(value) || 1); // prevent 0 or NaN
    setQuantities({ ...quantities, [id]: qty });
  };

  const handleAddToOrder = async (item) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const category = localStorage.getItem("category");
    const customerEmail = localStorage.getItem("customerEmail");

    if (!isAuthenticated || category !== "customer") {
      navigate("/login");
      return;
    }

    try {
      const restaurantName = item.restaurantName;
      const quantity = quantities[item._id] || 1;

      await axios.post("http://localhost:5000/api/orders", {
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        customerEmail,
        restaurantName,
        quantity, // ✅ send quantity to backend
      });

      alert(`Order added: ${item.name} x ${quantity}`);
    } catch (err) {
      console.error("Error adding order:", err);
      alert("Failed to add order.");
    }
  };

  return (
    <div style={{
      //backgroundImage: `url(${bgImage})`,
      backgroundColor : "#000000",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
    }}>
      <Header toggleDrawer={toggleDrawer} title="Orders Page" />
      {drawerOpen && <DrawerMenu closeDrawer={() => setDrawerOpen(false)} />}

      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#fff" }}> Menu</h2>

        <div>
          <h3>Available Food Items:</h3>
          <ul style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
          }}>
            {foodItems.map((item) => (
              <li key={item._id} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                width: "150px",
                textAlign: "center",
              }}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  width="100"
                  height="100"
                  style={{
                    objectFit: "cover",
                    marginBottom: "8px",
                    borderRadius: "6px",
                  }}
                />
                <h4 style={{ margin: "0 0 4px", color: "#fff" }}>{item.name}</h4>
                <p style={{ margin: 0 ,color: "#fff"}}>₹{item.price}</p>
                <small style={{ marginTop: "4px", fontSize: "18px", color: "#fff" }}>
                  by Hotel {item.restaurantName}
                </small>

                {/* ✅ Quantity input field */}
                <input
                  type="number"
                  min="1"
                  value={quantities[item._id] || 1}
                  onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                  style={{
                    width: "60px",
                    marginTop: "6px",
                    padding: "2px",
                    borderRadius: "4px",
                    border: "1px solid #aaa",
                  }}
                />

                <button
                  onClick={() => handleAddToOrder(item)}
                  style={{
                    marginTop: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#062d58",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Add to Order
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Menu;
