<template lang="pug">
  .page#page5
    .face
    .bot
    .faceover
      .list
        .item Купи любую<br />жевательную<br />резинку Wrigley’s
        .item Отправь фото<br />пачки в <span>чат-бот</span>
        .item Выигрывай до <br />100 000 рубей<br />и <a href="#">другие призы</a><br /><br />Ежедневный розыгрыш &mdash;<br />1000 рублей

    .text
      h1 Сделай <br />#лицопроще <br />и <span>выигрывай</span><br />100 000 рублей
      .juicyfruit
</template>

<script>

export default {
  data: function() {
    return {

    }
  },

  methods: {

  },

  mounted: function() {

  },

  beforeDestroy: function() {

  }
}

</script>

<style lang="scss">
@keyframes slideInDown {
  from {
    transform: translate3d(0, -100px, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

  #page5 {
    $w: 100vw/12;

    .face {
      background-image: url(/assets/images/face4.jpg);
      filter: blur(15px);
    }

    .faceover{
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

      line-height: 1em;
      color: #fff;
      font-size: 32px;

      .in,
      .inn {
        width: 100%;
        padding-top: 89.871086556169429%;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
      }

      .list {
        position: absolute;
        left: 0;
        $ww: $w*2 * .68;
        bottom: 40px;

        .item {
          margin-bottom: 60px;
          animation: slideInDown 500ms ease both;

          &:nth-child(1) { animation-delay: 300ms; }
          &:nth-child(2) { animation-delay: 600ms; &::before { content: '2.'; } }
          &:nth-child(3) { animation-delay: 900ms; &::before { content: '3.'; } }
          &:nth-child(4) { animation-delay: 1200ms; }

          a {
            color: #fff;
          }

          &::before {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: $pink;
            @include flex;
            position: absolute;
            left: calc(#{-$w} + 45px);
            top: 6px;
            content: '1.';
          }
        }
      }

    }

    .bot {
        width: 47.34375vw;
        padding-top: 43.802083333333333vw;
        background: url(/assets/images/bot.png) no-repeat center bottom;
        background-size:contain;
        position: absolute;
        left: calc(22px + #{$w*3});

        bottom: 24px;
    }

    .text {
      height: 100%;
      @include flex();
      align-items: flex-start;
      z-index: 2;
      left: calc(42px + #{$w * 8}) !important;

      h1 {
        text-transform: uppercase;
        line-height: 1em;
        margin: 0;
        padding: 0;
        margin-bottom: 40px;
        padding-bottom: 0px;
        font-size: 80px;
        @include transition;

      }

      span {
            position: relative;
            display: inline-block;

            &::before {
              z-index: -1;
              display: block;
              content: '';
              width: calc(100% + 10px);
              height: calc(100% + 7px);
              background: $pink;
              position: absolute;
              left: -5px;
              top: -5px;
            }
          }

      p {
        padding: 0;
        margin: 0;
        font-size: 32px;
        line-height: 1em;
        @include transition;
        margin-bottom: 40px;
      }

      .juicyfruit {
        width: $w*2.3;
        padding-top: ($w*2.3) * 0.33426966292134831;
        background: url(/assets/images/juicyfruit.png) no-repeat center;
        background-size: contain;
      }
    }
  }

  @media screen and (max-width: 1440px){
    #page5 {
      .faceover {
        font-size: 28px;
      }



      .text {
        h1 {
          font-size:60px;
          z-index:2;
          &::before {
            @include origin(100% 100%);
            transform: scale(0.6) translateY(-20px);
          }


        }

        p {
          font-size: 28px;
        }

        .video {
          .container {
            .arrow-container {
              font-size: 28px;
            }
          }
        }

        .guardians {
          i {
            height: 40px;
          }
          a {
            font-size: 20px;
          }
        }
      }
    }
  }
</style>
