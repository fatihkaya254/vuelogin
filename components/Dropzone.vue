<template lang="pug">
div
    .dropzone
        input(
            type="file"
            class="input-field"
            ref="file"
            @change="sendFile"
        )
        p(v-if="!uploading" class="call-to-action")
            | Dosyalarınızı Bu Alana Sürükleyin
        p(v-if="uploading" class="progressbar")
            | Dosyalarınızı Bu Alana Sürükleyin
</template>

<script>
import axios from "axios";
export default {
  name: "Dropzone",

  data() {
    return {
      file: "",
      message: "",
      error: false,
      uploading: false
    };
  },
  methods: {
    sendFile: async function() {
      const file = this.$refs.file.files[0];
      this.file = file;
      const formData = new FormData();
      formData.append("file", this.file);
      try {
        await axios
          .post(`${process.env.OUR_HOST}/dropzone`, formData)
          .then(res => {
            let profile = JSON.stringify(res.data.file);
            console.log(profile);
          });
      } catch (error) {
        console.log(error);
      }
    }
  },

  components: {}
};
</script>

<style lang="sass" scoped>

.dropzone
    min-height: 200px
    padding: 10px 10px
    position: relative
    cursor: pointer
    outline: 2px dashed grey
    outline-offset: -10px
    &:hover
        outline: 2px solid grey
    .call-to-action
        font-size: 1.2rem
        text-align: center
        padding: 72px
.input-field
    opacity: 0
    width: 100%
    height: 200px
    position: absolute
    cursor: pointer
</style>
