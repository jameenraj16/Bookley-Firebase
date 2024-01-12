import React from 'react';
import './Styles.css';
import './img/main.jpeg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  return (
    <section className="hero" id="home">
      <div className="hero-banner">
        <h1 className="bookley-heading">Bookley</h1>
        <br />
        <p>
          Explore a wide range of books from various genres. Find your next
          favorite and read with us !
        </p>
        <br />
        <a style={{cursor:"pointer"}} onClick={()=> navigate("/login")} className="homebtn">
          Login 
        </a>
        <a style={{cursor:"pointer"}} onClick={()=> navigate("/signup")} className="homebtn">
          Signup
        </a>
      </div>
    </section>
  );
};

export default Home;
