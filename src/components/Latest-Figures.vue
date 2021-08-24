<template>
    <div :class="dynamicClass" @mouseover="expandLatestFigures" @mouseleave="closeLatestFigures">

        <!--Icon-->
        <img :class="lastestFiguresIconClass" 
        src="../assets/warning-256.png" width="12%">

        <!--Title-->
        <h4 :class="latestFiguresTitleClass">
            Latest Figures
        </h4>

        <span v-if="isLoading !== true">
            <span v-if="expanding === true">
                <span v-if="latestFigures.length !== 0">
                    <!--Expanded Content, hidden by default-->
                    <table 
                        :class="expandedContentClass"
                        v-for="figure in latestFigures"
                        v-bind:key="figure">

                        <tr>
                            <!--Current Date-->
                            <th style="padding-bottom: 1em;">{{ figure.date }}</th>
                        </tr>
                        <tr>
                            <!--COVID information-->
                            <th class="expanded-figure"><h1>{{ figure.newCases }}</h1><br> new cases</th>
                            <th class="expanded-figure"><h1>{{ figure.totalCases }}</h1><br> total cases</th>
                            <th class="expanded-figure"><h1>{{ figure.testsReceived }}</h1><br> tests received</th>
                        </tr>

                    </table>

                </span>
            </span>
        </span>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import firebase from 'firebase';

const isLoading = ref(true);
const dynamicClass = ref('latest-figures-box');
const expandedContentClass = ref('expanded-content')
const latestFiguresTitleClass = ref('latest-figures-title');
const latestFiguresIconClass = ref('latest-figures-icon');
const latestFigures = [];
const expanding = ref(false);

getLatestFigure();

function expandLatestFigures() {
    dynamicClass.value = 'latest-figures-box expand-latest-figures-box';
    expandedContentClass.value = 'expanded-content';
    latestFiguresTitleClass.value = 'latest-figures-title hide';
    latestFiguresIconClass.value = 'latest-figures-icon hide';
    expanding.value = true;
}

function closeLatestFigures() {
    dynamicClass.value = 'latest-figures-box';
    expandedContentClass.value = 'expanded-content';
    latestFiguresTitleClass.value = 'latest-figures-title'
    latestFiguresIconClass.value = 'latest-figures-icon';
    expanding.value = false;
}

function getLatestFigure() {
    firebase
        .database()
        .ref('latest-figures')
        .limitToLast(1)
        .get()
        .then(snapshot => {
            if (snapshot.exists()) {
                snapshot.forEach(snap => {

                    const latestFigure = snap.val();

                    latestFigures.push({
                        date: latestFigure.date,
                        newCases: latestFigure.newCases,
                        totalCases: latestFigure.totalCases,
                        testsReceived: latestFigure.testsReceived
                    });

                });

                isLoading.value = false;

            }
        })
        .catch(() => {
            console.log('There was an error getting the latest figures');
            isLoading.value = false;
        });
}

</script>

<style scoped>
.latest-figures-box {
    background-color: #AF272f;
    margin-top: 1em;
    margin-bottom: 1em;
    border-radius: 5px;
    height: 50px;
    width: 250px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: width 0.75s, height 0.75s;
    color: white;
}

.expand-latest-figures-box {
    width: 500px;
    height: 200px;
    transition: width 0.75s, height 0.75s;
}

.expanded-figure {
    padding-left: 1.5em;
    padding-right: 1.5em;
}

.expanded-figure h1 {
    margin: 0;
}

.latest-figures-title {
    text-align: center;
    color: white;
}

.latest-figures-icon {
    padding-right: 0.5em;
}

.hide {
    display: none;
}
</style>