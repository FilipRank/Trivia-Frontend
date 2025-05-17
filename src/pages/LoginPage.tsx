import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <>
      <main className="login-page">
      <div className="content">
        <img className="logo" src="logo.svg" alt="" />
        <Link to={`${import.meta.env.VITE_BACKEND_URL}/auth/github`}>
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