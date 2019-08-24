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
        .frame
          template(v-for="item in wins")
            template(v-if="item.vkid")
              .item
                .date
                  template(v-if="item.price.indexOf('.19') > -1") {{item.price}}
                .yellow
                  .id
                    .star(v-if="item.prize === '10000р.'")
                    a(:href="'https://vk.com/id'+item.vkid", target="_blank") vk.com/id{{item.vkid}}
                  .prize {{item.prize}}
</template>
<script>
export default {
  data: function() {
    return {
      vkid: '',
      winners: false,
      winners1k: false
    }
  },

  computed: {
    wins () {
      var _wins = [];
      var wins = [];
      if (this.winners) {
        _wins = this.winners1k.concat(this.winners);
      }

      if (this.vkid !== '') {
        _wins.forEach(element => {
          if (element.vkid.indexOf(this.vkid) > -1) {
            wins.push(element);
          }
        });
      } else {
        wins = _wins;
      }

      return wins;
    }
  },

  methods: {
    closeMe() {
      this.$emit('closeme');
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
    }
  },

  async mounted() {
    let winners = await this.$axios.get('/winners.csv');
    let winners1k = await this.$axios.get('/winners1k.csv');

    var csvJSON = function(csv) {
      var lines = csv.split("\r\n");
      var result = [];
      var headers = lines[0].split(";");

      for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(";");

        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }

        result.push(obj);
      }
      return result; //JavaScript object
      //return JSON.stringify(result); //JSON
    }

    this.winners1k = csvJSON(winners1k.data);
    this.winners   = csvJSON(winners.data);
  }
}
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
                content: '';
                display: block;
                width: 36px;
                height: 36px;
                background: url(/assets/images/social/vk-blue.svg) no-repeat center;
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
              content: '';
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

  @media screen and (max-width: 768px){
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
