<template lang="pug">
  #global(@wheel="scrollMe", :class="[homeClass]")
    header
      .left
        span при поддержке
        a.adme(href="//adme.ru/", target="_blank")
      //-.right.col
        a.vk(href="#", target="_blank")
        a.fb(href="#", target="_blank")
    nuxt
    .logo(@click="goTo('/')")
    ul.menu
      li(:class="{ click: clicked[1], active: checkPage(1)}", @click="goTo('/metr')") СЛОЖНОМЕТР
      li(:class="{ click: clicked[2], active: checkPage(2)}", @click="goTo('/about')") О сложном лице
      li(:class="{ click: clicked[3], active: checkPage(3)}", @click="goTo('/hash')") #ЛИЦОПРОЩЕ С ОРБИТ
      li(:class="{ click: clicked[4], active: checkPage(4)}", @click="goTo('/promo')") Акция
    .dots
      .dot(:class="{ active: checkPage(0)}", @click="goTo('/')")
      .dot(:class="{ active: checkPage(1)}", @click="goTo('/metr')")
      .dot(:class="{ active: checkPage(2)}", @click="goTo('/about')")
      .dot(:class="{ active: checkPage(3)}", @click="goTo('/hash')")
      .dot(:class="{ active: checkPage(4)}", @click="goTo('/promo')")
    .onehk(@click="goTo('/promo')")
    footer
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
</template>
<script>
export default {
  data: function() {
    return {
      pagesi: {
        "/": 0,
        "/metr": 1,
        "/about": 2,
        "/hash": 3,
        "/promo": 4,
      },
      clicked: [
        false,
        false,
        false,
        false,
        false
      ],
      working: false
    }
  },

  computed: {
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
      } else {
        return "";
      }
    }
  },

  methods: {
    scrollMe(event) {
      event.preventDefault();
      if (!this.working) {
        const deltaY = event.deltaY;
        this.working = true;
        setTimeout(function(that) { that.working = false; }, 3000, this);
        if (deltaY > 0) {
          this.goToPage(1);
        } else {
          this.goToPage(-1);
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
      this.$router.push(uri);
    },

    checkPage(page) {
      var r = false;
      switch(page) {
        case 0:
          if (this.$route.path === "/") r = true;
          break;
        case 1:
          if (this.$route.path === "/metr") r = true;
          break;
        case 2:
          if (this.$route.path === "/about") r = true;
          break;
        case 3:
          if (this.$route.path === "/hash") r = true;
          break;
        case 4:
          if (this.$route.path === "/promo") r = true;
          break;
      }

      return r;
    }
  },
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
  .text {
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

#global {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

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
    }
  }

  @media screen and (max-width: 1280px){
    .menu {
      font-size: 24px;
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
</style>
