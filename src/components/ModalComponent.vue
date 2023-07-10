<template>
  <div class="modal">
    <div class="modal-content">
      <h2 class="shine">Create New Playlist</h2>
      <ButtonComponent class="close" :clickFunction="close">
        X
      </ButtonComponent>
      <hr />
      <div class="playlist__name input">
        <label for="playlist-name">Playlist Name</label>
        <input
          id="playlist-name"
          v-model="playlistName"
          type="text"
          placeholder="Enter playlist name..."
        />
      </div>

      <div class="playlist__description input">
        <label for="description">Description</label>
        <input
          id="description"
          v-model="description"
          type="text"
          placeholder="Enter playlist description..."
        />
      </div>

      <div class="playlist__public input">
        <span class="switch">
          <label for="publics">Public</label>
          <ToggleButton
            class="toggle"
            v-model="publics"
            id="publics"
          ></ToggleButton>
        </span>
      </div>

      <div class="buttons">
        <ButtonComponent :clickFunction="submit">Accept</ButtonComponent>
      </div>
    </div>
  </div>
</template>
  
  <script>
import ButtonComponent from "./Button.vue";
import ToggleButton from "./ToggleButton.vue";
export default {
  name: "ModalComponent",
  data() {
    return {
      playlistName: "",
      description: "",
      publics: false,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    submit() {
      this.$emit("submit", {
        playlistName: this.playlistName,
        description: this.description,
        publics: this.publics,
      });
      this.playlistName = "";
      this.description = "";
      this.publics = false;
    },
  },
  components: {
    ButtonComponent,
    ToggleButton,
  },
};
</script>
  
  
  <style scoped>
.close {
  position: fixed;
  right: 10%;
  top: 25%;
  font-weight: bold;
  cursor: pointer;
}
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.toggle {
  margin: 1rem 0rem;
}

.modal-content {
  position: relative;
  background-color: var(--background-color-2);
  margin: 15% auto;
  padding: 20px;
  border-radius: 10px;
  border: 3px solid var(--background-color);
  width: 80%;
}

label {
  color: var(--primary-color);
  font-weight: bold;
  font-size: var(--h3-font-size);
  margin: 1rem;
}

.input {
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

hr {
  border: 1px solid var(--quinary-color);
}

input {
  width: 50%;
  padding: 12px 20px;
  margin: 8px 0;
  border: 1px solid var(--background-color);
  border-radius: 4px;
  box-sizing: border-box;
  background-color: var(--background-color-2);
  color: var(--font-color);
}

.switch {
  margin-top: 1rem;
}
</style>
  