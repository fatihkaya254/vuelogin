<template lang="pug">
.cover
    .list
        .students(v-for="s,n in numbers" ) 
            span {{s}}
            span {{n}}
</template>

<script>
export default {
    data(){
        return{
            numbers:{}
        }
    },
    methods: {
        getNum: async function () {
            await this.$axios.get('/innumsoft').then(res =>{
                this.numbers = res.data
                console.log(res.data);
            })
        }
    },
    mounted(){
        this.getNum()
    }
}
</script>


<style lang="sass" scoped>
.title
  display: flex
  justify-content: flex-start
  cursor: pointer
  padding-left: 8px
  align-items: center
  p
    width: 45%
  &:hover
    border: 0.4px dotted black
  input
      width: 30%
      font-family: montserrat, arial, verdana
      padding: 7px 10px
      border: none
  label
      width: 100px
.pay
  display: flex
  flex-direction: column
  gap: 7px
  margin-top: 10px
.messageBox
    height: 40px
    width: 120px
    padding-top: 10px
    background-color: black
    color: white
    position: absolute
    align-content: center
    text-align: center
.list
    height: 65vh
    overflow: auto
.installments
    display: flex
    flex-direction: column
    gap: 10px
    margin-top: 10px
    margin-bottom: 10px
.students
    display: flex
    justify-content: flex-start
    span
        width: 50%
    background-color: antiquewhite
    min-height: 40px
    padding: 6px
    padding-left: 4px
    margin: 10px
    input
      height: 12px
      border: none
      -webkit-appearance: none
      padding: 12px
      margin: 6px
      border-radius: 1px

      &:focus
        -webkit-appearance: none

      &[type="submit"]
        background-color: black
        color: white
        height: 24px
        padding: 0
        &:hover
          cursor: pointer
          background-color: white
          color: black
.search
    input
      height: 16px
      border: none
      min-width: 50%
      -webkit-appearance: none
      padding: 12px
      margin: 16px
      border-radius: 1px

      &:focus
        -webkit-appearance: none

      &[type="submit"]
        background-color: black
        color: white

        &:hover
          cursor: pointer

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

.invoice
  height: 60vh
  overflow: auto
  position: absolute
  z-index: 2
  background: white
.generate
  overflow: auto
  position: absolute
  z-index: 3
  background: gray
  padding: 20px
  width: 500px
.close
  background: white
  height: 30px
  padding: 10px
  text-align: center
  cursor: pointer
  &:hover
    font-weight: 700

input
    width: 100%
    line-height: 150%
    font-family: montserrat, arial, verdana
    padding: 7px 10px
    border: none

input[type="submit"]
    cursor: pointer
    margin-top: 5px
    margin-left: 0
    &:hover
        background-color: #edd0d0

label
    font-family: montserrat, arial, verdana
    font-size: 10pt
    margin: 5px
</style>
