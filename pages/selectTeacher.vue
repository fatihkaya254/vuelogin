<template lang="pug">
#body
    #mainContainer
        #topContainer
            .selector(:class="[bigger == 1 ? 'bigger' : '']")
                label(@click="bigger = 1" class="selectorLabel") {{selectedGradeName}}
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
        #bottomContainer
            #name
                label(v-if="random.name != ''") {{random.name}} {{random.surname}}
            .selector(:class="[bigger == 3 ? 'bigger' : '']")
                label(@click="bigger = 3" class="selectorLabel") {{dayNames[day]}}
                .options(v-if="bigger == 3")
                   label(v-for="d in 7" @click="selectDay(d)") {{dayNames[d]}}
            #hours
                .selector(v-for="h in 24" v-show="teachersLessonsFS()[day+'-'+h] == 2")
                    label {{h}}:00
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
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
      selectedBranchName: "Branş"
    };
  },
  methods: {
    ...mapGetters("users", ["teacher", "teachersLessonsFS"]),
    ...mapActions("users", ["getTeachers", "getTeachersLessonsFS"]),
    ...mapActions("branches", ["getBranches"]),
    ...mapGetters("branches", ["branch"]),
    ...mapActions("students", ["getGrades"]),
    ...mapGetters("students", ["grade"]),
    randomTeacher: function(branch) {
      if (branch != undefined) {
        var change = 0;
        var keys = Object.keys(this.teacher());
        do {
          change++;
          var random = this.teacher()[keys[(keys.length * Math.random()) << 0]];
        } while (!random.branch.includes(branch) && change <= 200);
        if (random.branch.includes(branch)) this.random = random;
        change = 0;
        do {
          change++;
          var random = this.teacher()[keys[(keys.length * Math.random()) << 0]];
        } while (
          (!random.branch.includes(branch) && change <= 200) ||
          random.phone == this.random.phone
        );
        if (random.branch.includes(branch)) this.random2 = random;
        change = 0;
        do {
          change++;
          var random = this.teacher()[keys[(keys.length * Math.random()) << 0]];
        } while (
          (!random.branch.includes(branch) && change <= 200) ||
          random.phone == this.random.phone ||
          random.phone == this.random2.phone
        );
        if (random.branch.includes(branch)) this.random3 = random;
      } else {
        var keys = Object.keys(this.teacher());
        this.random = this.teacher()[keys[(keys.length * Math.random()) << 0]];
        do {
          var random = this.teacher()[keys[(keys.length * Math.random()) << 0]];
        } while (this.random == random && change <= 200);
        this.random2 = random;
        do {
          var random = this.teacher()[keys[(keys.length * Math.random()) << 0]];
        } while (
          this.random == random ||
          this.random2 == random ||
          change <= 200
        );
        this.random3 = random;
      }
      this.getTeachersLessonsFS(this.random._id);
    },
    selectDay: function(d) {
      this.day = d;
      this.bigger = 0;
    },
    selectGrade: function(g) {
      this.branchOptions = {};
      var grade = this.grade()[g];
      this.selectedGrade = grade._id;
      this.selectedGradeName = grade.gradeName;
      this.bigger = 2;
      for (const [key, value] of Object.entries(this.branch())) {
        if (this.selectedGrade == value.grade._id) {
          this.$set(this.branchOptions, key, value);
        }
      }
      this.selectedBranchName = "Branş";
      this.selectedBranch = "";
    },
    selectBranch: async function(b) {
      await this.refill();
      var branch = await this.branch()[b];
      this.selectedBranch = await branch._id;
      this.selectedBranchName = await branch.branchName;
      this.bigger = 3;
      this.randomTeacher(this.selectedBranch);
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
    },
    refill: function() {
      this.random = { name: "", surname: "" };
      this.random2 = { name: "", surname: "" };
      this.random3 = { name: "", surname: "" };
    }
  },
  async mounted() {
    await this.getTeachers();
    this.randomTeacher();
    this.getBranches();
    this.getGrades();
    this.getTeachersLessonsFS(this.random._id);
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
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px
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
#name
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
    height: 80%
    width: 100%
    display: flex
    flex-direction: column
    justify-content: center
    gap: 20px
    margin-top: 20px
    padding-bottom: 20px
    align-items: center
    overflow: auto
    label
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
    transition: all 0.2s ease
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
        height: 54px
        width: 54px
        border-radius: 100%
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
