import axios from "axios"
import { useEffect, useRef, useState } from "react"
import MainFooter from "../components/MainFooter.js"
import MainHeader from "../components/MainHeader.js"
import Badge from "src/types/Badge"
import User from "src/types/User"
import BadgeCard from "../components/BadgeCard.js"
import BackButton from "../components/BackButton.js"

export default function BadgesPage() {
  const hasFetched = useRef<Boolean>(false)
  const [badges, setBadges] = useState<Badge[] | null>(null)

  async function fetchBadges() {
    try {
      const resProfile = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/`, {withCredentials: true})
      const user: User = resProfile.data.user
      const resBadges = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/badges/`)
      const filteredBadges = resBadges.data.filter((badge: Badge) => 
        user.purchasedBadgesIDs.includes(badge._id))
      setBadges(filteredBadges)
    }
    catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    fetchBadges()
  }) 

  return (
    <>
    <MainHeader />
    <main className="badges-page">
      <div className="header-back-button">
        <BackButton />
        <h2>Your Badges</h2>
      </div>
      <ul className="badges">
        {badges && badges.map((badge: Badge) => 
          <li className="badge-item">
            <BadgeCard badge={badge} onClick={() => {}} bought={true}/>
          </li>
        )}
      </ul>
    </main>
    <MainFooter />
    </>
  )
}