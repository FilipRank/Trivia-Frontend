import Badge from "src/types/Badge";

export default function BadgeCard({badge}: {badge: Badge}) {
  return (
    <div className="badge-card">
      <h3 className="badge-title">{badge.name}</h3>
      <div className="price">{badge.price}</div>
      <div className="value">{badge.value}</div>
      <img className="badge-image" src={badge.imageUri} alt="badge-image" />
      <div className="description">{badge.description}</div>
    </div>
  )
}