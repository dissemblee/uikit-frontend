import { Link } from "react-router";

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/registration">Register</Link>
      </nav>
    </main>
  );
}
