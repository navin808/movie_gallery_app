import { useEffect, useState } from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search'
import FavouriteIcon from '@mui/icons-material/Favorite'
import { useNavigate } from 'react-router-dom'


export default function BottomNav() {
  const [value, setValue] = useState(0)
  const nav = useNavigate()

  useEffect(() => {
    if (value === 0) {
      nav('/')
    
    } else if (value === 1) {
      nav('/search')  
    } else if (value === 2) {
      nav('/favourites')
    }
  }, [value, nav])

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      style={{
        width: '40%',
        position: 'fixed',
        bottom: 0,
        backgroundColor: 'rgb(72, 100, 166)',
        zIndex: 100,
        marginLeft:"820px",
        borderRadius:'10px',
        marginBottom:'625px'
      }}
    >
      <BottomNavigationAction
        style={{ color: 'white', padding: '1px' }}
        label="HOME"
        icon={<HomeOutlinedIcon />}
      />
   
      <BottomNavigationAction
        style={{ color: 'white', padding: '10px' }}
        label="SEARCH"
        icon={<SearchIcon />}
      />
      <BottomNavigationAction
        style={{ color: 'white', padding: '10px' }}
        label="FAVOURITES"
        icon={<FavouriteIcon />}
      />
      
      
    </BottomNavigation>
  )
}
