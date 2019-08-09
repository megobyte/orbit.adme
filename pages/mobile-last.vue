<template lang="pug">
  .page#page6(
    v-hammer:swipe="(event)=>goTo(event)"
  )
    .mobile.slidetext
      h2 сложнометр<br />о сложном лице<br />#ЛИЦОПРОЩЕ С ORBIT<br />промо
      .line
      p.center
        a(href="/rules/pdf", target="_blank") правила участия
        br
        a(href="#") политика конфиденциальности
      .share
        .t поделиться
        .icons
          a.vk(href="#").
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="M20.8,7.74C20.93,7.32 20.8,7 20.18,7H18.16C17.64,7 17.41,7.27 17.28,7.57C17.28,7.57 16.25,10.08 14.79,11.72C14.31,12.19 14.1,12.34 13.84,12.34C13.71,12.34 13.5,12.19 13.5,11.76V7.74C13.5,7.23 13.38,7 12.95,7H9.76C9.44,7 9.25,7.24 9.25,7.47C9.25,7.95 10,8.07 10.05,9.44V12.42C10.05,13.08 9.93,13.2 9.68,13.2C9,13.2 7.32,10.67 6.33,7.79C6.13,7.23 5.94,7 5.42,7H3.39C2.82,7 2.7,7.27 2.7,7.57C2.7,8.11 3.39,10.77 5.9,14.29C7.57,16.7 9.93,18 12.08,18C13.37,18 13.53,17.71 13.53,17.21V15.39C13.53,14.82 13.65,14.7 14.06,14.7C14.36,14.7 14.87,14.85 16.07,16C17.45,17.38 17.67,18 18.45,18H20.47C21.05,18 21.34,17.71 21.18,17.14C21,16.57 20.34,15.74 19.47,14.76C19,14.21 18.29,13.61 18.07,13.3C17.77,12.92 17.86,12.75 18.07,12.4C18.07,12.4 20.54,8.93 20.8,7.74Z" />
            </svg>
          a.fb(href="#").
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />
            </svg>
          a.ok(href="#").
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="M17.83,12.74C17.55,12.17 16.76,11.69 15.71,12.5C14.28,13.64 12,13.64 12,13.64C12,13.64 9.72,13.64 8.29,12.5C7.24,11.69 6.45,12.17 6.17,12.74C5.67,13.74 6.23,14.23 7.5,15.04C8.59,15.74 10.08,16 11.04,16.1L10.24,16.9C9.1,18.03 8,19.12 7.25,19.88C6.8,20.34 6.8,21.07 7.25,21.5L7.39,21.66C7.84,22.11 8.58,22.11 9.03,21.66L12,18.68C13.15,19.81 14.24,20.9 15,21.66C15.45,22.11 16.18,22.11 16.64,21.66L16.77,21.5C17.23,21.07 17.23,20.34 16.77,19.88L13.79,16.9L13,16.09C13.95,16 15.42,15.73 16.5,15.04C17.77,14.23 18.33,13.74 17.83,12.74M12,4.57C13.38,4.57 14.5,5.69 14.5,7.06C14.5,8.44 13.38,9.55 12,9.55C10.62,9.55 9.5,8.44 9.5,7.06C9.5,5.69 10.62,4.57 12,4.57M12,12.12C14.8,12.12 17.06,9.86 17.06,7.06C17.06,4.27 14.8,2 12,2C9.2,2 6.94,4.27 6.94,7.06C6.94,9.86 9.2,12.12 12,12.12Z" />
            </svg>
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
          //this.$router.push('/mobile-last');
        } else if((event.type=="swipe") && (event.direction == 4)) {
          this.$router.push('/promo');
        }
      }
    },
  },

  mounted: function() {
    //VK.Widgets.CommunityMessages("vk_community_messages", 140562021, {width: 400, expanded: "1",tooltipButtonText: "Есть вопрос?"});
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
  @media screen and (max-width: 768px){
    #page6 {
      text-transform: uppercase;
      color: #fff;
      height: 100%;

      .mobile {
        padding-top: 92px;
        @include flex();
        justify-content: flex-start;
      }

      .mobile {
        width: 100%;
        height: 100%;
      }

      h2 {
        text-align: center;
        font-size: 29px;
      }

      .line {
        width: 42px;
        height: 0px;
        border-top: 2px solid #FFFFFF;
        margin: 0 auto 20px;
      }

      p {
        font-size: 11px;
        text-align: center;
        a {
          color: #fff;
          text-decoration: none;
        }
      }

      .share {
        text-align: center;
        margin-top: auto;
        margin-bottom: 50px;

        .t {
          font-size: 15px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .icons {
          @include flex(row);

          a {
            @include flex;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: #fff;
            margin: 0 10px;

            svg {
              width: 30px !important;
              height: 30px !important;
            }

            path {
              fill: $pink;
            }
          }
        }

      }
    }
  }
</style>
