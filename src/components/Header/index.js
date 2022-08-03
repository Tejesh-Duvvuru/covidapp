import { Link } from 'react-router-dom'
import './index.css'
const Header = () =>{
   

    return(
        <div className="header-content"> 
            <h1 className='welcome-msg'>Welcome to Covid DataPortal</h1>
            <div className='header-right'>
                <Link to={'/mapview'}>Map</Link>
                <h1 className='userName'>Tejesh Duvvuru</h1>
                
            </div>
            
        </div>
    ) 
}



export default Header