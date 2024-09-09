import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchTrending } from '../../actions/trending'
import { loadFavourites } from '../../actions/favourites'
import CustomPagination from '../../components/Pagination/CustomPagination'
import SingleContent from '../../components/SingleContent/SingleContent'
import store from '../../store'
import { Grid } from '@mui/material'


const Trending = ({ trendings }) => {
  const [page, setPage] = useState(1)

  useEffect(() => {
    store.dispatch(loadFavourites())
  }, [])

  useEffect(() => {
    store.dispatch(fetchTrending(page))
  }, [page])

  return (
    <div>
      
      <span className="pageTitle"><b>HOT MOVIES OF THE DAY</b></span>

      <Grid
        container
        disableGutters
        spacing={{ xs: 0, sm: 5, md: 18, lg: 4 }}
        columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
        
      >
        {'results' in trendings &&
          trendings.results.map((item) => (
            <Grid item xs={6} sm={4} md={2.6} lg={2.4} key={item.id}>
              <SingleContent
                id={item.id}
                key={item.id}
                poster={item.poster_path}
                title={item.title || item.name}
                date={item.first_air_date || item.release_date}
                media_type={item.media_type}
                vote_average={item.vote_average}
              />
            </Grid>
          ))}
      </Grid>

      {trendings.total_pages > 1 && (
        <CustomPagination
          setPage={setPage}
          numOfPages={trendings.total_pages}
        />
      )}
      
    </div>
    
  )
}

// mapping states to props to pass it to the component
const mapStateToProps = (state) => {
  return {
    trendings: state.trending.trendings,
  }
}

// connecting mapStateToProps and action to the component
export default connect(mapStateToProps, {
  fetchTrending,
  loadFavourites,
})(Trending)
