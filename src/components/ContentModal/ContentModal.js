import { useState, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import YouTubeIcon from '@mui/icons-material/YouTube'
import axios from 'axios'
import { img_500, unavailable, unavailableLandscape } from '../../config/config'
import Carousel from '../Carousel/Carousel'
import './ContentModal.css'

const styleModal = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const stylePaper = {
  zIndex: 100,
  width: '60%',
  height: '85%',
  backgroundColor: 'rgb(72, 100, 166)',
  border: '1px solid #282c34',
  borderRadius: 10,
  color: 'white',
  marginleft: '250px',
  // p: 4,
}
const ContentModal = ({ children, media_type, id }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [content, setContent] = useState()
  const [video, setVideo] = useState()

  useEffect(() => {
    fetchContent()
    fetchVideo()
  }, [])

  const fetchContent = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_MY_TMDB_API_KEY}&language=en-US`
    )

    setContent(data)
  }

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_MY_TMDB_API_KEY}&language=en-US`
    )

    setVideo(data.results[0]?.key)
  }

  return (
    <div>
      <div
        className="media"
        style={{ cursor: 'pointer' }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={styleModal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div style={stylePaper}>
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      '-----'
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>

                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    
                    color="warning"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </div>
  )
}

export default ContentModal
