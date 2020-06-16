<template>
  <div class="container">
    <div>
      <img src="/undraw_add_file2_gvbb.svg" height="200px" />
      <h1 class="title">Redwood Config editor</h1>
      <Status />
      <DirectoryList />


    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import DirectoryList from "~/components/DirectoryList.vue";
import Status from "~/components/Status.vue"
const axios = require("axios").default;

export default {
  components: {
    Logo,
    DirectoryList,
    Status
  },
  data() {
    return {
      redwoodStatus: null
    };
  },
  props: ['info'],
  mounted() {

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
