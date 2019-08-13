<template lang="pug">
  input.uploadinput(type="file", ref="face", accept="image/*", @change="uploadFace($event, 'face')")
</template>
<script>
export default {
  methods: {
    uploadFace(e, ref) {
      var that = this;
      this.face = this.$refs[ref].files[0];
      const fd = new FormData();
      fd.append('face', this.face);
      this.$axios.post('/task/', fd, {
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
    }
  }
}
</script>
<style lang="scss">
  input.uploadinput {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
</style>
