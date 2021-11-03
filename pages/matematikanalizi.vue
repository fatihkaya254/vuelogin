<template lang="pug">
.container
    .head
        .headerContainer
            .header
                .title
                    label matematikanalizi.com
                .nav
                    label Hakkımızda
                    label Ücretler
                    label İletişim
    .content
        .firstRow
            .form
                .label
                    label(style="color:white;") Bize Ulaşın 
                .label
                    input(typte="text" id="name" placeholder="Ad Soyad")
                .label
                    input(typte="tel" id="phone" placeholder="Telefon Numarası")
                .label
                    .infoRequest  
                        label Bilgi Almak İstiyorum
            .whatIs
                .prices
                    .arrow
                        fa-icon(:icon="['fas', 'chevron-left']" @click="otherPrice(0)")
                    .priceInfo
                        h1
                            | {{prices[priceStep].title}}
                        p
                            | {{prices[priceStep].desc}}
                        label
                            | Detaylar
                    .arrow
                        fa-icon(:icon="['fas', 'chevron-right']" @click="otherPrice(1)")

        .secondRow
            .whatWeDo Matematik Analizi Nedir?
            .whatWeDo(style="background:none;")
                iframe(src="https://player.vimeo.com/video/641853725?h=a78aa06be3&amp;badge=0&amp;controls=0&amp;autoplay=1&amp;player_id=0&amp;app_id=58479&title=0&color=218da6&byline=0&portrait=0" frameborder="0" allow="fullscreen; picture-in-picture" allowfullscreen style="width:100%;height:100%;min-height:300px" title="Doğru Kaynak")

    .background
        img(src="https://source.unsplash.com/AZrBFoXP_3I")
    .overlay

</template>

<script>
export default {
  head() {
    return {
      script: [
        {
          src: "https://player.vimeo.com/api/player.js"
        }
      ]
    };
  },
  data() {
    return {
      prices: {
        0: {
          title: "Analiz 90₺",
          desc:
            "Matematik Analizi tarafından hazırlanan test üzerinden öğrencinin analizi yapılır. Analiz İşleyen Zihinler'de yüz yüze olarak gerçekleştirilir."
        },
        1: {
          title: "Özel Ders 100₺/Saat",
          desc:
            "Analiz sonrasında öğrencinin grup ders planlaması yapılır. Öğrenciye grup öncesinde analiz yapan öğretmenin gerekli görmesi durumunda özel ders takviyesi planlanır. Özel dersler haftasonunda verilir."
        },
        2: {
          title: "Grup Ders Programı 700₺/Ay",
          desc:
            "Haftada 3 matematik. Sadece PAZAR günü saat 9 ile 18 arasında 3 saat olacak şekilde planlanır. Derse giren öğretmenle iletişim sağlanması için öğretmenin numarsı veli ile paylaşılır."
        }
      },
      priceStep: 0
    };
  },
  methods: {
    otherPrice: function(addition) {
      if (addition) {
        this.priceStep = (this.priceStep + 1) % 3;
      } else {
        if (this.priceStep == 0) this.priceStep = 3;
        this.priceStep = (this.priceStep - 1) % 3;
      }
    }
  }
};
</script>

<style lang="sass" scoped>

@font-face
    font-family: 'MuseoModerno'
    src: url('../assets/fonts/MuseoModerno-Medium.woff2') format('woff2'), url('../assets/fonts/MuseoModerno-Medium.woff') format('woff')
    font-weight: 500
    font-style: normal
    font-display: swap

$green: #40af58
$blue: #218da6

.firstRow
    display: flex
    gap: 50px
.secondRow
    display: flex
    gap: 50px
    height: 300px
.whatIs
    height: 200px
    width: 90%
    background: white
    border-radius: 1em
    animation: slideshow 20s linear infinite
    display: flex
    justify-content: center
    align-items: center
.whatWeDo
    height: 100%
    width: 100%
    background: white
    border-radius: 1em
    animation: slideshow 20s linear infinite
    display: flex
    justify-content: center
    align-items: center
.prices
    width: 100%
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    gap: 20px

.priceInfo
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    width: 90%
    padding: 10px

.arrow
    transition: all 0.1s ease
    width: 5%
    text-align: center
    font-size: 16pt
    cursor: pointer
    &:hover
        opacity: 40%
.form
    height: 200px
    width: 300px
    border-radius: 1em
    display: flex
    flex-direction: column
    justify-content: space-evenly
    align-items: center
    background: $blue
.label
    width: 80%
    input
        height: 30px
        border: none
        width: 100%
        border-radius: 1em
        text-align: center
.infoRequest
        height: 30px
        box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px
        border: none
        width: 100%
        border-radius: 1em
        background-color: white
        display: flex
        justify-content: center
        align-items: center
        cursor: pointer
        font-size: 11pt
        label
            cursor: pointer
        &:hover
            background-color: $green
            color: white
.overlay
    height: 100vh
    width: 100vw
    position: fixed
    z-index: -1
    top: 0
    left: 0
    background: black
    opacity: 60%
.background
    background-color: $green
    height: 100vh
    position: fixed
    z-index: -2
    top: 0
    left: 0
    img
        min-width: 100%
        min-height: 100%
        position: fixed
        z-index: -2
.headerContainer
    display: flex
    width: 100%
    justify-content: center
    align-items: center
    background: $green
    background: linear-gradient(90deg, $green 0%, $blue 100%)
.header
    width: 100%
    max-width: 1350px
    height: 70px
    display: flex
    padding: 20px
.content
    padding-top: 20px
    width: 100%
    max-width: 1350px
    margin: auto
    gap: 60px
    display: flex
    flex-direction: column
.title
    height: 100%
    width: 20%
    font-family: 'MuseoModerno'
    display: flex
    justify-content: center
    align-items: center
    color: white
    font-size: 16pt
.nav
    font-family: 'MuseoModerno'
    height: 100%
    width: 80%
    align-items: center
    justify-content: flex-end
    display: flex
    font-size: 14pt
    color: white
    gap: 20px
</style>
