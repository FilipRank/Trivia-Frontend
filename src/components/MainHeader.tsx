import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Sidenav from "./Sidenav";
import Profile from "src/types/Profile";
import axios from "axios";

export default function MainHeader() {
  const [showSidenav, setShowSidenav] = useState<boolean>(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const hasFetched = useRef<boolean>(false)

  function fetchProfile() {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/`, {withCredentials: true})
    .then((res) => {
      setProfile(res.data.user)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    fetchProfile()
  })

  return (
    <>
    <header className='main-header'>
      <div className='content'>
        <div className="left-group">
          <Link to='/'>
          <img className="profile-picture" src={profile?.imageUrl ?? 'https://cdn.pixabay.com/photo/2013/08/31/18/13/flower-177889_640.jpgs'} alt="profile picture" />
          </Link>
          <div className="username-balance">
            <div className="username">{profile?.username}</div>
            <div className="balance">{profile?.balance}</div>
          </div>
        </div>
        <button className='burger-button' onClick={() => {setShowSidenav(!showSidenav)}}>
          <img className='burger-icon' src="/burger-icon.svg" alt="burger-icon"/>
        </button>
        <nav className="header-navigation">
          <ul>
            <li className="badges-item">
              <Link to='/badges'>Badges</Link>
            </li>
            <li className="setting-item">
              <Link to='/settings'>Settings</Link>
            </li>
            <li className="shop-item">
              <Link to='/shop'>Shop</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    {
      showSidenav && <Sidenav />
    }
    </>
  )
}