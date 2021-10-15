<template lang="pug">
div
    .form
        .formContent
            p(@click="create()") hello invoice
            input(type="text" maxlength="35" placeholder="Tam İsim")
            input(type="text" maxlength="35" placeholder="Vergi Dairesi")
            input(type="text" maxlength="35" placeholder="Vergi Numarası")
            input(type="text" maxlength="35" placeholder="Tarih")
            input(type="text" maxlength="35" placeholder="Açıklama")
            input(type="text" maxlength="35" placeholder="Miktar")
            input(type="text" maxlength="35" placeholder="Fiyat")
            input(type="text" maxlength="35" v-model="total" placeholder="Tutar")
            input(type="text" maxlength="35" v-model="spell" placeholder="Yalnız")
            input(type="text" maxlength="35" placeholder="")
</template>

<script>
import { jsPDF } from "jspdf";
import { myFont } from "../plugins/invoicefont";
export default {
    data(){
        return{
            total:"",
            spell:"",
            myFont: this.$store.state.invoiceFont,
        }
    },
    watch:{
        total: function (value){
            this.total = value.replace(/[^0-9,]/g, "");
            var first = value.split(",")[0]
            var s = []
            let spells = []
            spells[0] = ["", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"];
            spells[1] = ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"];
            spells[2] = ["", "yüz", "ikiyüz", "üçyüz", "dörtyüz", "beşyüz", "altıyüz", "yediyüz", "sekizyüz", "dokuzyüz"];
            spells[3] = ["", "bin", "milyon", "milyar", "trilyon", "katrilyon"];
            if(value.split(",")[1] != undefined){
                var second = value.split(",")[1]
                var stotal = second.split("")
                var o = stotal.reverse()
                console.log(o.length);
                if(o.length > 2) this.total = value.substr(0, value.length-1)
                console.log(value.substr(0, value.length-1));
                s.push("KURUŞ")
                for (var i = 0; i < o.length; i++) {
                    var d = i%3 
                    var f = parseInt(o[i], 10)
                    s.push(spells[d][f])
                }
            }
            var total = first.split("")
            var n = total.reverse()
            s.push("TL")
            var spell = ""
            for (var i = 0; i < n.length; i++) {
                var b = 0
                if( i%3 == 0 && n[i+2] != 0) b = parseInt((i)/3,10)
                var d = i%3 
                var f = parseInt(n[i], 10)
                if( b == 1 && f == 1){
                    s.push(spells[3][b])
                }else{
                    s.push(spells[d][f]+spells[3][b])
                }
            }
            s.push("yalnız")
            var ls = s.reverse()
            for(var i = 0; i< ls.length; i++){
                spell += s[i]
            }
            this.spell = spell
        }
    },
    methods: {

        create: function(){
            const doc = new jsPDF();
            doc.addFileToVFS("MyFont.ttf", myFont());
            doc.addFont("MyFont.ttf", "MyFont", "normal");
            doc.setFont("MyFont");
            doc.setFontSize(10)
            doc.text("Kıymet Doğan", 25, 73);
            doc.text("Adres", 15, 79);
            doc.text("Vergi Dairesi", 40, 106);
            doc.text("Vergi Numarası", 40, 115);
            doc.text("Açıklama", 15, 140);
            doc.text("yalnızyüzonbeştürklirası", 25, 250);
            doc.text("tarih", 164, 92);
            doc.text("miktar", 124, 140);
            doc.text("fiyat", 148, 140);
            doc.text("tutar", 175, 140);
            doc.text("toplam", 155, 250);
            doc.text("kdv", 155, 257);
            doc.text("geneltoplam", 155, 264);
            //doc.save("a4.pdf");
        }
    }
}
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
.formContent
    display: flex
    flex-direction: column

input
    width: 100%
    line-height: 150%
    font-family: montserrat, arial, verdana
    padding: 7px 10px
    border: none
</style>

