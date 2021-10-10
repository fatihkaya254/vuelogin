<template lang="pug">
.cont(:style="{background: bColor}")
    .logo
        img(src="../assets/analizlogo.png")
    .line(:style="{background: logoColor}")
    .line2(:style="{background: logoColor}")
    .color
        input(type="color" v-model="logoColor")
        br
        input(type="text" v-model="logoColor")
    .color2
        input(type="color" v-model="bColor")
        br
        input(type="text" v-model="bColor")
</template>

<script>
export default {
    data(){
        return {
            logoColor: "#E00350",
            bColor: "#EF5350"
        }
    }
}
</script>

<style lang="sass" scoped>
.color
    position: absolute
    top: 345px
    left: 96px
    @media screen and (max-width: 1200px)
        top: 315px
        left: 46px
.color2
    position: absolute
    top: 345px
    left: 396px
    @media screen and (max-width: 1200px)
        top: 315px
        left: 146px
.cont
    height: 100vh
    width: 100vw
    background-color: #EF5350

.logo
    position: absolute
    top: 100px
    left: 100px
    z-index: 1
    @media screen and (max-width: 1200px)
        zoom: 0.4
.line
    width: 291px
    height: 81px
    position: absolute
    top: 145px
    left: 96px
    background-color: gray
    border-radius: 1em 0 1em 0
    @media screen and (max-width: 1200px)
        zoom: 0.4
.line2
    width: 291px
    height: 81px
    position: absolute
    top: 145px
    left: 460px
    background-color: gray
    border-radius: 1em 0 1em 0
    @media screen and (max-width: 1200px)
        zoom: 0.4
input[type="text"] 
  width: 75px
input[type="color"] 
  appearance: none
  -moz-appearance: none
  -webkit-appearance: none
  background: none
  border: 3px solid white
  outline: 2px solid black
  cursor: pointer
  height: 15em
  padding: 0
  width: 15em
  @media screen and (max-width: 1200px)
    height: 5em
    width: 5em

</style>