import { triviaCategories } from './services/CategoryService'
import { Link } from 'react-router-dom'
import MainHeader from './components/MainHeader'
import MainFooter from './components/MainFooter'

function App() {
  return (
    <>
    <MainHeader />
    <main className='homepage-main'>
      <div className="category-selector">
        <img className='logo' src='public/logo.svg' />
        <h2 className='title'>Select a category</h2>
        <ul>
          {triviaCategories.map(category => (
            <li className='item'>
              <Link to={`question/${category.name}`}>
                <button className='category-button'>{category.name}</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <MainFooter />
    </main>
    </>
  )
}

export default App
