<template lang="pug">
.cardContainer 
    .card(v-for="purchase in getMyPurchase()")
        p {{purchase.packageName}}
        p {{purchase.packageDesc}}
        .studentButton(@click="getStudentInfo(purchase._id)")
            p(v-if="purchase.student != undefined") {{purchase.student.name}} {{purchase.student.surname}}
        p Toplam Ücret: {{purchase.fee}}₺
        p(v-if="purchase.installment > 1") Taksit Tutarı: {{purchase.fee/purchase.installment}}₺
        div(v-for="branch in purchase.branch")
            p {{branch.grade.gradeName}} {{branch.branchName}}
        br
        div(v-for="payment in getMyPayment()" v-show="payment.purchase._id == purchase._id")
            p Ödeme: {{payment.paymentTotal}}₺ | {{payment.paymentDate}}
    .studentInfo(v-if="profilePop")
        .close(@click="closeStudentInfo()")
          p Kapat
        .profilePhoto
          img(:src=" ourhost + studentPhoto" v-show="studentPhoto != '' ")
          img(src="../../assets/basic-profile.png" v-show="studentPhoto == '' ")
        .profileContent
          p {{ studentName }}
          p {{ studentPhone }}
          p {{ studentMail }}
          p {{ studentBirthDate }}

</template>

<script>
import { mapActions, mapGetters } from "vuex";
import payment from "../../components/payment.vue"
export default {
  data() {
    return {
      profilePop: false,
      studentName: "",
      studentPhone: "",
      studentMail: "",
      studentBirthDate: "",
      studentPhoto: "",
      file: "",
      name: "",
      ourhost:  process.env.OUR_URL,
    };
  },
  methods: {
    ...mapGetters("users", ["getMyPurchase", "getMyPayment"]),
    ...mapActions("users", ["getMyPurchases", "getMyPayments"]),
    ...mapGetters(["getAuthkey"]),
    getStudentInfo(id){
      let purchases = this.getMyPurchase()
      if (purchases[id].student != undefined) {
        this.studentName = purchases[id].student.name + " " +  purchases[id].student.surname
        this.studentPhone = purchases[id].student.phone
        this.studentMail = purchases[id].student.email
        this.studentPhoto = purchases[id].student.profilePic
        if (purchases[id].student.birthDay != undefined) {
          let datetime = purchases[id].student.birthDay
          let date = datetime.split("-")
          let year = date[0]
          let month = date[1]
          let day = date[2].charAt(0) + date[2].charAt(1)
          let newDate =  day + "." + month + "." + year;
          this.studentBirthDate = newDate
        }
        this.profilePop = true
      }
    },
    closeStudentInfo(){      
        this.studentName = ""
        this.studentPhone = ""
        this.studentMail = ""
        this.studentPhoto = ""
        this.studentBirthDate = ""
        this.profilePop = false
    }
  },
  watch: {

  },
  mounted() {
    this.getMyPurchases(this.getAuthkey());
    this.getMyPayments(this.getAuthkey());
  },
  components: {payment}
};
</script>

<style lang="sass" scoped>
  $gray: rgb(142, 142, 147)
  $gray2: rgb(174, 174, 178)
  $gray6: rgb(242, 242, 247)
  $gray4: rgb(209, 209, 214)
  $gray6-dark: rgb(28, 28, 30)

  .studentButton
    margin: 5px 0px 5px 0px
    font-weight: 600
    cursor: pointer
    &:hover
      font-weight: 800
  .profileContent
    text-align: center
    line-height: 2em
    
  .studentInfo
    padding: 10px
    border-radius: 1em
    position: absolute
    z-index: 3
    left: 150px
    top: 50px
    min-width: 200px
    background-color: $gray4

  .cardContainer
    overflow: auto
    height: 80%
    
  .card
    border-radius: 1em
    border: 0.75px solid black
    padding: 8px
    margin-bottom: 15px
    position: relative
    margin: 5px

  .close
    text-align: center
    padding: 4px
    font-size: 12pt
    cursor: pointer

    &:hover
      font-weight: 700

  .profilePhoto
    height: 72px
    width: 72px
    border-radius: 50%
    margin: auto
    margin-top: 20px
    margin-bottom: 20px
    cursor: pointer
    & img
        height: 72px
        width: 72px
        border-radius: 50%

  ::-webkit-scrollbar
    width: 5px
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
