<template>
  <div class="playlistTracks">
    <h1 class="shine">Recommended Tracks</h1>
    <ButtonComponent class="unfollow" :clickFunction="unfollowPlaylist">
      Unfollow Playlist
    </ButtonComponent>
    <ButtonComponent class="go__back" :clickFunction="goBack">
      <i class="ri-arrow-left-line"></i>
    </ButtonComponent>
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
          console.log(response.data);
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

.go__back {
  position: absolute;
  left: 1%;
  top: 0;
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
  