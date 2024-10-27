import { Link } from 'react-router-dom'
import ThemeButton from './ThemeButton'
import { useCharStates } from '../Context'

const Navbar = () => {
  const { state } = useCharStates();
  return (
    // dark-nav es una clase que no existe, se debe estilar para el tema
    <nav className={`flex justify-evenly   
        ${!state.theme && "dark-nav"}`}>
    <div className='text-3xl font-bold underline'>
      <span>Logo</span>
    </div>
    <div className='flex'>
      <ul className='flex'>
        <li>
          <Link to="/">Inicio</Link> 
        </li>
        <li>
          <Link to="/favs">Favoritos</Link> 
        </li>
      </ul>
      <ThemeButton />
    </div>
  </nav>
  )
}

export default Navbar