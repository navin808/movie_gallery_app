import { Badge, Fab } from '@mui/material'
import './SingleContent.css'
import { connect } from 'react-redux'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { addToFavourite, removeFromFavourite } from '../../actions/favourites'
import { img_300, unavailable } from '../../config/config'
import store from '../../store'
import ContentModal from '../ContentModal/ContentModal'

const SingleContent = (props) => {
  const { id, poster, title, date, media_type } = props

  var isFav = false
  props.favourites.some((item) => {
    if (item.id === id) {
      isFav = true
    }
  })

  const toggleFavourite = () => {
    isFav
      ? store.dispatch(
          removeFromFavourite({
            id,
            poster,
            title,
            date,
            media_type,
            
          })
        )
      : store.dispatch(
          addToFavourite({ id, poster, title, date, media_type })
        )
  }

  return (
    <>
      <ContentModal media_type={media_type} id={id}>
       

        <img
          className="poster"
          src={poster ? `${img_300}${poster}` : unavailable}
          alt={title}
        />
        <b
          className="title"
          style={{
            maxWidth: '100%',
            overflow: 'hidden',
            'white-space': 'nowrap',
            'text-overflow': 'ellipsis',
          }}
        >
          {title}
        </b>
        <span className="subTitle">
          {media_type === 'tv' ? 'TV Series' : 'Movie'}<br />
          <br/>
          <span className="subTitle">{date}</span>
        </span>
        <Badge
          badgeContent={
            <span className="fav">
            <Fab
              color={isFav ? 'error' : 'default'}
              size="small"
              marginLeft="-1250px"
              aria-label="like"
              onClick={(e) => {
                toggleFavourite()
                e.stopPropagation()
              }}
            >
              <FavoriteIcon />
            </Fab></span>
          }
        />
      </ContentModal>
    </>
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
  addToFavourite,
  removeFromFavourite,
})(SingleContent)
