import { Link } from "react-router";

export function Welcome() {
  return (
    <>
      <Link to="/login">Login</Link>
      <Link to="/registration">Register</Link>
    </>
  );
}
