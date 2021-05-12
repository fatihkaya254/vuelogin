<template lang="pug">
div
    h4 roller
    .listContainer
        ul
            li( v-for="role in this.$store.state.users.role ")
                .card( @click="hookRole( role._id)")
                    p {{ role._id }}
                    p {{ role.roleName }}
                    p {{ role.roleDescripton }}
    .updateUser
    label Rol Adı 
    input(type="text" v-model="name")
    br
    label Açıklaması 
    input(type="text" v-model="descripton")
    br
    input(type="submit" @click="throwAddRole")
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      id: null,
      name: "",
      descripton: ""
    };
  },
  methods: {
    ...mapActions("users", ["getRoles", "addRole"]),
    throwAddRole: function(){
      this.addRole({ roleDescripton: this.descripton, roleName: this.name})
    },
    hookRole: function(id) {
      this.id = this.$store.state.users.role[id]._id;
      this.name = this.$store.state.users.role[id].roleName;
      this.descripton = this.$store.state.users.role[id].roleDescripton;
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