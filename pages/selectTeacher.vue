<template lang="pug">
#body
    #mainContainer
        #topContainer(@click="hour=0")
            .selector(:class="[bigger == 1 ? 'bigger' : '']")
                .selectorLabel(@click="bigger = 1" class="selectorLabel") {{selectedGradeName}}
                .options(v-if="bigger == 1")
                    label(v-for="g in grade()" @click="selectGrade(g._id)") {{g.gradeName}}
            .selector(:class="[bigger == 2 ? 'bigger' : '']" v-show="selectedGradeName != 'Sınıf'")
                label(@click="bigger = 2" class="selectorLabel") {{selectedBranchName}}
                .options(v-if="bigger == 2")
                    label(v-for="b in branchOptions" @click="selectBranch(b._id)") {{b.branchName}}
            #photoWrapper
                .subPhoto(@click="selectTeacher(true)")
                    img(:src="random2.profilePic" v-show="random2.profilePic" :title="random2.name + ' ' + random2.surname")
                    img(src="../assets/basic-profile.png" v-show="!random2.profilePic  && random2.name != ''" :title="random2.name + ' ' + random2.surname")
                #mainPhoto
                    img(:src="random.profilePic" v-show="random.profilePic" :title="random.name + ' ' + random.surname")
                    img(src="../assets/basic-profile.png" v-show="!random.profilePic && random.name != ''" :title="random.name + ' ' + random.surname")
                .subPhoto(@click="selectTeacher(false)")
                    img(:src="random3.profilePic" v-show="random3.profilePic" :title="random3.name + ' ' + random3.surname")
                    img(src="../assets/basic-profile.png" v-show="!random3.profilePic && random3.name != ''" :title="random3.name + ' ' + random3.surname")
        transition(
              v-on:before-enter="startProgress",
              v-on:enter="finishProgress",
              v-on:before-leave="beforeLeave"
              v-on:leave="leave",
              v-bind:css="false"
        )    
            #bottomContainer(v-if="!hour")
                .name
                    label(v-if="random.name != ''") {{random.name}} {{random.surname}}
                .selector(:class="[bigger == 3 ? 'bigger' : '']")
                    label(@click="bigger = 3" class="selectorLabel") {{dayNames[day]}}
                    .options(v-if="bigger == 3")
                       label(v-for="d in 7" @click="selectDay(d)" v-show="dayNames[d]") {{dayNames[d]}} 
                        small {{count[random._id+"-"+d]}} {{count[random._id+"-"+d] ? 'saat' : ''}}
                #hours
                    .options
                        label(v-for="h in 24" v-show="teachersLessonsFS()[day+'-'+h] != undefined" @click="hour = h") {{h}}:00
        transition(
              v-on:before-enter="startProgress",
              v-on:enter="finishProgress",
              v-on:before-leave="beforeLeave"
              v-on:leave="leave",
              v-bind:css="false"
        )
            #bottomSlide(v-if="hour")
                .name
                    label(v-if="random.name != ''") {{random.name}} {{random.surname}}
                    label(v-if="random.name != ''") {{hour}}:00 {{dayNames[day]}}
                    label(v-if="random.name != ''") {{selectedGradeName}} {{selectedBranchName}}
                .buttons
                    .credit
                        fa-icon(:icon="['fab', cctype]" style="font-size:50pt")
                        label(for="cc-own") Kart Sahibi
                        input(type="text" id="cc-own" autocomplete="cc-owner"  x-autocompletetype="cc-owner" )
                        label(for="cc-num") Kart Numarası
                        input(type="text" id="cc-num" autocomplete="cc-number" :maxlength="cclimit" v-model="ccnum" data-inputmask="'mask': '9999 9999 9999 9999'" x-autocompletetype="cc-number" )
                        label(for="cc-exp-month") Son Kullanma Tarihi Ay
                        input(type="number" id="cc-exp-month" name="cc-exp-month" autocomplete="cc-exp-month" x-autocompletetype="cc-exp-month" )
                        label(for="cc-exp-year") Son Kullanma Tarihi Yıl
                        input(type="number" id="cc-exp-year" name="cc-exp-year" autocomplete="cc-exp-year" x-autocompletetype="cc-exp-year")
                        label(for="cvv2") CVV2
                        input(id="cvv2" name="cvv2" autocomplete="cc-csc")
                    .button.first
                        label Yeni Ders Al
                    .button
                        label Ders Hakkımı Kullan
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { gsap } from "gsap";
export default {
  data() {
    return {
      cclimit: 16,
      ccnum: "",
      cctype: "cc-visa",
      hour: 0,
      random: { name: "", surname: "" },
      random2: { name: "", surname: "" },
      random3: { name: "", surname: "" },
      day: 1,
      dayNames: [
        "Pazartesi",
        "Salı",
        "Çarşamba",
        "Perşembe",
        "Cuma",
        "Cumartesi",
        "Pazar"
      ],
      bigger: 0,
      selectedGrade: "",
      selectedGradeName: "Sınıf",
      branchOptions: {},
      selectedBranch: "",
      selectedBranchName: "Branş",
      count: {},
      teacherList: {}
    };
  },
  methods: {
    beforeLeave: function(el) {
      gsap.set(el, {
        height: "64%",
        opacity: 1
      });
    },
    leave: function(el, done) {
      gsap.to(el, {
        duration: 0.5,
        height: "0%",
        opacity: 0,
        ease: "Power2.easeOut",
        onComplete: done
      });
    },
    startProgress: function(el) {
      gsap.set(el, {
        height: "0%",
        opacity: 0
      });
    },
    finishProgress: async function(el, done) {
      gsap.to(el, {
        duration: 0.5,
        opacity: 1,
        height: "64%",
        ease: "Power2.easeOut",
        onComplete: done
      });
    },
    ...mapGetters("users", ["teacher", "teachersLessonsFS"]),
    ...mapActions("users", ["getTeachers", "getTeachersLessonsFS"]),
    ...mapActions("branches", ["getBranches"]),
    ...mapGetters("branches", ["branch"]),
    ...mapActions("students", ["getGrades"]),
    ...mapGetters("students", ["grade"]),
    randomTeacher: function(branch) {
      if (branch != undefined) {
        var change = 0;
        var keys = Object.keys(this.teacherList);
        do {
          change++;
          var random = this.teacherList[
            keys[(keys.length * Math.random()) << 0]
          ];
        } while (!random.branch.includes(branch) && change <= 200);
        if (random.branch.includes(branch)) {
          this.$set(this.random, "name", random.name);
          this.$set(this.random, "surname", random.surname);
          this.$set(this.random, "profilePic", random.profilePic);
          this.$set(this.random, "_id", random._id);
          this.$set(this.random, "phone", random.phone);
        }
        change = 0;
        do {
          change++;
          var random = this.teacherList[
            keys[(keys.length * Math.random()) << 0]
          ];
        } while (
          (!random.branch.includes(branch) && change <= 200) ||
          random.phone == this.random.phone
        );
        if (random.branch.includes(branch)) {
          this.$set(this.random2, "name", random.name);
          this.$set(this.random2, "surname", random.surname);
          this.$set(this.random2, "profilePic", random.profilePic);
          this.$set(this.random2, "_id", random._id);
          this.$set(this.random2, "phone", random.phone);
        }
        change = 0;
        do {
          change++;
          var random = this.teacherList[
            keys[(keys.length * Math.random()) << 0]
          ];
        } while (
          (!random.branch.includes(branch) && change <= 200) ||
          random.phone == this.random.phone ||
          random.phone == this.random2.phone
        );
        if (random.branch.includes(branch)) {
          this.$set(this.random3, "name", random.name);
          this.$set(this.random3, "surname", random.surname);
          this.$set(this.random3, "profilePic", random.profilePic);
          this.$set(this.random3, "_id", random._id);
          this.$set(this.random3, "phone", random.phone);
        }
      } else {
        var keys = Object.keys(this.teacherList);
        var random = this.teacherList[keys[(keys.length * Math.random()) << 0]];
        this.$set(this.random, "name", random.name);
        this.$set(this.random, "surname", random.surname);
        this.$set(this.random, "profilePic", random.profilePic);
        this.$set(this.random, "_id", random._id);
        this.$set(this.random, "phone", random.phone);
        do {
          var random = this.teacherList[
            keys[(keys.length * Math.random()) << 0]
          ];
        } while (this.random == random && change <= 200);
        this.$set(this.random2, "name", random.name);
        this.$set(this.random2, "surname", random.surname);
        this.$set(this.random2, "profilePic", random.profilePic);
        this.$set(this.random2, "_id", random._id);
        this.$set(this.random2, "phone", random.phone);
        do {
          var random = this.teacherList[
            keys[(keys.length * Math.random()) << 0]
          ];
        } while (
          (this.random == random || this.random2 == random) &&
          change <= 200
        );
        this.$set(this.random3, "name", random.name);
        this.$set(this.random3, "surname", random.surname);
        this.$set(this.random3, "profilePic", random.profilePic);
        this.$set(this.random3, "_id", random._id);
        this.$set(this.random3, "phone", random.phone);
      }
      this.getTeachersLessonsFS(this.random._id);
    },
    selectDay: function(d) {
      this.day = d;
      this.bigger = 0;
      this.hour = 0;
    },
    selectGrade: async function(g) {
      this.branchOptions = {};
      var grade = this.grade()[g];
      this.selectedGrade = grade._id;
      this.selectedGradeName = grade.gradeName;
      this.bigger = 2;
      for (const [key, value] of Object.entries(this.branch())) {
        if (this.selectedGrade == value.grade._id) {
          await this.$set(this.branchOptions, key, value);
        }
      }
      this.selectedBranchName = "Branş";
      this.selectedBranch = "";
      this.hour = 0;
    },
    selectBranch: async function(b) {
      await this.refill();
      var branch = await this.branch()[b];
      this.selectedBranch = await branch._id;
      this.selectedBranchName = await branch.branchName;
      this.bigger = 0;
      this.randomTeacher(this.selectedBranch);
      this.hour = 0;
    },
    selectTeacher: function(t) {
      if (t && this.random2.name != "") {
        var r = this.random;
        this.random = this.random2;
        this.random2 = r;
      } else if (this.random3.name != "") {
        var r = this.random;
        this.random = this.random3;
        this.random3 = r;
      }
      this.getTeachersLessonsFS(this.random._id);
      this.hour = 0;
    },
    refill: function() {
      this.random = { name: "", surname: "" };
      this.random2 = { name: "", surname: "" };
      this.random3 = { name: "", surname: "" };
    },
    counter: async function() {
      await this.$axios.get("/teacherLessonCounter").then(res => {
        this.count = res.data;
      });
      this.teacherList = this.teacher();
      for (const [key, val] of Object.entries(this.teacherList)) {
        if (this.count[key] == undefined) {
          delete this.teacherList[key];
        }
      }
    }
  },
  async mounted() {
    await this.getGrades();
    await this.getBranches();
    await this.getTeachers();
    await this.counter();
    await this.selectGrade("609e4bee36065a0f1cedf80b");
    await this.selectBranch("6137704d7774953b94468ba2");
    this.randomTeacher(this.selectedBranch);
    this.getTeachersLessonsFS(this.random._id);
  },
  watch: {
    "random._id"(val) {
      if (val != undefined) {
        const id = val;
        var score = 0;
        var day = 1;
        for (let index = 0; index < 7; index++) {
          if (this.count[id + "-" + index] > score) {
            day = index;
            score = this.count[id + "-" + index];
          }
        }
        this.day = day;
      }
    },
    ccnum(val) {
      this.cclimit = 16;
      this.ccnum = val.replace(/\D/g, "");
      var mastercard = /^(?:5[1-5])$/;
      var amex = /^(?:3[47])$/;
      var visa = /^(?:4)$/;
      if (val.match(amex)) {
        this.cclimit = 15;
        this.cctype = "cc-amex";
      } else if (val.match(visa)) {
        this.cctype = "cc-visa";
      } else if (val.match(mastercard)) {
        this.cctype = "cc-mastercard";
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap')

#body
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    height: 100vh
    width: 100vw
    background-color: antiquewhite
    font-family: 'Roboto', sans-serif
#mainContainer
    width: 90%
    height: 80%
    max-width: 375px
    background-color: #183e4a
    border-radius: 2em
    overflow: hidden
    display: flex
    flex-direction: column
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px
#topContainer
    width: 100%
    height: 36%
    background-color: #021b26
    border-radius: 0 0 32px 32px
    display: flex
    flex-direction: column
    justify-content: space-evenly
    align-items: center
#bottomContainer
    height: 64%
    width: 100%
    border-radius: 0 0 32px 32px
    display: flex
    flex-direction: column
    justify-content: space-evenly
    align-items: center
#bottomSlide
    height: 64%
    background-color: white
    width: 100%
    border-radius: 32px
    display: flex
    flex-direction: column
    justify-content: space-evenly
    align-items: center
.name
    width: 100%
    height: 36px
    display: flex
    flex-direction: column
    justify-content: space-evenly
    align-items: center
    color: #6ca6c1
    font-weight: 500
    letter-spacing: 0.2px
.options
    height: 100%
    width: 100%
    display: flex
    flex-direction: column
    justify-content: flex-start
    gap: 20px
    margin-top: 20px
    padding-top: 20px
    padding-bottom: 20px
    align-items: center
    overflow: auto
    label
        background-color: white
        padding: 10px
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px
        width: 50%
        text-align: center
        cursor: pointer
        &:hover
            background-color: salmon

#hours
    height: 80%
    width: 100%
    display: flex
    flex-direction: column
    justify-content: flex-start
    gap: 20px
    margin-top: 20px
    padding-bottom: 20px
    align-items: center
    overflow: auto
.selector
    width: 80%
    height: 30px
    background-color: white
    border-radius: 2em
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    transition: all 0.5s ease-out
    overflow: hidden
    .selectorLabel
        width: 100%
        height: 30px
        cursor: pointer
        padding: 6px
        text-align: center
.bigger
    top: 15%
    max-width: 375px
    position: absolute
    z-index: 5
    height: 70%
    width: 90%
#photoWrapper
    height: 110px
    width: 80%
    display: flex
    justify-content: space-around
    align-items: center
#mainPhoto
    height: 96px
    width: 96px
    border-radius: 100%
    img
        height: 96px
        width: 96px
        border-radius: 100%
.subPhoto
    border-radius: 100%
    height: 54px
    width: 54px
    img
        transition: all 0.5s ease
        height: 54px
        width: 54px
        border-radius: 100%
.buttons
    display: flex
    flex-direction: column
    gap: 20px
    align-items: center
    width: 80%
.button
    cursor: pointer
    width: 100%
    display: flex
    justify-content: center
    align-items: center
    height: 32px
    width: 80%
    border-radius: 1em
    border: 1px solid #167d12
    color: #162d12
    transition: all 0.5s ease
    label
        cursor: pointer
        color: #167d12
    &:hover
        label
            color: white
        border: none
        background-color: #167d12
.first
    background-color: #167d12
    label
        color: white
    &:hover
        background-color: #021b26

.credit
    display: flex
    flex-direction: column

::-webkit-scrollbar
  width: 0px
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
