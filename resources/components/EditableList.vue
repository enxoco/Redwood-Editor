<template>
  <div class="form-group">
    <div class="input-group" v-for="(site, index) in info">
      <input v-model="site.value" />
      <button
        v-if="deleteButton[0] == true"
        class="button--red"
        @click="deleteFind(index)"
        v-text="deleteButton[1]"
      ></button>
    </div>
    <div class="button-group">
      <button
        v-if="addButton[0] === true"
        class="button--green"
        @click="addSite()"
        v-text="addButton[1]"
      ></button>
      <button class="button--green" @click="saveConfig">Save</button>
    </div>
  </div>
</template>
<style scoped>
.input-group {
  margin-bottom: 20px;
}
input {
  padding: 10px;
}
.form-group {
  display: flex;
  flex-direction: column;
}
</style>
<script>
const axios = require("axios").default;
import { mapFields } from "vuex-map-fields";

export default {
  data: function() {
    return {
      message: [],
      tempConfig: []
    };
  },
  props: ["info", "deleteButton", "addButton"],
  methods: {
    addSite: function() {
      this.$emit('updateConfig', { value: "" });

    },
    deleteFind: function(index) {
      this.info.splice(index, 1);
    },
    saveConfig: function() {
      this.$emit('saveConfig', true)
    }
  },
  mounted() {
    this.tempConfig.push(this.$store.state.directorylist.config);
  }
};
</script>