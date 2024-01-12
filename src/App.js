import React, { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./Components/Pages/Home";
import Header from "./Components/Header";
import Login from "./Components/Pages/Login";
import Signup from "./Components/Pages/Signup";
import { authActions } from "./Store";
import LoginFirst from "./Components/Pages/LoginFirst";
import Books from "./Components/Bookley/Books";
import BookDetail from "./Components/Bookley/BookDetail";
import Missing from "./Components/Pages/Missing";
import BuyNow from "./Components/Bookley/BuyNow/BuyNow";
import AboutUs from "./Components/Pages/AboutUs";
import UserDetails from "./Components/Pages/UserDetails";
import AdminLogin from "./Components/Pages/Admin/AdminLogin";
import AdminPage from "./Components/Pages/Admin/AdminPage";
import AddBook from "./Components/Pages/Admin/AddBook";
import AdminBookDetail from "./Components/Pages/Admin/AdminBookDetail";
import UpdateBook from "./Components/Pages/Admin/UpdateBook";

const theme = createTheme({
  typography: {
    fontFamily: ["Comfortaa", "sans-serif"].join(","),
  },
});
const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <div>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            {!isLoggedIn ? (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/adminpage" element={<AdminPage />} />
                <Route path="/add" element={<AddBook />} />
                <Route path="/bookdetail/:id" element={<AdminBookDetail />} />
                <Route path="/books/update/:id" element={<UpdateBook />} />

              </>
            ) : (
              <>
                <Route path="/" element={<Books />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/:id" element={<BookDetail />} />
                <Route path="/buyProduct/:id" element={<BuyNow />} />
                <Route path="/myaccount/:id" element={<UserDetails />} />
                <Route path="/about" element={<AboutUs />} />

                <Route path="*" element={<Missing />} />
              </>
            )}
            <Route path="/" element={<Home />} />
            <Route path="*" element={<LoginFirst />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
