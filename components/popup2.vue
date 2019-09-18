<template lang="pug">
  #popup
    .overlay(@click="closeMe()")
    .window
      .h
        span Победители
        .close(@click="closeMe()") &times;
      .content
        .search
          .input
            .vk
            input(type="text", v-model="vkid", placeholder="поиск по id")
          .btn
        #frame.frame(ref="frame", @scroll="isVisibilityChange")
          template(v-for="item in wins")
            template(v-if="item.vkid")
              .item
                .date
                  template {{item.date}}
                .yellow
                  .id
                    .star(v-if="item.prize === '10000р.'")
                    a(:href="'https://vk.com/id'+item.vkid", target="_blank") vk.com/id{{item.vkid}}
                  .prize {{item.prize}}
          .autoload(ref='autoload')
</template>
<script>
export default {
  data: function() {
    return {
      vkid: "",
      limit: 100,
      page: 0,
      winners: false,
      winners1k: false,
      updating: false
    };
  },

  computed: {
    wins() {
      var wins = [];

      if (this.vkid !== "") {
        for (var k = 0; k <= this.page * this.limit + this.limit; k++) {
          if (this.winners[k]) {
            let element = this.winners[k];
            if ((element.vkid + "").includes(this.vkid)) {
              wins.push(element);
            }
          }
        }
      } else {
        for (var k = 0; k <= this.page * this.limit + this.limit; k++) {
          if (this.winners[k]) {
            let element = this.winners[k];
            wins.push(element);
          }
        }
      }

      return wins;
    }
  },

  methods: {
    closeMe() {
      this.$emit("closeme");
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
    },
    isElementInViewport(el) {
      const rect = el.getClientRects();
      return (
        rect[0].top >= 0 &&
        rect[0].bottom <=
          (window.innerHeight || document.documentElement.clientHeight)
      );
    },
    isVisibilityChange() {
      const visible = this.isElementInViewport(this.$refs.autoload);
      if (visible && !this.updating) {
        this.page += 1;
      }
    }
  },

  async mounted() {
    let winners = await this.$axios.get("/winners.json");
    let d = winners.data;
    d.sort(function(a, b) {
      let astr = a.date.split(".");
      let adate = Math.round(
        new Date(2019, parseInt(astr[1]), parseInt(astr[0])).getTime() / 1000
      );
      let bstr = b.date.split(".");
      let bdate = Math.round(
        new Date(2019, parseInt(bstr[1]), parseInt(bstr[0])).getTime() / 1000
      );
      if (adate > bdate) return -1;
      if (adate < bdate) return 1;
      return 0;
    });
    this.winners = d;
  }
};
</script>
<style lang="scss">
#popup {
  .window {
    .content {
      .search {
        width: 100%;
        height: 80px;
        margin-bottom: 40px;
        @include flex(row);

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
              content: "";
              display: block;
              width: 36px;
              height: 36px;
              background: url(/assets/images/social/vk-blue.svg) no-repeat
                center;
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
            content: "";
            display: block;
            width: 66px;
            height: 66px;
            background: url(/assets/images/search.svg) no-repeat center;
            background-size: contain;
          }
        }
      }

      .frame {
        width: 100%;
        height: 50vh;
        overflow: hidden;
        overflow-y: auto;

        .autoload {
          height: 1px;
          width: 100%;
        }

        .item {
          width: 100%;
          margin-bottom: 10px;
          font-size: 22px;
          text-align: left;
          text-transform: uppercase;

          .date {
            padding: 0 20px;
            line-height: 30px;
            color: #fff;
          }

          .yellow {
            height: 30px;
            color: $blue;
            background: $adme;
            @include flex(row);
            justify-content: space-between;
            padding: 0 20px;
            line-height: 30px;

            a {
              color: $blue;
            }

            .id {
              @include flex(row);
              justify-content: flex-start;
            }

            .star {
              width: 24px;
              height: 24px;
              margin-right: 10px;
              background: url(/assets/images/star.svg) no-repeat center;
              background-size: contain;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  #popup {
    .window {
      .content {
        .frame {
          height: 70vh;
          .item {
            .yellow {
              flex-direction: column;
              height: 65px;
            }
          }
        }
      }
    }
  }
}
</style>
