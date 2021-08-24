<template>
    <div id="nav">
        <router-link class="nav-logo" to="/">COVID-19 VIC</router-link>

        <div class="nav-items">
            <router-link class="nav-item" to="/">Exposure Sites</router-link> |
            <router-link class="nav-item" to="/">Symptoms Checker</router-link> |
            <router-link class="nav-item" to="/">Check In</router-link> |
            <span v-if="loggedIn">
                <router-link class="nav-item" to="/">Dashboard</router-link>
            </span>
            <span v-else>
                <router-link class="nav-item" to="/">Login</router-link>
            </span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const loggedIn = ref(false);

</script>

<style scoped>
#nav {
  background-color: #0052c2;
  color: white;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.nav-items a {
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-logo {
  padding-left: 1em;
  display: block;
  font-size: 2em;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
  color: white;
  font-weight: bold;
  text-decoration: none;
}

.nav-item {
  padding: 1em;
}

/* .nav-items a.router-link-exact-active {
  color: #64abdb;
} */

#nav a:hover {
  color:#64abdb;
}

</style>
