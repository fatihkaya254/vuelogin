<template lang="pug">
.rm
    input(type="date" v-model="date")
    .teachers
        .teacher(v-for="i in teacher()" @click="setTeacher(i._id)" :class="[i._id != teacherId ? '' : 'aTeacher']") {{i.name}} {{i.surname}}
    div(v-for="c in teachersDaily()")  
      .record(v-if="c.student != undefined" :style="[lessonRecords[c.student._id] != undefined ? { backgroundColor: colors[lessonRecords[c.student._id].smsApp]} : { backgroundColor: colors[0]}]")
          .hour {{c.hour}}:00
          div(v-if="c.student != undefined") 
              .name {{c.student.name}} {{c.student.surname}}
              .sms(v-if="lessonRecords[c.student._id] != undefined" :class="[lessonRecords[c.student._id].join ? '' : 'red']")  
                  fa-icon(:icon="['fas', 'sms']")
                  label {{lessonRecords[c.student._id].sms}}
          div(v-if="c.group != undefined") 
              .name {{c.group.groupName}}
              div(v-for="s in c.group.student") 
                  .sms(v-if="lessonRecords[s] != undefined" :class="[lessonRecords[s].join ? '' : 'red']") 
                      fa-icon(:icon="['fas', 'sms']")
                      label {{lessonRecords[s].sms}}
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
      imports: [
    {
      set: '@fortawesome/free-solid-svg-icons',
    }
  ],
  data() {
    return {
      colors: ["#ff605c", "#ffbd44", "#00ca4e"],
      date: "",
      teacherId: "",
      turkDays: [6, 0, 1, 2, 3, 4, 5],
      lessonRecords: {}
    };
  },
  methods: {
    ...mapGetters("users", ["teacher", "teachersDaily"]),
    ...mapActions("users", ["getTeachers", "getTeachersDaily"]),
    setTeacher: function(id) {
      if(id == "") return
      this.teacherId = id;
      var date = new Date();
      if (this.date != "") date = new Date(this.date);
      this.getTeachersDaily({ teacher: id, day: this.turkDays[date.getDay()] });
      this.getLessonRecords()
    },
    getLessonRecords: function() {
      if(this.teacherId == "") return
      const teacher = this.teacherId;
      var now = new Date();
      if (this.date != "") now = new Date(this.date);
      var month = now.getMonth() + 1;
      const date = now.getFullYear() + "-" + month + "-" + now.getDate();
      this.$axios
        .post(`${process.env.OUR_HOST}/dailyTeacherRecords`, {
          teacher,
          date
        })
        .then(res => {
          for(const el in res.data){
              this.$set(this.lessonRecords, res.data[el].student, res.data[el])
          }
          console.log(this.lessonRecords);
        });
    }
  },
  watch: {
    date: function() {
      this.setTeacher(this.teacherId);
    }
  },
  mounted() {
    this.getTeachers();
  }
};
</script>

<style lang="sass" scoped>

.rm
    height: 60vh
    overflow: auto
    @media screen and (max-width: 1200px)
      height: 50vh
.teachers
    display: flex
    flex-wrap: wrap
.teacher
    flex-grow: 1
    width: 30%
    padding: 3px
    height: 30px
    border: 0.7px solid black
    margin: 4px
    @media screen and (max-width: 1200px)
      width: 40%
      height: 60px

.aTeacher
    background-color: black
    color: #fff

.record
    border: 1px solid black
    margin-top: 16px
    padding: 6px

.hour
    padding: 8px
    text-align: center

.name
    padding: 8px
    text-align: center

.sms
    padding: 8px
    label
        margin: 3px
.red
    color: red
</style>
