<template lang="pug">
  .page#page1(v-hammer:swipe.left="(event)=>goTo('/metr')")
    h1 Проверь мимику лица вместе с Orbit
    .face
    .bubble1(:class="{active: bubble1}")
    .bubble2(:class="{active: bubble2}")
    .text
      .head
        svg(x="0px", y="0px", viewBox="0 0 857.7 264.8", xml:space="preserve")
          text(transform="matrix(1 0 0 1 0 115.937)")
            tspan(x="0") ПРОВЕРЬ СЕБЯ НА
            tspan(x="0", dy="123.1") СЛОЖНОЕ ЛИЦО
        .button(@click="$funcs.hit('index-click-check'); $router.push('/metr')")
          span ПРОВЕРИТЬ
    .mtext(@click="$funcs.hit('index-click-check'); $router.push('/metr')")
      span Проверь себя
      br
      span  на сложное лицо
</template>

<script>

export default {
  data() {
    return {
      bubble1: false,
      bubble2: false,
    };
  },
  methods: {
    goTo(uri) {
      this.$router.push(uri);
    },
  },

  mounted() {
    var that = this;
    setTimeout(function() {
      that.bubble1 = true;
      setTimeout(function() {
        that.bubble2 = true;
      },500);
    }, 500);
  }
}
</script>

<style lang="scss">
  #page1 {
    $w: 100vw/12;
    $gap: 0.2;

    h1 {
      position: absolute;
      left: 0;
      top: 0;
      color: $bg;
      text-indent: -9999px;
      overflow: hidden;
    }

    @keyframes bubbles {
      0% {   transform: translate(2px*$gap, 1px*$gap) rotate(0deg); }
      10% {  transform: translate(-1px*$gap, -2px*$gap) rotate(-1deg); }
      20% {  transform: translate(-3px*$gap, 0px*$gap) rotate(1deg); }
      30% {  transform: translate(0px*$gap, 2px*$gap) rotate(0deg); }
      40% {  transform: translate(1px*$gap, -1px*$gap) rotate(1deg); }
      50% {  transform: translate(-1px*$gap, 2px*$gap) rotate(-1deg); }
      60% {  transform: translate(-3px*$gap, 1px*$gap) rotate(0deg); }
      70% {  transform: translate(2px*$gap, 1px*$gap) rotate(-1deg); }
      80% {  transform: translate(-1px*$gap, -1px*$gap) rotate(1deg); }
      90% {  transform: translate(2px*$gap, 2px*$gap) rotate(0deg); }
      100% { transform: translate(2px*$gap, 1px*$gap) rotate(0deg); }
    }

    .bubble1 {
      width: 18.33333%;
      position: absolute;
      left: calc(#{$w*2/6} + 22px);
      top: 50%;
      transform: scaleX(0);
      @include transition;
      @include origin(0 0);

      &.active {
        transform: scaleX(1);
      }

      &::before {
        animation-name: bubbles;
        animation-duration: 3.8s;
        transform-origin:0% 0%;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        background: url(/assets/images/bubble1.svg) no-repeat center;
        background-size: contain;
        content: '';
        display: block;
        width: 100%;
        height: 0;
        padding-top: 67.329545454545455%;
      }
    }

    .bubble2 {
      width: 22.604166666666667%;
      position: absolute;
      left: 49%;
      top: 12%;
      transform: scaleX(0);
      @include transition;
      @include origin(100% 0);

      &.active {
        transform: scaleX(1);
      }

      &::before {
        animation-name: bubbles;
        animation-duration: 3.8s;
        transform-origin:50% 50%;
        animation-delay: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        background: url(/assets/images/bubble2.svg) no-repeat center;
        background-size: contain;
        content: '';
        display: block;
        width: 100%;
        height: 0;
        padding-top: 64.746543778801843%;
      }
    }

    .face {
      background-image: url(/assets/images/face1.jpg);
    }

    .mtext {
      display: none;
    }

    .text {
      height: 100%;
      @include flex();
      align-items: flex-start;

      .head {
        width: 100%;
        margin-bottom: 20px;
        transform: translateY(40%);

        svg {
          width: 100%;

          text {
            tspan {
              fill: #FFFFFF;
              font-family:'Wrigley';
              font-weight: bold;
              font-size:132.4996px;
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 769px) and (max-height: 700px){
    #global {
      #page1 {
        .face {
          top: 5%;
        }

        .bubble2 {
          top: 14%;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    #global {
      .page {
        .face {
          bottom: -10%;
        }
      }
    }
    #page1 {
      .face {
        background-image: url(/assets/images/mobile-face/face1.jpg);
      }

      .text {
        display: none;
      }

      .mtext {
        display: block;
        text-transform: uppercase;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        color: #fff;
        bottom: 50px;
        background: $pink;
        width: 80%;
        padding: 10px ;
        font-weight: bold;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        letter-spacing: 0.04em;
      }

      .bubble1 {
        width: 42.8125%;
        left: 5px;
        top: 55%;
      }

      .bubble2 {
        width: 48.8125%;
        right: -10px;
        top: 0;
        left: auto;
      }
    }
  }
</style>
