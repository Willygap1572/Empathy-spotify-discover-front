<template>
  <div id="app">
    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
:root {
  --h1-font-size: 4rem;
  --h2-font-size: 2rem;
  --h3-font-size: 1.5rem;
  --normal-font-size: 1rem;

  --primary-color: #f21b6a;
  --secondary-color: #8c075e;
  --tertiary-color: #f2921d;
  --quaternary-color: #f2762e;
  --quinary-color: #f25e3d;

  --background-color: #363636;
  --background-color-2: #2b2b2b;

  --font-color: #f2f2f2;

  --small-font-weigt: 300;
  --normal-font-weight: 400;
  --bold-font-weight: 700;
  --bolder-font-weight: 900;

  --primary-gradient: linear-gradient(
    25deg,
    var(--quaternary-color) 0%,
    var(--tertiary-color) 20%,
    var(--secondary-color) 40%,
    var(--tertiary-color) 60%,
    var(--quaternary-color) 80%
  );
  --secondary-gradient: linear-gradient(
    25deg,
    var(--primary-color) 0%,
    var(--secondary-color) 5%,
    var(--tertiary-color) 85%,
    var(--quaternary-color) 98%,
    var(--quinary-color) 100%
  );

  @media screen and (max-width: 768px) {
    --h1-font-size: 3rem;
    --h2-font-size: 1.5rem;
    --h3-font-size: 1.2rem;
    --normal-font-size: 0.8rem;
  }

  @media screen and (max-width: 480px) {
    --h1-font-size: 2rem;
    --h2-font-size: 1.2rem;
    --h3-font-size: 1rem;
    --normal-font-size: 0.6rem;
  }
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}

#wrapper {
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

#app {
  padding: 0;
  margin: 0;
  height: max(100vh, 100%);
  width: 100vw;
  text-align: center;
  background-color: var(--background-color);
}

h1 {
  font-size: var(--h1-font-size);
}

h2 {
  font-size: var(--h2-font-size);
}

.router-link-exact-active {
  font-weight: bold;
}
</style>
