<template>
  <div class="exposure-sites">

    <h1>Exposure Sites</h1>

    <div id="map"></div>

    <!--Search Bar-->
    <div class="exposure-site-search-box">
        <!--Search Title-->
        <div class="exposre-site-search-title">
            Search
        </div> 
        <!--Search Bar-->
        <input class="exposure-site-search-bar" v-model="searchTermInput" @keyup="search" type="text">
    </div>

    <span v-if="isLoading == false">
        <span v-if="filteredSites.length !== 0">

            <table v-for="site in filteredSites"
                v-bind:key="site">
              <tr>
                <th>
                  <div class="exposure-title">
                    {{ site.suburb }}
                  </div>
                </th>
              </tr>
              <tr>
                <th>
                  <div class="exposure-content" style="margin-left: 1em;">
                  {{ site.siteName }}
                  <br>
                  {{ site.address }}
                  </div>
                </th>
                <th>
                  <div class="exposure-content">
                    {{ site.exposureDate }} {{ site.startTime }} - {{ site.endTime }}
                  </div>
                </th>
                <th>
                  <div class="exposure-content">
                    {{ site.notes }}
                  </div>
                </th>
                <th>
                  <div class="exposure-content" style="margin-right: 1em;">
                    {{ site.tier }}
                  </div>
                </th>
              </tr>

            </table>

        </span>
        <span v-else>
            <h3>There are no exposure sites</h3>
        </span>
    </span>
    <span v-else>
        <h3>Loading...</h3>
    </span>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import firebase from 'firebase';
import { Loader } from "@googlemaps/js-api-loader"

const loader = new Loader({
  apiKey: "AIzaSyBOBB95AsIaBmuQHl11apzo3Lw3WYAheX4",
  version: "weekly",
});

let map = '';
let googleObject = '';

loader.load().then((google) => {
    googleObject = google;
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat:  -37.81100320947774, lng: 145.062455385037 },
        zoom: 9
    });

});      

const isLoading = ref(true);
const searchTermInput = ref();
let exposureSites = [];
let filteredSites = [];

getExposureSites();

function getExposureSites() {
    firebase
        .database()
        .ref('exposure-sites')
        .get()
        .then(snapshot => {
            if (snapshot.exists()) {
                snapshot.forEach(snap => {
                    const exposureSite = snap.val();
                    exposureSites.push(exposureSite);
                    filteredSites.unshift(exposureSite);
                });

                isLoading.value = false;
                addExposureSitesToMap();
            }
            else {
                console.log('No data available');
            }
    })
    .catch(error => {
        console.error(error);
    });
}

function addExposureSitesToMap() {
    exposureSites.forEach(site => {
        new googleObject.maps.Marker({
            position: { lat: Number(site.lat), lng: Number(site.lng) },
            map: map
        });
    });
}

function search() {
    if (searchTermInput.value.trim() !== '') {
        isLoading.value = true;
        filteredSites.length = 0;

        const searchTerm = searchTermInput.value.trim();

        exposureSites.forEach(site => {
            if (site.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            site.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            site.suburb.toLowerCase().includes(searchTerm.toLowerCase())) {
                filteredSites.push(site);
            }
        });

        isLoading.value = false;
    }
    else {
        isLoading.value = true;
        filteredSites.length = 0;
        exposureSites.forEach(x => filteredSites.unshift(x));
        isLoading.value = false;
    }
}

</script>

<style scoped>
#map {
    height: 500px;
    margin-left: 1em;
    margin-right: 1em;
    min-width: 10vh;
}

.exposure-title {
    font-size: larger;
    margin-top: 1em;
    margin-left: 16px;
    text-align: left;
}

.exposure-content {
    text-align: left;
    font-weight: 500;
}

.exposre-site-search-title {
    margin-left: 0em;
    text-align: center;
    font-size: large;
    font-weight: 700;
    color: #000000;
}

.exposure-site-search-box {
    background-color:#ededee;
    margin-left: 1em;
    margin-right: 1em;
    display: grid;
    grid-template-columns: 1fr 4fr;
    align-items: center;
    margin-top: 1em;
}

.exposure-site-search-bar {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    margin-left: 0.5em;
    margin-right: 0.5em;

    border: none;
    font-size: large;
}

</style>