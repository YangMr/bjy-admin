<template>
  <div class="grid">
    <el-table
      ref="table"
      :data="list"
      style="width: 100%"
      :row-style="rowStyle"
      :row-key="rowKey"
      :expand-row-keys="expandRowKeys"
      @selection-change="onSelectionChange"
      @row-click="
        row => {
          this.selectRow
            ? !this.showSingle
              ? this.onSelectionChange(row)
              : this.selectType == 'single'
              ? this.onSingleChange(row[this.rowKey])
              : this.onSelectionMultiChange(row)
            : '';
        }
      "
      @sort-change="onSortChange"
      :row-class-name="rowClassName"
      :highlight-current-row="!showSingle"
      :class="[showSingle ? '' : 'highlight']"
    >
      <el-table-column
        v-if="selectType == 'multi'"
        type="selection"
        width="55"
        :reserve-selection="keepSelected"
        :selectable="onMultiSelectable"
      ></el-table-column>
      <el-table-column v-if="selectType == 'single'" width="55" align="center">
        <template slot-scope="{ row }">
          <el-radio
            v-model="singleValue"
            :label="row[rowKey]"
            @change="onSingleChange"
            :disabled="onSingleSelectDisable(row)"
          >
            <span></span>
          </el-radio>
        </template>
      </el-table-column>
      <template v-for="(item, index) in innerColumns">
        <el-table-column
          v-if="!item.disabled"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :align="item.align"
          :type="item.type"
          :sortable="item.sortable"
          :fixed="item.fixed"
          :render-header="item.renderHeader"
          :show-overflow-tooltip="item.showOverflowTooltip"
        >
          <template slot-scope="scope">
            <slot
              v-if="item.slot"
              :name="item.slot"
              :row="scope.row"
              :index="scope.$index"
            ></slot>
            <div v-else>{{ scope.row[item.prop] }}</div>
          </template>
        </el-table-column>
      </template>
      <template slot="empty">
        <slot name="empty"></slot>
      </template>
    </el-table>
    <div class="footer">
      <div class="pos-left">
        <slot name="footer-left"></slot>
      </div>
      <el-pagination
        v-if="mode == 'server' && this.total"
        class="pos-right"
        background
        @current-change="onCurrentChange"
        @size-change="onSizeChange"
        :current-page="page"
        :page-size="limit"
        :pager-count="pageCount"
        layout="total, prev, pager, next, sizes, jumper"
        :total="total"
        :page-sizes="pageSizes"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import * as enums from "@/utils/enums";
