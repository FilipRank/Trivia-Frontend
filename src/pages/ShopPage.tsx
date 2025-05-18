import { useEffect, useRef, useState } from "react"
import MainFooter from "../components/MainFooter"
import MainHeader from "../components/MainHeader"
import Badge from "src/types/Badge"
import axios from "axios"
import BadgeCard from "../components/BadgeCard"
import BackButton from "../components/BackButton"

export default function ShopPage() {
  const hasFetched = useRef<boolean>(false)
  const [badges, setBadges] = useState<Badge[] | null>(null)


  async function handlePurchaseClick(badgeId: string) {
    console.log(badgeId)
    await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/user/add-badge/`, {}, {
      params: {
        id: badgeId
      },
      withCredentials: true
    })
  }

  async function fetchBadges() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/`,
        {withCredentials: true})
      
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/badges/`,
        {withCredentials: true})
      .then(resp => {
        const filtered = resp.data.filter((badge: Badge) => 
          !res.data.user.purchasedBadgesIDs.includes(badge._id))
        setBadges(filtered)
        console.log(res.data.user)
        console.log(resp.data)
      })
      .catch(err => {
        console.error(err)
      })
    }
    catch (err) {
      console.error(err)
    }

  }

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    fetchBadges()
  })

  return(
    <>
    <MainHeader />
    <main className="shop-page">
      <div className="header-back-button">
        <BackButton />
        <h2 className="title">Purchase badges</h2>
      </div>
      <ul className="badges">
        {badges?.map(badge => 
          <li className="badge-item" key={badge.name}>
            <BadgeCard badge={badge} onClick={() => {handlePurchaseClick(badge._id)}} bought={false}/>
          </li>
        )}
      </ul>
    </main>
    <MainFooter />
    </>
  )
}