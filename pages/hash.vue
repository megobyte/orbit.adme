<template lang="pug">
  .page#page4(
    v-hammer:swipe="(event)=>goTo(event)"
  )
    .face
    .faceover
      .inn
        //-video(preload="auto", muted, autoplay, playsinline, loop, :poster="trailerBack", :src="bgVideo", type="video/mp4")
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
        .item Приоткрытые<br /><span>глаза</span>
        .item Подвижная<br /><span>мимика</span>
        .item Приподнятые<br />уголки <span>рта</span>
    .text
      h1 #ЛИЦОПРОЩЕ<br />С ORBIT
      p У нас есть совет, как можно выглядеть приветливее! Попробуй жевательную резинку – лицо станет более подвижным, и ты будешь казаться дружелюбнее.
      //-.button
      .orbit
      .upload(@click="$funcs.hit('hash-click-upload');")
        //-input(type="file", ref="face", accept="image/*", @change="uploadFace")
        upload
    .mtext
      span Проверь себя
      br
      span  на сложное лицо
      upload
</template>

<script>
import upload from '~/components/upload.vue'
export default {
  transition(to, from) {
    if (from) {
      if (from.name === 'promo') {
        return {
          name: 'from-promo',
          duration: {enter: 500, leave: 500}
        };
      }
    }
  },
  components: {
    upload
  },
  data: function() {
    return {
      trailerBack: '/assets/images/face4.jpg',
      bgVideo: '/assets/images/video.mp4',
      face: false,
      showSVG: false,
      interv: false,
      instyle: {},
      line1: {},
      line2: {},
      line3: {},
      line4: {},
    }
  },

  computed: {
    host () {
      return this.$store.state.host
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
          this.$router.push('/promo');
        } else if((event.type=="swipe") && (event.direction == 4)) {
          this.$router.push('/about');
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
          x2 = (face.width / 100) * (427 / (facew / 100));
          y2 = (face.height / 100) * (400 / (faceh / 100) );
        break;
        case 2:
          var text = this.$el.querySelector(".faceover .list .item:nth-child(2) span").getBoundingClientRect();
          x2 = (face.width / 100) * (435 / (facew / 100));
          y2 = (face.height / 100) * (496 / (faceh / 100) );
        break;
        case 3:
          var text = this.$el.querySelector(".faceover .list .item:nth-child(3) span").getBoundingClientRect();
          x2 = (face.width / 100) * (460 / (facew / 100));
          y2 = (face.height / 100) * (557 / (faceh / 100) );
        break;
        case 4:
          var text = this.$el.querySelector(".faceover .list .item:nth-child(4) span").getBoundingClientRect();
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

      that.line1.opacity = 1;
      that.line2.opacity = 1;
      that.line3.opacity = 1;

    }, 600, this);
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

  #page4 {
    $w: 100vw/12;

    .face {
      background-image: url(/assets/images/face4.jpg);
    }

    .mtext {
      display: none;
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

        video {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
      }

      .line {
        width: 0px;
        height: 1px;
        background: #fff;
        position: absolute;
        @include origin(0 100%);
        @include transition;
        transition-property: width, opacity;
        opacity: 0;

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
        left: 51%;
        bottom: 25%;
        transform: translateX(-50%);
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
          margin-bottom: 2.7em;
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
        font-size: 80px;
        @include transition;

      }

      p {
        padding: 0;
        margin: 0;
        font-size: 32px;
        line-height: 1em;
        @include transition;
        margin-bottom: 40px;
        width: 100%;
      }

      .button {
        margin-bottom: 40px;
      }

      .orbit {
        width: $w*2.3;
        padding-top: ($w*2.3) * 0.33426966292134831;
        background: url(/assets/images/boxes/1.png) no-repeat left center;
        background-size: contain;
        margin-bottom: 40px;
      }

      .upload {
        width: 27.864583333333333vw;
        padding-top: 9.21875vw;
        background: url(/assets/images/upload2.svg) no-repeat left center;
        background-size: contain;
        cursor: pointer;
        @include transition;

        &:hover {
          transform: scale(1.1);
        }

        &:active {
          transform: scale(.9);
        }

        input {
          opacity: 0;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      }
    }
  }

  @media screen and (max-width: 1440px){
    #page4 {
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
    #page4 {
      .text {
        justify-content: center;
        padding-top: 80px;
        h1 {
          font-size: 60px;
          margin-bottom: 20px;
        }

        p {
          font-size: 24px;
          margin-bottom: 20px;
        }

        .upload {
          padding-top: 11vh;
        }
      }
    }
  }
  @media screen and (min-width: 769px) and (max-height: 770px){
    #page4 {
      .faceover {
        .list {
          .item {
            margin-bottom: 40px;
          }
        }
      }

      .text {
        justify-content: center;
        padding-top: 80px;
        h1 {
          font-size: 40px;
          margin-bottom: 20px;
        }

        p {
          font-size: 24px;
          margin-bottom: 20px;
        }

        .upload {
          padding-top: 11vh;
        }
      }
    }
  }

  @media screen and (max-width: 768px){
    #global #page4.page .face {
      background-position: center -100px;
    }
    #page4 {
      .mobile {
        width: 100%;
        height: 100%;
      }
      .face {
        background-image: url(/assets/images/mobile-face/face4.jpg);
      }

      .faceover {
        display: none;
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
    }
  }

</style>
