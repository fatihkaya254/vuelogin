<template lang="pug">
div
    h4 Alt Konular
    .listContainer
        ul
            li( v-for="subTopic in this.$store.state.branches.subTopic ")
                .card( @click="hookSubTopic( subTopic._id)")
                    p {{ subTopic._id }}
                    p {{ subTopic.roleName }}
                    p {{ subTopic.branch }}
    .updateUser
    label Alt Konu Adı 
    input(type="text" v-model="name")
    br
    label Konu 
    input(type="text" v-model="subject")
    br
    input(type="submit" @click="throwAddSubject")
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      id: null,
      name: "",
      subject: ""
    };
  },
  methods: {
    ...mapActions("branches", ["getSubTopics", "addSubTopic"]),
    throwAddSubTopic: function(){
      this.addSubTopic({ subTopicName: this.name, subject: this.subject})
    },
    hookSubTopic: function(id) {
      this.id = this.$store.state.users.role[id]._id;
      this.name = this.$store.state.users.role[id].roleName;
      this.descripton = this.$store.state.users.role[id].roleDescripton;
    }
  },
  mounted() {
    this.getSubTopic();
  }
};
</script>

<style lang="sass" scoped>
ul
    list-style-type: none
.card
    width: 240px
    height: 120px
    border: 1px solid black
    border-radius: 1em
    margin: 20px
    padding: 10px
.listContainer
    margin-top: 50px
    overflow: auto
    width: 400px
    height: 600px
    float: left
    margin: 20px
    padding: 10px
.updateUser
    float: left
    margin: 20px
    padding: 10px
</style>