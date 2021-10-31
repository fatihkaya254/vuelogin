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
                    h1
                        | Analiz 90₺
                    p
                        | Matematik Analizi tarafından hazırlanan test üzerinden öğrencinin analizi yapılır. Analiz İşleyen Zihinler'de yüz yüze olarak gerçekleştirilir.
                    label
                        | Detaylar
    .background
        img(src="https://source.unsplash.com/AZrBFoXP_3I")
    .overlay

</template>

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

.whatIs
    height: 200px
    width: 90%
    background: white
    border-radius: 1em
    animation: slideshow 20s linear infinite
    display: flex
    justify-content: center
    align-items: center

.prices
    background-color: red
    width: 100%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center


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
