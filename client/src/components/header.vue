<template>
<header>
  <div id="logo">{{logo}}</div>
    <ul>
        <li v-for="nav in navs" :key='nav.id' >{{nav.li}}</li>
    </ul>
</header>
</template>

<script>
export default {
  name: 'headerDiv',
  data () {
      return {
          navs: [
              {li: '主页'},
              {li: '日志'},
              {li: '说说'},
              {li: '相册'},
              {li: '控件'},
              {li: '微信'}
          ]
      }
  },
  props: ['logo']

}
</script>

<style>

</style>
