<template>
  <div class="form-group">
    <div class="input-group" v-for="(site, index) in pageOfItems">
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
    <jw-pagination :items="info" @changePage="onChangePage"></jw-pagination>
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

export default {
  data() {
    return {
      pageOfItems: []
    };
  },
  props: ["info", "deleteButton", "addButton"],
  methods: {
    addSite: function() {
      this.$emit("updateConfig", { value: "" });
      
    },
    deleteFind: function(index) {
      this.info.splice(index, 1);
    },
    saveConfig: function() {
      this.$emit("saveConfig", true);
    },
    setPages() {
      let numberOfPages = Math.ceil(this.info.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.info.push(index);
      }
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    }
  }
};
</script>