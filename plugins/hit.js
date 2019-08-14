import Vue from 'vue'

Vue.prototype.$funcs = {
  hit: function(ev) {
    if (VK){
      VK.Retargeting.Event(ev);
    }
  }
}
