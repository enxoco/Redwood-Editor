<template>
  <div class="form-group">
    <div class="field-group">
      <label>Enter the server address and port number</label>
      <input v-model="serverAddress" placeholder="eg: 192.168.10.1:6502" />
    </div>
    <small>This will be used for various Redwood operations such as verifying PAC file and checking server status.</small>
    <div class="field-group">
      <label>Enter the directory where your Redwood category lists are stored</label>
      <input v-model="categoryDirectory" placeholder="eg: /etc/redwood/categories" />
    </div>
    <button class="button--green" @click="saveSettings">Continue</button>
  </div>
</template>
<script>
const axios = require("axios").default;

export default {
  data: function() {
    return {
      serverAddress: "",
      configDirectory: "",
      categoryDirectory: ""
    };
  },
  methods: {
    saveSettings() {
      axios
        .post("/api/redwood/setup", {
          serverAddress: this.serverAddress,
          categoryDirectory: this.categoryDirectory
        })
        .then(response => console.log(response.data.updated));
    }
  }
};
</script>