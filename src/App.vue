<template>
  <NavBar />

  <LatestFigures />

  <div class="container">
    <router-view />
  </div>

  <Footer />
</template>

<script setup>
import Footer from "@/components/Footer.vue";
import LatestFigures from "@/components/Latest-Figures.vue";
import NavBar from "@/components/Nav-Bar.vue";

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.big-button {
  background-color: #0f53af;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: medium;
  font-weight: bold;
  padding-left: 1em;
  padding-right: 1em;
  height: 35px;
  margin-top: 1em;
  width: 270px;
}

.big-button:hover {
  background-color: #5c90d8;
}

.small-button {
  width: 80px;
}

body {
  margin: 0;
  background-color: #dadada;
}

.container {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1.5em;
    width: 500px;
    height: fit-content;
    padding-bottom: 1em;
    background-color: white;
    min-height: 65vh;
}

h1 {
  padding-top: 0.5em;
}

</style>
