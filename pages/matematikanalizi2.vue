<template lang="pug">
.container
    .head
        .headerContainer
            .header
                .title
                    label matematikanalizi.com
    .promotion-carousel
     .promotions
       div
         #section1.promotion(style='background-image: url(https://picsum.photos/1440/900?image=319)')
            .shade
            .promo-detail.cycle-overlay
             .promo-text
                .forMobile
                span.dash
                span.promo-flag 4, 5 ve 6. Sınıflar İçin
                a.copy(href='#')
                 .headline Matematik Analizi Nedir?
                 p.body.long Season Finale: Sacha Baron Cohen explores our unique nation.
                .buttons
                 a.button.sho-play-link(href='#' style="background: none;") Daha Fazla Oku
                .form
                    .label
                        input(typte="text" id="name" placeholder="Ad Soyad")
                    .label
                        input(typte="tel" id="phone" placeholder="Telefon Numarası")
                    .label
                        .infoRequest  
                            label Bilgi Almak İstiyorum
         #section2.promotion(style='background-image: url(https://picsum.photos/1440/900?image=325)')
           .shade
           .promo-detail.cycle-overlay
             .promo-text
               span.dash
               span.promo-flag Season 9 Premieres September 9
               a.copy(href='#')
                 .headline Shameless
                 p.body.long
                   | A scrappy, fiercely loyal Chicago family makes no apologies. Watch Seasons 1-8 now.
               .buttons
                 a.button.info-button(href='#') More Info
         #section3.promotion(style='background-image: url(https://picsum.photos/1440/900?image=22)')
           .shade
           .promo-detail.cycle-overlay
             .promo-text
               span.dash
               a.copy(href='#')
                 .headline Baby Driver
                 p.body.long
                   | A young getaway driver (Ansel Elgort) meets the girl of his dreams (Lily James), and tries to ditch his criminal life.
               .buttons
                 a.button.sho-play-link(href='#') Play Now
                 a.button.info-button(href='#') More Info
         #section4.promotion(style='background-image: url(https://picsum.photos/1440/900?image=841)')
           .shade
           .promo-detail.cycle-overlay
             .promo-text
               span.dash
               a.copy(href='#')
                 .headline.medium Our Cartoon President
                 p.body.long
                   | Season Finale - Militarization: Our Cartoon President militarizes the government.
               .buttons
                 a.button.sho-play-link(href='#') Play Now
                 a.button.info-button(href='#') More Info
                 a.button.see-all(href='#') All Episodes
         #section5.promotion(style='background-image: url(https://picsum.photos/1440/900?image=832)')
           .shade
           .promo-detail.cycle-overlay
             .promo-text
               span.dash
               a.copy(href='#')
                 .headline.medium Captain Fantastic
                 p.body.long
                   | A father (Viggo Mortensen) raising his six kids is forced to leave his paradise, challenging his idea of what it means to be a parent.
               .buttons
                 a.button.sho-play-link(href='#') Play Now
                 a.button.info-button(href='#') More Info
         #section6.promotion(style='background-image: url(https://picsum.photos/1440/900?image=804)')
           .shade
           .promo-detail.cycle-overlay
             .promo-text
               span.dash
               a.copy(href='#')
                 .headline Home Again
                 p.body.long
                   | Newly single Alice (Reese Witherspoon) meets three aspiring filmmakers in need of a place to stay.
               .buttons
                 a.button.sho-play-link(href='#') Play Now
                 a.button.info-button(href='#') More Info
         #section7.promotion(style='background-image: url(https://picsum.photos/1440/900?image=786)')
           .shade
           .promo-detail.cycle-overlay
             .promo-text
               span.dash
               a.copy(href='#')
                 .headline The Affair
                 p.body.long
                   | Noah, Alison, Helen and Cole are on separate journeys, but question what they&rsquo;re holding on to as their lives keep crashing back into one another.
               .buttons
                 a.button.info-button(href='#') More Info
         #section8.promotion(style='background-image: url(https://picsum.photos/1440/900?image=660)')
           .shade
           .promo-detail.cycle-overlay
             .promo-text
               span.dash
               a.copy(href='#')
                 .headline.medium The Girl On The Train
                 p.body.long
                   | A woman (Emily Blunt), devastated by her divorce, becomes entangled in a mystery after witnessing a shocking event.
               .buttons
                 a.button.sho-play-link(href='#') Play Now
                 a.button.info-button(href='#') More Info
         #section9.promotion(style='background-image: url(https://picsum.photos/1440/900?image=619)')
           .shade
           .promo-detail.cycle-overlay
             .promo-text
               span.dash
               a.copy(href='#')
                 .headline Rosewater
                 p.body.long A journalist gets arrested in Iran and is held and tortured for 118 days.
               .buttons
                 a.button.sho-play-link(href='#') Play Now
                 a.button.info-button(href='#') More Info
         #section10.promotion(style='background-image: url(https://picsum.photos/1440/900?image=596)')
           .shade
           .promo-detail.cycle-overlay
             .promo-text
               span.dash
               a.copy(href='#')
                 .headline WWII Collection
                 p.body.long
                   | This collection features films that all take place during the cataclysmic World War II era. Take the time to watch them all.
               .buttons
                 a.button.see-all(href='#') See Entire Collection
    .contactButtons
        .contact(@click="contact('m')")
            fa-icon(:icon="['fas', 'map-marked-alt']")
        .contact(@click="contact('w')")
            fa-icon(:icon="['fab', 'whatsapp']")
    .frame
        iframe(src="https://player.vimeo.com/video/641853725?h=a78aa06be3&amp;playsinline=0&amp;badge=0&amp;loop=1&amp;muted=1&amp;controls=0&amp;autoplay=1&amp;player_id=0&amp;app_id=58479&title=0&color=218da6&byline=0&portrait=0" frameborder="0" allow="fullscreen; picture-in-picture" allowfullscreen title="Doğru Kaynak")
    .navigation
     ul
       li
         a(href='#section1' data-number='1')
       li
         a(href='#section2' data-number='2')
       li
         a(href='#section3' data-number='3')
       li
         a(href='#section4' data-number='4')
       li
         a(href='#section5' data-number='5')
       li
         a(href='#section6' data-number='6')
       li
         a(href='#section7' data-number='7')
       li
         a(href='#section8' data-number='8')
       li
         a(href='#section9' data-number='9')
       li
         a(href='#section10' data-number='10')

