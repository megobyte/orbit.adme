<template lang="pug">
  .page#page3
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
      p Думаешь, у тебя сложное лицо? Проверь себя на сложнометре от Orbit –  он проанализирует эмоции на твоем лице и определит уровень его сложности.
      .upload(@click="clicked=true", :class="{click: clicked}")
        input(type="file", ref="face", accept="image/*", @change="uploadFace")
</template>

<script>

export default {
  data: function() {
    return {
      interv: false,
      instyle: {},
      face: false,
      clicked: false,
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
          setTimeout(nextTick, 30);
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

      .upload {
        width: $w * 3.5;
        padding-top: $w * 3 * .31438721136767318;
        background: url(/assets/images/upload.svg) no-repeat left center;
        background-size: contain;
        @include transition;

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
        }
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
</style>
