<template lang="pug">
  .page
</template>
<script>
import axios from 'axios';

export default {
  head () {
    return {
      title: this.level,
      meta: this.meta
    }
  },

  async asyncData ({ params }) {
    let meta = [];
    let border = {
        left: 0,
        top: 0,
        width: 0,
        height: 0
    };
    let sharing = false;

    try {
      let r = await axios.get('https://orbit.adme.ru/task/'+params.id+'/');
      meta = [
        { hid: 'title', name: 'title', content: '#лицопрощеorbit' },
        { hid: 'description', name: 'description', content: '#лицопрощеorbit' },
        { hid: 'twitter:title', name: 'twitter:title', content: 'Проверь себя на сложнометре от Орбит' },
        { hid: 'twitter:image:src', name: 'twitter:image:src', content: (r.data.result.sharing) ? r.data.result.sharing.fb : 'https://orbit.adme.ru/assets/images/share/tw.png' },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'og:title', property: 'og:title',content: 'Проверь себя на сложнометре от Орбит' },
        { hid: 'og:url', property: 'og:url', content: 'https://orbit.adme.ru/share/'+params.id+'/' },
        { hid: 'og:image', property: 'og:image', content: (r.data.result.sharing) ? r.data.result.sharing.fb : 'https://orbit.adme.ru/assets/images/share/fb.png' },
        { hid: 'og:image:width', property: 'og:image:width', content: '1200' },
        { hid: 'og:image:height', property: 'og:image:height', content: '630' },
        { hid: 'og:description', property: 'og:description', content: '#лицопрощеorbit' },
      ];

      sharing = (r.data.result.sharing) ? r.data.result.sharing : false;
      if (r.data.result.face_border) {
        border.left = (r.data.result.face_border.left*100) + '%';
        border.top = (r.data.result.face_border.top*100) + '%';
        border.width = (r.data.result.face_border.width*100) + '%';
        border.height = (r.data.result.face_border.height*100) + '%';
      }
    } catch(err) {

    }

    return {
      meta:meta,
      border: border,
      sharing: sharing
    };
  },

  data: function() {
    return {
      photo: '',
      level: 'Высокий',
      loaded: false,
      imgstyle: {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      },
      border: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      },
      sharing: false,
      description: 'Есть люди, которые даже в расслабленном состоянии выглядят неприветливо. Это явление известно как сложноe лицо, и причина его не в плохом характере, а в особом строении лица.'
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

  methods: {
    getShareLink(type) {
      switch(type) {
        case 'fb':
          //-return '//www.facebook.com/share.php?u='+encodeURIComponent('https://orbit.adme.ru/face/'+this.$route.params.id+'/');
          return '//www.facebook.com/dialog/share?app_id=2348221251964050&display=page&href='+encodeURIComponent('https://orbit.adme.ru/face/'+this.$route.params.id+'/');
          break;
        case 'vk':
          return '//vk.com/share.php?noparse=true&url='+encodeURIComponent('https://orbit.adme.ru/face/'+this.$route.params.id+'/')+'&title='+encodeURIComponent(this.description+' #лицопрощеorbit')+'&description='+encodeURIComponent(this.description)+'&image='+encodeURIComponent((this.sharing) ? this.sharing.vk : 'https://orbit.adme.ru/assets/images/share/vk.png')
          break;
        case 'ok':
          return '//connect.ok.ru/offer?url='+encodeURIComponent('https://orbit.adme.ru/face/'+this.$route.params.id+'/')+'&imageUrl='+encodeURIComponent((this.sharing) ? this.sharing.ok : 'https://orbit.adme.ru/assets/images/share/ok.png')
          break;
        case 'tw':
          return '//twitter.com/share?url='+encodeURIComponent('https://orbit.adme.ru/face/'+this.$route.params.id+'/')
          break;
      }
    },
    goTo(uri) {
      this.$router.push(uri);
    },

    imgl(e, ref) {
      var img = this.$refs[ref];
      if (img && (img.clientWidth > 0)) {
        this.imgstyle.width = img.clientWidth+'px';
        this.imgstyle.height = img.clientHeight+'px';
        this.imgstyle.left = img.offsetLeft+'px';
        this.imgstyle.top = img.offsetTop+'px';
      }
    },

    async reloadMe() {
      var r = await this.$axios.get("/task/"+this.$route.params.id+"/")

      this.photo = r.data.face;
      if (r.data.result.code) {
        this.loaded = true;
        this.level = r.data.result.code;
        this.description = r.data.result.msg;

        this.border.left = (r.data.result.face_border.left*100) + '%';
        this.border.top = (r.data.result.face_border.top*100) + '%';
        this.border.width = (r.data.result.face_border.width*100) + '%';
        this.border.height = (r.data.result.face_border.height*100) + '%';

        if (r.data.result.sharing) {
          this.sharing = r.data.result.sharing;
        }

        this.imgl(null, 'imgb');
        this.imgl(null, 'mimg');
        this.$router.push('/');
      } else {
        setTimeout(function(that) { that.reloadMe(); }, 500, this);
      }
    }
  },

  mounted: function() {
    this.reloadMe();
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
    text-align: right;

    img {
      max-width: 100%;
      max-height: calc(100% - 80px);
    }

  }
    .border {
      position: absolute;

      .in {
        background: url(/assets/images/border.svg) no-repeat center;
        background-size: 100% auto;
      }
    }

  .text {
    $ww: $w*2 * .68;
    top: calc(#{$ww} - 17px);

    .reload {
      font-size: 18px;
      @include flex(row);

      justify-content: flex-start;

      .upload {
        width: 70px;
        height: 70px;
        margin-right: 30px;
        background: url(/assets/images/upload-small.svg) no-repeat center;
        background-size: contain;
        cursor: pointer;
        @include transition;

        &:hover {
          transform: scale(1.05);
        }
      }

      .txt {
        width: calc(87% - 120px);
      }

      a {
        color: $pink;
        text-decoration: underline;
        cursor: pointer;

        &:hover {
          text-decoration: none;
        }
      }
    }

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



    .share {
        text-align: center;
        margin-top: auto;
        margin-bottom: 40px;

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
            @include transition;

            svg {
              width: 30px !important;
              height: 30px !important;
            }

            path {
              fill: $pink;
              @include transition;
            }

            &:hover {
              background: $pink;

              path {
                fill: #FFF;
              }
            }
          }
        }

      }

    .photom {
      display: none;
    }

    .mob {
      display: none;
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

@media screen and (min-width: 769px) and (max-height: 800px){
  #face {
    .text {
      top: auto;
      bottom: 60px;
      .head {
        font-size: 24px;
        margin-bottom: 15px;
      }

      .level {
        font-size: 50px;
        margin-bottom: 15px;
      }

      p {
        font-size: 23px;
        margin-bottom: 30px;
      }

      .faces {
        margin-bottom: 15px;
      }

      .share {
        margin-bottom: 30px;
      }
    }
  }
}
@media screen and (min-width: 769px) and (max-height: 700px){
  #face {
    .text {
      top: auto;
      bottom: 60px;
      .head {
        font-size: 24px;
        margin-bottom: 10px;
      }

      .level {
        font-size: 50px;
        margin-bottom: 10px;
      }

      p {
        font-size: 23px;
        margin-bottom: 20px;
      }

      .faces {
        margin-bottom: 10px;
      }

      .share {
        margin-bottom: 20px;
      }
    }
  }
}

@media screen and (max-width: 768px){
  #face {
    text-transform: uppercase;

    .photo {
      display: none;
    }

    .text {
      top: 0 !important;
      .head {
        letter-spacing: 0.075em;
        margin-bottom: 5px;
        br { display: none; }
      }

      .level {
        font-size: 24px;
        letter-spacing: 0.075em;
        margin-bottom: 10px;
      }

      p {
        display: none;
      }

      .mob {
        display: block;
        font-size: 13px;
        width: 70%;
        margin: 0 auto 20px;
        font-size: 13px;
        line-height: 121.2%;
        /* or 16px */
        text-align: center;
        letter-spacing: 0.09em;
      }

      .faces {
        width: 204px;
        height: 40px;
        margin: 10px auto 10px;

      }

      .photom {
        height: 160px;
        display: block;

        img {
          max-height: 160px;
          max-width: 100%;
          margin: 0 auto;
        }
      }

      .share {
        margin-bottom: 10px;
      }

      .reload {
        font-size: 14px;
        text-align: left;
        margin: 0 20px;
      }
    }

  }

  #global {
    #face {
      .text {
        left: 0;
        top: 40px;
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
