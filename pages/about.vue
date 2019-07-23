<template lang="pug">
  .page#page2
    .face
    .text
      h1 что такое<br />сложное лицо?
      p Есть люди, которые даже в расслабленном состоянии выглядят неприветливо. Это явление известно как сложноe лицо, и причина его не в плохом характере, а в особом строении лица.

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

      h1 {
        text-transform: uppercase;
        line-height: 1em;
        margin: 0;
        padding: 0;
        margin-bottom: 40px;
        padding-bottom: 0px;

        &::before {
          content: '';
          display: block;
          width: 116px;
          height: 120px;
          background: url(/assets/images/quote.svg) no-repeat center;
          background-size: contain;
          position: absolute;
          left: -150px;
          top: -56px;
        }
      }

      p {
        padding: 0;
        margin: 0;
        font-size: 39px;
        line-height: 1em;
      }

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
