import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const AnimatedCard = styled(Card)({
  maxWidth: 345,
  height: 430,
  animation: "fadeIn 0.5s ease-out",
});
const AdminBook = (props) => {
  const navigate = useNavigate();
  const { name,id, author, price, image } = props.book;
  const handleCardClick = () => {
    localStorage.setItem("BookId", id)
    navigate(`/bookDetail/${name}`); // Navigate to book details page
  };
  return (
    <AnimatedCard>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia component="img" height="250px" image={image} alt={name} />
        <CardContent>
          <h3
            style={{ marginLeft: "0", marginTop: "5px", marginBottom: "10px" }}
          >
            {name}
          </h3>

          <h5>By.{author}</h5>
          <br />
          <h3>
            <b>Rs.{price}</b>
          </h3>
        </CardContent>
      </CardActionArea>
    </AnimatedCard>
  );
};

export default AdminBook;
