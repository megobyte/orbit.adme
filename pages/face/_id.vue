<template lang="pug">
  .page#face
    template(v-if="photo")
      .photo
        img(:src="photo")
      .text
        .head Уровень<br />сложности лица:
        .level {{level}}
        .faces(:class="lstar")
          .f
          .f
          .f
          .f
          .f
        p {{description}}
        .share
          .fb
          .vk
          .ok
</template>
<script>

export default {
  head () {
    return {
      title: this.level,
      meta: [
        { hid: 'og-title', property: 'og:title', content: this.level },
        { hid: 'og-desciption', property: 'og:desciption', content: this.desciption },
        // other meta
      ]
    }
  },

  data: function() {
    return {
      photo: '',
      level: 'Высокий',
      description: 'Есть люди, которые даже в расслабленном состоянии выглядят неприветливо. Это явление известно как сложноe лицо, и причина его не в плохом характере, а в особом строении лица.'
    }
  },

  computed: {
    host () {
      return this.$store.state.host
    },
    lstar() {
      switch(this.level) {
        case "Драматичный":
          return 'l5';
          break;
        case "Высокий":
          return 'l4';
          break;
        case "Умеренный":
          return 'l3';
          break;
        case "Незначительный":
          return 'l2';
          break;
        case "Отсутствует":
          return 'l1';
          break;
        case "Нечитаемое фото":
          return 'l0';
          break;
      }
    }
  },

  mounted: async function() {
    var r = await this.$axios.get(this.$store.state.host+"/task/"+this.$route.params.id+"/")

    this.photo = r.data.face;
    this.level = r.data.result.code;
    this.description = r.data.result.msg;
  }
}
</script>
<style lang="scss">
#face {
  $w: 100vw/12;

  .photo {
    position: absolute;
    left: calc(#{$w*2} + 22px);
    $ww: $w*2 * .68;
    top: calc(#{$ww} - 17px);
    width: $w*4;
    height: 71vh;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .text {
    $ww: $w*2 * .68;
    top: calc(#{$ww} - 17px);

    .head {
      text-transform: uppercase;
      color: $violet;
      line-height: 1em;
      font-weight: bold;
      margin-bottom: 40px;
    }

    .level {
      font-size: 90px;
      text-transform: uppercase;
      font-weight: bold;
      margin-bottom: 20px;

      &::before {
        position: absolute;
        left: calc(-#{$w} - 10px);
        content: '–';
        text-align: center;
        display: block;
        width: $w;
        color: #fff;
      }
    }

    .faces {
      width: $w*3;
      height: calc(#{$w*3} *.17);
      @include flex(row);
      justify-content: space-between;
      margin-bottom: 40px;

      .f {
        width: 16.867469879518072%;
        padding-top: 16.867469879518072%;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        filter: grayscale(1);
        opacity: .38;

        &:nth-child(1) { background-image: url(/assets/images/level/l1.png);}
        &:nth-child(2) { background-image: url(/assets/images/level/l2.png);}
        &:nth-child(3) { background-image: url(/assets/images/level/l3.png);}
        &:nth-child(4) { background-image: url(/assets/images/level/l4.png);}
        &:nth-child(5) { background-image: url(/assets/images/level/l5.png);}
      }

      &.l1 .f:nth-child(1) { filter: none; opacity: 1; }
      &.l2 .f:nth-child(2) { filter: none; opacity: 1; }
      &.l3 .f:nth-child(3) { filter: none; opacity: 1; }
      &.l4 .f:nth-child(4) { filter: none; opacity: 1; }
      &.l5 .f:nth-child(5) { filter: none; opacity: 1; }
    }

    p {
        padding: 0;
        margin: 0;
        font-size: 32px;
        line-height: 1em;
        @include transition;
        margin-bottom: 40px;
      }
  }
}

@media screen and (max-width: 1440px){
  #face {
    .text {
      .level {
        font-size: 60px;
      }
    }
  }
}
</style>
