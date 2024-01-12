import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import lock from "./img/lock.png";



const LoginFirst = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome to Our Application!</h2>
      <img
        src={lock}
        alt="Lock Icon"
        style={styles.lockImage}
      />
      <p style={styles.message}>
        Please log in to enjoy the full features of our application.
      </p>
      <Button
        sx={{
          textTransform: "none",
          fontWeight: "bold",
          color: "white",
          margin: 1,
          borderRadius: 3,
          backgroundColor: "#335CD7",
          ":hover": { backgroundColor: "#white", color: "#335CD7" },
        }}
        style={{ width: "110px" }}
        onClick={() => navigate("/auth")}
      >
        Log In
      </Button>
    </div>
  );
};

const styles = {
  container: {
    marginTop:"2rem",
    textAlign: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    maxWidth: "300px",
    margin: "auto",
  },
  heading: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  lockImage: {
    width: "50px", // Adjust the size as needed
    marginBottom: "10px",
  },
  message: {
    fontSize: "1rem",
    marginBottom: "20px",
  },
  button: {
    padding: "10px",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default LoginFirst;