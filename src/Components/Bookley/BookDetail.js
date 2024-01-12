import React, { useEffect, useState } from "react";
import { Link, /* useNavigate, */ useParams } from "react-router-dom";
import { Box, Button, Paper } from "@mui/material";
import styled from "styled-components";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/config";

const AnimatedPaper = styled(Paper)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
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
      height: "100px",
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

const BookDetail = () => {
  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(true);
  const name = useParams().id;

  // Fetch Details
  const fetchDetails = async () => {
    try {
      const res = query(collection(db, "books"), where("name", "==", name));
      const data = await getDocs(res);
      return data.docs.map((doc) => ({ ...doc.data() }));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // useEffect
  useEffect(() => {
    setLoading(true);
    fetchDetails()
      .then((data) => setBooks(data[0]))
      .finally(() => setLoading(false));
  },[]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      maxWidth={600}
      marginX="auto"
      marginTop={3}
      padding={2}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <AnimatedPaper elevation={10}>
          <h1>{books.name}</h1>
          <h3>By, {books.author}</h3>
          <img
            style={{ margin: "20px", borderRadius: "8px" }}
            height={500}
            width={350}
            src={books.image}
            alt={books.name}
          />
          <p style={{ margin: "20px", textAlign: "justify" }}>
            {books.description}
          </p>
          <h3 style={{ margin: "20px" }}>Rs.{books.price}</h3>
          <Button
            component={Link}
            to={`/buyProduct/${name}`}
            style={{ margin: "5px" }}
            variant="contained"
          >
            Buy Now
          </Button>
        </AnimatedPaper>
      )}
    </Box>
  );
};

export default BookDetail;

// Add the following CSS styles
const styles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(styles, styleSheet.cssRules.length);
