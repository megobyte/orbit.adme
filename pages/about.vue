<template lang="pug">
  .page#page2(v-hammer:swipe="(event)=>goTo(event)")
    .desktop
      .face
      .faceover
        .inn
        .in(:style="instyle")
          .line(:style="line1")
          .line(:style="line2")
          .line(:style="line3")
        .circle
          .half
            .halfcircle
          .half
            .halfcircle
        .list
          .item Приподнятые<br /><span>брови</span>
          .item Прикрытые<br /><span>глаза</span>
          //.item Опущенные<br />уголки <span>рта</span>
          .item Сжатые <span>губы</span>
        //-.result
          .title Лицо может выражать:
          .items
            | Презрение
            br
            | Печаль
            br
            | Скука
            br
            | Недовольство
      .text
        h1 что такое<br />сложное лицо?
        p Есть люди, которые даже в расслабленном состоянии могут выгядеть неприветливо. Это явление известно как сложное лицо, и причина его не в плохом характере, а в особом строении лица.
        .row
          p.center Посмотри истории
          .video.
            <iframe src="https://www.youtube.com/embed/9TvSKAn9nSw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          .video.
            <iframe src="https://www.youtube.com/embed/i9KDYGr0rtI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        .guardians
          i
          //-a(href="https://www.washingtonpost.com/news/arts-and-entertainment/wp/2016/02/02/scientists-have-discovered-the-source-of-your-resting-bitch-face/?noredirect=on&utm_term=.d2792a3f18f9", target="_blank") Узнать больше о сложном лице
          a(@click="$funcs.hit('about-click-article'); return true;", href="https://www.wonderzine.com/wonderzine/life/life/245187-let-it-rest?utm_source=facebook.com&utm_medium=social&utm_campaign=russkiy-analog-frazy-resting-bitch-face", target="_blank") Узнать больше о сложном лице
    .mobile
      .face
        .about-over.cdefault(:class="{ cactive: (swipepos == 2) }")
      .title.cdefault(:class="{ cactive: (swipepos == 0) }") Что такое сложное лицо?
      .block.cdefault(:class="{ cactive: (swipepos == 1) }")
        p Есть люди, которые даже в расслабленном состоянии могут выгядеть неприветливо. Это явление известно как сложное лицо, и причина его не в плохом характере, а в особом строении лица.
      .uploadd(@click="$funcs.hit('about-click-upload');")
        //-input(type="file", ref="face", accept="image/*", @change="uploadFace")
        upload
</template>

<script>
import upload from '~/components/upload.vue'

