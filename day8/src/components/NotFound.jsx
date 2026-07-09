import { Link } from "react-router-dom";

function NotFound() {
  const token = localStorage.getItem("token");

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h1>404</h1>

      <h2>Page Not Found</h2>

      <Link to={token ? "/dashboard" : "/login"}>
        Go Back
      </Link>
    </div>
  );
}

export default NotFound;