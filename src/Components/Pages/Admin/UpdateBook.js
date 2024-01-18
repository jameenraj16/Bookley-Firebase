import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, FormLabel, TextField } from "@mui/material";
import styled from "styled-components";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../config/config";

const AnimatedBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 500px;
  margin: 10px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 5px 5px 50px 10px #ccc;
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100px", // Adjust the height as needed
    }}
  >
    <div
      style={{
        width: "40px",
        height: "40px",
        border: "4px solid transparent",
        borderTopColor: "#3498db",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    ></div>
  </div>
);

const UpdateBook = () => {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(true);
  const name = useParams().id;
  const id = localStorage.getItem("BookId");
  const navigate = useNavigate();

  // Handle Change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === "image" ? e.target.files[0] : e.target.value,
    }));
  };

  // Send Request
  const sendRequest = async () => {
    try {
      const docRef = doc(db, "books", id);
      if (inputs.image instanceof File) {
        const reader = new FileReader();
        reader.onload = async () => {
          const imageDataUrl = reader.result;
          await updateDoc(docRef, {
            name: inputs.name,
            description: inputs.description,
            author: inputs.author,
            price: inputs.price,
            image: imageDataUrl,
          });
        };
        reader.readAsDataURL(inputs.image);
      } else {
        await updateDoc(docRef, {
          name: inputs.name,
          description: inputs.description,
          author: inputs.author,
          price: inputs.price,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    sendRequest().then(() => {
      setLoading(false);
      localStorage.removeItem("BookId");
      navigate("/adminpage");
    });
  };

  // Fetch Details
  const fetchDetails = async () => {
    try {
      const res = query(collection(db, "books"), where("name", "==", name));
      const data = await getDocs(res);
      return data.docs.map((doc) => ({ ...doc.data() }));
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect
  useEffect(() => {
    setLoading(true);
    fetchDetails().then((data) => {
      setInputs({
        name: data[0].name,
        description: data[0].description,
        author: data[0].author,
        price: data[0].price,
        image: data[0].image,
      });
      setLoading(false);
    });
  }, [name]);

  return (
    <AnimatedBox>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <FormLabel>Name</FormLabel>
          <TextField
            value={inputs.name}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="name"
          />
          <FormLabel>Author</FormLabel>
          <TextField
            value={inputs.author}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="author"
          />
          <FormLabel>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="description"
          />
          <FormLabel>Price</FormLabel>
          <TextField
            value={inputs.price}
            onChange={handleChange}
            type="number"
            margin="normal"
            fullWidth
            variant="outlined"
            name="price"
          />
          <FormLabel>Image (Max Size: 1MB)</FormLabel>
          <TextField
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
              Update Book
            </Button>
          ) : (
            <Button sx={{ margin: "5px" }} type="submit" variant="contained">
              Update Book
            </Button>
          )}

          <Button
            sx={{ margin: "5px" }}
            type="button"
            variant="contained"
            color="error"
            onClick={() => navigate("/adminpage")}
          >
            Cancel
          </Button>
        </form>
      )}
    </AnimatedBox>
  );
};

export default UpdateBook;

// Add the following CSS styles
const styles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(styles, styleSheet.cssRules.length);
