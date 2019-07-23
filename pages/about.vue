<template lang="pug">
  .page#page2
    .face
    .text
      .head
        svg(x="0px", y="0px", viewBox="0 0 857.7 264.8", xml:space="preserve")
          text(transform="matrix(1 0 0 1 0 115.937)")
            tspan(x="0") ПРОВЕРЬ СЕБЯ НА
            tspan(x="0", dy="123.1") СЛОЖНОЕ ЛИЦО
        .button

</template>

<script>

export default {

}
</script>

<style lang="scss">
  #page2 {
    $w: 100vw/12;

    .bubble1 {
      width: 18.33333%;
      position: absolute;
      left: calc(#{$w*2/6} + 22px);
      top: 50%;
      transform: translateY(-50%);

      &::before {
        background: url(/assets/images/bubble1.svg) no-repeat center;
        background-size: contain;
        content: '';
        display: block;
        width: 100%;
        height: 0;
        padding-top: 67.329545454545455%;
      }
    }

    .bubble2 {
      width: 22.604166666666667%;
      position: absolute;
      left: 49%;
      top: 12%;

      &::before {
        background: url(/assets/images/bubble2.svg) no-repeat center;
        background-size: contain;
        content: '';
        display: block;
        width: 100%;
        height: 0;
        padding-top: 64.746543778801843%;
      }
    }

    .face {
      background-image: url(/assets/images/face2.jpg);
    }

    .text {
      height: 100%;
      @include flex();
      align-items: flex-start;

      .head {
        width: 100%;
        margin-bottom: 20px;
        transform: translateY(40%);

        svg {
          width: 100%;

          text {
            tspan {
              fill: #FFFFFF;
              font-family:'Wrigley';
              font-weight: bold;
              font-size:132.4996px;
            }
          }
        }
      }
    }
  }
</style>
