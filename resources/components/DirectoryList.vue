<template>
  <div class="select-div">
    <h2>Category</h2>
    <v-select :options="directoryList" v-model="selectedCategory" @input="setSelectedCategory"></v-select>
    <h2>File</h2>
    <v-select :options="fileList" v-model="selectedFile" @input="setselectedFile"></v-select>
    <EditableList
      v-if="config.length != 0"
      :info="config"
      :deleteButton="[true, 'Delete Me']"
      :addButton="[true, 'Add New Site']"
      @updateConfig="config.push({value: ''})"
      @saveConfig="saveConfig()"
    />

  </div>
</template>
<script>
import Vue from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
Vue.component("v-select", vSelect);
const axios = require("axios").default;
import { mapMutations } from "vuex";
import EditableList from "~/components/EditableList.vue";

export default {
  components: {
    EditableList
  },
  data: function() {
    return {
      directoryList: [],
      fileList: [],
      defaultCategory: 'Please select a category to continue',
      defaultFile: 'Please select a file to continue',
      selectedCategory: null,
      selectedFile: null,
      config: []
    };
  },
  computed() {
    if (this.selectedFile == null) {
      this.config = [];
    }
  },
  mounted() {
    this.selectedCategory = this.defaultCategory
    this.selectedFile = this.defaultFile
    axios.get("/api/list").then(response => {
      this.directoryList = response.data;
    });
  },
  methods: {
    updateConfig(e) {
      this.info.push(e);
      window.scrollTo(0,document.body.scrollHeight);

    },
    setSelectedCategory() {
      if (this.selectedCategory == null) {
    this.selectedCategory = this.defaultCategory
            this.config = [];
      } else {
        axios
          .get("/api/list/" + this.selectedCategory)
          .then(response => {
        
            this.config = [];
            this.fileList = response.data;
          });
      }
    },
    setselectedFile() {
      if (this.selectedFile == null) {
    this.selectedFile = this.defaultFile
            this.config = [];
      } else {
        axios
          .get(
            "/api/config/" +
              this.selectedCategory +
              "/" +
              this.selectedFile
          )
          .then(response => {
              this.config = []
            response.data.map(data => {
              if (data.value != "") {
                this.config.push(data);
              }
            });
          });
      }
    },
    saveConfig() {
      let currentObj = this;
      axios
        .post(
          "/api/config/" +
            this.selectedCategory +
            "/" +
            this.selectedFile,
          {
            sites: currentObj.config
          }
        )
        .then(function(response) {
          currentObj.config = response.data;
        })
        .catch(function(error) {
          currentObj.config = error;
        });
    }
  }
};
</script>