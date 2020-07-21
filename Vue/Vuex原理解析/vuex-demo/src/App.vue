<!--
 * @Descripttion: 
 * @version: 
 * @Author: dxiaoxing
 * @Date: 2020-07-20 08:27:59
 * @LastEditors: dxiaoxing
 * @LastEditTime: 2020-07-21 10:58:20
--> 
<template>
  <div id="app">
    <div>
      学习的年龄{{$store.state.age}}
      <br>
      我的年龄 {{$store.getters.myAge}}

      {{$store.state.a.age}}
      {{$store.state.b.age}}
      {{$store.state.b.c.age}}
      <button @click="syncChange()">点我更改</button>
      <button @click="asyncChange()">异步更改</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    console.log(this.$store.state);
  },
  methods: {
    syncChange() {
      this.$store.commit('syncChange', 10)
    },
    asyncChange() {
      this.$store.dispatch('asyncChange', 5)
    }
  }
}
</script>

<style>
</style>
