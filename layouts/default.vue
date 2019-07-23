<template lang="pug">
  #global
    header
      .left
        span при поддержке
        a.adme(href="//adme.ru/", target="_blank")
      .right.col
        a.vk(href="#", target="_blank")
        a.fb(href="#", target="_blank")
    nuxt
    .logo
    ul.menu
      li О сложном лице
      li СЛОЖНОМЕТР
      li #ЛИЦОПРОЩЕ С ОРБИТ
      li ПРОМО
    .dots
      .dot
      .dot
      .dot
      .dot
      .dot
    .onehk
    footer
      .grid
        div
        div
        div
        div
</template>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  min-height: 100%;
}

body {
  background: $bg;
  position: relative;
  font-family: $font;
  font-size: 36px;
  position: relative;
}

* {
  position: relative;
  box-sizing: border-box;
}

$w: 100vw/12;
.col {
  width: calc(#{$w} - 20px);
  margin-left: 10px;
  margin-right: 10px;
}

#global {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .page {
    position: absolute;
    left: 0;
    top: 60px;
    width: 100vw;
    height: calc(100vh - 60px);

    .face {
      $tw: $w*7;
      width: calc(#{$tw} - 20px);
      height: 100%;
      position: absolute;
      left: calc(#{$w} + 22px);
      top: 0;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center bottom;
    }

    .text {
      color: #fff;
      width: $w*4;
      position: absolute;
      left: calc(42px + #{$w * 7});
    }
  }

  .logo {
    $tw: $w*2;
    width: calc(#{$tw} - 10px);
    height: 0;
    position: absolute;
    left: 22px;
    top: 60px + 44px;

    &::before {
      background: url(/assets/images/logo.png) no-repeat center;
      background-size: contain;
      content: '';
      display: block;
      width: 100%;
      height: 0;
      padding-top: 67.877094972067039%;
    }
  }

  .menu {
    $tw: $w*2;
    left: $tw;
    transform: translateX(82px);
    top: 60px + 44px;
    @include flex(row);
    justify-content: flex-start;
    position: absolute;
    font-size: 28px;
    text-transform: uppercase;
    color: #fff;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin: 0;
      padding: 0;
      list-style: none;
      margin-right: 30px;
      cursor: pointer;
      position: relative;
      display: block;

      &::before {
        content: '';
        @include transition;
        width: calc(100% + 40px);
        z-index: -1;
        height: 50px;
        border-radius: 25px;
        position: absolute;
        left: -20px;
        top: 50%;
        transform: translateY(-53%) scaleX(0);
        background: $pink;
      }

      &:hover{
        &::before {
          transform: translateY(-53%) scaleX(1);
        }
      }
    }
  }

  .button {
    width: 19.791666666666667vw;
    &::before {
      background: url(/assets/images/button-check.svg) no-repeat center $pink;
      background-size: contain;
      content: '';
      display: block;
      width: 100%;
      height: 0;
      padding-top: 26.315789473684211%;
    }
  }

  .onehk {
    width: 12.083333333333333%;
    position: absolute;
    right: 0;
    top: 60px + 44px;
    cursor: pointer;

    &::before {
      background: url(/assets/images/100k.png) no-repeat center;
      background-size: contain;
      content: '';
      display: block;
      width: 100%;
      height: 0;
      padding-top: 73.706896551724138%;
    }
  }

  header {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 60px;
    background: $adme;
    color: #000;
    font-size: 16px;
    text-transform: uppercase;
    padding: 0 22px;
    @include flex(row);
    justify-content: space-between;

    .left {
      padding-left: $w*2/6;
      @include flex(row);
      align-items: flex-end;
      justify-content: flex-start;
      padding-bottom: 17px;
      height: 100%;
      width: $w*2;
      white-space: nowrap;

      span {

        bottom: -3px;
      }

      .adme {
        display: block;
        width: 74px;
        height: 22px;
        background: url(/assets/images/adme-transparent.png) no-repeat center;
        background-size: contain;
        bottom: 2px;
        margin-left: 17px;
      }
    }

    .right {
      @include flex(row);
      justify-content: space-between;
      margin-right: 0;
      &::before,
      &::after {
        content: '';
        display: block;
        width: 1px;
      }
      a {
        display: block;
        width: 37px;
        height: 37px;

        &.vk {
          background: url(/assets/images/vk-circle.svg) no-repeat center;
          background-size: contain;
        }
        &.fb {
          background: url(/assets/images/fb-circle.svg) no-repeat center;
          background-size: contain;
        }
      }
    }
  }

  .dots {
    $dw: 20px;

    position: absolute;
    right: 22px;
    top: 50%;
    transform: translateY(-50%);
    height: 200px;
    width: $dw;
    @include flex();
    justify-content: space-between;

    .dot {
      width: $dw;
      height: $dw;
      border-radius: 50%;
      background: #fff;
      opacity: .5;
      @include transition;

      &.active {
        opacity: 1;
      }
    }
  }

  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

    .grid {
      width: $w*7;
      height: 24px;
      position: absolute;
      right: 0;
      bottom: 0;
      @include flex(row);
      justify-content: space-between;

      div {
        display: block;
        width: 25%;
        height: 100%;

        &:nth-child(1) { background: #f9e44c;}
        &:nth-child(2) { background: $pink;}
        &:nth-child(3) { background: $violet;}
        &:nth-child(4) { background: #3c819e;}
      }
    }
  }
}
</style>
