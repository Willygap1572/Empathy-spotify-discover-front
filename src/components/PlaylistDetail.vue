<template>
  <div class="playlistTracks">
    <div class="playlist__header">
      <img :src="playlistImage" alt="PlaylistImage" />
      <div>
        <h1 class="playlist__title shine">
          {{ playlistName }}
        </h1>
        <h3 class="playlist__info">
          {{ playlistOwner }} • {{ playlistTracks.length }} tracks
        </h3>
        <p class="playlist__description">
          {{ playlistDescription }}
        </p>
      </div>
    </div>
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
          :isOwner="isOwner"
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
      username: "",
      playlistName: "",
      playlistDescription: "",
      playlistImage: "",
      playlistOwner: "",
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    addTracksToPlaylist(playlistId) {
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
      const playlistId = this.$route.query.playlistId;
      const accessToken = localStorage.getItem("accessToken");
      axios
        .delete(
          `http://localhost:8080/update-playlist/${playlistId}/${trackId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((response) => {
          this.playlistTracks = this.playlistTracks.filter(
            (track) => track !== trackId
          );
        })
        .catch((error) => {
          console.error(error);
        });
    },

    goBack() {
      this.$router.push({
        name: "Playlists",
      });
    },
    unfollowPlaylist() {
      const playlistId = this.$route.query.playlistId;

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
    getPlaylistInfo() {
      const playlistId = this.$route.query.playlistId;
      const accessToken = localStorage.getItem("accessToken");
      axios
        .get("https://api.spotify.com/v1/playlists/" + playlistId, {
          headers: { Authorization: "Bearer " + accessToken },
        })
        .then((response) => {
          this.playlistName = response.data.name;
          this.playlistOwner = response.data.owner.id;
          this.playlistImage = response.data.images[0].url;
          this.isOwner = (this.playlistOwner === this.username);
          this.playlistDescription = response.data.description;
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
    getUserInfo() {
      const accessToken = localStorage.getItem("accessToken");
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: { Authorization: "Bearer " + accessToken },
        })
        .then((response) => {
          this.username = response.data.id;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
  mounted() {
    const playlistId = this.$route.query.playlistId;
    this.getUserInfo()
    this.getPlaylistInfo();
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
  margin: 2rem;
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

.playlist__header {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: left;
  padding-left: 5rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  align-items: center;
  margin-top: 7rem;
  margin-bottom: 3rem;
  background-color: var(--background-color-2);
}

.playlist__header img {
  width: 250px;
  height: 250px;
}

.playlist__header div {
  text-align: left;
}

.playlist__header div h3{
  font-size: var(--h3-font-size);
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

</style>
  