import React from "react";

const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  container: {
    textAlign: "center",
  },
  heading: {
    color: "red",
  },
  paragraph: {
    color: "#666",
  },
};

const Missing = () => {
  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.heading}>404 - Page Not Found</h1>
        <p style={styles.paragraph}>
          Sorry, the page you are looking for might not exist.
        </p>
      </div>
    </div>
  );
};

export default Missing;
