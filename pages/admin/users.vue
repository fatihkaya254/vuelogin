<template lang="pug">
.user
    h3 Kullanıcılar
    .listContainer
        ul
            li( v-for="user in this.$store.state.users.user ")
                .card( @click="hookUser( user._id)")
                    p {{ user._id }}
                    p {{ user.name }} {{ user.surname }}
                    p {{ user.phone }}
                    p {{ roleName(user.role) }}
    .updateUser
        h4 {{ id }}
        label Telefon 
        input(type="text" v-model="phone" @blur="updateUser(phone, 'phone')")
        br
        label İsim 
        input(type="text" v-model="name" @blur="updateUser(name, 'name')")
        br
        label Soyisim 
        input(type="text" v-model="surname" @blur="updateUser(surname, 'surname')")
        br
        label Rol 
        select(v-model="roleId" @change="updateUser(roleId, 'role')")
            option(v-for="role in this.$store.state.users.role" :value="role._id") {{role.roleName}}
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      id: null,
      name: "",
      surname: "",
      phone: "",
      roleId: null,
    };
  },
  mounted() {
    this.getUsers()
    this.getRoles()
  },
  methods: {
    ...mapActions("users", ["getUsers", "getRoles", "changeUserInfo"]),
    ...mapGetters("users", ["getRole"]),
    hookUser: function(id) {
      this.id = this.$store.state.users.user[id]._id;
      this.name = this.$store.state.users.user[id].name;
      this.surname = this.$store.state.users.user[id].surname;
      this.phone = this.$store.state.users.user[id].phone;
      this.roleId = this.$store.state.users.user[id].role;
    },
    updateUser: function(value, where){
      this.changeUserInfo({ id: this.id, value, where  })
      //  this.$store.dispatch("changeUserInfo", { id: this.id, value, where  });
    },
    roleName: function(id){
        if (this.$store.state.users.role[id] != null || this.$store.state.users.role[id] != undefined) {
            return this.$store.state.users.role[id].roleName
        } else {
            return "Rol Yok"
        }
    }
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