export default {
  components: {
    upload
  },
  data: function() {
    return {
      showSVG: false,
      interv: false,
      instyle: {},
      line1: {},
      line2: {},
      line3: {},
      line4: {},
      swipepos: 0,
    }
  },

  methods: {
    goTo(event) {
      var w = window.innerWidth
              || document.documentElement.clientWidth
              || document.body.clientWidth;
      if (w > 768) {
        return;
      } else {
        console.log(event);
        if ((event.type=="swipe") && (event.direction == 2)) { // swipe left
          if (this.swipepos < 2) {
            this.swipepos += 1;
          } else {
            this.$router.push('/hash');
          }
        } else if((event.type=="swipe") && (event.direction == 4)) { //swipe right
          if (this.swipepos > 0) {
            this.swipepos -= 1;
          } else {
            this.$router.push('/metr');
          }
        }
      }
    },

    takeLineCss(i) {
      var r = {
        transform: '',
        width: '100px',
        left: '0px',
        top: '0px'
      };

      var face = this.$el.querySelector(".faceover .in").getBoundingClientRect(),
          facew = 1086,
          faceh = 976;

      var x1 = 0,
          x2 = 0,
          y1 = 0,
          y2 = 0;

      switch(i) {
        case 1:
          var text = this.$el.querySelector(".faceover .list .item:nth-child(1) span").getBoundingClientRect();
          x2 = (face.width / 100) * (429 / (facew / 100));
          y2 = (face.height / 100) * (334 / (faceh / 100) );
        break;
        case 2:
          var text = this.$el.querySelector(".faceover .list .item:nth-child(2) span").getBoundingClientRect();
          x2 = (face.width / 100) * (409 / (facew / 100));
          y2 = (face.height / 100) * (382 / (faceh / 100) );
        break;
        /*case 3:
          var text = this.$el.querySelector(".faceover .list .item:nth-child(3) span").getBoundingClientRect();
          x2 = (face.width / 100) * (473 / (facew / 100));
          y2 = (face.height / 100) * (550 / (faceh / 100) );
        break;*/
        case 3:
          var text = this.$el.querySelector(".faceover .list .item:nth-child(3) span").getBoundingClientRect();
          x2 = (face.width / 100) * (547 / (facew / 100));
          y2 = (face.height / 100) * (551 / (faceh / 100) );
        break;
      }

      x1 = text.x + text.width - face.x + 20;
      y1 = text.y + text.height/2 - face.y;
      r.left = x1+'px';
      r.top = y1+'px';

      var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
      var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
      var transform = 'rotate('+angle+'deg)';

      r.width = length+"px";
      r.transform = transform;

      return r;
    }
  },

  mounted: function() {
    setTimeout(function(that) { that.showSVG = "url('/assets/images/arrow.svg')"; }, 1300, this);

    this.interv = setInterval(function(that) {

      var face = that.$el.querySelector(".faceover").getBoundingClientRect(),
          inn = that.$el.querySelector(".faceover .inn").getBoundingClientRect();

      if (inn.height >= face.height) {
        that.instyle = {
          paddingTop: face.height + "px",
          width: face.height / 89.871086556169429 * 100 + "px"
        };
      } else {
        that.instyle = {};
      }

      that.line1 = that.takeLineCss(1);
      that.line2 = that.takeLineCss(2);
      that.line3 = that.takeLineCss(3);
      //that.line4 = that.takeLineCss(4);
      that.line1.opacity = 1;
      that.line2.opacity = 1;
      that.line3.opacity = 1;
    }, 300, this);
  },

  beforeDestroy: function() {
    clearInterval(this.interv);
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

  #page2 {
    $w: 100vw/12;

    .desktop {
      width: 100%;
      height: 100%;
    }

    .face {
      background-image: url(/assets/images/face2.jpg);
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

      .line {
        width: 0px;
        height: 1px;
        background: #fff;
        position: absolute;
        opacity: 0;
        @include origin(0 100%);
        @include transition;
        transition-property: width, opacity;

        &::before,
        &::after {
          content: '';
          width: 5px;
          height: 5px;
          background: #fff;
          border-radius: 50%;
          position: absolute;
          top: -2px;
          left: 0;
        }

        &::after {
          left: 100%;
        }

        &:nth-child(1) { transition-delay: 1s;}
        &:nth-child(2) { transition-delay: 1.4s;}
        &:nth-child(3) { transition-delay: 1.8s;}
      }

      .circle {
        width: $w*2.7;
        height:$w*2.7;
        //border-radius: 50%;
        //border: 2px solid #fff;
        position: absolute;
        left: 50%;
        bottom: 28%;
        transform: translateX(-54%);
        //@include transition;
        .half {
          width: 50%;
          height: 100%;
          right: 0;
          top: 0;
          position: absolute;
          overflow: hidden;
          transform-origin: left center;

          .halfcircle {
            box-sizing: border-box;
            height: 100%;
            width: 200%;
            right: 0px;
            position: absolute;
            border: solid 2px transparent;
            border-top-color: #fff;
            border-left-color: #fff;
            border-radius: 50%;
            transform: rotate(-45deg);
            animation: rrotate 0.5s linear 1;
            animation-fill-mode: forwards;
            animation-delay: 1s;
          }

          &:nth-child(2) {
            transform: rotate(180deg);

            .halfcircle {
              animation-delay: 1.5s;
            }
          }

          @keyframes rrotate {
            0% {transform: rotate(-45deg);}
            100% {transform: rotate(135deg);}
          }
        }
      }

      .list {
        position: absolute;
        left: 0;
        $ww: $w*2 * .68;
        top: calc(54px + #{$ww});

        .item {
          margin-bottom: 1.5em;
          animation: slideInDown 500ms ease both;

          &:nth-child(1) { animation-delay: 300ms; }
          &:nth-child(2) { animation-delay: 600ms; }
          &:nth-child(3) { animation-delay: 900ms; }
          &:nth-child(4) { animation-delay: 1200ms; }
        }
      }

      .result {
        position: absolute;
        bottom: 40px;
        left: 0;
        animation: slideInDown 500ms ease both;
        animation-delay: 1600ms;

        .title {
          padding: 5px 20px;
          background: #95d1f1;
          width: auto;
          display: inline-block;
        }

        .items {
          padding-top: 20px;
          margin-left: calc(#{$w} + 20px);
        }
      }
    }

    .text {
      height: 100%;
      @include flex();
      align-items: flex-start;

      h1 {
        text-transform: uppercase;
        line-height: 1em;
        margin: 0;
        padding: 0;
        margin-bottom: 40px;
        padding-bottom: 0px;
        font-size: 95px;
        @include transition;

        &::before {
          content: '';
          display: block;
          width: 116px;
          height: 120px;
          background: url(/assets/images/quote.svg) no-repeat center;
          background-size: contain;
          position: absolute;
          left: -150px;
          top: -56px;
          @include transition;
        }
      }

      p {
        padding: 0;
        margin: 0;
        font-size: 32px;
        line-height: 1em;
        @include transition;
        width: 100%;
        margin-bottom: 40px;

        &.center {
          text-align: center;
          width: 100%;
          margin-bottom: 20px;
        }
      }

      .row {
        width: 100%;

        @include flex(row);
        justify-content: space-between;
        flex-wrap: wrap;
      }

      .video {
        width: calc(#{$w*2} - 10px);
        height: 0;
        padding-top: $w*2 / 16 * 9;

        iframe {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
        }

        .container {
          width: 100%;
          padding-top: 56.25%;
          background: $violet;
          position: absolute;
          top: 0;
          left: 0;

          &::after {
            width: 25%;
            padding-top: 25%;
            background: url(/assets/images/play.svg) no-repeat center;
            background-size: contain;
            content: '';
            display: block;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            @include transition;
          }

          &:hover::after {
            transform: translate(-50%, -50%) scale(1.05);
          }

          .arrow-container {
            position: absolute;
            bottom: 0;
            left: 105%;
            line-height: 1em;
            font-size: 32px;

            $gap: 0.2;

            @keyframes spaceboots {
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
              100% { transform: translate(1px*$gap, -2px*$gap) rotate(-1deg); }
            }

            .arrow {
              width: 145px;
              height: 64px;
              background-repeat: no-repeat;
              background-position: center;
              background-size: contain;
              animation-name: spaceboots;
              animation-duration: 0.8s;
              transform-origin:50% 50%;
              animation-iteration-count: infinite;
              animation-timing-function: linear;
            }

            span {
              display: block;
              margin-left: 120px;
              margin-top: 10px;
            }
          }
        }
      }

      .guardians {
        text-transform: uppercase;
        @include flex(row);
        justify-content: flex-start;
        position: absolute;
        bottom: 40px;

        i {
          width: 40px;
          height: 56px;
          display: block;
          margin-right: 10px;
          background: url(/assets/images/book.svg) no-repeat center;
          background-size: contain;
        }

        a {
          color: #fff;
          font-size: 24px;
        }
      }
    }
  }

  @media screen and (max-width: 1500px){
    #page2 {
      .faceover {
        font-size: 28px;
      }
      .text {
        h1 {
          font-size:60px;
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

  @media screen and (min-width: 769px) and (max-height: 800px){
    #page2 {
      .text {

        h1 {
          font-size: 50px;
          margin-bottom: 15px;

          &::before {
            transform: scale(0.5) translateX(0px);
          }
        }
        p {
          font-size: 24px;
          margin-bottom: 15px;
        }
      }
    }
  }

  @media screen and (min-width: 769px) and (max-height: 650px){
    #page2 {
      .text {

        h1 {
          font-size: 45px;
          margin-bottom: 20px;

          &::before {
            transform: scale(0.5) translateX(0px);
          }
        }
        p {
          font-size: 24px;
          margin-bottom: 20px;
        }

        .guardians {
          font-size: 24px;

          i {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }

  @media screen and (min-width: 769px) and (max-height: 600px){
    #page2 {
      .text {

        h1 {
          font-size: 40px;
          margin-bottom: 20px;

          &::before {
            transform: scale(0.5) translateX(0px);
          }
        }
        p {
          font-size: 20px;
          margin-bottom: 20px;
        }

        .guardians {
          font-size: 20px;

          i {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px){
    #global #page2.page .face {
      background-position: center -110px;
    }
    #page2 {
      .mobile {
        width: 100%;
        height: 100%;
      }

      .cdefault {
        pointer-events: none;
        opacity: 0;
        @include transition;

        &.cactive {
          pointer-events: initial;
          opacity: 1;
        }
      }


      .title {
        position: absolute;
        width: auto;
        left: 58.75%;
        font-weight: bold;
        font-size: 28px;
        line-height: 103.2%;
        text-transform: uppercase;
        color: #fff;
      }

      .about-over {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute;
        background: url(/assets/images/mobile-face/face3-over.jpg) no-repeat;
        background-position: center -110px;
        background-size: cover;
      }

      .block {
        position: absolute;
        left: 0;
        top: 0px;
        width: 100%;
        height: 85px;
        background: $bg;
        z-index: 200;
        color: #fff;
        text-transform: uppercase;

        p {
          margin: 0;
          padding: 0;
          margin-left: 20%;
          padding-right: 15px;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 38px;
            height: 55px;
            background: url(/assets/images/quote.svg) no-repeat center;
            background-size: contain;
            position: absolute;
            left: -58px;
            top: -5px;
            @include transition;
          }
        }
      }

      .face {
        background-image: url(/assets/images/mobile-face/face3.jpg);
      }

      .uploadd {
        display: block;
        position: fixed;
        width: 142px;
        height: 71px;
        left: 50%;
        bottom: 50px;
        background: url(/assets/images/mobile-face/upload.svg) no-repeat center bottom;
        background-size: cover;
        margin-left: -71px;

        input {
          opacity: 0;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
