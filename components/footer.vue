<template lang="pug">

.footer
    .row
        .mainFooters 
            .subFootersL 
                .baslik 
                    p FIRSATLARI İLK SEN DUY
                .bulten
                    input#bulten(type="text", name="bulten", placeholder="ornek@mail.com")
                    input#aboneol(type="submit", value="ABONE OL")
            .subFootersL 
                .baslik 
                    p BİZİ SOSYAL MEDYADAN TAKİP ET
                .baslik
                    button.socialMedia
                        a(href="https://twitter.com/isleyenzihinler" target="_blank")
                            fa-icon(:icon="['fab', 'twitter']")
                    button.socialMedia
                        a(href="https://www.instagram.com/isleyenzihinler/" target="_blank")
                            fa-icon(:icon="['fab', 'instagram']")
                    button.socialMedia
                        a(href="https://www.youtube.com/c/%C4%B0%C5%9FleyenZihinler" target="_blank")
                            fa-icon(:icon="['fab', 'youtube']")
                    button.socialMedia
                        a(href="https://www.facebook.com/isleyenzihinler" target="_blank")
                            fa-icon(:icon="['fab', 'facebook-f']")
        .mainFooters
            .subFootersR 
                .baslik 
                    p ÖNEMLİ BAĞLANTILAR
                    .line
                    .links
                        p
                            a ANASAYFA
                        p
                            a HAKKIMIZDA
                        p
                            a GİZLİLİK SÖZLEŞMESİ
                        p
                            a HÜKÜMLER VE KOŞULLAR
                        p
                            a İADE POLİTİKASI
                        p
                            a İLETİŞİM
                        p
                            a PROFİL
            .subFootersR.logos 
                .baslik 
                    .payLogo
                        fa-icon(:icon="['fab', 'cc-visa']")
                .baslik 
                    .payLogo
                        fa-icon(:icon="['fab', 'cc-mastercard']")
        
    .row
        .bottomOfFooter
            .subFootersB 
                p © 2021 İŞLEYEN ZİHİNLER, TÜM HAKLARI SAKLIDIR
            .subFootersB 
                p İŞLEYEN ZİHİNLER TARAFINDAN YARATILDI
</template>

<script>

export default {
  imports: [
    {
      set: '@fortawesome/free-solid-svg-icons',
    }
  ]
};
</script>

<style lang="sass" scoped>
.payLogo
    font-size: 30pt

a 
  color: black
  text-decoration: none

@font-face
    font-family: 'Lemon/Milk light Regular'
    font-style: normal
    font-weight: normal
    src: local('Lemon/Milk light Regular'), url('../assets/fonts/LemonMilklight.woff') format('woff')

@keyframes bottomBorder
    from
        border-bottom: 0px solid black
    to
        border-bottom: 1px solid black

.footer
    justify-content: center
    //align-items: center
    text-align: center
    max-width: 1350px
    margin: auto
    border-top: 1px solid black
    font-family: 'Lemon/Milk light Regular'
    letter-spacing: 1px
    font-size: 12pt
    display: flex
    flex-direction: column
    @media screen and (max-width: 1200px)
        font-size: 10pt
.row
    display: flex
    @media screen and (max-width: 1200px)
        flex-direction: column

.mainFooters
    height: 360px
    width: 50%
    margin: auto
    @media screen and (max-width: 1200px)
        width: 90%
        height: 300px
        &:last-child
            height: 200px
    @media screen and (min-width: 1200px)
        float: left
        justify-content: space-between

.subFootersR
    height: 360px
    width: 49%
    margin-right: 2%
    @media screen and (max-width: 1200px)
        height: 120px
        width: 100%
    @media screen and (min-width: 1200px)
        float: left
.logos
    @media screen and (max-width: 1200px)
        margin-top: 30px
        display: flex
        flex-direction: row
        justify-content: center
        gap: 20px
.subFootersB
    height: 100%
    width: 49%
    margin-right: 2%
    text-align: left
    @media screen and (max-width: 1200px)
        text-align: center
        width: 100%
    @media screen and (min-width: 1200px)
        float: left
    & p
        top: 1
        padding: 8px

    &:last-child
        margin-right: 0
        text-align: right
        @media screen and (max-width: 1200px)
            text-align: center

.subFootersR:last-child
    margin-right: 0

.subFootersL
    height: 49%
    margin-bottom: 7.2px
    @media screen and (max-width: 1200px)
        height: 120px
    & p
        margin: 10px
        margin-left: 0px

    &:last-child
        margin-bottom: 0px

.bottomOfFooter
    height: 80px
    width: 100%
    letter-spacing: 3px
    display: flex
    @media screen and (max-width: 1200px)
        flex-direction: column
        margin-top: 36px
    @media screen and (min-width: 1200px)
        justify-content: space-between
        float: left
.bulten
    border: 1px solid #aeabab
    width: 70%
    margin-top: 20px
    @media screen and (max-width: 1200px)
        width: 100%
#bulten
    height: 36px
    width: 50%
    margin-left: 20px
    padding-left: 2%
    border: none
    background-color: rgba(0, 0, 0, 0 )
    &:focus
        outline: 0px
    @media screen and (max-width: 1200px)
        width: 50%

#aboneol
    height: 38px
    width: 35%
    border: none
    background-color: rgba(0, 0, 0, 0 )
    font-family: 'Lemon/Milk light Regular'
    @media screen and (max-width: 1200px)
        width: 35%

    &:hover
        background-color: black
        color: white
        cursor: pointer
    &:focus
        outline: 0px
        background-color: black
        color: white

.baslik
    border: 1px solid rgba(0, 0, 0, 0 )
    padding-top: 20px


.socialMedia
    color: black
    font-size: 20px
    height: 44px
    width: 44px
    background-color: rgba(0, 0, 0, 0 )
    border: 1px solid #aeabab
    margin: 16px
    margin-left: 0px
    border-radius: 100%

    &:hover
        background-color: black
        color: white
        cursor: pointer
        a
            color: white
    &:focus
        outline: 0px
        background-color: black
        color: white

.line
    border-bottom: 1px solid black

.links
    a
        padding-bottom: 1px
        background: linear-gradient(currentColor, currentColor) bottom / 0 .1em no-repeat
        transition: 0.3s background-size
        background-position: right bottom
        margin-bottom: 15px
        &:hover
            background-size: 100% .1em
            cursor: pointer
            background-position: left bottom
</style>
