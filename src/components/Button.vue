<template>
  <button @click="onClick">
    <slot></slot>
  </button>
</template>
  
  <script>
export default {
  name: "ButtonComponent",
  props: {
    clickFunction: {
      type: Function,
      required: true,
    },
  },
  methods: {
    onClick() {
      this.clickFunction();
    },
  },
};
</script>
  
  <style scoped>
button {
  height: 3rem;
  background: rgb(2, 0, 36);
  background: var(--secondary-gradient);
  border: none;
  border-radius: 50%;
  color: var(--font-color);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 10px 2px;
  cursor: pointer;
  border-radius: 16px;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 10px rgba(69, 0, 106, 0.5);
}
</style>
  