import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../../config/config";
import { GoogleButton } from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //state Management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setuserName] = useState("");

  //Handle Submit
  const submitRequest = async () => {
    localStorage.clear();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: userName,
        authProvider: "local",
        email,
      })
        .then(() => alert("Account Created Successfully"))
        .then(() => navigate("/login"));
    } catch (error) {
      // Handle specific errors
      if (error.code === "auth/weak-password") {
        alert("The password is too weak. Please choose a stronger password.");
      } else if (error.code === "auth/email-already-in-use") {
        alert("The email address is already in use by another account.");
      } else if (error.code === "auth/invalid-email") {
        alert("The email address is not valid.");
      } else {
        console.error("An error occurred during signup:", error.message);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    submitRequest();
  };

  const googleSignup = async () => {
    localStorage.clear();
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      })
        .then(() => localStorage.setItem("userId", user.uid))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/books"));
    } catch (error) {
      console.log(error);
    }
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
              A Universe Awaits <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                Between Our Shelves.
              </span>
            </h1>

            <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
              Here, you can browse our best seller books and the most wished for
              titles. These books will take you into a world full of fantasy,
              romance, thrillers and all you can imagine. Buy all these
              bestselling books online at the cheaper price of our
              store. Happy Reading!
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
                <MDBRow>
                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Username"
                      onChange={(e) => setuserName(e.target.value)}
                      id="form1"
                      type="text"
                    />
                  </MDBCol>
                </MDBRow>
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
                  sign up
                </Button>
                <div className="text-center">
                  <p>or sign up with:</p>
                  <GoogleButton
                    onClick={(e) => googleSignup()}
                    label="Sign Up with Google"
                    style={{
                      width: "100%",
                      marginBottom: "4px",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <br />
                Already Have an account?<Link to="/login"> Login Here</Link>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </form>
  );
};

export default Signup;
