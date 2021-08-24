<template lang="pug">
.cardContainer 
    .card(v-for="purchase in getMyPurchase()")
        p {{purchase.packageName}}
        p {{purchase.packageDesc}}
        .studentButton(@click="getStudentInfo(purchase._id)")
            p(v-if="purchase.student != undefined") {{purchase.student.name}} {{purchase.student.surname}}
            input(type="submit" value="Öğrenci Ata" v-if="purchase.student == undefined" @click="openAddingPop(purchase._id)")
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
    .searchStudent(v-show="addingPop")
        .close(@click="closeAddingPop()")
          p Kapat
        .infoLine
          label
              | Telefon Numarası
          input(type="text" placeholder="Telefon numarası" v-model="phone" :maxlength="phoneLength")
        .infoLine(v-show="addingName != ''")
          label
              | {{addingName}} {{addingSurname}}
        .infoLine(v-show="addingName != ''")
          input(type="submit" value="Ekle" @click="addStudent()")

</template>

<script>
import { mapActions, mapGetters } from "vuex";
import payment from "../../components/payment.vue"
export default {
  data() {
    return {
      addingPop: false,
      profilePop: false,
      studentName: "",
      studentPhone: "",
      studentMail: "",
      studentBirthDate: "",
      studentPhoto: "",
      addingId: "",
      addingName: "",
      purchase: "",
      addingSurname: "",
      addingPhoto: "",
      file: "",
      name: "",
      phoneLength: 11,
      phone: "",
      ourhost:  process.env.OUR_URL,
    };
  },
  methods: {
    ...mapGetters("users", ["getMyPurchase", "getMyPayment"]),
    ...mapActions("users", ["getMyPurchases", "getMyPayments"]),
    ...mapGetters(["getAuthkey"]),
    openAddingPop: function (id) {
      this.purchase = id
      this.addingPop = true
    },
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
    },
    closeAddingPop: function () {
        this.addingPop = false
        this.addingId = ""
        this.addingName = ""
        this.addingSurname = ""
        this.addingPhoto = ""
        this.package = ""
        this.phone = ""
    },
    getUser: async function() {
      try {
        await this.$axios
          .post(`${process.env.OUR_HOST}/getOneUser`, {
            phone: this.phoneNumber
          })
          .then(res => {
            this.addingId = res.data.user._id;
            if(res.data.user.name != undefined)this.addingName = res.data.user.name;
            if(res.data.user.surname != undefined)this.addingSurname = res.data.user.surname;
            if(res.data.user.profilePic != undefined) this.addingPhoto = res.data.user.profilePic;
          });
      } catch (error) {
        console.log(error);
      }
    },
    addStudent: async function() {
      try {
        await this.$axios
          .put(`${process.env.OUR_HOST}/addStudentOnPurchase`, {
            purchase: this.purchase,
            student: this.addingId
          })
          .then(res => {
            console.log(res.status);
          });
      } catch (error) {
        console.log(error);
      }
      this.getMyPurchases(this.getAuthkey());
      this.closeAddingPop()
    },
  },
  watch: {

  },
  mounted() {
    this.getMyPurchases(this.getAuthkey());
    this.getMyPayments(this.getAuthkey());
  },
  watch: {
      phone(value) {
      var firstChar = value.charAt(0);
      if (firstChar != 0) this.phoneLength = 10;
      else this.phoneLength = 11;
      this.phoneNumber = value.replace(/\D/g, "");
      if (this.phoneNumber.length == this.phoneLength) {
        this.getUser();
      }
    },
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

  .searchStudent
    width: 640px
    height: 420px
    background-color: $gray4
    border-radius: 1em
    position: absolute
    z-index: 1
    top: 20px

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

  
.infoLine
  padding-left: 30px
  padding-right: 30px
  margin-top: 10px
  padding-top: 8px
  height: 40px
  border-bottom: 0.75px solid gray
  & img
    float: left
    margin-bottom: 5px
    height: 32px
    width: 32px
    border-radius: 50%
  p
    float: left
    margin-left: 15px
  select
    float: right
    margin-right: 20%
    height: 28px
    margin-top: -8px
    border: none
    width: 50%
    padding-left: 16px
    padding-right: 16px
    border-radius: 1em

  option
    float: right
    margin-right: 20%
    height: 28px
    margin-top: -8px
    border: none
    min-width: 50%
    -webkit-appearance: none
    padding-left: 16px
    padding-right: 16px
    border-radius: 1em

  input
    float: right
    margin-right: 20%
    height: 28px
    margin-top: -8px
    border: none
    min-width: 50%
    -webkit-appearance: none
    padding-left: 16px
    padding-right: 16px
    border-radius: 1em

    &:focus
      -webkit-appearance: none

    &[type="submit"]
      background-color: black
      color: white

      &:hover
        cursor: pointer

</style>
