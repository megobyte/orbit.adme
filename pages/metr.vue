<template lang="pug">
  .page#page3(
    v-hammer:swipe="(event)=>goTo(event)"
  )
    .title
    .face
    .faceover
      .inn
      .in(:style="instyle")
        .facedetect
          .results
            .ls
              span.active Спокойствие
              span(:class="{ active : (results[0].now == results[0].to)}") Радость
              span(:class="{ active : (results[1].now == results[1].to)}") Грусть
              span(:class="{ active : (results[2].now == results[2].to)}") Презрение
            .rs
              span.active {{results[0].now}}%
              span(:class="{ active : (results[0].now == results[0].to)}") {{results[1].now}}%
              span(:class="{ active : (results[1].now == results[1].to)}") {{results[2].now}}%
              span(:class="{ active : (results[2].now == results[2].to)}") {{results[3].now}}%
    .text
      p Думаешь, у тебя сложное лицо? Проверь себя на сложнометре от Orbit! Он определит уровень сложности твоего лица, и ты узнаешь, какое впечатление производишь на окружающих.
      .uploads
        .upload(@click="$funcs.hit('metr-click-upload');", :class="{click: clicked}")
          upload
        .webcam(@click="web_cam = true")
    .uploadd(@click="$funcs.hit('metr-click-upload');", :class="{click: clicked}")
      //-input(type="file", ref="facem", accept="image/*", @change="uploadFace($event, 'facem')")
      upload
    template(v-if="web_cam")
      webcam(@close="web_cam = false")
</template>

<script>
import upload from '~/components/upload.vue'
import webcam from '~/components/webcam.vue'

export default {
  name: 'metr',
  components: {
    upload,
    webcam
  },
  data: function() {
    return {
      interv: false,
      instyle: {},
      face: false,
      clicked: false,
      web_cam: false,
      results: [
        {
          now: 0,
          to: 12
        },
        {
          now: 0,
          to: 32
        },
        {
          now: 0,
          to: 10
        },
        {
          now: 0,
          to: 45
        }
      ]
    }
  },

  watch: {
    clicked: function() {
      if (this.clicked) {
        setTimeout(function(that) { that.clicked = false; }, 500, this);
      }
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
          this.$router.push('/about');
        } else if((event.type=="swipe") && (event.direction == 4)) {
          this.$router.push('/');
        }
      }
    }
  },

  mounted: function() {
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

    }, 300, this);

    var i = 0;
    var that = this;

    var nextTick = function() {
      if (that.results[i].now == that.results[i].to) {
        i += 1;
      }
      if (i < 4) {
          that.results[i].now+= 1;
          setTimeout(nextTick, 20);
      }
    };

    nextTick();
  },

  beforeDestroy: function() {
    clearInterval(this.interv);
  }
}

</script>

<style lang="scss">

  #page3 {
    $w: 100vw/12;

    .uploadd { display: none; }

    .title {
      width: calc(#{$w*10} - 40px);
      $ww: $w*2 * .68;
      height: 22.2222vh;
      position: absolute;
      transform: translateX(-50%);
      left: 50%;
      top: calc(54px + #{$ww});
      background: url(/assets/images/title.svg) no-repeat center top;
      background-size: contain;
      @include transition;
    }

    .face {
      background-image: url(/assets/images/face3.png);
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

      .in {
        @include transition;
        .facedetect {
          width: 30.202578268876611%;
          height: 36.782786885245902%;
          background: url(/assets/images/facedetect.svg) no-repeat center;
          background-size: contain;
          position: absolute;
          left: 34.141252302025783%;
          top: 35.955737704918033%;
          @include transition;

          .results {
            position: absolute;
            left: 0;
            top: 0;
            transform: translateX(-105%);
            padding: 10px 20px;
            background: #95d1f1;
            font-size: 24px;
            color: #fff;
            @include flex(row);
            line-height: 1.1em;
            @include transition;

            span {
              display: block;
              height: 0;
              opacity: 0;
              min-width: 36px;
              @include transition;

              &.active {
                height: 30px;
                opacity: 1;
              }
            }

            .ls {
              text-align: right;
              margin-right: 10px;
            }

            .rs {
              color: $pink;
            }
          }
        }
      }
    }

    .text {
      height: 100%;
      @include flex();
      align-items: flex-start;
      justify-content: flex-end;
      padding-bottom: 40px;

      p {
        padding: 0;
        margin: 0;
        font-size: 32px;
        line-height: 1em;
        @include transition;
        margin-bottom: 40px;
      }

      .uploads {
        @include flex(row);
        justify-content: space-between;
        width: 100%;
      }

      .upload,
      .webcam {
        width: 48%;
        padding-top: 48% * .31438721136767318;
        background: url(/assets/images/upload-photo.svg) no-repeat left center;
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

      .webcam {
        background-image: url(/assets/images/upload-camera.svg);
      }
    }
  }

  @media screen and (max-width: 1440px){
    #page3 {

      .text {
        p {
          font-size: 28px;
        }
      }
    }
  }

  @media screen and (min-width: 769px) and (max-height: 800px){
    #page3 {
      .title {
        height: 20%;
        top: 18%;
      }
    }
  }

  @media screen and (min-width: 769px) and (max-height: 750px){
    #page3 {
      .title {
        height: 20%;
      }
    }
  }

  @media screen and (min-width: 769px) and (max-height: 700px){
    #page3 {
      .title {
        height: 17%;
        top: 10vw;
      }
    }
  }

  @media screen and (min-width: 769px) and (max-height: 650px){
    #page3 {
      .title {
        height: 17%;
        top: 8vw;
      }
    }
  }

  @media screen and (max-width: 768px){
    #page3 {

      .title {
        display: none;
      }
      .face {
        background-image: url(/assets/images/mobile-face/face2.jpg);
      }

      .faceover {
        display: none;
      }

      .uploadd {
        display: block;
        position: fixed;
        width: 142px;
        height: 91px;
        left: 50%;
        bottom: 50px;
        background: url(/assets/images/mobile-face/upload.svg) no-repeat center;
        background-size: contain;
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

    #global {
      #page3.page {
        .text {
          position: absolute;
          width: auto;
          left: 40.9375%;
          top: 0px;
          justify-content: flex-start;

          p {
            font-size: 13px;
            line-height: 16px;
            letter-spacing: 0.09em;
            text-transform: uppercase;
          }

          .upload { display: none; }
        }
      }
    }
  }
</style>
