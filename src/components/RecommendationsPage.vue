<template>
  <div class="RecommendedTracks">
    <h1 class="shine">Recommended Tracks</h1>
    <ButtonComponent class="go__back" :clickFunction="goBack"> X </ButtonComponent>
    <ButtonComponent :clickFunction="openModal"
      >Create Playlist</ButtonComponent
    >
    <ModalComponent
      v-if="showModal"
      @close="showModal = false"
      @submit="createPlaylist"
    ></ModalComponent>
    <div class="track__container">
      <div v-for="track in recommendedTracks" :key="track.id">
        <TrackInfo :id="track" class="track"></TrackInfo>
      </div>
    </div>
  </div>
</template>

<script>
import TrackInfo from "./TrackInfo.vue";
import ButtonComponent from "./Button.vue";
import ModalComponent from "./ModalComponent.vue";
import axios from "axios";

export default {
  name: "RecommendationsPage",
  data() {
    return {
      recommendedTracks: [],
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    addTracksToPlaylist(playlistId) {
      const accessToken = this.$store.state.accessToken;
      const ids = this.$store.state.recommendedTracks;
      const ids_string = ids.map((id) => "spotify:track:" + id);
      axios
        .post(
          "https://api.spotify.com/v1/playlists/" + playlistId + "/tracks",
          {
            uris: ids_string,
            position: 0,
          },
          {
            headers: { Authorization: "Bearer " + accessToken },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    createPlaylist({ playlistName, description, publics }) {
      this.showModal = false;
      const accessToken = localStorage.getItem("accessToken");
      const username = this.$store.state.username;
      axios
        .post(
          "https://api.spotify.com/v1/users/" + username + "/playlists",
          {
            name: playlistName,
            description: description,
            public: publics,
          },
          {
            headers: { Authorization: "Bearer " + accessToken },
          }
        )
        .then((response) => {
          const playlistId = response.data.id;
          this.addTracksToPlaylist(playlistId);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    const recommendedTracks = this.$route.query.recommendedTracks;
    if (recommendedTracks) {
      this.recommendedTracks = JSON.parse(recommendedTracks);
    }
  },
  components: {
    TrackInfo,
    ButtonComponent,
    ModalComponent,
  },
};
</script>

<style>
.RecommendedTracks {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.track__container {
  padding: 1px;
  background: var(--secondary-gradient);
}

.track {
  margin: 2px;
}

.go__back {
  position: fixed;
  left: 1%;
  top: 0;
  font-weight: bold;
  cursor: pointer;
}
</style>
