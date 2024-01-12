import React, {useEffect, useState}from 'react'
import { useNavigate } from "react-router-dom";
import {db} from "../../config/config"
import { collection, getDocs, query } from 'firebase/firestore';
import Book from './Book';
import { Box, Button } from '@mui/material';
import { MDBBtn, MDBIcon, MDBTypography } from 'mdb-react-ui-kit';

const fetchRequest = async() => {
  try {
    const res = query(collection(db, "books"));
    const data = await getDocs(res)
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.log(error.message);
  }
}

const Books = () => {
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
                margin: "2rem",
                padding: "10px",
                width: "250px",
                maxWidth: "250px",
                maxHeight: "450px",
              }}
              key={i}
            >
              <Book book={book} />
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Books