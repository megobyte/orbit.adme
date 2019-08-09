<template lang="pug">
  #global(@wheel="scrollMe", :class="[homeClass]", @click="dropHide", :style="{height: height}")
    header
      .hamburger.hamburger--collapse(:class="{'is-active': menu}", @click="menu = !menu")
        span.hamburger-box
          span.hamburger-inner
      .left
        span при поддержке
        a.adme(href="//adme.ru/", target="_blank")
      //-.right.col
        a.vk(href="#", target="_blank")
        a.fb(href="#", target="_blank")
    nuxt
    .logo(@click="goTo('/')")
    ul.menu(:class="{active: menu}")
      li(:class="{ click: clicked[1], active: (checkPage == 1)}", @click="goTo('/metr')") СЛОЖНОМЕТР
      li(:class="{ click: clicked[2], active: (checkPage == 2)}", @click="goTo('/about')") О сложном лице
      li(:class="{ click: clicked[3], active: (checkPage == 3)}", @click="goTo('/hash')") #ЛИЦОПРОЩЕ С ОРБИТ
      li#promo(:class="{ click: clicked[4], active: (checkPage == 4)}", @click="goTo('/promo')") Акция
        ul.drop(:class="{active: drop}")
          li(@click="popopen[0] = true") Призы
          li Правила
          li(@click="popopen[1] = true") Победители
          li(@click="popopen[2] = true") Обратная связь
    .dots
      .dot(:class="{ active: (checkPage == 0)}", @click="goTo('/')")
      .dot(:class="{ active: (checkPage == 1)}", @click="goTo('/metr')")
      .dot(:class="{ active: (checkPage == 2)}", @click="goTo('/about')")
      .dot(:class="{ active: (checkPage == 3)}", @click="goTo('/hash')")
      .dot(:class="{ active: (checkPage == 4)}", @click="goTo('/promo')")
      .dot.mobile(:class="{ active: (checkPage == 5)}", @click="goTo('/mobile-last')")
    .onehk(@click="goTo('/promo')")
    footer(:class="{active: showfooter}")
      .grid
        div
        div
        div
        div
      .social
        a.heart(href="#", target="_blank")
        a.fb(href="#", target="_blank")
        a.ok(href="#", target="_blank")
        a.tw(href="#", target="_blank")
        a.vk(href="#", target="_blank")
      .content
        .col
          .logo
        .col
          .bubble
            img(src="/assets/images/pink-bubble.svg")
            span
              | Уровень сложности лица – это шуточный показатель,
              |  который мы придумали для этой кампании,
              |  а сложнометр – это шуточный инструмент
          p
            | Акция действует на территории РФ. Организатором акции является ООО «АЙКОН». Общий период акции с 12.08.2019 по 30.11.2019. Прием заявок на участие с 12.08.2019 по 12.10.2019.
            |  Полная информация об организаторе акции, правилах ее проведения, количестве призов, сроках, месте и порядке их получения приведена <a href="/rules.pdf" target="_blank">здесь</a>. Количество призов ограничено.
          .row
            a(href="#", target="_blank") Политика конфиденциальности
            a(href="#", target="_blank") Cookie
            a(href="https://www.adme.ru", target="_blank") ADME
        .col
    transition(name="fadein")
      template(v-if="popopen[0]")
        popup1(@closeme="closePop(0)")
      template(v-if="popopen[1]")
        popup2(@closeme="closePop(1)")
      template(v-if="popopen[2]")
        popup3(@closeme="closePop(2)")
</template>
<script>
import popup1 from '~/components/popup1';
import popup2 from '~/components/popup2';
import popup3 from '~/components/popup3';

