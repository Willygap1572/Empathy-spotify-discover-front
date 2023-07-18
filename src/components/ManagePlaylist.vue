<template>
  <div class="ManagePlaylist">
    <h1 class="shine">Manage Playlists</h1>
    <ButtonComponent class="go__back" :clickFunction="goBack">
        <i class="ri-arrow-left-line"></i>
    </ButtonComponent>
    <div class="playlist__container">
      <PlaylistInfo
        v-for="playlistId in playlistIds"
        :key="playlistId"
        :id="playlistId"
        @playlistSelected="playlistDetail"
        class="playlist"
      />
    </div>
  </div>
</template>
  
  <script>
import PlaylistInfo from "./PlaylistInfo.vue";
import axios from "axios";
import ButtonComponent from "./Button.vue";

export default {
  name: "PlaylistList",
  components: {
    PlaylistInfo,
    ButtonComponent,
  },
  data() {
    return {
      playlistIds: [],
    };
  },
  methods: {
    playlistDetail(playlistId) {
      this.$router.push({
        name: "PlaylistDetail",
        query: {
          playlistId,
        },
      });
    },
    getUserPlaylist() {
      axios
        .get("http://localhost:8080/user-playlists", {
          headers: { Authorization: "Bearer " + this.accessToken },
        })
        .then((response) => {
          this.$store.dispatch("setPlaylistIds", response.data);
          this.playlistIds = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goBack() {
      this.$router.push(
        {
          name: "Home",
        },
      );
    },
  },
  mounted() {
    this.accessToken = localStorage.getItem("accessToken");
    this.getUserPlaylist();
  },
};
</script>

  <style>
.playlist {
  width: 300px;
  height: 300px;
  margin: 1rem;
  cursor: pointer;
}

.playlist:hover {
  transform: scale(1.05);
  transition: transform 0.5s;
}



.playlist__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
  