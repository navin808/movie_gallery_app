import { Pagination } from '@mui/material'
import React from 'react'


export default function CustomPagination({ setPage, numOfPages = 10 }) {
  // Scroll to top when page changes
  const handlePageChange = (page) => {
    setPage(page)
    window.scroll(0, 0)
  }

  return (
    <div
      style={{
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: -40,
        marginLeft: 50,
        
        
      }}
    >
      <Pagination
        onChange={(e) => handlePageChange(e.target.textContent)}
        count={numOfPages}
        color="primary"
        hideNextButton
        hidePrevButton
        variant="outlined"
      />
   
      
    </div>
  )
}
