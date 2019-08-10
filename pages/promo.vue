<template lang="pug">
  .page#page5(
    v-hammer:swipe="(event)=>goTo(event)"
  )
    .desktop
      .face
      .faceover
        .list
          .item Купи любую<br />жевательную<br />резинку Wrigley’s
          .item Отправь фото<br />пачки в <span>чат-бот</span>
          .item Выигрывай до <br />100 000 рубей<br />и <a href="#">другие призы</a><br /><br />Ежедневный розыгрыш &mdash;<br />1000 рублей
      .bot
        .outer
          .inner
            #vk_community_messages
              .loading Загружаю чат-бота
      .text
        h1 Сделай <br />#лицопроще <br />и <span>выигрывай</span><br />100 000 рублей
        .juicyfruit
          .in.in1
          .in.in2
          .in.in3
          .in.in4
          .in.in5
          .in.in6
    .mobile
      .list
        .item Купи любую жевательную резинку Wrigley’s
        .item Отправь фото пачки в<br /><span>чат-бот</span><br />
          .btn(@click="$router.push('/mobile-chat')") Перейти<br /> в чат-бот
        .item Выигрывай до 100 000 рубей и <a href="#">другие призы</a><br /><br />Ежедневный розыгрыш &mdash;<br />1000 рублей
</template>

<script>

export default {
  data: function() {
    return {

    }
  },

  methods: {
    goTo(event) {
      var w = window.innerWidth
              || document.documentElement.clientWidth
              || document.body.clientWidth;
      if (w > 768) return;
      else {
        if ((event.type=="swipe") && (event.direction == 2)) {
          this.$router.push('/mobile-last');
        } else if((event.type=="swipe") && (event.direction == 4)) {
          this.$router.push('/hash');
        }
      }
    },
  },

  mounted: function() {
    var w = window.innerWidth
              || document.documentElement.clientWidth
              || document.body.clientWidth;
    if (w > 768) VK.Widgets.CommunityMessages("vk_community_messages", 137753974, {expanded: "1",tooltipButtonText: "Есть вопрос?"});
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

$w: 100vw/12;

  #page5 {

    .desktop {
      width: 100%;
      height: 100%;
    }

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
        width: 469px;
        padding-top: 77.407407407407407vh;
        //background: url(/assets/images/bot.png) no-repeat center bottom;
        background-size:contain;
        position: absolute;
        left: calc(22px + #{$w*4});
        bottom: 24px;
        overflow: hidden;

        &::before {
          position: absolute;
          right: 0;
          bottom: 0;
          display: block;
          content: '';
          height: 100%;
          width: 60%;
          background: url(/assets/images/hand.png) no-repeat right bottom;
          background-size: contain;
        }

        &::after {
          position: absolute;
          right: 71px;
          bottom: 145px;
          display: block;
          content: '';
          z-index: 4;
          width: 18%;
          height: 100%;
          background: url(/assets/images/finger.png) no-repeat right bottom;
          background-size: contain;
        }

        .outer {
          background: #21427c;
          position: absolute ;
          left: 0px;
          top: 0px;
          height: calc(100% - 100px + 16px);
          width: 336px;
          border-radius: 14px;
        }

        .inner {
          position: absolute ;
          left: 8px;
          top: 8px;
          height: calc(100% - 16px);
          width: 320px;
          overflow: hidden;
          border-radius: 10px;
          background: #fff;

          $gap: 0.2;
          @keyframes loading {
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

          .loading {
            width: 100%;
            height: 100%;
            @include flex;
            animation-name: loading;
            animation-duration: 2s;
            transform-origin:50% 50%;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            left: 26px;
            color: $violet;
          }
        }

        #vk_community_messages {
          position: absolute !important;
          left: -26px !important;
          top: 0px !important;
          height: 100% !important;
          z-index: 3 !important;
          width: 100%;


          iframe {
            height: 100% !important;
            width: 100% !important;
          }
        }
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

      @keyframes boxes {
        0% { transform: scaleX(0); }
        1% { transform: scaleX(1); }
        15.67% { transform: scaleX(1); }
        16.67% { transform: scaleX(0); }
        100% { transform: scaleX(0); }
      }

      .juicyfruit {
        width: $w*2.3;
        padding-top: ($w*2.3) * 0.33426966292134831;

        .in {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          background: url(/assets/images/boxes/1.png) no-repeat left center;
          background-size: contain;
          transform: scaleX(0);
          animation: boxes 18s linear infinite;
          animation-fill-mode: forwards;
          animation-delay: 0s;

          &.in2 { background-image: url(/assets/images/boxes/2.png); animation-delay: 3s; height: 200%; }
          &.in3 { background-image: url(/assets/images/boxes/3.png); animation-delay: 6s;}
          &.in4 { background-image: url(/assets/images/boxes/4.png); animation-delay: 9s;}
          &.in5 { background-image: url(/assets/images/boxes/5.png); animation-delay: 12s;}
          &.in6 { background-image: url(/assets/images/boxes/6.png); animation-delay: 15s;}
        }
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

  @media screen and (max-width: 1440px){
    #page5 {
      .text {
        h1 {
          font-size:55px;
        }
      }
    }
  }

  @media screen and (max-height: 700px){
    #page5 {
      .faceover {
        .list {
          .item {
            margin-bottom: 40px;
            font-size: 24px;
            line-height: 1.2em;
          }
        }
      }
    }
  }

  @media screen and (max-height: 650px){
    #page5 {
      .faceover {
        .list {
          .item {
            margin-bottom: 30px;
            font-size: 19px;
            line-height: 1.2em;
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px){
    #page5 {
      .mobile {
        width: 100%;
        height: 100%;
      }

      .list {
        $ww: $w*2 * .68;
        position: absolute;
        left: 30%;
        top: 102px;
        width: 55%;
        text-transform: uppercase;
        font-size: 15px;

        .item {
          margin-bottom: 40px;
          animation: slideInDown 500ms ease both;
          color: #fff;
          font-size: 15px;

          .btn {
            width: 128px;
            height: 46px;
            font-weight: bold;
            @include flex;
            background: $pink;
            text-align: center;
            margin-top: 20px;
          }

          &:nth-child(1) { animation-delay: 300ms; }
          &:nth-child(2) { animation-delay: 600ms; &::before { content: '2.'; } }
          &:nth-child(3) { animation-delay: 900ms; &::before { content: '3.'; } }
          &:nth-child(4) { animation-delay: 1200ms; }

          a {
            color: #fff;
          }

          &::before {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background: $pink;
            overflow: hidden;
            @include flex;
            position: absolute;
            left: -40px;
            top: 6px;
            text-indent: 3px;
            content: '1.';
          }
        }
      }
    }
  }
</style>
