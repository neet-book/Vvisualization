<script setup lang="ts">
import {useStore} from "@/store/inde.ts";
const store = useStore()

</script>

<template>
  <div class="confirm-table">
    <table>
      <tr>
        <th>城市</th>
        <th>确诊人数</th>
        <th>新增</th>
        <th>治愈</th>
        <th>死亡</th>
        <th>重症</th>
      </tr>

      <tr v-for="city in store.cityAreaData" :key="city.id">
        <th>{{ city.name }}</th>
        <th>{{ city.total.confirm }}</th>
        <th>{{ city.total.storeConfirm ?? 0 }}</th>
        <th>{{ city.total.heal }}</th>
        <th>{{ city.total.dead }}</th>
        <th>{{ city.total.severe }}</th>
      </tr>
    </table>
  </div>
</template>

<style scoped lang="scss">

</style>