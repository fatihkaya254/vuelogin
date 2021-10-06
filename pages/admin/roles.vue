<template lang="pug">
div
    h4 roller
    .listContainer
        ul
            li( v-for="role in this.$store.state.users.role ")
                .card( @click="hookRole( role._id)")
                    p {{ role._id }}
                    p {{ role.roleName }}
                    p {{ role.rank }}
    .updateUser
    label Rol Adı 
    input(type="text" v-model="name")
    br
    label Rütbe 
    input(type="number" v-model="rank")
    br
    input(type="submit" @click="throwAddRole")
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      id: null,
      name: "",
      rank: ""
    };
  },
  methods: {
    ...mapActions("users", ["getRoles", "addRole"]),
    throwAddRole: function(){
      this.addRole({ rank: this.rank, roleName: this.name})
    },
    hookRole: function(id) {
      this.id = this.$store.state.users.role[id]._id;
      this.name = this.$store.state.users.role[id].roleName;
      this.rank = this.$store.state.users.role[id].rank;
    }
  },
  mounted() {
    this.getRoles();
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