</template>

<script>
import $ from "jquery";
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
    },
    contact: function (where) {
        if(where == "w") window.open("https://wa.me/905316908590?text=Matematikanalizi%20hakkında%20bilgi%20almak%20istiyorum", "_blank");
        if(where == "m") window.open("https://www.google.com/maps/place/%C4%B0%C5%9Fleyen+Zihinler/@40.9855671,29.0341941,17z/data=!3m2!4b1!5s0x14cab87ae30e302d:0x75a9cfc6ad9589a1!4m5!3m4!1s0x14cab9a9cc4aa989:0xcec15f344c1e148b!8m2!3d40.9855631!4d29.0363828", "_blank");
        
    }
  },
  mounted() {
    const ele = ".promotion-carousel";
    const $window = $(window);
    const viewportHeight = $window.height();

    let ui = {
      promo: ele + " .promotion",
      promoText: ele + " .promo-text",
      navigationItems: ".navigation a"
    };

    function isOnScreen(el) {
      const viewport = {
        top: $window.scrollTop()
      };

      viewport.bottom = viewport.top + viewportHeight;

      const bounds = el.offset();
      bounds.bottom = el.offset().top + el.outerHeight();

      return !(viewport.bottom < bounds.top || viewport.top > bounds.bottom);
    }

    class ScrollEvents {
      run() {
        const $promo = $(".promotion");
        const $promoText = $(".promo-text");

        function smoothScroll(target) {
          $("body, html").animate({ scrollTop: target.offset().top }, 600);
        }

        $(ui.navigationItems).on("click", e => {
          e.preventDefault();
          smoothScroll($(e.currentTarget.hash));
        });

        $window.on("scroll", () => {
          $(ui.promo)
            .toArray()
            .forEach(el => {
              const $el = $(el);
              if (isOnScreen($el)) {
                this.scrolly($el);
              }
            });
          this.updateNavigation();
          this.fadeAtTop($(ui.promoText));
        });

        this.updateNavigation();
      }

      scrolly(el) {
        const topOffset = el.offset().top;
        const height = el.height();
        let scrollTop = $window.scrollTop();
        const maxPixels = height / 4;
        const percentageScrolled = (scrollTop - topOffset) / height;
        let backgroundOffset = maxPixels * percentageScrolled;

        backgroundOffset = Math.round(
          Math.min(maxPixels, Math.max(0, backgroundOffset))
        );

        el.css(`background-position`, `right 0px top ${backgroundOffset}px`);
      }

      fadeAtTop(el) {
        const startPos = 0.25;

        el.toArray().forEach(el => {
          const $el = $(el);
          let position =
            $el.offset().top - $window.scrollTop() + viewportHeight / 6;
          let opacity =
            position < viewportHeight * startPos
              ? (position / (viewportHeight * startPos)) * 1
              : 1;

          $el.css("opacity", opacity);
        });
      }

      updateNavigation() {
        $(ui.promo)
          .toArray()
          .forEach(el => {
            let $el = $(el);
            let activeSection =
              $(`.navigation a[href="#${$el.attr("id")}"]`).data("number") - 1;

            if (
              $el.offset().top - $window.height() / 2 < $window.scrollTop() &&
              $el.offset().top + $el.height() - $window.height() / 2 >
                $window.scrollTop()
            ) {
              $(ui.navigationItems)
                .eq(activeSection)
                .addClass("active");
            } else {
              $(ui.navigationItems)
                .eq(activeSection)
                .removeClass("active");
            }
          });
      }
    }

    const scrollEvents = new ScrollEvents();

    scrollEvents.run();
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:400,900");

$red: #218da6;
$redHover: #40af58;
$white: #fff;
$black: #000;

body,
html {
  border: 0;
  font-family: "Roboto", Arial, sans-serif;
  line-height: 1.5;
  margin: 0;
  padding: 0;
  background-color: $black;
  color: $white;
}

a {
  color: $white;
  text-decoration: none;
}

.promotion-carousel {
  .promotions {
    width: 100%;
    height: 100%;
  }

  .promotion {
    width: 100%;
    height: 100vh;
    min-height: 600px;
    position: relative;
    background-size: cover;
    background-position: top right;
    background-repeat: no-repeat;
    overflow: hidden;

    .shade {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.5) 0,
        rgba(0, 0, 0, 0) 50%
      );
    }
  }
}

