<template lang="pug">
.chartes
    main.stats
        transition(
          v-on:before-enter="beforeEnter",
          v-on:enter="enter",
          v-bind:css="false"
        )
          img.charimage(src="@/assets/char.png")(v-show="onChar")
        .stats__header(:class="isEnter ? 'active' : '' ")(show="isHead")
          .stats__header-num
            p L&G
          .stats__header-name
            p
              | Öğrenme süreci ile ilgili her detayı kontrol edin
              span Gelişim İzleme Grafikleri
        ul.stats__list
          li.stats__item
            p.stats__item-num(:style="number" ) 65
            .stats__item-bar(:class="isEnter ? 'active' : '' " )(@click="isOpen = !isOpen")
          li.stats__item
            p.stats__item-num(:style="number" )  56
            .stats__item-bar(:class="isEnter ? 'active' : '' " )(@click="isOpen = !isOpen")
          li.stats__item
            p.stats__item-num(:style="number" )  50
            .stats__item-bar(:class="isEnter ? 'active' : '' " )(@click="isOpen = !isOpen")
          li.stats__item
            p.stats__item-num(:style="number" )  32
            .stats__item-bar(:class="isEnter ? 'active' : '' " )(@click="isOpen = !isOpen")
          li.stats__item
            p.stats__item-num(:style="number" )  38
            .stats__item-bar(:class="isEnter ? 'active' : '' " )(@click="isOpen = !isOpen")
          li.stats__item
            p.stats__item-num(:style="number" )  32
            .stats__item-bar(:class="isEnter ? 'active' : '' " )(@click="isOpen = !isOpen")
          li.stats__item
            p.stats__item-num(:style="number" )  51
            .stats__item-bar(:class="isEnter ? 'active' : '' " )(@click="isOpen = !isOpen")
          li.stats__item
            p.stats__item-num(:style="number" )  50
            .stats__item-bar(:class="isEnter ? 'active' : '' " )(@click="isOpen = !isOpen")
        .stats__overlay(:class="isOpen ? 'active' : '' " )
          .stats__overlay-back(@click="isOpen = !isOpen")
            svg(
              fill="white",
              xmlns="http://www.w3.org/2000/svg",
              width="36",
              height="36",
              viewbox="0 0 36 36"
            )
              path(
                d="M30 16.5H11.74l8.38-8.38L18 6 6 18l12 12 2.12-2.12-8.38-8.38H30v-3z"
              )
            p#year 2009-2010
          .stats__overlay-avg
            p#avg.avg 0.69
            p Konu Tamamlama Derecesi
          .stats__overlay-info
            .stats__overlay-info-half
              p#goals %50
              p Üslü İşlemler
            .stats__overlay-info-half
              p#games %72
              p Üslü Denklemler
            .stats__overlay-info-half
              p#games %72
              p Bilimsel Gösterim
            .stats__overlay-info-half
              p#games %72
              p 10'un Kuvveti Biçimde Yazma

</template>

<script>
export default {
  mounted: function () {
    console.log("mounted");
    this.$nextTick(function () {
      setTimeout(() => {
        this.isEnter = true;
      }, 800);
      setTimeout(() => {
        this.number.opacity = 1;
      }, 900);
      setTimeout(() => {
        this.isTitle = true;
      }, 400);
      setTimeout(() => {
        this.onChar = true;
      }, 100);
    });
  },
  data() {
    return {
      data: [
        {
          year: "2007-2008",
          goals: "65",
          games: "82",
          avg: "0.79",
        },
        {
          year: "2008-2009",
          goals: "56",
          games: "79",
          avg: "0.7",
        },
        {
          year: "2009-2010",
          goals: "50",
          games: "72",
          avg: "0.69",
        },
        {
          year: "2010-2011",
          goals: "32",
          games: "79",
          avg: "0.40",
        },
        {
          year: "2011-2012",
          goals: "38",
          games: "78",
          avg: "0.48",
        },
        {
          year: "2012-2013",
          goals: "32",
          games: "48",
          avg: "0.66",
        },
        {
          year: "2013-2014",
          goals: "51",
          games: "78",
          avg: "0.65",
        },
        {
          year: "2014-2015",
          goals: "50",
          games: "76",
          avg: "0.66",
        },
      ],
      isEnter: false,
      isOpen: false,
      onChar: false,
      number: {
        opacity: 0,
      },
    };
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0;
      el.style.marginBottom = "-50px";
    },
    enter: function (el, done) {
      el.style.marginBottom = 0
      el.style.opacity = 1
      done()
    },
  },
  watch: {},
};

