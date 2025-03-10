import Badge from "src/types/Badge";

export default function BadgeCard({badge, onClick, bought}: {badge: Badge, onClick: React.MouseEventHandler<HTMLButtonElement>, bought: boolean}) {
  return (
    <div className="badge-card">
      <h3 className="badge-title">{badge.name}</h3>
      <div className="value">Value: {badge.value}</div>
      <img className="badge-image" src={badge.imageUri} alt="badge-image" />
      <button className="purchase-button" onClick={onClick}> 
        {bought ? `${badge.description}` : `${badge.price} Purchase`}
      </button>
    </div>
  )
}