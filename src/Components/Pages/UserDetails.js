import { Box, Button, FormLabel, Grid, TextField, Typography } from "@mui/material";
import {
  updateDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { db } from "../../config/config";

const UserDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [inputs, setInputs] = useState({});
  //handleChange
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.name === "image" ? e.target.files[0] : e.target.value,
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
        if (inputs.image instanceof File) {
          const reader = new FileReader();
          reader.onload = async () => {
            const imageDataUrl = reader.result
            await updateDoc(doc(db, "users", userDoc.id), {
              name: inputs.name,
              email: inputs.email,
              age: inputs.age,
              state: inputs.state,
              city: inputs.city,
              image: imageDataUrl
            });
            setInputs((prevUser) => ({
              ...prevUser,
              name: inputs.name,
            }));
            alert("User details updated successfully!");
          }
          reader.readAsDataURL(inputs.image)
        } else {
          await updateDoc(doc(db, "users", userDoc.id), {
            name: inputs.name,
            email: inputs.email,
            age: inputs.age,
            state: inputs.state,
            city: inputs.city,
          });
        }
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
    submitRequest().then(() => navigate("/books"));
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
        setInputs({
          name: data[0].name,
          email: data[0].email,
          age: data[0].age,
          state: data[0].state,
          city: data[0].city,
          image: data[0].image
        });
      }
    });
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 style={{ margin: 5 }}>Hello {inputs.name} !</h2>
        <div style={{ display: "flex" }}>
          <Box
            maxWidth="550px"
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
                <FormLabel>Username</FormLabel>
                <TextField
                sx={{mt:0}}
                  fullWidth
                  onChange={handleChange}
                  value={inputs.name}
                  name="name"
                  margin="normal"
                  type="text"
                />
              </Grid>
              <Grid item xs={6}>
              <FormLabel>E-mail</FormLabel>
                <TextField
                sx={{mt:0}}
                  fullWidth
                  onChange={handleChange}
                  value={inputs.email}
                  name="email"
                  margin="normal"
                  type="email"
                />
              </Grid>
              <Grid item xs={6}>
              <FormLabel>Age</FormLabel>
                <TextField
                sx={{mt:0}}
                  fullWidth
                  onChange={handleChange}
                  value={inputs.age}
                  name="age"
                  margin="normal"
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
              <FormLabel>State</FormLabel>
                <TextField
                sx={{mt:0}}
                  fullWidth
                  onChange={handleChange}
                  value={inputs.state}
                  name="state"
                  margin="normal"
                  type="text"
                />
              </Grid>
              <Grid item xs={6}>
              <FormLabel>City</FormLabel>
                <TextField
                sx={{mt:0}}
                  fullWidth
                  onChange={handleChange}
                  value={inputs.city}
                  name="city"
                  margin="normal"
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Profile Picture (<span style={{ color: "blue" }}>Max Size: 1MB</span>)</FormLabel>
                <TextField
                sx={{mt:0}}
                  onChange={handleChange}
                  type="file"
                  accept="image/*"
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  name="image"
                  helperText={
                    inputs.image && inputs.image.size > 1024 * 1024 ? (
                      <b style={{ color: "red" }}>File size exceeds 1MB limit</b>
                    ) : (
                      ""
                    )
                  }
                />
              </Grid>
            </Grid>
            <img
              src={inputs.image}
              type="file"
              style={{
                maxWidth: "150px",
                border: "2px solid #ccc",
                padding: "2px",
                margin: "auto",
                marginBottom: "5px",
                borderRadius: "10px",
              }}
              alt={inputs.name}
            />
            {inputs.image && inputs.image.size > 1024 * 1024 ? (
              <Button
                disabled
                sx={{ margin: "5px" }}
                type="submit"
                variant="contained"
              >
                Update
              </Button>
            ) : (
              <Button sx={{ margin: "5px" }} type="submit" variant="contained">
                Update
              </Button>
            )}
            <Button
              onClick={() => navigate("/")}
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
        </div>
      </form>
    </div>
  );
};

export default UserDetails;
