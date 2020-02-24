<template>
  <div id="app">
    <header-layout
      v-if="!$route.meta.navHeader"
      :title="$route.meta.title"
    ></header-layout>
    <footer-layout v-if="$route.meta.navFooter"></footer-layout>
    <router-view />
  </div>
</template>
<script>
import HeaderLayout from '@/layouts/HeaderLayout'
import FooterLayout from '@/layouts/FooterLayout.vue'
export default {
  name: 'app',
  components: {
    HeaderLayout,
    FooterLayout
  }
}
</script>
<style lang="less"></style>