.promo-text {
  color: $white;
  position: relative;

  .copy {
    display: block;
  }
}

.promo-detail {
  position: absolute;
  left: 0;
  top: 50%;
  z-index: 100;
  width: 85%;
  margin-left: 30px;
  padding: 10% 10% 10% 0;
  transform: translate(0, -50%);

  @media (min-width: 1280px) {
    margin-left: 90px;
  }

  @media (min-width: 1440px) {
    width: 550px;
  }

  .headline {
    font-weight: 900;
    font-size: 22px;
    line-height: 1.15;
    margin-bottom: 5px;
    text-transform: uppercase;
  }

  .body {
    font-size: 14px;
    line-height: 1.3;
    margin-bottom: 5px;
    text-transform: none;
  }

  .buttons {
    padding: 15px 0;
  }

  .button {
    box-sizing: content-box;
    height: auto;
    line-height: 1;
    padding: 15px 20px;
    width: auto;
    display: inline-block;
    cursor: pointer;
    label {
      cursor: pointer;
    }
  }

  .button:first-child {
    background: $red;

    &:hover {
      border-color: $redHover;
      background-color: $redHover;
    }
  }

  .dash {
    background: $red;
    display: block;
    height: 3px;
    margin-bottom: 10px;
    width: 30px;
  }

  .promo-flag {
    background: 0 0;
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 8px;
    position: relative;
    text-transform: uppercase;
    display: inline-block;
  }
}

@media (min-width: 668px) {
  .promo-detail {
    width: 450px;

    .headline {
      font-size: 36px;
      line-height: 1.1;
    }

    .body {
      font-size: 14px;
      margin-bottom: 0;
      text-transform: none;
    }
  }
}

