<template lang="pug">
  .page#face(v-hammer:swipe.right="(event)=>goTo('/metr')")
    template(v-if="photo")
      .photo
        img(:src="photo", @load="imgl($event, 'imgb')", ref='imgb')
        .border(:style="imgstyle")
          .in(:style="border")
      .text(v-if="loaded")
        .head Уровень <br />сложности лица:
        .level {{level}}
        p.mob {{description}}
        .photom
          img(:src="photo", @load="imgl($event, 'mimg')", ref='mimg')
          .border(:style="imgstyle")
            .in(:style="border")
        .faces(:class="lstar")
          .f
          .f
          .f
          .f
          .f
        p {{description}}
        .share
          //.t поделиться
          .icons
            a.vk(:href="getShareLink('vk')", target="_blank").
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path d="M20.8,7.74C20.93,7.32 20.8,7 20.18,7H18.16C17.64,7 17.41,7.27 17.28,7.57C17.28,7.57 16.25,10.08 14.79,11.72C14.31,12.19 14.1,12.34 13.84,12.34C13.71,12.34 13.5,12.19 13.5,11.76V7.74C13.5,7.23 13.38,7 12.95,7H9.76C9.44,7 9.25,7.24 9.25,7.47C9.25,7.95 10,8.07 10.05,9.44V12.42C10.05,13.08 9.93,13.2 9.68,13.2C9,13.2 7.32,10.67 6.33,7.79C6.13,7.23 5.94,7 5.42,7H3.39C2.82,7 2.7,7.27 2.7,7.57C2.7,8.11 3.39,10.77 5.9,14.29C7.57,16.7 9.93,18 12.08,18C13.37,18 13.53,17.71 13.53,17.21V15.39C13.53,14.82 13.65,14.7 14.06,14.7C14.36,14.7 14.87,14.85 16.07,16C17.45,17.38 17.67,18 18.45,18H20.47C21.05,18 21.34,17.71 21.18,17.14C21,16.57 20.34,15.74 19.47,14.76C19,14.21 18.29,13.61 18.07,13.3C17.77,12.92 17.86,12.75 18.07,12.4C18.07,12.4 20.54,8.93 20.8,7.74Z" />
              </svg>
            a.fb(:href="getShareLink('fb')", target="_blank").
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />
              </svg>
            a.ok(:href="getShareLink('ok')", target="_blank").
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path d="M17.83,12.74C17.55,12.17 16.76,11.69 15.71,12.5C14.28,13.64 12,13.64 12,13.64C12,13.64 9.72,13.64 8.29,12.5C7.24,11.69 6.45,12.17 6.17,12.74C5.67,13.74 6.23,14.23 7.5,15.04C8.59,15.74 10.08,16 11.04,16.1L10.24,16.9C9.1,18.03 8,19.12 7.25,19.88C6.8,20.34 6.8,21.07 7.25,21.5L7.39,21.66C7.84,22.11 8.58,22.11 9.03,21.66L12,18.68C13.15,19.81 14.24,20.9 15,21.66C15.45,22.11 16.18,22.11 16.64,21.66L16.77,21.5C17.23,21.07 17.23,20.34 16.77,19.88L13.79,16.9L13,16.09C13.95,16 15.42,15.73 16.5,15.04C17.77,14.23 18.33,13.74 17.83,12.74M12,4.57C13.38,4.57 14.5,5.69 14.5,7.06C14.5,8.44 13.38,9.55 12,9.55C10.62,9.55 9.5,8.44 9.5,7.06C9.5,5.69 10.62,4.57 12,4.57M12,12.12C14.8,12.12 17.06,9.86 17.06,7.06C17.06,4.27 14.8,2 12,2C9.2,2 6.94,4.27 6.94,7.06C6.94,9.86 9.2,12.12 12,12.12Z" />
              </svg>
        .reload
          .upload()
            upload
          .txt Первое впечатление может быть обманчивым. <a>Загрузи <upload /></a> другое свое фото и сравни результаты.
      .text(v-if="!loaded")
        .head Обрабатываем <Br />результат
</template>
<script>
import axios from 'axios';
import upload from '~/components/upload.vue'

export default {
  components: {
    upload
  },
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
        { hid: 'description', name: 'description', content: r.data.result.msg },
        { hid: 'twitter:title', name: 'twitter:title', content: r.data.result.msg+' #лицопрощеorbit' },
        { hid: 'twitter:image:src', name: 'twitter:image:src', content: (r.data.result.sharing) ? r.data.result.sharing.fb : 'https://orbit.adme.ru/assets/images/share/tw.png' },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'og:title', property: 'og:title',content: r.data.result.msg+' #лицопрощеorbit' },
        { hid: 'og:url', property: 'og:url', content: 'https://orbit.adme.ru/face/'+params.id+'/' },
        { hid: 'og:image', property: 'og:image', content: (r.data.result.sharing) ? r.data.result.sharing.fb : 'https://orbit.adme.ru/assets/images/share/fb.png' },
        { hid: 'og:image:width', property: 'og:image:width', content: '1200' },
        { hid: 'og:image:height', property: 'og:image:height', content: '630' },
        { hid: 'og:description', property: 'og:description', content: r.data.result.msg+' #лицопрощеorbit' },
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
          return '//www.facebook.com/share.php?u='+encodeURIComponent('https://orbit.adme.ru/face/'+this.$route.params.id+'/');
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
