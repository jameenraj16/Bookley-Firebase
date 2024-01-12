import { Title } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  styled,
} from "@mui/material";

import React from "react";
import { useNavigate } from "react-router-dom";

const Book = (props) => {
  const navigate = useNavigate();
  const { name, description, author, price, image } = props.book;
  const handleCardClick = () => {
    navigate(`/books/${name}`); // Navigate to book details page
  };
  const AnimatedCard = styled(Card)({
    maxWidth: 345,
    height: 500,
    padding:5,
    animation: "fadeIn 0.5s ease-out",
  });
  return (
    <div>
    <AnimatedCard className="hover-zoom">
      <CardActionArea onClick={handleCardClick}>
        <CardMedia component="img" height="250px" image={image} alt={name} />
        <CardContent>
          <h3
            style={{ marginLeft: "0", marginTop: "5px", marginBottom: "5px" }}
          >
            {name}
          </h3>
          <h5>{author}</h5>
          <br />{" "}
          <h4>
            <b>Rs.{price}</b>
          </h4>
        </CardContent>
      </CardActionArea>
    </AnimatedCard>
    </div>
  );
};

export default Book;
