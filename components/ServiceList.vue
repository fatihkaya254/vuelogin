<template lang="pug">
.serviceListContainer
    .serviceWrapper
        .service(v-if="where == 'everywhere' || where == 'group'")
            .title
                | Grup Dersler
            .image
                img(src="../assets/1627295589115-60fe8e1cab5d0c361cf39509.jpg")
            .description
                | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            .button(@click="openAndClose('group')")
                |  {{ openclose }}
        .service(v-if="where == 'private' || where == 'everywhere'")
            .title
                | Özel Dersler
            .image
                img(src="../assets/1627295591933-60fe8e1cab5d0c361cf39509.jpg")
            .description
                | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            .button(@click="openAndClose('private')")
                |  {{ openclose }}
        .service(v-if="where == 'exam' || where == 'everywhere'")
            .title
                | Sınavlar
            .image
                img(src="../assets/1627295593645-60fe8e1cab5d0c361cf39509.jpg")
            .description
                | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            .button(@click="openAndClose('exam')")
                |  {{ openclose }}
        .packageWrapper(v-if="where != 'everywhere'")
            .packages(v-for="onePackage in package()" v-if="onePackage.scope == where")
                | {{ onePackage.name }}
                .quota(v-if="onePackage.classroomQuota != 1")
                    | {{ onePackage.classroomQuota }}
                .packageDescription
                    | {{ onePackage.description }}
                .fee
                    | {{ onePackage.fee }}₺
                .packageButton(@click="selectPackage(onePackage._id)")
                    | İncele
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ServiceList",

  data() {
    return {
      where: "everywhere",
      ourhost: process.env.OUR_URL,
      openclose: "Detaylar"
    };
  },
  methods: {
    ...mapActions("economics", ["getPackages", "setLockedPackage"]),
    ...mapGetters("economics", ["package"]),
    ...mapActions(["setPackagePop"]),
    ...mapGetters(["getPackagePop"]),
    selectPackage(selectedPackage) {
      this.setLockedPackage(selectedPackage);
      this.setPackagePop(true);
    },
    openAndClose(where){
        if (this.where == where) {
            this.where = 'everywhere'
            this.openclose = "Detaylar"
        }else{
            this.where = where
            this.openclose = "Kapat"
        }
    }
  },
  created() {
    this.getPackages();
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
    height: 362px
    width: 56%
    margin: 2.5%
    float: left
    transition: all 0.3s ease
    border-radius: 1em
    overflow: auto
    white-space: nowrap

.packages
    width: 180px
    height: 280px
    background-color: white
    margin: 16px
    margin-top: 36px
    border-radius: 1em
    padding: 16px
    display: inline-block
    white-space: pre-wrap

.service
    width: 28%
    height: 362px
    margin: 2.5%
    float: left
    transition: all 0.3s ease
    border-radius: 1em
    background-color: rgba(255, 255, 255, 0.7)
    &:hover
        background-color: rgba(255, 255, 255, 1)
.title
    margin-top: 12px
    font-weight: 500
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-size: 13pt
.image
    margin-top: 12px

    & img
        height: 150px
        width: 90%
        object-fit: cover
.description
    margin: 12px
    font-size: 11pt
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif

.button
    margin: auto
    margin-top: 25px
    padding-top: 5px
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
.packageButton
    margin: auto
    margin-top: 8px
    padding-top: 5px
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
.close
    position: absolute
    float: right
    margin-left: 12px
    margin-top: 4px
    cursor: pointer
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-size: 11pt
    font-weight: 600
    &:hover
        font-size: 12pt

.fee
    height: 10%
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-size: 11pt

.packageDescription
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    height: 42%
    width: 100%
    margin-top: 3px
    margin-bottom: 12px
    font-size: 9pt
    overflow: hidden
.quota
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    margin-top: 10px
    height: 10%
    font-size: 9pt

::-webkit-scrollbar
    height: 10px
    border-radius: 1em
::-webkit-scrollbar-track
    background: #ffffff
    border-radius: 1em

::-webkit-scrollbar-thumb
    background: #000
    border-radius: 1em

::-webkit-scrollbar-thumb:hover
    background: #555
</style>
