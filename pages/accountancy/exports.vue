<template lang="pug">
div
    downloadexcel(
      class="btn"
      :fetch="fetchData()"
      :fields="json_fields"
      :before-generate="startDownload()"
      :before-finish="finishDownload()"
    )
</template>

<script>
import downloadexcel from "vue-json-excel";
export default {
  components: {
    downloadexcel
  },
  data() {
    return {
      json_fields: {
        "Complete name": "name",
        Date: "date"
      }
    };
  },
  methods: {
    async fetchData() {
      const response = await this.$axios.get(`${process.env.OUR_HOST}/purchases`);
      console.log(response);
      return response.data.holidays;
    },
    startDownload() {
      console.log("show loading");
    },
    finishDownload() {
      console.log("hide loading");
    }
  }
};
</script>
