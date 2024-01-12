import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Button, FormLabel, TextField } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { db } from "../../../config/config";

// Add fadeIn animation
const fadeIn = css`
  animation: fadeIn 0.5s ease-in-out;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

// Apply fadeIn to the Box component
const AnimatedBox = styled(Box)`
  ${fadeIn}
`;

const AddBook = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    price: "",
    author: "",
    image: null,
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === "image" ? e.target.files[0] : e.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      const reader = new FileReader();

      reader.onload = async () => {
        const imageDataUrl = reader.result;

        const book = {
          name: inputs.name,
          description: inputs.description,
          author: inputs.author,
          price: inputs.price,
          image: imageDataUrl,
        };

        await addDoc(collection(db, "books"), book);
        navigate("/adminpage");
      };

      reader.readAsDataURL(inputs.image);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest();
  };

  return (
    <form onSubmit={handleSubmit}>
      <AnimatedBox
        display={"flex"}
        boxShadow={"5px 5px 50px 10px#ccc"}
        flexDirection={"column"}
        justifyContent={"center"}
        maxWidth={500}
        alignContent={"center"}
        alignSelf={"center"}
        marginLeft={"auto"}
        marginRight={"auto"}
        marginTop={"10px"}
        padding={5}
        borderRadius={3}
      >
        <h1 style={{ textAlign: "center" }}>Add New Book</h1>
        <br />
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
        {inputs.image && inputs.image.size > 1024 * 1024 ? (
          <Button disabled sx={{ margin: "5px" }} type="submit" variant="contained">
            Add Book
          </Button>
        ) : (<Button sx={{ margin: "5px" }} type="submit" variant="contained">
            Add Book
          </Button>
          
        )}

        <Button
          onClick={() => navigate("/adminPage")}
          sx={{ margin: "5px" }}
          variant="contained"
        >
          Cancel
        </Button>
      </AnimatedBox>
    </form>
  );
};

export default AddBook;
