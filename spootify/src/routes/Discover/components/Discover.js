import React, { Component } from 'react'
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock'
import '../styles/_discover.scss'
import config from '../../../config'
import {
  getAccessToken,
  getNewReleased,
  getFeaturedPlaylist,
  getCategories,
} from '../../../apis/spotify'

export default class Discover extends Component {
  constructor() {
    super()

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
      accessToken: '',
    }
  }

  componentDidMount() {
    const { clientId, clientSecret } = config.api
    getAccessToken({ id: clientId, secret: clientSecret }).then(res => {
      const { access_token } = res.data
      this.setState({ accessToken: access_token })
    })
  }

  isListsEmpty = state => {
    return (
      !state.newReleases.length &&
      !state.playlists.length &&
      !state.categories.length
    )
  }

  initLists = () => {
    Promise.all([
      getNewReleased(this.state.accessToken),
      getFeaturedPlaylist(this.state.accessToken),
      getCategories(this.state.accessToken),
    ])
      .then(([newReleaseRes, featuredPlaylistRes, categoriesRes]) => {
        // console.log(newReleaseRes)
        const { albums } = newReleaseRes.data
        const { playlists } = featuredPlaylistRes.data
        const { categories } = categoriesRes.data

        const newStates = {
          ...(albums?.items?.length && { newReleases: albums.items }),
          ...(playlists?.items?.length && { playlists: playlists.items }),
          ...(categories?.items?.length && { categories: categories.items }),
        }

        this.setState(newStates)
      })
      .catch(err => {
        // handle error
      })
  }

  componentDidUpdate(prevProps, prevStates) {
    if (this.state.accessToken && this.isListsEmpty(prevStates)) {
      this.initLists()
    }
  }

  render() {
    const { newReleases, playlists, categories } = this.state

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    )
  }
}
