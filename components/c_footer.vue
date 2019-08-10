<template lang="pug">
  .footer_content
    .col
      .logo
    .col
      .bubble
        img(src="/assets/images/pink-bubble.svg")
        span
          | Уровень сложности лица – это шуточный показатель,
          |  который мы придумали для этой кампании,
          |  а сложнометр – это шуточный инструмент
      p
        | Акция действует на территории РФ. Организатором акции является ООО «АЙКОН». Общий период акции с 12.08.2019 по 30.11.2019. Прием заявок на участие с 12.08.2019 по 12.10.2019.
        |  Полная информация об организаторе акции, правилах ее проведения, количестве призов, сроках, месте и порядке их получения приведена <a href="/rules.pdf" target="_blank">здесь</a>. Количество призов ограничено.
      .row
        a(href="#", target="_blank") Политика конфиденциальности
        a(href="#", target="_blank") Cookie
        a(href="https://www.adme.ru", target="_blank") ADME
    .col
      .close(@click="$emit('close')") &times;
</template>
<style lang="scss">
  .footer_content {
      position: absolute;
      left: 0;
      bottom: 0;
      background: #24297a;
      font-size: 18px;
      color: #fff;
      width: 100%;
      padding: 40px 22px;
      z-index: 200;
      @include flex(row);
      justify-content: space-between;
      align-items: flex-start;
      transform: translateY(100%);
      @include transition;

      .col {
        margin: 0;
        width: 21.09375%;
        &:nth-child(2) {
          width: 57.8125%
        }

        &:nth-child(3) {
          @include flex(row);
          justify-content: flex-end;
          align-items: flex-start;
        }

        .close {
          font-size: 1.5em;
          margin-right: 20px;
          cursor: pointer;
        }

        a {
          color: #fff;
        }

        .logo {
          position: relative;
          left: 0 !important;
          top: 0 !important;
          width: 90%;
          height: 200px;
          max-width: 310px;
        }

        p {
          padding-top: 40px;
        }

        .bubble {
          font-size: 35px;
          text-transform: uppercase;
          font-weight: bold;
          text-align: center;

          span {
            position: relative;
            z-index: 2;
            display: block;
            width: 100%;
            padding: 0 10%;
          }

          img {
            position: absolute;
            left: -4%;
            top: -20px;
            width: 105%;
            height: calc(100% + 40px);
          }
        }

        .row {
          @include flex(row);
          padding-top: 40px;

          a {
            display: block;
            margin: 0 45px;
            color: #fff;
          }
        }
      }
    }
</style>
