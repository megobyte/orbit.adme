<template lang="pug">
  #popup
    .overlay(@click="closeMe()")
    .window
      .h
        span Призы
        .close(@click="closeMe()") &times;
      .content
        .slides
          .slides-in(:class="['dispos'+slide]")
            .slide
              h2 КАЖДУЮ НЕДЕЛЮ
              .img(:style="{backgroundImage: 'url(/assets/images/prizes/prize1.svg)'}")
              .small Зачисление на кошелек VK Pay
              .big 5 РУБЛЕЙ
            .slide
              h2 КАЖДУЮ НЕДЕЛЮ
              .r
                .col
                  .subh Приз #1
                  .img(:style="{backgroundImage: 'url(/assets/images/prizes/prize2-1.svg)'}")
                  .small Зачисление на кошелек VK Pay
                  .big 100 РУБЛЕЙ
                .col
                  .subh Приз #2
                  .img(:style="{backgroundImage: 'url(/assets/images/prizes/prize2-2.svg)'}")
                  .small Зачисление на кошелек VK Pay
                  .big 1000 РУБЛЕЙ
            .slide
              h2 КАЖДУЮ НЕДЕЛЮ
              .img(:style="{backgroundImage: 'url(/assets/images/prizes/prize3.svg)'}")
              .small Зачисление на карту
              .big 10 000 РУБЛЕЙ
            .slide
              h2 ГЛАВНЫЙ ПРИЗ!
              .img(:style="{backgroundImage: 'url(/assets/images/prizes/prize4.svg)'}")
              .small Зачисление на карту
              .big 100 000 РУБЛЕЙ
            .slide
              h2 Дополнительныйприз
              .img(:style="{backgroundImage: 'url(/assets/images/prizes/prize5.svg)'}")
              .small Сертификат ReStore на
              .big 20 000 РУБЛЕЙ
        .arrows
          .arrow.left(@click="nextSlide(-1)")
          .arrow.right(@click="nextSlide(1)")
        .prize-dots
          .dot(:class="{active: (slide == 1)}", @click="setSlide(1)")
          .dot(:class="{active: (slide == 2)}", @click="setSlide(2)")
          .dot(:class="{active: (slide == 3)}", @click="setSlide(3)")
          .dot(:class="{active: (slide == 4)}", @click="setSlide(4)")
          .dot(:class="{active: (slide == 5)}", @click="setSlide(5)")
</template>
<script>
export default {
  data: function() {
    return {
      slide: 1
    }
  },

  methods: {
    closeMe() {
      console.log(1);
      this.$emit('closeme');
    },
    nextSlide(i) {
      if (i < 0) {
        if (this.slide == 1) {
          this.slide = 5;
        } else {
          this.slide -= 1;
        }
      } else {
        if (this.slide == 5) {
          this.slide = 1;
        } else {
          this.slide += 1;
        }
      }
    },
    setSlide(i) {
      this.slide = i;
    }
  }
}
</script>
<style lang="scss">
  #popup {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 5000;

    .overlay {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(#000, .5);
      @include transition;
      cursor: pointer;
    }

    .window {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      @include transition;
      width: 652px;
      background: $bg;
      border-radius: 25px;

      .h {
        width: 100%;
        height: 50px;
        padding: 0 20px;
        background: $adme;
        color: $blue;
        @include flex(row);
        justify-content: space-between;
        text-transform: uppercase;
        font-size: 24px;
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;

        span {
          display: block;
          line-height: 36px;
        }

        .close {
          text-align: right;
          height: 40px;
          font-size: 30px;
          line-height: 36px;
          cursor: pointer;
        }
      }

      .content {
        padding: 40px 40px 20px;
        text-align: center;
        color: #fff;

        .slides {
          $w: 572px;
          overflow: hidden;
          width: $w;


          .slides-in {
            width: $w*5;
            @include flex(row);
            justify-content: flex-start;
            @include transition;

            &.dispos1 { margin-left: 0; }
            &.dispos2 { margin-left: -$w; }
            &.dispos3 { margin-left: -$w*2; }
            &.dispos4 { margin-left: -$w*3; }
            &.dispos5 { margin-left: -$w*4; }

            .slide {
              width: $w;
            }
          }
        }

        h2 {
          font-size: 60px;
          padding: 0;
          margin: 0;
          margin-bottom: 40px;
          text-transform: uppercase;
        }

        .subh {
          color: $blue;
        }

        .img {
          width: 100%;
          height: 33.148148148148148vh;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
          margin-bottom: 20px;
        }

        .small {
          font-size: 24px;
        }

        .big {
          font-size: 40px;
          text-transform: uppercase;
          margin-bottom: 40px;
          font-weight: bold;
        }

        .r {
          width: 100%;
          @include flex(row);
          justify-content: space-between;

          .col {
            width: 49%;

            .img {
              height: 21.851851851851852vh;
            }
          }
        }

        .arrows {
          width: 100%;
          @include flex(row);

          .arrow {
            width: 80px;
            height: 80px;
            background: url(/assets/images/arrow-left.svg) no-repeat center $pink;
            background-size: contain;
            cursor: pointer;
            margin: 0 50px;

            &.right {
              transform: rotate(180deg);
            }
          }
        }

        .prize-dots {
          @include flex(row);
          padding: 20px 0 0;

          .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #fff;
            opacity: .7;
            @include transition;
            margin: 0 5px;

            &.active {
              background: $adme;
              opacity: 1;
            }
          }
        }
      }

    }
  }
</style>
