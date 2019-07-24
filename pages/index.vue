<template lang="pug">
  .page#page1
    .face
    .bubble1
    .bubble2
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
  #page1 {
    $w: 100vw/12;
    $gap: 0.2;

    @keyframes bubbles {
      0% {   transform: translate(2px*$gap, 1px*$gap) rotate(0deg); }
      10% {  transform: translate(-1px*$gap, -2px*$gap) rotate(-1deg); }
      20% {  transform: translate(-3px*$gap, 0px*$gap) rotate(1deg); }
      30% {  transform: translate(0px*$gap, 2px*$gap) rotate(0deg); }
      40% {  transform: translate(1px*$gap, -1px*$gap) rotate(1deg); }
      50% {  transform: translate(-1px*$gap, 2px*$gap) rotate(-1deg); }
      60% {  transform: translate(-3px*$gap, 1px*$gap) rotate(0deg); }
      70% {  transform: translate(2px*$gap, 1px*$gap) rotate(-1deg); }
      80% {  transform: translate(-1px*$gap, -1px*$gap) rotate(1deg); }
      90% {  transform: translate(2px*$gap, 2px*$gap) rotate(0deg); }
      100% { transform: translate(2px*$gap, 1px*$gap) rotate(0deg); }
    }

    .bubble1 {
      width: 18.33333%;
      position: absolute;
      left: calc(#{$w*2/6} + 22px);
      top: 50%;
      transform: translateY(-50%);
      animation-name: bubbles;
      animation-duration: 3.8s;
      transform-origin:50% 50%;
      animation-iteration-count: infinite;
      animation-timing-function: linear;

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
      animation-name: bubbles;
      animation-duration: 3.8s;
      transform-origin:50% 50%;
      animation-delay: 1s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;

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
      background-image: url(/assets/images/face1.jpg);
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