import http from "@/utils/http";
import Sortable from "sortablejs";
export default {
  name: "grid",
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    url: {
      type: String,
    },
    method: {
      type: String,
      default: "get",
    },
    search: {
      type: Object,
      default: () => ({}),
    },
    selectType: {
      type: String,
      default: "none",
    },
    // 可选择时候的主键
    rowKey: {
      type: String,
      default: "id",
    },
    formatter: {
      type: Function,
    },
    getData: {
      type: Function,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageCount: {
      type: Number,
      default: 5,
    },
    // 是否保持选择
    keepSelected: {
      type: Boolean,
      default: false,
    },
    // 行是否禁选 Function(rowData)
    rowSelectDisabled: {
      type: Function,
    },
    rowStyle: {
      type: Object,
      default: () => ({}),
    },
    // 选中行
    selectedRows: {
      type: Array,
    },
    // 展开行
    expandRowKeys: {
      type: Array,
    },
    // 是否展示全局loading
    showLoading: {
      type: Boolean,
      default: true,
    },
    rowClassName: {
      type: Function,
    },
    // 是否自动拉取数据
    autoLoadData: {
      type: Boolean,
      default: true,
    },
    // server-请求接口模式   client-本地模式
    mode: {
      type: String,
      default: "server",
    },
    // 本地数据
    localData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    sortAble: {
      type: Boolean,
      default: false,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40, 50, 100],
    },
    //不显示单选按钮，高亮选中当前行
    showSingle: {
      type: Boolean,
      default: true,
    },
    //整行选中是否开启
    selectRow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      page: 1,
      total: 0,
      limit: this.pageSize,
      list: [],
      loading: false,
      singleValue: 0,
      selection: [],
      enums,
      extra: {}, //额外数据
      sortable: null,
      ids: [],
      slected: [],
    };
  },
  computed: {
    innerColumns() {
      const ret = [];
      this.columns &&
        this.columns.forEach(i => {
          if (i.disabled) return;
          ret.push(i);
        });
      return ret;
    },
    enumColumns() {
      return this.innerColumns.filter(c => c.enum);
    },
    formatColumns() {
      return this.innerColumns.filter(c => c.formatter);
    },
  },
  watch: {
    async list() {
      await this.$nextTick();
      this.initSelectionRows(this.selectedRows);
    },
    selectedRows: {
      immediate: true,
      async handler(rows) {
        if (!rows) return;
        await this.$nextTick();
        this.initSelectionRows(rows);
      },
    },
    innerColumns: {
      immediate: true,
      handler() {
        this.enumColumns.forEach(c => {
          if (c.origin_prop) return;
          c.origin_prop = c.prop;
          c.prop = c.prop + "_enum";
        });
        this.formatColumns.forEach(c => {
          if (c.origin_prop) return;
          c.origin_prop = c.prop;
          c.prop = c.prop + "_format";
        });
      },
    },
    localData() {
      if (this.mode == "client") {
        this.requestList(true);
      }
    },
  },
  activated() {
    if (this.autoLoadData) {
      this.requestList(false);
    }
  },
  created() {
    if (this.selectedRows && this.selectedRows.length) {
      this.slected = this.selectedRows.map(item => item.id);
    }
    if (this.autoLoadData) {
      this.requestList(true);
    }
  },
  methods: {
    //多选 点击整行选中,已存在数组中的删除，置为未选，然后触发onSelectionChange，不存在数组中的相反
    onSelectionMultiChange(row) {
      if (this.slected.includes(row.id)) {
        //已经在被选择的数组里的，置为为选中时，要删掉
        let index = this.slected.findIndex(item => item == row.id);
        this.slected.splice(index, 1);
        this.$refs.table.toggleRowSelection(row, false);
        return;
      }
      this.slected.push(row.id);
      this.$refs.table.toggleRowSelection(row, true);
    },
    // init
    async initSelectionRows(rows) {
      if (
        !rows ||
        !rows.length ||
        !["single", "multi"].includes(this.selectType)
      )
        return;
      const table = this.$refs.table;
      const tableSelectionRows = table.tableData.filter(tableRow => {
        return rows.find(row => row[this.rowKey] == tableRow[this.rowKey]);
      });
      await this.$nextTick();
      if (this.selectType == "multi") {
        tableSelectionRows.forEach(tableRow => {
          table.toggleRowSelection(tableRow, true);
        });
        this.onSelectionChange(tableSelectionRows);
      } else if (this.selectType == "single") {
        const row = rows[0];
        this.singleValue = row[this.rowKey];
        this.onSingleChange(this.singleValue);
      }
    },
    // on event
    onCurrentChange(page) {
      this.page = page;
      this.requestList(false);
    },
    onSizeChange(limit) {
      this.limit = limit;
      this.requestList(false);
    },
    onSelectionChange(val) {
      this.$emit("selection-change", val);
    },
    onSingleChange(val) {
      this.singleValue = val;
      // val 为单选设定的key，由key来寻找行数据
      const result = this.list.filter(i => {
        return i[this.rowKey] == val;
      });
      this.$emit("selection-change", result);
    },
    onMultiSelectable(row) {
      let disabled = false;
      if (this.rowSelectDisabled) {
        disabled = this.rowSelectDisabled(row);
      }
      return !disabled;
    },
    onSingleSelectDisable(row) {
      let disabled = false;
      if (this.rowSelectDisabled) {
        disabled = this.rowSelectDisabled(row);
      }
      return disabled;
    },
    // other
    clearSelection() {
      this.singleValue = 0;
      this.$refs.table.clearSelection();
    },
    // format
    formatEnumRows(list) {
      this.enumColumns.forEach(c => {
        list.forEach(item => {
          const enumItem = this.enums[c.enum];
          if (!enumItem) return;
          if (!item[c.origin_prop] && item[c.origin_prop] !== 0) {
            this.$set(item, c.prop, "-");
            return;
          }
          this.$set(item, c.prop, enumItem.getValue(item[c.origin_prop]));
        });
      });
    },
    formatCell(column, row, origin_prop) {
      const formatter = column.formatter,
        origin = row[origin_prop];
      row[origin_prop + "_format"] = this.$tool.gridFormat(formatter, origin);
    },
    formatCellRows(list) {
      this.formatColumns.forEach(c => {
        list.forEach(item => {
          this.formatCell(c, item, c.origin_prop);
        });
      });
    },
    // request
    async requestList(refresh = true) {
      this.list = [];
      if (this.loading) {
        return;
      }
      let data,
        realData,
        curPage = this.page;
      if (this.mode == "server") {
        if (!this.url) {
          return;
        }
        this.loading = true;
        if (refresh) {
          curPage = 1;
          this.page = 1;
        }
        const params = {
          page: curPage,
          limit: this.limit,
          ...this.search,
        };
        data = await http[this.method](this.url, params, {
          showLoading: this.showLoading,
          onComplete: () => {
            this.loading = false;
          },
        });
        if (data.list) {
          realData = data.list;
          this.total = data.total;
        } else {
          realData = data;
        }
        if (data.extra) {
          this.$emit("getExtra", data.extra);
        }
        this.$emit("onGetData", data);
      } else {
        data = this.localData;
        this.total = this.localData.length;
        realData = this.localData;
      }
      this.formatEnumRows(realData);
      this.formatCellRows(realData);
      this.formatter && this.formatter(realData);
      this.getData && this.getData(data);
      this.list = realData;
      this.$emit("requestListComplete", { list: realData, total: this.total });
      //拖拽排序
      if (this.sortAble) {
        this.ids = this.list.map(v => v.id);
        this.$nextTick(() => {
          this.setSort();
        });
      }
      if (this.list.length == 0 && !refresh && curPage > 1) {
        this.page = curPage - 1;
        this.requestList(refresh);
      }
    },
    onSortChange({ prop, order }) {
      this.$emit("sort", { prop, order });
    },
    // 排序
    setSort() {
      const el = this.$refs.table.$el.querySelectorAll(
        ".el-table__fixed-right>.el-table__fixed-body-wrapper > table > tbody",
      )[0];
      this.sortable = Sortable.create(el, {
        setData: function (dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData("Text", "");
        },
        onEnd: evt => {
          this.$emit("onDrag", evt, this.ids);
        },
      });
    },
    //清空列表
    clearTable() {
      this.list = [];
      this.total = 0;
    },
    // 无感刷新，例如，领取之后，去除已领取的线索
    clearSingleRow(index) {
      this.list.splice(index, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
.grid {
  /deep/ .el-table {
    thead th {
      background-color: #f6f6f6 !important;
      border-bottom: none;
      color: #333;
      font-weight: 400;
    }
    .cell {
      padding: 0 15px;
    }
  }
  .footer {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
  }
  .highlight {
    /deep/ .el-table__body tr.current-row > td {
      background:blue !important;
      color: #fff;
    }
  }
}
</style>
