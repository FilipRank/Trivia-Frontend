import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <>
      <Link to='http://localhost:4000/auth/github'>
        <button>Login</button>
      </Link>
    </>
  )
}