</script>

<style lang="scss">
$spacing: 25px;
$heights: (65, 56, 50, 32, 38, 32.1, 51, 50.1);

* {
  box-sizing: border-box;
}

.chartes {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 75vh;
  line-height: 1.5;
  font-family: "Lato";
  -webkit-font-smoothing: antialiased;
  color: white;
  background-color: #ff6262;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.stats {
  position: relative;
  padding: 0 $spacing;
  margin-left: 50vh;
  @media (max-width: 690px) {
    width: 100%;
  }

  &__header {
    display: flex;
    align-items: center;
    transform: translate3d(0, -150px, 0);
    opacity: 0;
    transform-origin: left center;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    margin-left: -50vh;
    &.active {
      transform: none;
      opacity: 1;
    }
  }

  &__header-num {
    margin-right: $spacing;

    p {
      font-size: 62px;
      margin: 0;
      font-weight: 700;
    }
  }

  &__header-name {
    p {
      color: mix(crimson, white, 20);
      margin: 0;
      font-size: 16px;
    }

    span {
      display: block;
      color: white;
      font-weight: 700;
      font-size: 24px;
      line-height: 1;
    }
  }

  &__item {
    height: 400px;
    display: flex;
    flex-direction: column-reverse;
    float: left;
    position: relative;
    text-align: center;
    margin-right: $spacing * 1.5;
    perspective: 1000px;
    transition: all 0.3s ease-in-out;

    @each $height in $heights {
      $i: index($heights, $height);
      &:nth-of-type(#{$i}) .stats__item-bar {
        height: ($height) * 4px;
        transition-delay: $i * 0.1s;
      }
    }

    &:last-child {
      margin-right: 0;
    }

    @media (max-width: 690px) {
      float: none;
      height: auto;
      width: 100%;

      @each $height in $heights {
        $i: index($heights, $height);
        &:nth-of-type(#{$i}) .stats__item-bar {
          width: ($height) * 1%;
          height: 30px;
          transition-delay: $i * 0.1s;
        }
      }

      flex-direction: row;
      align-items: center;

      .stats__item-num {
        margin-right: $spacing;
      }
    }

    &:hover {
      opacity: 0.7;
    }
  }

  &__item-bar {
    order: 0;
    width: 40px;
    background: white;
    transform: scaleY(0) translate3d(0, 0, 0);
    cursor: pointer;
    transform-origin: center bottom;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow: 10px 15px rgba(black, 0.2);

    &.active {
      transform: none;
    }
  }

  &__item-num {
    margin-top: $spacing;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    margin-top: 90px;
    width: 100%;
    height: 75vh;
    padding: $spacing;
    transform: scale(1.5);
    visibility: hidden;
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    background-color: #ff6262de;
    &.active {
      opacity: 1;
      visibility: visible;
      transform: none;
    }

    @media (max-width: 690px) {
      padding: $spacing/2;
    }
  }

  &__overlay-avg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 350px;
    height: 350px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background: mix(crimson, lighten(black, 20), 15);
    display: flex;
    flex-flow: column wrap;
    justify-content: center;

    > p {
      margin: 0;
    }

    .avg {
      font-size: 100px;
      font-weight: 700;
    }

    @media (max-width: 690px) {
      width: 240px;
      height: 240px;

      .avg {
        font-size: 65px;
      }
    }
  }

  &__overlay-info {
    position: absolute;
    bottom: $spacing;
    left: $spacing * 2;
    display: flex;

    @media (max-width: 690px) {
      left: $spacing;
    }
  }

  &__overlay-info-half {
    margin-right: $spacing;

    p {
      margin: 0;
      line-height: 1.2;

      &:first-child {
        font-size: 50px;
        font-weight: 700;
      }
    }

    @media (max-width: 690px) {
      p:first-child {
        font-size: 24px;
      }
    }
  }

  &__overlay-back {
    display: flex;
    align-items: center;
    cursor: pointer;

    > svg {
      transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    }

    &:hover {
      > svg {
        transform: translateX(-5px);
      }
    }

    p {
      font-weight: 700;
      font-size: 24px;
      margin: 0 0 0 $spacing/2;
    }

    @media (max-width: 690px) {
      p {
        font-size: 18px;
      }
    }
  }
}
.charimage{
  height: 24vw;
  max-height: 400px;
  position: absolute;
  bottom: 0;
  margin-left: -38vw;
  left: 15vw;
}
</style>
