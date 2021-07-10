<template lang="pug">
div
    h4 Öğrenciler
    .listContainer
        ul
            li( v-for="thepackage in package() ")
                .card
                    p {{ thepackage._id }}
                    p {{ thepackage.name }}
                    p {{ thepackage.fee }}
                    p {{ thepackage.classroomQuota }}
                    p {{ thepackage.description }}
                    p {{ thepackage.scope }}
                    p {{ thepackage.condition }}
                    p {{ thepackage.weeklyPrivateLesson }}
                    p {{ thepackage.oncePrivateLesson }}
                    p {{ thepackage.weeklyExam }}
                    p {{ thepackage.onceExam }}
                    p {{ thepackage.installability }}
    .updateUser
        label Paket Adı
        br
        input(type="text" v-model="name")
        br
        label Ücreti
        br
        input(type="text" v-model="fee")
        br
        label Öğrenci Sınırı
        br
        input(type="text" v-model="classroomQuota" placeholder="6-8 öğrenci")
        br
        label Açıklama
        br
        textarea(rows="2" cols="50" v-model="description" placeholder="Buradaki açıklama anasayfada görünecek")
        br
        label Kapsam
        br
        input(type="radio" v-model="scope" value="group")
        | Grup 
        input(type="radio" v-model="scope" value="private") 
        | Özel 
        input(type="radio" v-model="scope" value="exam") 
        | Sınav 
        p {{ scope }}
        br
        label Ön Şart 
        br
        input(type="radio" v-model="condition" value="group")
        | Grup 
        input(type="radio" v-model="condition" value="private") 
        | Özel 
        input(type="radio" v-model="condition" value="none") 
        | Yok 
        p {{ condition }}
        br
        label Haftalık Özel Ders Sayısı
        br
        input(type="number" v-model="weeklyPrivateLesson")
        br
        label Tek Seferlik Özel Ders Sayısı 
        br
        input(type="number" v-model="oncePrivateLesson")
        br
        label Haftalık Deneme Sayısı 
        br
        input(type="number" v-model="weeklyExam")
        br
        label Tek Seferlik Deneme Sayısı 
        br
        input(type="number" v-model="onceExam")
        br
        label Taksitlendirilebilirlik 
        br
        input(type="radio" v-model="installability" value="true") 
        | Evet 
        input(type="radio" v-model="installability" value="false") 
        | Hayır 
        br
        input(type="submit" value="Yeni Oluştur" @click="throwAddPackage()")
        input(type="submit" value="Güncelle" @click="")
        input(type="submit" value="Kaldır" @click="")
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      id: null,
      name: "",
      fee: "",
      classroomQuota: "",
      description: "",
      scope: "",
      condition: "none",
      weeklyPrivateLesson: "",
      oncePrivateLesson: "",
      weeklyExam: "",
      onceExam: "",
      installability: "false"
    };
  },
  methods: {
    ...mapActions("economics", ["getPackages", "addPackage"]),
    ...mapGetters("economics", ["package"]),
    throwAddPackage: function() {
      this.addPackage({
        name: this.name,
        fee: this.fee,
        classroomQuota: this.classroomQuota,
        description: this.description,
        scope: this.scope,
        condition: this.condition,
        weeklyPrivateLesson: this.weeklyPrivateLesson,
        oncePrivateLesson: this.oncePrivateLesson,
        weeklyExam: this.weeklyExam,
        onceExam: this.onceExam,
        installability: this.installability,
        affordability: this.affordability
      });
      this.name = ""
      this.fee = ""
      this.classroomQuota = ""
      this.description = ""
      this.scope = ""
      this.condition = "none"
      this.weeklyPrivateLesson = ""
      this.oncePrivateLesson = ""
      this.weeklyExam = ""
      this.onceExam = ""
      this.installability = "false"
    }
  },
  mounted() {
    this.getPackages();
  }
};
</script>

<style lang="sass" scoped>
ul
    list-style-type: none
.card
    width: 240px
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
    & input label
        display: inline-block
</style>
