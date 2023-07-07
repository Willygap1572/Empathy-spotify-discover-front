<template>
  <div class="HomePage">
    <h1>Bienvenido a mi página</h1>
    <p v-if="username">Bienvenido, {{ username }}</p>
    <button v-if="!accessToken" @click="login">Login</button>
    <button v-if="accessToken" @click="logout">Logout</button>
    <button v-if="accessToken" @click="getTopTracks()">Get Top Tracks</button>
  </div>
</template>
  
<script>
import axios from "axios";
export default {
  name: "HomePage",
  data() {
    return {
      username: "",
      accessToken: "",
    };
  },
  methods: {
    login() {
      window.location.href =
        "http://localhost:8080/oauth2/authorization/spotify";
    },
    logout() {
      this.username = "";
      this.accessToken = "";
      localStorage.removeItem("accessToken");
    },
    getTopTracks() {
      axios
        .get("http://localhost:8080/audio-features", {
          headers: { Authorization: "Bearer " + this.accessToken },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    exchangeCodeForToken(code) {
      axios
        .post("http://localhost:8080/exchange", { code: code })
        .then((response) => {
          // Guarda el token de acceso en el almacenamiento local o en el estado de la aplicación
          console.log(response.data.access_token);
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
          this.username = response.data.display_name; // Almacena el nombre de usuario
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
};
</script>





  <style>
.HomePage {
  text-align: center;
  padding: 20px;
}

.logo {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}

h1 {
  margin-bottom: 20px;
}
</style>
  