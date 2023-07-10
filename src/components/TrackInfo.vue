<template>
    <div class="TrackInfo">
      <div v-if="loading">Cargando...</div>
      <div v-else-if="error">Ha ocurrido un error al cargar los datos.</div>
      <div v-else class="container">
        <div class="track-info">
          <img :src="trackData.imageUrl" :alt="trackData.name" />
          <div class="info">
            <a href="#" class="track__name shine__track__name">{{ trackData.name }}</a>
            <br>
            <a href="#" class="track__author">{{ trackData.artists.join(', ') }}</a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'TrackInfo',
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        loading: true,
        error: false,
        trackData: {
          name: '',
          artists: [],
          imageUrl: ''
        }
      };
    },
    mounted() {
      this.fetchTrackData();
    },
    methods: {
      fetchTrackData() {
        const accessToken = localStorage.getItem('accessToken');
        axios.get('https://api.spotify.com/v1/tracks/' + this.id, {
          headers: { Authorization: "Bearer " + accessToken },
        })
          .then(response => {
            this.trackData.name = response.data.name;
            this.trackData.artists = response.data.artists.map(artist => artist.name);
            this.trackData.imageUrl = response.data.album.images[0].url;
            this.loading = false;
          })
          .catch(error => {
            console.error(error);
            this.loading = false;
            this.error = true;
          });
      }
    }
  };
  </script>
  
  <style>

  .TrackInfo {
    width: 80rem;
    border: 1px solid rgba(0, 0, 0, 0);
    height: 70px;
    display: flex;
    background-color: var(--background-color-2);
    align-content: center;
  }

  .track__name,
  .track__author {
    margin: 0;
    margin-left: 1rem;
  }

  .track__name {
    font-size: 1.2rem;
    font-weight: bold;
  }

  

  .track__author {
    font-size: 0.8rem;
    font-weight: 100;
    color: var(--font-color);
  }

  .shine__track__name {
    background: var(--secondary-gradient);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.2s ease-in-out;
  }

  .shine__track__name:hover{
    background-position: 50%;

  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .track-info {
    padding-left: 1rem;
    position: relative;
    display: flex;
    width: 100vw;
    row-gap: 1rem;
    text-align: left;
    align-items: center;
  }
  .track-info img {
    justify-content: center;
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 10px;
  }


  </style>
  