<script>
export default {
  props: ["paymentList", "tableConfig"],
  data() {
    return {}
  },
  methods: {},
}
</script>

<template>
  <div class="tables">
  <el-table

    :data="paymentList"
    :tableConfig="tableConfig"
    style="width: 100%">
    <div v-for="(item, index) in tableConfig" :key="index">
      <!-- 不使用插槽的列 -->
      <el-table-column
        v-if="!item.slot"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :align="item.align"
      />
      <!-- 使用插槽的列 -->
      <el-table-column
        v-if="item.slot"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :align="item.align"
      >
        <template #default="{ row }">
          <slot :name="item.slot" :row="row"></slot>
        </template>
      </el-table-column>
    </div>

  </el-table>
  </div>
</template>

<style lang="scss" scoped>
.el-table {
  width: 100%;
  overflow-y: auto;
  border: 1px solid #ccc;
  margin-top: 20px;
  height: 500px;
  padding: 10px;
  border-radius: 5px;
}

</style>
