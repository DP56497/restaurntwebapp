import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import DrawerMenu from "../components/DrawerMenu";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 

function Orders() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const fetchOrders = async () => {
    try {
      const category = localStorage.getItem("category");
      const customerEmail = localStorage.getItem("customerEmail");

      const url =
        category === "owner"
          ? "https://restaurntwebappb.onrender.com/api/orders"
          : `https://restaurntwebappb.onrender.com/api/orders?email=${customerEmail}`;

      const res = await axios.get(url);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`https://restaurntwebappb.onrender.com/api/orders/${id}`);
      setOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("Failed to delete order");
    }
  };

const downloadMemo = (order) => {
  const doc = new jsPDF();

  // 🔹 Hotel Header
  doc.setFontSize(18);
  doc.text(order.restaurantName, 105, 20, { align: "center" });

  const quantity = order.quantity || 1;
  const totalPrice = quantity * order.price;

  // 🔹 Table Header + Row
  const tableHead = [["Item Name", "Quantity", "Price", "Total Price", "Order Date"]];
  const tableBody = [[
    order.name,
    quantity.toString(),
    `₹${order.price}`,
    `₹${totalPrice}`,
    new Date(order.createdAt).toLocaleString()
  ]];

  // 🔹 Generate Table
  autoTable(doc, {
    startY: 30,
    head: tableHead,
    body: tableBody,
    styles: {
      halign: "center",
      fontSize: 12,
    },
    headStyles: {
      fillColor: [50, 50, 50],
      textColor: [255, 255, 255],
      halign: "center"
    }
  });

  // 🔹 Save PDF
  doc.save("order-memo.pdf");
};

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#000000",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Header toggleDrawer={toggleDrawer} title="Orders Page" />
      {drawerOpen && <DrawerMenu closeDrawer={() => setDrawerOpen(false)} />}
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#fff" }}>All your Orders List</h2>

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
            const quantity = item.quantity || 1;
            const totalPrice = item.price * quantity;

            return (
              <li
                key={item._id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  width: "150px",
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
                <h4 style={{ margin: "0 0 4px", color: "#fff" }}>
                  {item.name}
                </h4>
                <p style={{ margin: "0 0 4px", color: "#fff" }}>
                  ₹{item.price} x {item.quantity}
                </p>
                <p
                  style={{
                    margin: "0 0 4px",
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Total: ₹{totalPrice}
                </p>

                <p
                  style={{
                    margin: "0 0 4px",
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Quantity: {quantity}
                </p>
                <p style={{ fontSize: "12px", color: "#fff" }}>
                  Ordered on: {new Date(item.createdAt).toLocaleString()}
                </p>
                <small style={{ fontSize: "18px", color: "#fff" }}>
                  by Hotel {item.restaurantName}
                </small>

                <button
                  onClick={() => deleteOrder(item._id)}
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
                  Delete Order
                </button>

                <button
                  onClick={() => downloadMemo(item)}
                  style={{
                    marginTop: "8px",
                    padding: "5px 10px",
                    backgroundColor: "#062d58",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Download Memo
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Orders;
