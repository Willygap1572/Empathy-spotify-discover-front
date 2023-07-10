<template>
  <div class="HomePage">
    <h1 class="shine title">Spotify Discover</h1>
    <ButtonComponent v-if="accessToken" :clickFunction="logout">
      Logout
    </ButtonComponent>
    <ButtonComponent v-if="!accessToken" :clickFunction="login">
      Login
    </ButtonComponent>
    <h3 v-if="username" class="welcome__title">
      Welcome <span class="shine shine__name">{{ username }}</span>
    </h3>
    <div class="welcome__photo" id="welcome-photo">
      <ProfilePhoto v-if="userphoto" :userphoto="userphoto" />
    </div>
    <ButtonComponent v-if="accessToken" :clickFunction="getRecommendedTracks">
      Get Recommendation
    </ButtonComponent>
  </div>
</template>
  
<script>
import axios from "axios";
import ButtonComponent from "./Button.vue";
import ProfilePhoto from "./ProfilePhoto.vue";
import router from "../router/router.js";

export default {
  name: "HomePage",
  computed: {
    username: {
      get() {
        return this.$store.state.username;
      },
      set(value) {
        this.$store.dispatch("setUsername", value);
      },
    },
    accessToken: {
      get() {
        return this.$store.state.accessToken;
      },
      set(value) {
        this.$store.dispatch("setAccessToken", value);
      },
    },
    userphoto: {
      get() {
        return this.$store.state.userphoto;
      },
      set(value) {
        this.$store.dispatch("setUserphoto", value);
      },
    },
  },
  methods: {
    login() {
      window.location.href =
        "http://localhost:8080/oauth2/authorization/spotify";
    },
    logout() {
      this.username = "";
      this.accessToken = "";
      this.userphoto = "";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      localStorage.removeItem("userphoto");
    },
    getRecommendedTracks() {
      axios
        .get("http://localhost:8080/filteredTracks", {
          headers: { Authorization: "Bearer " + this.accessToken },
        })
        .then((response) => {
          response.data.sort((a, b) => (a.popularity < b.popularity ? 1 : -1));
          this.$store.dispatch("setRecommendedTracks", response.data);
          router.push({
            name: "Recommendations",
            query: { recommendedTracks: JSON.stringify(response.data) },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    exchangeCodeForToken(code) {
      axios
        .post("http://localhost:8080/exchange", { code: code })
        .then((response) => {
          this.accessToken = response.data.access_token;
          localStorage.setItem("accessToken", response.data.access_token);
          this.getUserInfo(response.data.access_token);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUserInfo(accessToken) {
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: { Authorization: "Bearer " + accessToken },
        })
        .then((response) => {
          this.$store.dispatch("setUsername", response.data.display_name);
          this.$store.dispatch("setUserphoto", response.data.images[1].url);
          this.username = response.data.display_name;
          this.userphoto = response.data.images[1].url;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLikelyhood(accessToken) {
      axios
        .get("https:localhost:8080/likelyhood", {
          headers: { Authorization: "Bearer " + accessToken },
        })
        .then((response) => {
          this.username = response.data.display_name;
          this.userphoto = response.data.images[1].url;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const localToken = localStorage.getItem("accessToken");
    if (localToken) {
      this.accessToken = localToken;
      this.getUserInfo(localToken);
    }
    if (code && !localToken) {
      this.exchangeCodeForToken(code);
    }
  },
  components: {
    ButtonComponent,
    ProfilePhoto,
  },
};
</script>

<style>
.title {
  font-size: var(--h1-font-size);
  margin-bottom: 20px;
}

.HomePage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  color: var(--font-color);
}

.shine {
  background: var(--primary-gradient);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 10s linear infinite;
}

.shine__name {
  font-size: var(--h2-font-size);
}

h1 {
  margin-bottom: 20px;
}

.welcome__photo {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>