<template lang="pug">
.body  
  .body2
    .text-wrapper
      .title(data-content='404')
        | 404
      .subtitle(data-content="Oops, bir şeyler yanlış gitti! Bir hata oldu ya da olmayan bir sayfaya giriş yapılmaya çalışıldı")
        | Oops, bir şeyler yanlış gitti! Bir hata oldu ya da olmayan bir sayfaya giriş yapılmaya çalışıldı.
      .buttons
        a.button(@click="push") Anasayfaya Dön
</template>

<script>
export default {
  methods: {
    push: function(){
      this.$router.push("/")
    }
  }
}
</script>

<style lang="scss" scoped>
@use "sass:math";
@import url(https://fonts.googleapis.com/css?family=Raleway:300);

$color1: white;
$color2: #342643;
$color3: #1fa9d6;

*,
*:before,
*:after {
  box-sizing: border-box;
}
html {
  height: 100%;
}
.body {
  background: url(https://i.imgur.com/CZdBKjO.gif) no-repeat center center fixed;
  background-size: cover;
  font-family: "Raleway", sans-serif;
  background-color: $color2;
  height: 100vh;
}
.body2 {
  background-color: rgba(0, 0, 0, 0.275);
  height: 100vh;
}

.text-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 9em;
  font-weight: 700;
  color: $color1;
  position: relative;
}

.subtitle {
  font-size: 40px;
  font-weight: 700;
  color: $color1;
  position: relative;
}

.buttons {
  margin: 30px;

  a.button {
    background-color: $color2;
    font-weight: 700;
    border: 2px solid $color1;
    text-decoration: none;
    padding: 15px;
    text-transform: uppercase;
    color: $color1;
    border-radius: 26px;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: lighten($color2, 10%);
      color: white;
      transition: all 0.2s ease-in-out;
    }
  }
}

// Glitch animation from https://codepen.io/lbebber/pen/ypgql
@keyframes noise-anim {
  $steps: 20;
  @for $i from 0 through $steps {
    #{percentage($i*(math.div(1, $steps)))} {
      clip: rect(random(200) + px, 9999px, random(200) + px, 0);
    }
  }
}
.subtitle:after,
.title:after {
  content: attr(data-content);
  position: absolute;
  left: 2px;
  text-shadow: -1px 0 red;
  top: 0;
  color: $color1;
  overflow: hidden;
  clip: rect(0, 900px, 0, 0);
  animation: noise-anim 2s infinite linear alternate-reverse;
}

@keyframes noise-anim-2 {
  $steps: 20;
  @for $i from 0 through $steps {
    #{percentage($i*(math.div(1, $steps)))} {
      clip: rect(random(200) + px, 9999px, random(200) + px, 0);
    }
  }
}
.subtitle:before,
.title:before {
  content: attr(data-content);
  position: absolute;
  left: -2px;
  text-shadow: 1px 0 blue;
  top: 0;
  color: $color1;
  overflow: hidden;
  clip: rect(0, 900px, 0, 0);
  animation: noise-anim-2 3s infinite linear alternate-reverse;
}
</style>
