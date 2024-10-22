import { Link } from "react-router-dom";

const SessionExpire = () => {
  return (
    <div style={styles.container}>
      <h1>Session Expired</h1>
      <p>Your session has expired. Please log in again to continue.</p>
      <a href="/">
        <button style={styles.button}>Go to Login</button>
      </a>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default SessionExpire;
