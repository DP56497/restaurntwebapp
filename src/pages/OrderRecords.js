import React, { useState, useEffect } from "react";
import Header2 from "../components/Header2";
import DrawerMenu2 from "../components/DrawerMenu2";
import axios from "axios";
import bgImage from "../assets/cafe.png.png";

function OrderRecords() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const fetchOrders = async () => {
    try {
      const restaurantName = localStorage.getItem("restaurantName");
      const res = await axios.get(
        `http://localhost:5000/api/orders?restaurantName=${restaurantName}`
      );
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching order records:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Header2 toggleDrawer={toggleDrawer} title="Orders Page" />
      {drawerOpen && <DrawerMenu2 closeDrawer={() => setDrawerOpen(false)} />}
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#062d58" }}>
          All  OrderRecords are here
        </h2>

        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            listStyle: "none",
            padding: 0,
          }}
        >
          {orders.map((item) => {
            
            const quantity = item.quantity;
            const totalPrice = item.price * quantity;

            return (
            <li
              key={item._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                width: "170px",
                textAlign: "center",
                
              }}
            >
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
              <h4 style={{ margin: "0 0 4px",  }}>
                {item.name}
              </h4>
              <p style={{ margin: "0 0 4px", }}>
                  ₹{item.price} x {item.quantity}
                </p>
              <p style={{ margin: "0 0 4px" }}>Total : ₹{totalPrice}</p>
              <p style={{ fontSize: "12px",  }}>
                Ordered by: <strong>{item.customerEmail || item.email}</strong>
              </p>
              <p style={{ fontSize: "12px",  }}>
  Ordered on: {new Date(item.createdAt).toLocaleString()}
</p>

            </li>
            );
})}
        </ul>
      </div>
    </div>
  );
}

export default OrderRecords;
