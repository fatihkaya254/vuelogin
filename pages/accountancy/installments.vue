<template lang="pug">
.cover
    ul
        li(v-for="p in purchases") {{p.parent.name}}
</template>

<script>
export default {
  data() {
    return {
      purchases: {},
      ourhost: process.env.OUR_URL
    };
  },
  methods: {
    getPurchases: async function() {
      await this.$axios
        .get(`${process.env.OUR_HOST}/getActives`)
        .then(res => {
          this.purchases = res.data;
        });
    }
  },
  mounted(){
      this.getPurchases()
  }
};
</script>

<style lang="sass" scoped>
.cover
    height: 74vh
    overflow: auto

::-webkit-scrollbar
    height: 2px
    width: 2px
    border-radius: 1em
::-webkit-scrollbar-track
    background: #ffffff
    border-radius: 1em

::-webkit-scrollbar-thumb
    background: #555
    border-radius: 1em

::-webkit-scrollbar-thumb:hover
    background: #555
</style>