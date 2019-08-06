<template lang="pug">
  #popup
    .overlay(@click="closeMe()")
    .window
      .h
        span Обратная связь
        .close(@click="closeMe()") &times;
      .content
        .search
          .title e-mail*
          .input
            input(type="text", v-model="email", placeholder="")
        .search
          .title имя*
          .input
            input(type="text", v-model="fname", placeholder="")
        .title Текст сообщения
        textarea(v-model="message")
        .btn Отправить

</template>
<script>
export default {
  data: function() {
    return {
      vkid: ''
    }
  },

  methods: {
    closeMe() {
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

        .title {
          font-size: 24px;
          color: $blue;
          text-align: left;
          white-space: nowrap;
          text-transform: uppercase;
        }

        textarea {
          background: #daf4fb;
          border: 1px solid #3c819e;
          -webkit-appearance: none;
          font-family: $font;
          font-size: 29px;
          color: $blue;
          text-transform: uppercase;
          outline: none;
          width: 100%;
          height: 26.574074074074074vh;
        }

        .btn {
          width: 284px;
          height: 80px;
          @include flex(row);
          text-transform: uppercase;
          font-size: 30px;
          background: $pink;
          margin: 20px auto;
        }

        .search {
          width: 100%;
          height: 80px;
          margin-bottom: 40px;
          @include flex(row);

          .title {
            width: 80px;
          }

          .input {
            width: calc(100% - 80px);
            height: 80px;
            background: #daf4fb;
            border: 1px solid #3c819e;
            @include flex(row);

            .vk {
              width: 80px;
              height: 80px;
              @include flex();
              &::after {
                content: '';
                display: block;
                width: 36px;
                height: 36px;
                background: url(/assets/images/social/vk-blue.svg) no-repeat center;
                background-size: contain;
              }
            }

            input {
              width: calc(100% - 80px);
              height: 80px;
              padding: 0;
              padding-top: 6px;
              border: none;
              -webkit-appearance: none;
              background: none;
              font-family: $font;
              font-size: 29px;
              color: $blue;
              text-transform: uppercase;
              outline: none;
            }
          }

          .btn {
            width: 80px;
            height: 80px;
            background: $pink;
            @include flex();
            &::after {
              content: '';
              display: block;
              width: 66px;
              height: 66px;
              background: url(/assets/images/search.svg) no-repeat center;
              background-size: contain;
            }
          }
        }

        .frame {
          width: 100%;
          height: 50vh;
          overflow: hidden;

          .item {
            width: 100%;
            margin-bottom: 10px;
            font-size: 22px;
            text-align: left;
            text-transform: uppercase;

            .date {
              padding: 0 20px;
              line-height: 30px;
              color: #fff;
            }

            .yellow {
              height: 30px;
              color: $blue;
              background: $adme;
              @include flex(row);
              justify-content: space-between;
              padding: 0 20px;
              line-height: 30px;

              .id {
                @include flex(row);
                justify-content: flex-start;
              }

              .star {
                width: 24px;
                height: 24px;
                margin-right: 10px;
                background: url(/assets/images/star.svg) no-repeat center;
                background-size: contain;
              }
            }
          }
        }
      }

    }
  }
</style>
