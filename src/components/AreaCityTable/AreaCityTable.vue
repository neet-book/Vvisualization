<script setup lang="ts">
import {useStore} from "@/store/inde.ts";
import {computed, onMounted, ref, shallowRef} from "vue";
const store = useStore()

const areaCityData = shallowRef<Map<string, AreaDate[]>>(new Map())

const currentAreaCityData = computed(() => {
  return areaCityData.value.get(store.area ?? '北京')
})


onMounted(async () => {
  if (!store.list) await store.getList()

  areaCityData.value = new Map(store.areaCityData.map((area) => {
    return [area.name, area.children]
  }))
})

</script>

<template>
  <div class="city-table">
    <table>
      <tr class="table-header">
        <th>城市</th>
        <th>确诊人数</th>
        <th>新增</th>
        <th>治愈</th>
        <th>死亡</th>
        <th>重症</th>
      </tr>

      <transition-group tag="tbody">
        <tr v-for="city in currentAreaCityData" :key="city.id">
          <td>{{ city.name }}</td>
          <td>{{ city.total.confirm }}</td>
          <td>{{ city.total.storeConfirm ?? 0 }}</td>
          <td>{{ city.total.heal }}</td>
          <td>{{ city.total.dead }}</td>
          <td>{{ city.total.severe }}</td>
        </tr>
      </transition-group>
    </table>
  </div>
</template>

<style scoped lang="scss">
.city-table {
  margin-top: 20px;
  height: 30vh;
  overflow: hidden;
  table {
    width: 100%;
    border-collapse: collapse;
    th, tr, td {
      border: 1px solid #9E9E9E;
    }

    td {
      text-align: center;
      font-size: 13px;
      padding: 0.3em 0;
    }
  }
}
</style>