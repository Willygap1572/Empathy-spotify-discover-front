<template>
  <div>
    <h1>List of Elements</h1>
    <ul>
      <li v-for="element in elements" :key="element.id">
        {{ element }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      elements: []
    };
  },
  mounted() {
    this.fetchElements();
  },
  methods: {
    fetchElements() {
      axios.get('http://localhost:8080/searchDocument')
        .then(response => {
          this.elements = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style>
</style>
