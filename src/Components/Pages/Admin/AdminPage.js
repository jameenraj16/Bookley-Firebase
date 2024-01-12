import React, { useEffect, useState } from "react";
import AdminBook from "./AdminBook";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../config/config";

const fetchRequest = async () => {
  try {
    const res = query(collection(db, "books"));
    const data = await getDocs(res);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const AdminPage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequest()
      .then((data) => setBooks(data))
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading && (
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
      )}
      <ul
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          flexWrap: "wrap",
        }}
      >
        {books &&
          books.map((book, i) => (
            <li
              style={{
                listStyle: "none",
                margin: "1rem",
                padding: "10px",
                width: "250px",
                maxWidth: "250px",
                maxHeight: "450px",
              }}
              key={i}
            >
              <AdminBook book={book} />
            </li>
          ))}
      </ul>
      <Box textAlign={"right"}>
        {" "}
        <Button
          onClick={() => navigate("/add")}
          variant="contained"
          sx={{ margin: "5px" }}
        >
          Add Book
        </Button>
      </Box>
      <Box textAlign={"right"}>
        {" "}
        <Button
          onClick={() => navigate("/")}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            color: "white",
            margin: 1,
            borderRadius: 2,
            backgroundColor: "#34312D",
            transition: "0.2s ease",
            ":hover": { backgroundColor: "white", color: "#34312D" },
          }}
        >
          Logout
        </Button>
      </Box>
    </div>
  );
};

export default AdminPage;

// Add the following CSS styles
const styles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(styles, styleSheet.cssRules.length);
