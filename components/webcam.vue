<template lang="pug">
  #webcam
    vue-webcam(ref="webcam", :width="800", :height="600")
    .btns
      .btn(@click="save()") Сохранить
      .btn(@click="$emit('close')") Закрыть
</template>
<script>
import VueWebcam from './vue-webcam';

export default {
  name: 'webcam',
  components: {
    VueWebcam
  },
  methods: {
    save() {
      var that = this;
      var photo = this.$refs.webcam.getCanvas();
      photo.toBlob(function(blob) {
        blob = new File([blob], "face.png", {});
        console.log(blob);
        const fd = new FormData();
        fd.append('face', blob);
        that.$axios.post('/task/', fd, {
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
      });
    }
  }
}
</script>
<style lang="scss">
  #webcam {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: $bg;
    z-index: 9999;
    @include flex();

    video {
      max-height: calc(100% - 90px);
    }

    .btn {
      cursor: pointer;
      padding: 10px 20px;
      margin: 0 10px;
      color: #FFF;
      text-transform: uppercase;
      background: $pink;
    }

    .btns {
      padding-top: 20px;
      @include flex(row);
    }
  }
</style>