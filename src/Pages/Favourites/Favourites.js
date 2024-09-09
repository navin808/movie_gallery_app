import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { loadFavourites } from '../../actions/favourites'
import SingleContent from '../../components/SingleContent/SingleContent'
import store from '../../store'
import { Grid } from '@mui/material'

const Favourites = ({ favourites }) => {
  useEffect(() => {
    store.dispatch(loadFavourites())
  }, [])
  return (
    <div>
      <span className="pageTitle">Your Favourites</span>

      <Grid
        container
        spacing={{ xs: 0, sm: 5, md: 18, lg: 4 }}
        columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
      >
        {favourites.map((item) => (
          <Grid item xs={6} sm={4} md={2.6} lg={2.4} key={item.id}>
            <SingleContent
              id={item.id}
              key={item.id}
              poster={item.poster}
              title={item.title}
              date={item.date}
              media_type={item.media_type}
              vote_average={item.vote_average}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

// mapping states to props to pass it to the component
const mapStateToProps = (state) => {
  return {
    favourites: state.favourites.favourites,
  }
}

// connecting mapStateToProps and action to the component
export default connect(mapStateToProps, {
  loadFavourites,
})(Favourites)