export default {
  components: {
    popup1,
    popup2,
    popup3
  },

  data: function() {
    return {
      height: 0,
      pagesi: {
        "/": 0,
        "/metr": 1,
        "/about": 2,
        "/hash": 3,
        "/promo": 4,
        "/mobile-last": 5,
      },
      clicked: [
        false,
        false,
        false,
        false,
        false
      ],
      working: false,
      drop: false,
      popopen: [
        false,
        false,
        false,
        false
      ],
      menu: false,
      showfooter: false
    }
  },

  computed: {

    checkPage: function() {
      var r = 0;
      if (this.$route.path === "/") r = 0;
      if (this.$route.path === "/metr") r = 1;
      if (this.$route.path === "/about") r = 2;
      if (this.$route.path === "/hash") r = 3;
      if (this.$route.path === "/promo") r = 4;
      if (this.$route.path === "/mobile-last") r = 5;
      return r;
    },
    ipages: function() {
      var r = [];
      for(var c in this.pagesi) {
        r[this.pagesi[c]] = c;
      }
      return r;
    },
    homeClass: function() {
      if (this.$route.path === "/promo") {
        return "hidetop";
      } else if (this.$route.path === "/mobile-last") {
        return "hidetop";
      } else if (this.$route.name === "face-id") {
        return "hidetop1";
      } else {
        return "";
      }
    }
  },

  methods: {
    closePop(i) {
      this.$set(this.popopen, i, false);
    },
    dropHide($event) {
      if (($event.target.id !== "promo") && this.drop) this.drop = false;
    },

    scrollMe(event) {
      event.preventDefault();
      if (!this.working) {
        const deltaY = event.deltaY;
        this.working = true;
        setTimeout(function(that) { that.working = false; }, 2000, this);
        var i = this.pagesi[this.$route.path];
        if (i == 4) {
          if (this.showfooter) {
            if (deltaY < 0) {
              this.showfooter = false;
            }
          } else {
            if (deltaY > 0) {
              this.showfooter = true;
            } else {
              this.goToPage(-1);
            }
          }
        } else {
          if (deltaY > 0) {
            this.goToPage(1);
          } else {
            this.goToPage(-1);
          }
        }
      }
    },

    goToPage(direction) {
      var i = this.pagesi[this.$route.path];
      if (direction < 0) {
        if (i > 0) {
          this.goTo(this.ipages[i-1]);
        }
      } else {
        if (i < 4) {
          this.goTo(this.ipages[i+1]);
        }
      }
    },

    goTo(uri) {
      /*this.clicked[this.pagesi[uri]] = true;
      setTimeout(function(that, uri) {
        console.log(that.clicked[uri]);
        that.$set(that.clicked, uri, false);//that.clicked[uri] = false;
      }, 200, this, this.pagesi[uri]);*/
      if ((this.$route.path === "/promo") && (uri === "/promo")) {
        this.drop = !this.drop;
      }
      this.menu = false;
      this.$router.push(uri);
    },

    resizeWindow() {
      this.height = window.innerHeight + "px";
      setTimeout( function(that) { that.resizeWindow(); }, 500, this);
    }

  },

  mounted: function() {
    this.height = window.innerHeight + "px";
    var images = [];
    var urls = [
      "/assets/images/mobile-face/face1.jpg",
      "/assets/images/mobile-face/face2.jpg",
      "/assets/images/mobile-face/face3.jpg",
      "/assets/images/mobile-face/face4.jpg",
      "/assets/images/face1.jpg",
      "/assets/images/face2.jpg",
      "/assets/images/face3.jpg",
      "/assets/images/face4.jpg",
      "/assets/images/face3.png"
    ];

    for (var i = 0; i < urls.length; i++) {
        images[i] = new Image();
        images[i].src = urls[i];
    }

    this.resizeWindow();

  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  min-height: 100%;
}

body {
  background: $bg;
  position: relative;
  font-family: $font;
  font-size: 36px;
  position: relative;
}

* {
  position: relative;
  box-sizing: border-box;
}

$w: 100vw/12;
$wp: 100%/12;
.col {
  width: calc(#{$w} - 20px);
  margin-left: 10px;
  margin-right: 10px;
}

.page-enter-active,
.page-leave-active,
.layout-enter-active,
.layout-leave-active {
  @include transition(all 500ms ease);
  * {
    @include transition(all 300ms ease);
  }

  .text {
    @include transition(all 500ms ease);
  }
}
.page-enter,
.page-leave-active,
.layout-enter,
.layout-leave-active {
  .face {
    filter: blur(15px);
    opacity: 0;
  }
  .text, .slidetext {
    transform: translateY(-100vh);
  }

  .bubble1 {
    margin-left: -150px;
    opacity: 0;
  }
  .bubble2 {
    transform: translateX(150px);
    opacity: 0;
  }

  .faceover {
    opacity: 0;
    transform: scaleY(0);
  }
}

.fadein-enter-active,
.fadein-leave-active {
  @include transition;
}
.fadein-enter,
.fadein-leave-to {
  opacity: 0;
}

#global {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .page {
    position: absolute;
    left: 0;
    top: 60px;
    width: 100vw;
    height: calc(100vh - 60px);
    @include transition;

    .face {
      $tw: $w*7;
      width: calc(#{$tw} - 20px);
      height: 100%;
      position: absolute;
      left: calc(#{$w} + 22px);
      top: 0;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center bottom;
      @include transition;
    }

    .text {
      color: #fff;
      width: $w*4;
      position: absolute;
      left: calc(42px + #{$w * 7});
    }
  }

  .logo {
    $tw: $w*2;
    width: calc(#{$tw} - 10px);
    height: 0;
    position: absolute;
    left: 22px;
    top: 60px + 44px;
    @include transition;

    &::before {
      background: url(/assets/images/logo.png) no-repeat center;
      background-size: contain;
      content: '';
      display: block;
      width: 100%;
      height: 0;
      padding-top: 67.877094972067039%;
    }
  }

  .menu {
    $tw: $w*2;
    left: $tw;
    transform: translateX(82px);
    top: 60px + 44px;
    @include flex(row);
    @include transition;
    justify-content: flex-start;
    position: absolute;
    font-size: 28px;
    text-transform: uppercase;
    color: #fff;
    list-style: none;
    margin: 0;
    padding: 0;
    z-index: 20;

    li {
      margin: 0;
      padding: 0;
      list-style: none;
      margin-right: 30px;
      cursor: pointer;
      position: relative;
      display: block;
      @include transition(100ms transform ease);

      &:active {
        transform: scale(0.9);
      }

      &::before {
        content: '';
        @include transition;
        width: calc(100% + 40px);
        z-index: -1;
        height: 50px;
        border-radius: 25px;
        position: absolute;
        left: -20px;
        top: 50%;
        transform: translateY(-53%) scaleX(0);
        background: $pink;
      }

      &:hover,
      &.active {
        &::before {
          transform: translateY(-53%) scaleX(1);
        }
      }

      .drop {
        list-style: none;
        position: absolute;
        left: 0;
        top: 50%;
        background: #fff;
        margin: 0;
        padding: 30px 0 20px;
        border-radius: 25px;
        z-index: -2;
        @include origin(0 0);
        transform: scaleY(0);

        li {
          padding: 10px 40px;
          margin: 0;
          font-size: 25px;
          color: $blue;
          white-space: nowrap;
          @include transition;
          cursor: pointer;

          &::before { display: none;}

          &:hover {
            background: #daf4fb;
            &::before { display: none;}
          }
        }

        &.active {
          transform: scaleY(1);
        }
      }
    }
  }

  @media screen and (max-width: 1280px){
    .menu {
      font-size: 24px;

      li {
        .drop {
          li {
            font-size: 22px;
          }
        }
      }
    }
  }

  .button {
    width: 19.791666666666667vw;
    @include transition;
    &:active {
      transform: scale(.9);
    }

    &::before {
      background: url(/assets/images/button-check.svg) no-repeat center $pink;
      background-size: contain;
      content: '';
      display: block;
      width: 100%;
      height: 0;
      padding-top: 26.315789473684211%;
    }
  }

  .onehk {
    width: 12.083333333333333%;
    position: absolute;
    right: 0;
    top: 60px + 44px;
    @include transition;
    @include origin(100% 100%);
    cursor: pointer;

    &:active {
      transform: scaleX(.9);
    }

    &::before {
      background: url(/assets/images/100k.png) no-repeat center;
      background-size: contain;
      content: '';
      display: block;
      width: 100%;
      height: 0;
      padding-top: 73.706896551724138%;
    }
  }

  header {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 60px;
    background: $adme;
    color: #000;
    font-size: 16px;
    text-transform: uppercase;
    padding: 0 22px;
    @include flex(row);
    @include transition;
    justify-content: space-between;

    .hamburger {
      display: none;
    }

    .left {
      padding-left: $w*2/6;
      @include flex(row);
      align-items: flex-end;
      justify-content: flex-start;
      padding-bottom: 17px;
      height: 100%;
      width: $w*3;
      white-space: nowrap;

      span {

        bottom: -3px;
      }

      .adme {
        display: block;
        width: 74px;
        height: 22px;
        background: url(/assets/images/adme-transparent.png) no-repeat center;
        background-size: contain;
        bottom: 2px;
        margin-left: 17px;
      }
    }

    .right {
      @include flex(row);
      justify-content: space-between;
      margin-right: 0;
      &::before,
      &::after {
        content: '';
        display: block;
        width: 1px;
      }
      a {
        display: block;
        width: 37px;
        height: 37px;

        &.vk {
          background: url(/assets/images/vk-circle.svg) no-repeat center;
          background-size: contain;
        }
        &.fb {
          background: url(/assets/images/fb-circle.svg) no-repeat center;
          background-size: contain;
        }
      }
    }
  }

  .dots {
    $dw: 20px;

    position: absolute;
    right: 22px;
    top: 50%;
    transform: translateY(-50%);
    height: 200px;
    width: $dw;
    @include flex();
    justify-content: space-between;
    z-index: 100;

    .dot {
      width: $dw;
      height: $dw;
      border-radius: 50%;
      background: #fff;
      opacity: .5;
      cursor: pointer;
      @include transition;

      &.active {
        opacity: 1;
      }
    }
  }

  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

    &.active {
      .content {
        transform: none;
      }
    }

    .content {
      position: absolute;
      left: 0;
      bottom: 0;
      background: #24297a;
      font-size: 18px;
      color: #fff;
      width: 100%;
      padding: 40px 22px;
      z-index: 200;
      @include flex(row);
      justify-content: space-between;
      align-items: flex-start;
      transform: translateY(100%);
      @include transition;

      .col {
        margin: 0;
        width: 21.09375%;
        &:nth-child(2) {
          width: 57.8125%
        }

        a {
          color: #fff;
        }

        .logo {
          position: relative;
          left: 0;
          top: 0;
          width: 90%;
          height: 200px;
          max-width: 310px;
        }

        p {
          padding-top: 40px;
        }

        .bubble {
          font-size: 35px;
          text-transform: uppercase;
          font-weight: bold;
          text-align: center;

          span {
            position: relative;
            z-index: 2;
            display: block;
            width: 100%;
            padding: 0 10%;
          }

          img {
            position: absolute;
            left: -4%;
            top: -20px;
            width: 105%;
            height: calc(100% + 40px);
          }
        }

        .row {
          @include flex(row);
          padding-top: 40px;

          a {
            display: block;
            margin: 0 45px;
            color: #fff;
          }
        }
      }
    }

    .social {
      position: absolute;
      left: 22px;
      bottom: 24px;
      padding-left: $w*2/6;
      @include flex(row);
      justify-content: flex-start;

      a {
        display: block;
        margin-right: 20px;
        width: 40px;
        height: 30px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        opacity: .38;
        @include transition;

        &:hover {
          opacity: 1;
        }

        &.heart { background-image: url(/assets/images/social/heart.svg); }
        &.fb { background-image: url(/assets/images/social/fb.svg); }
        &.vk { background-image: url(/assets/images/social/vk.svg); }
        &.ok { background-image: url(/assets/images/social/ok.svg); }
        &.tw { background-image: url(/assets/images/social/tw.svg); }
      }
    }

    .grid {
      width: $w*7;
      height: 24px;
      position: absolute;
      right: 0;
      bottom: 0;
      @include flex(row);
      justify-content: space-between;

      div {
        display: block;
        width: 25%;
        height: 100%;

        &:nth-child(1) { background: #f9e44c;}
        &:nth-child(2) { background: $pink;}
        &:nth-child(3) { background: $violet;}
        &:nth-child(4) { background: #3c819e;}
      }
    }
  }
}

@media screen and (max-height: 700px){
  #global {
    .dots {
      height: 150px;

      .dot {
        width: 15px;
        height: 15px;
      }
    }
  }
}

@media screen and (min-width: 769px) {
  #global {
    &.hidetop {
      header {
        transform: scaleY(0);
        @include origin(0 0);
      }

      .page {
        top: 0;
        height: 100vh;
      }

      .menu {
        top: 44px;
      }

      .onehk {
        top: 44px;
      }

      .logo {
        top: 44px;
      }
    }
  }
}
@media screen and (max-width: 768px){
  body {
    font-size: 14px;
    max-height: 100%;
    overflow: hidden;
  }

  #global {
    overflow: hidden;

    &.hidetop {
      .logo {
        left: 50%;
        transform: translateX(-50%);
      }

      .onehk {
        transform: translateY(100%);
      }
    }

    &.hidetop1 {
      .logo {
        display: none;
      }
    }
    header {
      height: 40px;
      z-index: 100;

      .hamburger {
        $hamburger-padding-x           : 0px !default;
        $hamburger-padding-y           : 0px !default;
        $hamburger-layer-width         : 13px !default;
        $hamburger-layer-height        : 2px !default;
        $hamburger-layer-spacing       : 3px !default;
        $hamburger-layer-color         : #000 !default;
        $hamburger-layer-border-radius : 4px !default;
        $hamburger-hover-opacity       : 0.7 !default;
        $hamburger-active-layer-color  : $hamburger-layer-color !default;
        $hamburger-active-hover-opacity: $hamburger-hover-opacity !default;

        // To use CSS filters as the hover effect instead of opacity,
        // set $hamburger-hover-use-filter as true and
        // change the value of $hamburger-hover-filter accordingly.
        $hamburger-hover-use-filter   : false !default;
        $hamburger-hover-filter       : opacity(50%) !default;
        $hamburger-active-hover-filter: $hamburger-hover-filter !default;

        $hamburger-types: (
          collapse
        ) !default;

        padding: $hamburger-padding-y $hamburger-padding-x;
        display: inline-block;
        cursor: pointer;

        transition-property: opacity, filter;
        transition-duration: 0.15s;
        transition-timing-function: linear;

        // Normalize (<button>)
        font: inherit;
        color: inherit;
        text-transform: none;
        background-color: transparent;
        border: 0;
        margin: 0;
        overflow: visible;

        &:hover {
          @if $hamburger-hover-use-filter == true {
            filter: $hamburger-hover-filter;
          }
          @else {
            opacity: $hamburger-hover-opacity;
          }
        }

        &.is-active {
          &:hover {
            @if $hamburger-hover-use-filter == true {
              filter: $hamburger-active-hover-filter;
            }
            @else {
              opacity: $hamburger-active-hover-opacity;
            }
          }

          .hamburger-inner,
          .hamburger-inner::before,
          .hamburger-inner::after {
            background-color: $hamburger-active-layer-color;
          }
        }

        .hamburger-box {
          width: $hamburger-layer-width;
          height: $hamburger-layer-height * 3 + $hamburger-layer-spacing * 2;
          display: inline-block;
          position: relative;
        }

        .hamburger-inner {
          display: block;
          top: 50%;
          margin-top: $hamburger-layer-height / -2;

          &,
          &::before,
          &::after {
            width: $hamburger-layer-width;
            height: $hamburger-layer-height;
            background-color: $hamburger-layer-color;
            border-radius: $hamburger-layer-border-radius;
            position: absolute;
            transition-property: transform;
            transition-duration: 0.15s;
            transition-timing-function: ease;
          }

          &::before,
          &::after {
            content: "";
            display: block;
          }

          &::before {
            top: ($hamburger-layer-spacing + $hamburger-layer-height) * -1;
          }

          &::after {
            bottom: ($hamburger-layer-spacing + $hamburger-layer-height) * -1;
          }
        }


          &.hamburger--collapse {
            .hamburger-inner {
              top: auto;
              bottom: 0;
              transition-duration: 0.13s;
              transition-delay: 0.13s;
              transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);

              &::after {
                top: ($hamburger-layer-spacing * 2 + $hamburger-layer-height * 2) * -1;
                transition: top 0.2s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
                            opacity 0.1s linear;
              }

              &::before {
                transition: top 0.12s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
                            transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19);
              }
            }

            &.is-active {
              .hamburger-inner {
                transform: translate3d(0, ($hamburger-layer-spacing + $hamburger-layer-height) * -1, 0) rotate(-45deg);
                transition-delay: 0.22s;
                transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);

                &::after {
                  top: 0;
                  opacity: 0;
                  transition: top 0.2s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
                              opacity 0.1s 0.22s linear;
                }

                &::before {
                  top: 0;
                  transform: rotate(-90deg);
                  transition: top 0.1s 0.16s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
                              transform 0.13s 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
                }
              }
            }
          }

      }

      .left {
        width: 100%;
        padding: 0;
        justify-content: center;
        align-items: center;

        span {
          font-weight: bold;
          bottom: auto;
          top: auto;
          letter-spacing: 0.065em;
        }

        .adme {
          height: 13px;
          width: 60px;
          margin-left: 0;
          bottom: 1px;
        }
      }
    }

    .logo {
      width: 120px;
      top: 60px;
      left: 10px;
    }

    .menu {
      position: fixed;
      left: 0;
      top: 40px;
      flex-direction: column;
      justify-content: flex-start;
      background: $adme;
      width: 100%;
      z-index: 300;
      transform: translateY(-100%);
      @include transition;
      padding-top: 40px;
      pointer-events: none;
      opacity: 0;

      &.active {
        pointer-events: initial;
        transform: none;
        opacity: 1;
      }

      li {
        margin-right: 0;
        margin-bottom: 20px;
        color: #000;

        &::before {
          background: $bg;
        }

        &.active {
          color: #fff;
        }
      }
    }

    .dots {
      left: 0;
      top: 45px;
      width: 100%;
      height: 3px;
      flex-direction: row;

      .dot {
        width: 20%;
        height: 3px;
        border-radius: 1.5px;
        margin: 0 2px;
      }
    }

    .onehk {
      left: 0;
      bottom: 0;
      width: 100%;
      height: 35px;
      background: white;
      right: auto;
      top: auto;
      border-top: 3px solid $pink;
      padding: 0;

      &::before {
        background: none;
        width: 100%;
        height: 100%;
        content: 'ВЫИГРАЙ  100 000 руб.';
        padding: 0;
        color: $pink;
        text-align: center;
        font-size: 16px;
        line-height: 32px;
      }
    }

    footer {
      display: none;
    }

    .page {
      top: auto;
      bottom: 0;
      height: calc(100% - 60px);
      .face {
        width: 100vw;
        left: 0;
        bottom: 0;
        top: auto;
        height: 100%;
        background-size: cover;
      }
    }
  }
}

@media screen and (min-width: 769px){
  .mobile { display: none; }
}
@media screen and (max-width: 768px){
  .desktop { display: none;}
}
</style>
