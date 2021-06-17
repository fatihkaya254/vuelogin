<template lang="pug">
.serviceListContainer
    .serviceWrapper
        .service(v-if="where == 'everywhere' || where == 'group'")
            .title
                | Grup Dersler
            .image
                img(:src=" ourhost + '/1623829187137-60af68f37cec651040567312.jpg'"  v-show="this.$store.getters.userPic")
            .description
                | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            .button(@click="where = 'group'")
                | Detaylar
        .service(v-if="where == 'private' || where == 'everywhere'")
            .title
                | Özel Dersler
            .image
                img(:src=" ourhost + '/1623750685816-60af68f37cec651040567312.jpeg'"  v-show="this.$store.getters.userPic")
            .description
                | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            .button(@click="where = 'private'")
                | Detaylar
        .service(v-if="where == 'exam' || where == 'everywhere'")
            .title
                | Sınavlar
            .image
                img(:src=" ourhost + '/1623829187137-60af68f37cec651040567312.jpg'"  v-show="this.$store.getters.userPic")
            .description
                | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            .button(@click="where = 'exam'")
                | Detaylar
        .packageWrapper(v-if="where != 'everywhere'")
</template>

<script>

export default {
  name: "ServiceList",

  data() {
    return {
        where: "everywhere",
        ourhost:  process.env.OUR_URL,
    };
  },
  methods: {
    
  },

  components: {}
};
</script>

<style lang="sass" scoped>

.serviceListContainer
    text-align: center

.serviceWrapper
    max-width: 1320px
    background-color: red
    margin: auto

.packageWrapper
    height: 400px
    width: 56%
    margin: 2.5%
    float: left
    transition: all 0.3s ease
    border-radius: 1em
    background-color: white    

.service
    width: 28%
    height: 400px
    margin: 2.5%
    float: left
    transition: all 0.3s ease
    border-radius: 1em
    
    &:hover
        background-color: white    
.title
    margin-top: 12px
    font-weight: 500
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-size: 13pt
.image
    margin-top: 12px

    & img
        height: 150px
.description
    margin: 12px
    font-size: 11pt
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif

.button
    margin: auto
    margin-top: 25px
    padding-top: 3px 
    font-size: 11pt
    width: 120px
    height: 30px
    border: 0.75px solid black
    border-radius: 1em
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    cursor: pointer
    &:hover
        background-color: black
        color: white    


</style>
