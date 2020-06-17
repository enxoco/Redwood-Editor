<template>
  <div class="container">
    <div>
      <img src="/undraw_add_file2_gvbb.svg" height="200px" />
      <h3 class="title">Redwood Config editor</h3>
      <div v-if="initialSetupCompleted">
      <Status />
      <DirectoryList />
      </div>
      <div v-else-if="setupStarted === false">
        <h3>It looks like this is your first time using the Redwood configuration tool.</h3>
        <p>Before we get started we need to know a few things about your configuration</p>
        <button class="button--green" @click="initialSetup">Setup</button>
      </div>
      <div v-else-if="setupStarted">
        <Setup />
      </div>

    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import DirectoryList from "~/components/DirectoryList.vue";
import Status from "~/components/Status.vue"
import Setup from "~/components/Setup.vue"
const axios = require("axios").default;

export default {
  components: {
    Logo,
    DirectoryList,
    Status,
    Setup
  },
  data() {
    return {
      redwoodStatus: null,
      initialSetupCompleted: false,
      setupStarted: false
    };
  },
  props: ['info'],
  mounted() {
    axios.get('/api/redwood/setup')
      .then(response => this.initialSetupCompleted = response.data.status)
  },
  methods: {
    initialSetup () {
      return this.setupStarted = true
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
