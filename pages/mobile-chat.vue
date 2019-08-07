<template lang="pug">
  .page#chatbot
    .mobile
      #vk_community_messages
        .loading Загружаю чат-бота
</template>

<script>

export default {
  data: function() {
    return {

    }
  },

  methods: {

  },

  mounted: function() {
    var w = window.innerWidth
              || document.documentElement.clientWidth
              || document.body.clientWidth;
    if (w <= 768) VK.Widgets.CommunityMessages("vk_community_messages", 184016686, {expanded: "1",tooltipButtonText: "Есть вопрос?"});
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
        font-size: 30px;
            width: 100%;
            height: 100%;
            @include flex;
            animation-name: loading;
            animation-duration: 2s;
            transform-origin:50% 50%;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            left: 26px;
            color: #fff;
          }
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
