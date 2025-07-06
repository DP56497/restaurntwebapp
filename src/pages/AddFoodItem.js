import React, { useState, useEffect } from "react";
import Header2 from "../components/Header2";
import DrawerMenu2 from "../components/DrawerMenu2";
import axios from "axios";
import bgImage from "../assets/cafe.png.png";

function AddFoodItem() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const fetchFoodItems = async () => {
    try {
      const category = localStorage.getItem("category");
      const ownerEmail = localStorage.getItem("email");
      const url =
        category === "customer"
          ? "http://localhost:5000/api/food"
          : `http://localhost:5000/api/food?ownerEmail=${ownerEmail}`;
      const res = await axios.get(url);
      setFoodItems(res.data);
    } catch (err) {
      console.error("Failed to fetch food items:", err);
    }
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);

    const restaurantName = localStorage.getItem("restaurantName");
    const ownerEmail = localStorage.getItem("email");

    formData.append("restaurantName", restaurantName);
    formData.append("ownerEmail", ownerEmail);

    try {
      setUploading(true);
      setUploadProgress(0);

      await axios.post("https://restaurntwebappb.onrender.com/api/food/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      setName("");
      setPrice("");
      setImage(null);
      setPreviewUrl(null);
      setUploadProgress(0);
      fetchFoodItems();
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };
  const deleteFoodItem = async (id) => {
    try{
      await axios.delete(`https://restaurntwebappb.onrender.com/api/food/${id}`);
      setFoodItems((prev) => prev.filter((item) => item._id !== id));
      alert("Food item deleted SuccessFully");
    }catch(err){
      console.error("Error deleting food item : " , err);
      alert("Failed to delete food item");
    }
  }

  return (
    <div  style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}>
      <Header2 toggleDrawer={toggleDrawer} title="Orders Page" />
      {drawerOpen && <DrawerMenu2 closeDrawer={() => setDrawerOpen(false)} />}

      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#062d58" }}>Welcome to Hotel 5 Star - AddFoodItem</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Food Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ marginRight: "10px" }}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{ marginRight: "10px" }}
          />
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            required
            style={{ marginRight: "10px" }}
          />
          <button type="submit" disabled={uploading} style={{color: "#062d58"}}>
            {uploading ? "Uploading..." : "Upload"}
          </button>

          {previewUrl && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={previewUrl}
                alt="Preview"
                width="120"
                height="100"
                style={{ objectFit: "cover", borderRadius: "8px", border: "1px solid #ccc" }}
              />
            </div>
          )}

          {uploading && (
            <div style={{ width: "100%", marginTop: "10px" }}>
              <div
                style={{
                  width: `${uploadProgress}%`,
                  height: "8px",
                  backgroundColor: "#062d58",
                  borderRadius: "4px",
                  transition: "width 0.3s ease-in-out",
                }}
              ></div>
              <p style={{ fontSize: "12px", color: "#062d58" }}>{uploadProgress}%</p>
            </div>
          )}
        </form>

        <div>
          <h3>Uploaded Food Items:</h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {foodItems.map((item) => (
              <li
                key={item._id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
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
                <h4 style={{ margin: "0 0 4px", color: "#062d58" }}>{item.name}</h4>
                <p style={{ margin: 0 }}>₹{item.price}</p>
                <small style={{ marginTop: "6px", fontSize: "18px", color: "#062d58" }}>
                  by Hotel {item.restaurantName}
                </small>
                <button
                onClick={() => deleteFoodItem(item._id)}
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
                Delete foodItems
              </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddFoodItem;
