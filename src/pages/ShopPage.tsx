import { useEffect, useRef, useState } from "react"
import MainFooter from "../components/MainFooter"
import MainHeader from "../components/MainHeader"
import Badge from "src/types/Badge"
import axios from "axios"
import BadgeCard from "../components/BadgeCard"

export default function ShopPage() {
  const hasFetched = useRef<boolean>(false)
  const [badges, setBadges] = useState<Badge[] | null>(null)


  function fetchBadges() {
    axios.get('http://localhost:4000/badges/', {withCredentials: true})
    .then(res => {
      setBadges(res.data)
    })
    .catch(err => {
      console.error(err)
    })
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
      <h2 className="title">Purchase badges</h2>
      <ul className="badges">
        {badges?.map(badge => 
          <li className="badge-item" key={badge.name}>
            <BadgeCard badge={badge} />
          </li>
        )}
      </ul>
    </main>
    <MainFooter />
    </>
  )
}