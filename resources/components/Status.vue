<template>
  <p>
    Redwood Status:
    <span :class="serviceStatus === 'Online' ? 'online' : 'offline'">{{ serviceStatus }}</span>
  </p>
</template>
<script>
const axios = require("axios").default;

export default {
  data: function() {
    return {
      serviceStatus: "Offline"
    };
  },

  mounted() {
    axios.get("/api/redwood/status").then(response => {
      if (response.data.status === 200) {
        this.serviceStatus = "Online";
        return "Online";
      } else {
        this.serviceStatus = "Offline";
        return offline;
      }
    });
  }
};
</script>
<style>
.online {
  background: #2a9d8f;
  color: white;
  padding: 10px;
  border-radius: 10em;
}
.offline {
  background: #e76f51;
  color: white;
  padding: 10px;
  border-radius: 10em;
}
</style>