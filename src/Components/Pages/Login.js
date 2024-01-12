import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/config";
import { GoogleButton } from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { authActions } from "../../Store";
import { useDispatch } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //state Management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.clear();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const data = res.user;

      localStorage.setItem("userId", data.uid);
      dispatch(authActions.login());
      navigate("/books");
    } catch (error) {
      console.log(error.message);
    }
  };
  //Google Signup
  const handleSignin = async () => {
    try {
      await signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        localStorage.setItem("userId", user.uid);
        return user;
      });
    } catch (error) {}
  };
  const googleSignin = () => {
    localStorage.clear();
    handleSignin().then(() => {
      dispatch(authActions.login());
      if (localStorage.getItem("userId")) {
        navigate("/books");
      }
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <MDBContainer
        fluid
        className="p-4 background-radial-gradient overflow-hidden"
      >
        <MDBRow>
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
          >
            <h1
              className="my-5 display-3 fw-bold ls-tight px-3"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              Find Yourself
              <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                Stay for the Experience.
              </span>
            </h1>

            <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
              Here, you can browse our best seller books and the most wished for
              titles. These books will take you into a world full of fantasy,
              romance, thrillers and all you can imagine. Buy all these
              bestselling books online at the cheaper price of our
              store. Happy Reading!
            </p>
          </MDBCol>

          <MDBCol md="6" className="position-relative">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            ></div>

            <MDBCard className="my-5 bg-glass w-75">
              <MDBCardBody className="p-5">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  id="form3"
                  type="email"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  id="form4"
                  type="password"
                />
                <Button
                  type="submit"
                  variant="contained"
                  className="w-100 mb-4"
                  size="md"
                >
                  Login
                </Button>
                <div className="text-center">
                  <p>or sign In with:</p>

                  <GoogleButton
                    onClick={(e) => googleSignin()}
                    label="Sign In with Google"
                    style={{
                      width: "100%",
                      marginBottom: "4px",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <br />
                Don't Have an account?<Link to="/signup"> Signup Here</Link>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </form>
  );
};

export default Signup;
