<template lang="pug">
  #popup.pop3
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
      email: '',
      fname: '',
      message: ''
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

    .window {
      .content {
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
      }

    }
  }

  @media screen and (max-width: 768px){
    #popup.pop3 {
      .window {
        .content {
          .title {
            font-size: 20px;
          }

          .search {
            font-size: 20px;
            flex-direction: column;
            margin-bottom: 20px;

            .title {
              width: 100%;
              font-size: 20px;
            }

            .input {
              height: 40px;
              width: 100%;

              input {
                height: 40px;
              }
            }
          }
        }
      }
    }
  }
</style>
