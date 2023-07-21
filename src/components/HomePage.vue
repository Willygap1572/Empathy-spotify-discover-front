<template>
  <div class="HomePage">
    <h1 class="shine title">Spotify Discover</h1>
    <ButtonComponent
      v-if="accessToken"
      class="log__button"
      :clickFunction="logout"
    >
      <i class="ri-logout-box-line"></i>
    </ButtonComponent>
    <ButtonComponent
      class="log__button"
      v-if="!accessToken"
      :clickFunction="login"
    >
      Login
    </ButtonComponent>
    <Section v-if="accessToken" class="container__user">
      <h3 v-if="username" class="welcome__title">
        Welcome <span class="shine shine__name">{{ username }}</span>
      </h3>
      <div class="user__information">
        <div class="photo__container">
          <div class="welcome__photo" id="welcome-photo">
            <ProfilePhoto v-if="userphoto" :userphoto="userphoto" />
          </div>
        </div>

        <RadarChart v-if="features" :features="features"></RadarChart>
      </div>
    </Section>
    <ButtonComponent
      class="action__button"
      v-if="accessToken"
      :clickFunction="getRecommendedTracks"
    >
      Get Recommendation
    </ButtonComponent>
    <ButtonComponent
      class="action__button"
      v-if="accessToken"
      :clickFunction="getUserPlaylist"
    >
      Manage Playlist
    </ButtonComponent>
    <section class="container__homepage">
      <img src="https://static.vecteezy.com/system/resources/previews/016/639/986/original/spotify-3d-icon-free-png.png" alt="Spotify logo">
      <p>
        Welcome to SpotifyDiscover, the ultimate playlist management and song
        recommendation app! With SpotifyDiscover, you can take control of your
        music experience and explore an endless world of music tailored just for
        you. Our app empowers you to curate and organize your playlists
        effortlessly. Whether you're creating a playlist for a workout session,
        a road trip, or simply to set the mood, SpotifyDiscover provides
        intuitive tools that make playlist management a breeze. Add, reorder,
        and delete songs with ease, and watch your playlists come to life. But
        we don't stop at just managing your playlists. SpotifyDiscover takes
        your music discovery to the next level by offering personalized song
        recommendations based on your unique taste. Our smart recommendation
        algorithms analyze your listening habits, genre preferences, and even
        the songs you've liked, and present you with a diverse selection of
        songs that you're bound to love. Discover new artists, explore different
        genres, and expand your musical horizons like never before.
      </p>
    </section>
  </div>
</template>
  
<script>
import axios from "axios";
import ButtonComponent from "./Button.vue";
import ProfilePhoto from "./ProfilePhoto.vue";
import router from "../router/router.js";
import RadarChart from "./Radar/RadarChart.vue";

export default {
  name: "HomePage",
  data() {
    return {
      features: null,
    };
  },
  watch: {
    accessToken: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.fetchChartData();
        }
      },
    },
  },
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

    getUserPlaylist() {
      router.push({
        name: "Playlists",
      });
    },

    fetchChartData() {
      axios
        .get("http://localhost:8080/likelihood", {
          headers: { Authorization: "Bearer " + this.accessToken },
        })
        .then((response) => {
          delete response.data.explicit;
          delete response.data.column1;
          delete response.data.popularity;
          delete response.data.mode;
          delete response.data.key;
          delete response.data.id;
          delete response.data.duration_ms;
          delete response.data.tempo;
          delete response.data.valence;
          delete response.data.loudness;
          delete response.data.instrumentalness;
          this.features = response.data;
        })
        .catch((error) => {
          this.logout();
          console.error(error);
        });
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
          console.error(error);
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
          console.error(error);
        });
    },
    getUserInfo(accessToken) {
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: { Authorization: "Bearer " + accessToken },
        })
        .then((response) => {
          const name = response.data.uri.split(":")[2];
          this.$store.dispatch("setUsername", name);
          try {
            this.$store.dispatch("setUserphoto", response.data.images[1].url);
          } catch (error) {
            this.$store.dispatch(
              "setUserphoto",
              "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1024px-Windows_10_Default_Profile_Picture.svg.png"
            );
          }
          this.username = name;
          this.userphoto = this.$store.getters.getUserphoto;
        })
        .catch((error) => {
          this.logout();
          console.error(error);
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
    RadarChart,
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
  padding: 0px;
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
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    width: 250px;
    height: 250px;
  }

  @media screen and (max-width: 480px) {
    width: 200px;
    height: 200px;
  }
}

.photo__container {
  display: flex;
  position: relative;
  height: 500px;
  width: 500px;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    height: 300px;
    width: 300px;
  }

  @media screen and (max-width: 480px) {
    height: 200px;
    width: 200px;
  }
}

.user__information {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
}

.container__user {
  padding-block: 20px;
  width: 100%;
  background-color: var(--background-color-2);

  @media screen and (max-width: 425px) {
    width: auto;
  }
}

.radarChart {
  justify-content: center;
  align-items: center;
}

.log__button {
  font-size: var(--h3-font-size);
  top: 3.2rem;
  right: 2rem;
  position: absolute;

  @media screen and (max-width: 768px) {
    top: 1.8rem;
    right: 1rem;
  }

  @media screen and (max-width: 480px) {
    top: 0.5rem;
    right: 0.5rem;
  }

  @media screen and (max-width: 380px) {
    top: 0.5rem;
    right: 0.2rem;
  }
}

.legend__info {
  position: absolute;
}

.action__button {
  font-size: var(--normal-font-size);
}

.container__homepage{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  padding: 5rem;
  color: var(--font-color);

  @media screen and (max-width: 950px) {
    padding: 2rem;
    flex-direction: column;
  }
}

.container__homepage img{
  width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
  transform: scaleX(-1);

  @media screen and (max-width: 950px) {
    width: 300px;
    height: 300px;
  }

  @media screen and (max-width: 480px) {
    width: 200px;
    height: 200px;
  }
}

.container__homepage p{
  padding-top: 4rem;

  font-size: 20px;
  font-weight: var(--bold-font-weight);
  color: var(--font-color);
  text-align: right;

  @media screen and (max-width: 1180px) {
    font-size: var(--normal-font-size);
  }

  @media screen and (max-width: 950px) {
    padding: 0;
    text-align: justify;
  }
}
</style>