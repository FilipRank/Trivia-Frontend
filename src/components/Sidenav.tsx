import { Link } from "react-router-dom";

export default function Sidenav() {
  return (
    <div className="sidenav-container">
      <nav className="sidenav-body">
        <ul className="options">
          <li className="settings-item">
            <Link to='/settings'>Settings</Link>
          </li>
          <li className="shop-item">
            <Link to='/shop'>Shop</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}