import React, { useState, useEffect } from 'react'
import { Button, Tab, Tabs, TextField, Grid } from '@mui/material'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search'
import SingleContent from '../../components/SingleContent/SingleContent'
import CustomPagination from '../../components/Pagination/CustomPagination'
import store from '../../store'
import { loadFavourites } from '../../actions/favourites'
import { connect } from 'react-redux'
const Search = () => {
  const [type, setType] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [isSearched, setIsSearched] = useState(false)
  const [page, setPage] = useState(1)
  const [content, setContent] = useState([])
  const [numOfPages, setNumOfPages] = useState()

  useEffect(() => {
    store.dispatch(loadFavourites())
  }, [])

  useEffect(() => {
    window.scroll(0, 0)
    fetchSearch()
  }, [type, page])

  const fetchSearch = async () => {
    searchText !== '' && setIsSearched(true)
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=${
          process.env.REACT_APP_MY_TMDB_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      )
      setContent(data.results)
      setNumOfPages(data.total_pages)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          margin: '15px 0',
        }}
      >
        <TextField
          style={{ flex: 1 }}
          className="searchBox"
          label="Search"
          variant="filled"
          color="primary"
          fontSize="20px"
          onKeyDown={(event) => {
            event.key === 'Enter' && event.target.value !== '' && fetchSearch()
            setSearchText(event.target.value)
            isSearched && setIsSearched(false)
          }}
        />
        <Button
          onClick={fetchSearch}
          variant="contained"
          style={{ marginLeft: 10 }}
        >
          <SearchIcon fontSize="large" />
        </Button>
      </div>
      {/* <Tabs
        value={type}
        indicatorColor="dark"
        onChange={(event, newValue) => {
          setType(newValue)
          setPage(1)
        }}
        style={{ paddingBottom: 5 }}
        aria-label="disabled tabs example"
      >
        <Tab style={{ width: '100%', color: 'black', fontSize:"20px" ,fontWeight:"bolder"}} label="Search Movies" />
        <Tab
          style={{ width: '50%', color: 'black' , fontSize:"20px" ,fontWeight:"bolder" }}
          label="Search TV Series"
        />
      </Tabs> */}
      <div className="trending">
        <Grid
          container
          spacing={{ xs: 0, sm: 5, md: 18, lg: 4 }}
          columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
        >
          {content.length > 0 &&
            content.map((item) => (
              <Grid item xs={6} sm={4} md={2.6} lg={2.4} key={item.id}>
                <SingleContent
                  key={item.id}
                  id={item.id}
                  poster={item.poster_path}
                  title={item.title || item.name}
                  date={item.first_air_date || item.release_date}
                  media_type={type ? 'tv' : 'movie'}
                  vote_average={item.vote_average}
                />
              </Grid>
            ))}
        </Grid>

        {!isSearched &&
          (type ? (
            <h2 style={{ color: 'black' }}></h2>
          ) : (
            <h2 style={{ color: 'black' }}></h2>
          ))}

        {isSearched &&
          content.length < 1 &&
          (type ? (
            <h2 style={{ color: 'black' }}>No Series Found</h2>
          ) : (
            <h2 style={{ color: 'black' }}>No Movies Found</h2>
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  )
}

// mapping states to props to pass it to the component
const mapStateToProps = (state) => {
  return {}
}

// connecting mapStateToProps and action to the component
export default connect(mapStateToProps, {
  loadFavourites,
})(Search)
