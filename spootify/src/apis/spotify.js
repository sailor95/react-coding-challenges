import axios from 'axios'

export const getAccessToken = ({ id, secret }) =>
  axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        Authorization:
          'Basic ' + new Buffer(id + ':' + secret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      responseType: 'json',
    }
  )

export const getNewReleased = token =>
  axios.get('https://api.spotify.com/v1/browse/new-releases', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

export const getFeaturedPlaylist = token =>
  axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

export const getCategories = token =>
  axios.get('https://api.spotify.com/v1/browse/categories', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
