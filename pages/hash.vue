<template lang="pug">
  .page#page4
    .face
    .faceover
      .inn
      .in(:style="instyle")
        .line(v-if="Boolean(showSVG)", :style="line1")
        .line(v-if="Boolean(showSVG)", :style="line2")
        .line(v-if="Boolean(showSVG)", :style="line3")
      .circle
      .list
        .item Приоткрытые<br /><span>глаза</span>
        .item Подвижная<br /><span>мимика</span>
        .item Приподнятые<br />уголки <span>рта</span>
      //- .result
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
      h1 #ЛИЦОПРОЩЕ<br />С ORBIT
      p Хочешь выглядеть приветливее? Попробуй жевательную резинку – жевание расслабляет мышцы и лицо становится дружелюбнее.
      //-.button
      .orbit
      .upload
        input(type="file", ref="face", accept="image/*", @change="uploadFace")
</template>

<script>

export default {
  data: function() {
    return {
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
    uploadFace(e) {
      var that = this;
      this.face = this.$refs.face.files[0];
      const fd = new FormData();
      fd.append('face', this.face);
      this.$axios.post(this.host+'/task/', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          that.$router.push('/face/'+response.data.id+'/');
        })
        .catch(error => {
          console.log(error.response)
        })
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
        width: 100px;
        height: 1px;
        background: #fff;
        position: absolute;
        @include origin(0 100%);
        @include transition;

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
      }

      .circle {
        width: $w*2.7;
        height:$w*2.7;
        border-radius: 50%;
        border: 2px solid #fff;
        position: absolute;
        left: 51%;
        bottom: 25%;
        transform: translateX(-50%);
        @include transition;
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
      }

      .button {
        margin-bottom: 40px;
      }

      .orbit {
        width: $w*2.3;
        padding-top: ($w*2.3) * 0.33426966292134831;
        background: url(/assets/images/orbit.png) no-repeat center;
        background-size: contain;
        margin-bottom: 40px;
      }

      .upload {
        width: 27.864583333333333vw;
        padding-top: 9.21875vw;
        background: url(/assets/images/upload2.svg) no-repeat left center;
        background-size: contain;

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
</style>
