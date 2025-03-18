import { useEffect, useRef, useState } from "react";
import MainFooter from "../components/MainFooter.js";
import MainHeader from "../components/MainHeader.js";
import axios from "axios";
import Profile from "src/types/Profile.js";
import BackButton from "../components/BackButton.js";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const hasFetched = useRef<boolean>(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [newUsername, setNewUsername] = useState<String>('')

  const navigate = useNavigate()


  function fetchProfile() {
    axios.get('http://localhost:4000/user/', { withCredentials: true })
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

  async function handleChangeClick(ev: React.MouseEvent) {
    ev.preventDefault()
    try {
      await axios.patch('http://localhost:4000/user/', {
        username: newUsername
      }, {withCredentials: true})
    }
    catch (err) {
      console.error(err)
    }
  }

  async function handleLogoutClick(ev: React.MouseEvent) {
    ev.preventDefault()
    try {
      const res = await axios.post('http://localhost:4000/auth/logout', {}, 
        {withCredentials: true})
      if (res.status == 200) {
        navigate('/login')
      }
    }
    catch(err) {
      console.error(err)
    }
  }

  return (
    <>
      <MainHeader />
      <main className="settings-page">
        <BackButton />
        <form className="settings-form">
          <label>Username</label>
          <input type="username" onChange={(ev) => setNewUsername(ev.target.value)} placeholder={profile?.username}></input>
          <button onClick={(ev) => {handleChangeClick(ev)}}>change</button>
          <button className="logout-button" onClick={(ev) => {handleLogoutClick(ev)}}>
            Log out
          </button>
        </form>
        
      </main>
      <MainFooter />
    </>
  )
}