<template>
  <div class="playlistTracks">
    <h1 class="shine">Playlist Tracks</h1>
    <div class="go__back__container">
      <ButtonComponent class="go__back2" :clickFunction="goBack">
        <i class="ri-arrow-left-line"></i>
      </ButtonComponent>
      <ButtonComponent class="go__home" :clickFunction="goHome">
        <i class="ri-home-2-fill"></i>
      </ButtonComponent>
    </div>
    <ButtonComponent class="action__button" :clickFunction="unfollowPlaylist"
      >Unfollow Playlist</ButtonComponent
    >
    <div
      v-if="playlistTracks && playlistTracks.length"
      class="track__container"
    >
      <div v-for="track in playlistTracks" :key="track">
        <TrackInfo
          :id="track"
          @remove-track="removeTrack"
          class="track"
        ></TrackInfo>
      </div>
    </div>
    <div v-else class="no__track">No tracks in this playlist</div>
  </div>
</template>
  
  <script>
import TrackInfo from "./TrackInfo.vue";
import ButtonComponent from "./Button.vue";
import axios from "axios";

export default {
  name: "RecommendationsPage",
  data() {
    return {
      playlistTracks: [],
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    addTracksToPlaylist(playlistId) {
      console.log(playlistId);
      const accessToken = localStorage.getItem("accessToken");
      axios
        .get("http://localhost:8080/playlist-details/" + playlistId, {
          headers: { Authorization: "Bearer " + accessToken },
        })
        .then((response) => {
          this.playlistTracks = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    removeTrack(trackId) {
      console.log(trackId);
      console.log(this.playlistTracks);
    },
    goBack() {
      this.$router.push({
        name: "Playlists",
      });
    },
    unfollowPlaylist() {
      const playlistId = this.$route.query.playlistId;

      console.log(playlistId);
      const accessToken = localStorage.getItem("accessToken");
      axios
        .delete("http://localhost:8080/unfollow-playlist/" + playlistId, {
          headers: { Authorization: "Bearer " + accessToken },
        })
        .then((response) => {
          let playlistIds = this.$store.getters.getPlaylistIds;
          if (playlistIds) {
            playlistIds = playlistIds.filter((id) => id !== playlistId);
          }
          this.$router.push({
            name: "Playlists",
            query: {
              playlists: JSON.stringify(playlistIds),
            },
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    goHome() {
      this.$router.push({
        name: "Home",
      });
    },
  },
  mounted() {
    const playlistId = this.$route.query.playlistId;
    this.addTracksToPlaylist(playlistId);
  },
  components: {
    TrackInfo,
    ButtonComponent,
  },
};
</script>
  
  
  <style>
.playlistTracks {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.track__container {
  width: 95%;
  padding: 1px;
  background: var(--secondary-gradient);
}

.track {
  margin: 2px;
}

.go__back__container {
  position: absolute;
  gap: 1rem;
  display: flex;
  flex-direction: row;
  width: 95%;
}

.go__home {
  font-size: var(--h3-font-size);
  font-weight: bold;
  cursor: pointer;
}

.go__back2 {
  font-size: var(--h3-font-size);
  font-weight: bold;
  cursor: pointer;
}

.no__track {
  width: 90%;
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  justify-self: center;
  background: var(--primary-gradient);
  background-size: 200% 200%;
  background-position: 100% 100%;
}
</style>
  