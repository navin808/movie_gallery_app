import './Header.css'
import LiveTvTwoToneIcon from '@mui/icons-material/LiveTvTwoTone';


const Header = () => {
  return (
    
    <span onClick={() => window.scroll(0, 0)} className="header">
       <LiveTvTwoToneIcon sx={{fontSize:"50px"}}/> &nbsp;&nbsp;<b><i>Movie Gallery</i>  </b> 
      
    </span>
   
    
  )
}

export default Header
