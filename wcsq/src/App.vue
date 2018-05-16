<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
  /*reset*/

  body,
  div,
  dl,
  dt,
  dd,
  ul,
  ol,
  li,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  pre,
  form,
  fieldset,
  input,
  textarea,
  p,
  blockquote,
  th,
  td {
    margin: 0;
    padding: 0;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  fieldset,
  img {
    border: 0;
  }

  em,
  strong,
  i {
    font-style: normal;
  }

  ol,
  ul,
  li {
    list-style: none;
  }

  caption,
  th {
    text-align: left;
  }

  input,
  button,
  textarea,
  select,
  optgroup,
  option {
    font-family: arial;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
  }

  select,
  input,
  label,
  button,
  button img,
  img {
    vertical-align: middle;
  }

  input,
  button,
  textarea,
  img {
    line-height: normal;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  /*主体*/

  body {
    font: 14px/1.5 arial;
    color: #7e7e7e;
    background: #f4f4f4;
    font-family: "微软雅黑";
  }

  a {
    color: #7e7e7e;
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }

  :focus {
    outline: 0;
  }

  .clearfix {
    clear: left;
    zoom: 1;
  }

  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .hide {
    display: none;
  }

  .tc {
    text-align: center;
  }

  .tr {
    text-align: right;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .fs12 {
    font-size: 12px;
  }

  .fs14 {
    font-size: 14px;
  }

  .fs16 {
    font-size: 16px;
  }

  .layout {
    width: 1190px;
    margin-left: auto;
    margin-right: auto;
  }

</style>
