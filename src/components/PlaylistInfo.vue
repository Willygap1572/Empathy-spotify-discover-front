<template>
  <div @click="emitClickEvent" class="PlaylistInfo">
    <div class="playlist__wrapper">
      <img :src="playlist.image" alt="playlist image" class="playlist__image" />
      <h2 class="playlist__name">{{ playlist.name }}</h2>
    </div>
  </div>
</template>

  
  <script>
import axios from "axios";

export default {
  name: "PlaylistInfo",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      playlist: {
        image: "",
        name: "",
      },
    };
  },
  methods: {
    emitClickEvent() {
    this.$emit('playlistSelected', this.id);
  },
    fetchPlaylistInfo() {
      const accessToken = localStorage.getItem("accessToken");
      axios
        .get(`https://api.spotify.com/v1/playlists/${this.id}`, {
          headers: { Authorization: "Bearer " + accessToken },
        })
        .then((response) => {
          this.playlist.image = response.data.images[0].url;
          this.playlist.name = response.data.name;
        })
        .catch((error) => console.error(error));
    },
  },
  mounted() {
    this.fetchPlaylistInfo();
  },
};
</script>

<style scoped>
.PlaylistInfo {
    display: flex;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
}

.playlist__image {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.playlist__name {
    position: absolute;
    z-index: 10;
    bottom: 0;
    width: 100%;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 1.5rem;
}
</style>

  