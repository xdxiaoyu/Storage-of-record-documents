<!--
 * @Descripttion: 
 * @version: 
 * @Author: dxiaoxing
 * @Date: 2020-07-20 08:27:59
 * @LastEditors: dxiaoxing
 * @LastEditTime: 2020-07-20 18:16:40
--> 
<template>
  <div id="app">
    <div>
      学习的年龄{{$store.state.age}}
      <br>
      我的年龄 {{$store.getters.myAge}}

      <button @click="syncChange()">点我更改</button>
      <button @click="asyncChange()">异步更改</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
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