@media (min-width: 840px) {
  .promo-detail {
    .headline {
      font-size: 42px;
    }

    .body {
      font-size: 18px;
    }
  }
}

@media (min-width: 1024px) {
  .promo-detail {
    .dash {
      display: block;
      height: 3px;
      margin-bottom: 15px;
      width: 30px;
    }

    .headline {
      font-weight: 600;
      font-size: 56px;
      line-height: 0.85;
      margin-bottom: 15px;
      margin-left: -2px;

      &.medium {
        font-size: 50px;
      }

      &.long {
        font-size: 40px;
      }
    }

    .body {
      font-size: 18px;
      line-height: 1.4;
    }

    .button {
      padding: 12px;
    }
  }
}

@media (min-width: 1440px) {
  .promo-detail {
    .dash {
      height: 4px;
      width: 40px;
    }

    .headline {
      font-size: 66px;

      &.medium {
        font-size: 56px;
        line-height: 1;
      }

      &.long {
        font-size: 46px;
        line-height: 1;
      }
    }

    .promo-flag {
      font-size: 18px;
      line-height: 18px;
    }

    .body {
      font-size: 24px;
      margin-bottom: 15px;
    }
  }
}
.contactButtons {
  .contact{
      width: 100%;
      text-align: center;
      height: 40px;
      padding-top: 5px;
      :hover{
          color: $red;
      }
  }
  width: 40px;
  height: 120px;
  z-index: 9999;
  position: fixed;
  bottom: 120px;
  right: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  @media screen and (max-width: 800px) {
    font-size: 20pt;
    color: white;
    bottom: 40px;
    right: 5px;
  }
}

.frame {
  z-index: 9999;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 20%;
  @media screen and (max-width: 800px) {
    top: 110px;
    right: 15px;
  }
  iframe {
    width: 32vw;
    height: 32vw;
    @media screen and (max-width: 800px) {
        width: 180px;
        height: 100px;
    }
  }
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    position: relative;
    width: 8px;
    height: 8px;
    margin: 15px 0;
    @media screen and (max-width: 800px) {
      width: 14px;
      height: 8px;
      margin: 20px 0;
    }
    a {
      background-color: $white;
      border-radius: 100%;
      height: 100%;
      width: 100%;
      display: block;
      transition: 0.2s ease;
      @media screen and (max-width: 800px) {
        border-radius: 4px;
      }
      &.active {
        background-color: $red;
      }
    }
  }
}

.navigation {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 50px;
  @media screen and (max-width: 800px) {
    right: 15px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    position: relative;
    width: 8px;
    height: 8px;
    margin: 15px 0;
    @media screen and (max-width: 800px) {
      width: 14px;
      height: 8px;
      margin: 20px 0;
    }
    a {
      background-color: $white;
      border-radius: 100%;
      height: 100%;
      width: 100%;
      display: block;
      transition: 0.2s ease;
      @media screen and (max-width: 800px) {
        border-radius: 4px;
      }
      &.active {
        background-color: $red;
      }
    }
  }
}
</style>
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
    display: flex
    flex-direction: column
    justify-content: space-evenly
    border-style: solid
    border-color: white
    border-width: 2px
    border-left: 0
    border-right: 0
.label
    width: 80%
    input
        height: 30px
        border: none
        width: 100%
        text-align: center
.infoRequest
        height: 30px
        box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px
        border: none
        width: 100%
        background-color: $blue
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
.head
    position: fixed
    top: 0
    left: 0
    z-index: 99999
    width: 100%
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
    height: 50px
    display: flex
    padding: 20px
    @media screen and (max-width: 840px)
        height: 30px
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
    width: 100%
    font-family: 'MuseoModerno'
    display: flex
    justify-content: center
    align-items: center
    color: white
    font-size: 16pt
    @media screen and (max-width: 840px)
        font-size: 12pt
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

.forMobile
    @media screen and (max-width: 840px)
        height: 65px
        width: 50px

.container
    background: linear-gradient(90deg, $green 0%, $blue 100%)
</style>
