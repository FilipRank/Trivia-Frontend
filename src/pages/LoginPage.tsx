import { Link } from "react-router-dom";
import dotenv from 'dotenv';

dotenv.config()

export default function LoginPage() {
  return (
    <>
      <main className="login-page">
      <div className="content">
        <img className="logo" src="logo.svg" alt="" />
        <Link to={`http://${process.env.BACKEND_URL}/auth/github`}>
          <button className="login-button">
              <img src="github-logo.png" alt="github-logo" className="github-logo" />
            Sign in with Github
          </button>
        </Link>
      </div>
      </main>
    </>
  )
}