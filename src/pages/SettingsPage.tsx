import { useEffect, useRef, useState } from "react";
import MainFooter from "../components/MainFooter.js";
import MainHeader from "../components/MainHeader.js";
import axios from "axios";
import Profile from "src/types/Profile.js";

export default function SettingsPage() {
const hasFetched = useRef<boolean>(false)
const [profile, setProfile] = useState<Profile | null>(null)


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

  return (
    <>
      <MainHeader />
      <main className="settings-page">
        <form className="settings-form">
          <label>Username</label>
          <input type="username" placeholder={profile?.username}></input>
          <button>change</button>
        </form>
      </main>
      <MainFooter />
    </>
  )
}