export default function MainHeader() {
  return (
    <header className='main-header'>
      <div className='content'>
          <img className="profile-picture" src="https://hips.hearstapps.com/hmg-prod/images/sacred-lotus-gettyimages-1143403162-646fa5a441f5d.jpg?crop=0.535xw:1.00xh;0.0519xw,0&resize=980:*" alt="profile picture" />
        <button className='burger-button'>
          <img className='burger-icon' src="/burger-icon.svg" alt="burger-icon"/>
        </button>
      </div>
    </header>
  )
}