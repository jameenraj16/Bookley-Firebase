import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import {
  updateDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../config/config";

const UserDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState({ name: "", email: "" });
  const [inputs, setInputs] = useState({
    userName: "",
    email: "",
  });
  //handleChange
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //submitRequest
  const submitRequest = async (e) => {
    const id = params.id;
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("uid", "==", id))
      );
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];

        await updateDoc(doc(db, "users", userDoc.id), {
          name: inputs.userName,
        });

        setUser((prevUser) => ({
          ...prevUser,
          name: inputs.userName,
        }));
        alert("User details updated successfully!");
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    submitRequest().then(() => navigate("/books"))
  };
  //Fetch User Details
  const fetchUserDetails = async () => {
    const id = params.id;
    try {
      const res = query(collection(db, "users"), where("uid", "==", id));
      const data = await getDocs(res);
      return data.docs.map((doc) => ({ ...doc.data() }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserDetails().then((data) => {
      if (data && data.length > 0) {
        setUser({
          name: data[0].name,
          email: data[0].email,
        });
      }
    });
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 style={{ margin: 5 }}>Hello {user.name} !</h2>
        <Box
          maxWidth="450px"
          display="flex"
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          boxShadow={"10px 10px 20px #ccc"}
          padding={10}
          margin="auto"
          marginTop={8}
          borderRadius={3}
        >
          <Typography
            style={{ fontWeight: "bold", color: "#34312D", fontSize: "35px" }}
          >
            Update Your Details!
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                onChange={handleChange}
                value={inputs.userName}
                name="userName"
                margin="normal"
                label="Username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                onChange={handleChange}
                value={inputs.email}
                name="email"
                margin="normal"
                label="Email"
                type="email"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
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
          >
            Update
          </Button>
          <Button
            onClick={() => navigate("/myBlogs")}
            sx={{
              fontWeight: "bold",
              color: "#EF626C",
              textTransform: "none",
              borderRadius: 3,
              width: "110px",
              backgroundColor: "#white",
              ":hover": { backgroundColor: "#EF626C", color: "white" },
            }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default UserDetails;