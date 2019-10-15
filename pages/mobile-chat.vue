<template lang="pug">
  .page#chatbot
    .mobile
      .loading
        p Привет!
        p Вот наша акция и подошла к концу. Спасибо большое всем 110 тысячам, которые так активно участвовали. Вы загрузили целых 150 000 фоток – и это очень круто!
        p Следите за новостями, мы скоро к вам вернемся с новыми акциями :)
        p Всегда ваши,
        p Orbit®
      .close(@click="goTo('/promo')") &times;
</template>

<script>

export default {
  data: function() {
    return {

    }
  },

  methods: {
    goTo(uri) {
      this.$router.push(uri);
    },
  },

  mounted: function() {
    var w = window.innerWidth
              || document.documentElement.clientWidth
              || document.body.clientWidth;
    if (w <= 768) {
      if (process.client) {
        setTimeout(function() {
          VK.Widgets.CommunityMessages("vk_community_messages", 137753974, {expanded: "1",tooltipButtonText: "Есть вопрос?"});
        }, 3000);
      }
    }
  },

  beforeDestroy: function() {

  }
}

</script>

<style lang="scss">
  #chatbot {
    .mobile {
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100%;
      background: #21427c;
      z-index: 2000;

      .loading {
            width: 100%;
            height: 100%;
            @include flex;
            left: 0px;
            color: #fff;
            font-size: 1.1rem;
            padding: 20px;
            overflow-y: auto;
            align-items: flex-start;

            p {
              margin: 0;
              padding: 0;
              margin-bottom: 20px;
            }
          }
    }

    .close {
      position: absolute;
      z-index: 4;
      left: 50%;
      top: 13px;
      margin-left: 125px;
      width: 30px;
      height: 30px;
      background: #4a76a8;

      @include flex;
      color: #b1c4d9;
      font-weight: bold;
      font-size: 1.4em;
    }

    #vk_community_messages {
      position: absolute !important;
      left: 50% !important;
      transform: translateX(-50%);
      top: 10px !important;
      height: calc(100% - 20px) !important;
      z-index: 3 !important;
      width: 100%;


      iframe {
        height: 100% !important;
        width: 100% !important;
      }
    }
  }
</style>
