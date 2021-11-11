<template lang="pug">
div
    .form
        .formContent
            p(@click="create()") hello invoice
            label İsim
            input(type="text" maxlength="35" v-model="fullName" placeholder="Tam İsim")
            label Adres Satırı 1
            input(type="text" maxlength="35" v-model="a1" placeholder="")
            label Adres Satırı 2
            input(type="text" maxlength="35" v-model="a2" placeholder="")
            label Adres Satırı 3
            input(type="text" maxlength="35" v-model="a3" placeholder="")
            label Vergi Dairesi
            input(type="text" maxlength="35" v-model="taxOffice" placeholder="Vergi Dairesi")
            label Vergi Numarası
            input(type="text" maxlength="35" v-model="taxNumber" placeholder="Vergi Numarası")
            label Tarih
            input(type="date" maxlength="35" v-model="date" placeholder="Tarih")
            label Açıklama
            input(type="text" maxlength="35" v-model="desc" placeholder="Açıklama")
            label Miktar
            input(type="text" maxlength="35" v-model="quantity" placeholder="Miktar")
            label Fiyat
            input(type="text" maxlength="35" v-model="fee" placeholder="Fiyat")
            label Tutar
            input(type="text" maxlength="35" v-model="total" placeholder="Tutar")
            input(type="text" maxlength="35" v-model="spell" placeholder="Yalnız")
            input(type="submit" value="Oluştur" @click="create()")
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { jsPDF } from "jspdf";
import { myFont } from "../plugins/invoicefont";
export default {
  data() {
    return {
      total: "",
      spell: "",
      myFont: this.$store.state.invoiceFont
    };
  },
  watch: {
    total: function(value) {
      this.total = value.replace(/[^0-9.]/g, "");
      var s = [];
      let spells = [];
      spells[0] = [
        "",
        "bir",
        "iki",
        "üç",
        "dört",
        "beş",
        "altı",
        "yedi",
        "sekiz",
        "dokuz"
      ];
      spells[1] = [
        "",
        "on",
        "yirmi",
        "otuz",
        "kırk",
        "elli",
        "altmış",
        "yetmiş",
        "seksen",
        "doksan"
      ];
      spells[2] = [
        "",
        "yüz",
        "ikiyüz",
        "üçyüz",
        "dörtyüz",
        "beşyüz",
        "altıyüz",
        "yediyüz",
        "sekizyüz",
        "dokuzyüz"
      ];
      spells[3] = ["", "bin", "milyon", "milyar", "trilyon", "katrilyon"];
      if (value.split(".")[1] != undefined) {
        var decimalPart = value.split(".")[1];
        var decimal = decimalPart.split("");
        var decimalReverse = decimal.reverse();
        if (decimalReverse.length > 2)
          this.total = value.substr(0, value.length - 1);
        if (decimalReverse[0] + decimalReverse[1] != 0) s.push("KURUŞ");
        for (var i = 0; i < decimalReverse.length; i++) {
          var digit = i % 3;
          var figure = parseInt(decimalReverse[i], 10);
          s.push(spells[digit][figure]);
        }
      }
      var wholePart = value.split(".")[0];
      var whole = wholePart.split("");
      var wholeReverse = whole.reverse();
      s.push("TL");
      var spell = "";
      for (var i = 0; i < wholeReverse.length; i++) {
        var thousand = 0;
        if (
          i % 3 == 0 &&
          (wholeReverse[i] != 0 ||
            wholeReverse[i + 1] != 0 ||
            wholeReverse[i + 2] != 0)
        )
          thousand = parseInt(i / 3, 10);
        var digit = i % 3;
        var figure = parseInt(wholeReverse[i], 10);
        if (thousand == 1 && figure == 1) {
          s.push(spells[3][thousand]);
        } else {
          s.push(spells[digit][figure] + spells[3][thousand]);
        }
      }
      var sr = s.reverse();
      for (var i = 0; i < sr.length; i++) {
        spell += s[i];
      }
      this.spell = spell;
    }
  },
  computed: {
    fullName: {
      get() {
        return this.iFullName();
      },
      set(value) {
        this.setiFullName(value);
      }
    },
    taxOffice: {
      get() {
        return this.iTaxOffice();
      },
      set(value) {
        this.setiTaxOffice(value);
      }
    },
    taxNumber: {
      get() {
        return this.iTaxNumber();
      },
      set(value) {
        this.setiTaxNumber(value);
      }
    },
    date: {
      get() {
        var date = this.iDate();
        var month = date.getMonth() + 1;
        var inputForm = date.getFullYear() + "-" + month + "-" + date.getDate();
        return inputForm;
      },
      set(value) {
        var date = new Date(value);
        this.setiDate(date);
        console.log(this.iDate());
      }
    },
    desc: {
      get() {
        return this.iDesc();
      },
      set(value) {
        this.setiDesc(value);
      }
    },
    quantity: {
      get() {
        return this.iQuantity();
      },
      set(value) {
        this.setiQuantity(value);
      }
    },
    fee: {
      get() {
        var total = parseFloat(this.iFee(), 10) * 1.08;
        console.log(total);
        this.total = "" + total;
        var fee = this.iFee().replace(/[^0-9.]/g, "");
        var checkFee = fee.split(".");
        if (checkFee[1] != undefined && checkFee[1].length > 2) {
          var fee = fee.substr(0, checkFee[0].length + 3);
        }
        return fee;
      },
      set(value) {
        var total = parseFloat(value, 10) * 1.08;
        console.log(total);
        this.total = "" + total;
        this.setiFee(value);
      }
    },
    a1: {
      get() {
        return this.ia1();
      },
      set(value) {
        this.setia1(value);
      }
    },
    a2: {
      get() {
        return this.ia2();
      },
      set(value) {
        this.setia2(value);
      }
    },
    a3: {
      get() {
        return this.ia3();
      },
      set(value) {
        this.setia3(value);
      }
    },
    userId: {
      get() {
        return this.iUserId();
      },
      set(value) {
        this.setiUserId(value);
      }
    }
  },
  methods: {
    ...mapGetters("economics", [
      "iFullName",
      "iTaxOffice",
      "iTaxNumber",
      "iDate",
      "iDesc",
      "iQuantity",
      "iFee",
      "ia1",
      "ia2",
      "ia3",
      "iUserId"
    ]),
    ...mapActions("economics", [
      "setiFullName",
      "setiTaxOffice",
      "setiTaxNumber",
      "setiDate",
      "setiDesc",
      "setiQuantity",
      "setiFee",
      "setia1",
      "setia2",
      "setia3",
      "setiUserId"
    ]),
    ...mapActions("users", ["changeUserInfo"]),
    record: function() {
      console.log(this.iUserId());
      const changes = {
        id: this.iUserId(),
        where: "invoiceInfo",
        value: {
          addressLine1: this.ia1(),
          addressLine2: this.ia2(),
          addressLine3: this.ia3(),
          taxOffice: this.iTaxOffice(),
          taxNumber: this.iTaxNumber()
        }
      };
      this.changeUserInfo(changes);
      this.gPop = false;
    },
    create: function() {
      this.record();
      const doc = new jsPDF();
      doc.addFileToVFS("MyFont.ttf", myFont());
      doc.addFont("MyFont.ttf", "MyFont", "normal");
      doc.setFont("MyFont");
      doc.setFontSize(10);
      doc.text(this.fullName, 25, 73);
      doc.text(this.a1, 15, 79);
      doc.text(this.a2, 15, 85);
      doc.text(this.a3, 15, 91);
      doc.text(this.taxOffice, 40, 106);
      doc.text(this.taxNumber, 40, 115);
      doc.text(this.desc, 15, 140);
      doc.text(this.spell, 25, 250);
      doc.text(this.date, 164, 92);
      doc.text(this.quantity, 124, 140);
      doc.text(this.fee, 148, 140);
      doc.text(this.total, 175, 140);
      doc.text(this.fee, 155, 250);
      doc.text(""+((this.total*100) - (this.fee*100))/100, 155, 257);
      doc.text(this.total, 155, 264);
      doc.save(this.fullName + "-" + this.date + ".pdf");
    }
  }
};
</script>

<style lang="sass" scoped>
@import url(https://fonts.googleapis.com/css?family=Montserrat)

.form
    font-family: montserrat, arial, verdana
    width: 600px
    min-height: 200px
    background-color: #9ca9e3a8
    margin-top: 15px
    border-radius: 1em
    padding: 10px
    box-shadow: 0px 10px 30px rgba(70, 0, 0, .3)

.formContent
    display: flex
    flex-direction: column

input
    width: 100%
    line-height: 150%
    font-family: montserrat, arial, verdana
    padding: 7px 10px
    border: none

input[type="submit"]
    cursor: pointer
    margin-top: 5px
    &:hover
        background-color: #edd0d0

label
    font-family: montserrat, arial, verdana
    font-size: 10pt
    margin: 5px
</style>
