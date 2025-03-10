import { useNavigate } from "react-router-dom"

export default function BackButton() {
  const navigate = useNavigate()

  function handleClick(ev: React.MouseEvent) {
    ev.preventDefault()

    navigate('/')
  }

  return (
    <button className="back-button" onClick={(ev) => {handleClick(ev)}}>
      {'<'}
    </button>
  )
}