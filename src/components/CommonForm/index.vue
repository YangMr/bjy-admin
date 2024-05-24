<script>
/**
1) attrs / props / style: 会直接传给对应组件的内部
2) 重置时，会用 params 的初始值重置
3) 可以用 slot 来展示特殊的表单组件
4) 使用示例：
items = [
  {
    label: "输入框",
    type: "input",
    key: "xxx",
    placeholder: "xxx", // 选填，默认为“请输入”
  },
  {
    label: "选择框",
    type: "select",
    key: "xxx",
    placeholder: "xxx", // 选填，默认为“请输入”
    labelKey: "xxx", // 选填，默认为 label
    valueKey: "xxx", // 选填，默认为 value
    options: [
      {label: "显示", value: 1},
      {label: "隐藏", value: 2}
    ]
  },
  {
    label: "枚举选择框",
    type: "enum-select",
    key: "xxx",
    enum: "StudentStatus", // 枚举名称
    props: {
      xxx: xxxx, // 这里可以扩展组件内部的props
    }
  },
  {
    label: "日期选择",
    type: "date-select",
    key: "xxx",
  },
  {
    label: "日期范围选择",
    type: "date-range-select",
    keyStart: "起始时间key",
    keyEnd: "结束时间key"
  },
  {
    label: "级联选择",
    type: "cascader",
    key: "xxx",
    props: {
      url: "/api/course/classify",
    }
  }
]
 */

export default {
  name: "CommonForm",
  props: {
    labelWidth: {
      type: Number,
      default: 70,
    },
    itemWidth: {
      type: Number,
      default: 200,
    },
    items: {
      type: Array,
      default: () => [],
    },
    params: {
      type: Object,
      default: () => ({}),
    },
    // 如果有该函数，则不执行默认重置函数
    resetFunc: {
      type: Function,
    },
  },
  data() {
    return {
      initParams: {},
      gridData: [],
      itemStyle: {},
      timer: false,
      screenWidth: 0,
      columnCount: 4,
    };
  },
  watch: {
    items: {
      immediate: true,
      handler() {
        this.formatterGridata();
      },
    },
    screenWidth(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val;
        this.calcGridata();
        this.timer = true;
        let that = this;
        setTimeout(function () {
          that.timer = false;
        }, 200);
      }
    },
    columnCount() {
      this.formatterGridata();
    },
  },
  created() {
    this.initParams = Object.assign({}, this.params);
  },
  mounted() {
    this.screenWidth = document.querySelector("#el-form").clientWidth;
    this.calcGridata();
    window.addEventListener("resize", this.onListener);
  },
  //离开页面,移出监听事件
  deactivated() {
    window.removeEventListener("resize", this.onListener);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onListener);
  },
  render() {
    return (
      <el-form label-width={this.labelWidth + "px"} inline id="el-form">
        {this.generateItems()}
      </el-form>
    );
  },
  methods: {
    onListener() {
      this.screenWidth = document.querySelector("#el-form").clientWidth;
    },
    // calc
    calcGridata() {
      if (this.screenWidth <= 1860) {
        this.columnCount = 4;
        let itemWidth =
          ((this.screenWidth - 80) / 4 / this.screenWidth) * 100 + "%";
        this.itemStyle = {
          width: itemWidth,
        };
      } else if (this.screenWidth > 1860 && this.screenWidth <= 2240) {
        this.columnCount = 5;
        let itemWidth =
          ((this.screenWidth - 100) / 5 / this.screenWidth) * 100 + "%";
        this.itemStyle = {
          width: itemWidth,
        };
      } else if (this.screenWidth > 2240 && this.screenWidth <= 2620) {
        this.columnCount = 6;
        let itemWidth =
          ((this.screenWidth - 120) / 6 / this.screenWidth) * 100 + "%";
        this.itemStyle = {
          width: itemWidth,
        };
      } else if (this.screenWidth > 2620 && this.screenWidth <= 3000) {
        this.columnCount = 7;
        let itemWidth =
          ((this.screenWidth - 140) / 7 / this.screenWidth) * 100 + "%";
        this.itemStyle = {
          width: itemWidth,
        };
      } else {
        this.columnCount = 8;
        let itemWidth =
          ((this.screenWidth - 160) / 8 / this.screenWidth) * 100 + "%";
        this.itemStyle = {
          width: itemWidth,
        };
      }
    },
    formatterGridata() {
      this.gridData = [];
      let rowData = [];
      this.items.forEach(item => {
        if (item.disabled) return;
        rowData.push(item);
        if (rowData.length >= this.columnCount) {
          this.gridData.push(rowData);
          rowData = [];
        }
      });
      if (rowData.length) {
        this.gridData.push(rowData);
      }
      if (this.gridData.length) {
        const lastRowData = this.gridData[this.gridData.length - 1];
        if (lastRowData.length < this.columnCount) {
          const emptyElement = this.columnCount - lastRowData.length - 1;
          for (let i = 0; i < emptyElement; i++) {
            lastRowData.push({
              type: "empty",
            });
          }
          lastRowData.push({
            type: "search-btn",
          });
        } else {
          const emptyElement = this.columnCount - 1;
          const rowData = [];
          for (let i = 0; i < emptyElement; i++) {
            rowData.push({
              type: "empty",
            });
          }
          rowData.push({
            type: "search-btn",
          });
          this.gridData.push(rowData);
        }
      }
    },
    // on event
    onSearch(type) {
      this.$nextTick(() => {
        this.$emit("on-search", this.params, type);
      });
    },
    onReset() {
      if (this.resetFunc) {
        this.resetFunc(this.params);
      } else {
        this.resetParams();
      }
      this.$nextTick(() => {
        if (this.$refs.commonSelectRefs) {
          this.$refs.commonSelectRefs.forEach(item => {
            if (item.remote) {
              item.clearOptions();
            }
          });
        }
      });
      this.onSearch("reset");
    },
    onKeyDown(e) {
      if (e.key == "Enter") {
        e.preventDefault();
        this.onSearch();
      }
    },
    onUpdateValue(val, key) {
      this.params[key] = val;
    },
    // other
    resetParams() {
      for (const key in this.initParams) {
        if (this.needRest(key)) {
          this.params[key] = this.initParams[key];
        }
      }
    },
    needRest(key) {
      const item = this.items.find(i => i.key == key);
      if (item) {
        // 禁用不显示的，无需 reset
        if (item.disabled) {
          return false;
        }
        // 指定无需 reset
        if (item.noReset) {
          return false;
        }
      }
      return true;
    },
    // generate
    generateItems() {
      return this.gridData.map(row => (
        <div class="el-form-item-wrap">
          {row.map(col => {
            let ele;
            if (col.slot) {
              ele = this.$slots[col.slot];
            } else {
              ele = this.generateItem(col);
            }
            return (
              <div style={this.itemStyle} class="el-form-item-self">
                <el-form-item
                  {...{
                    directives: this.itemDirectives(col),
                  }}
                  {...col.props}
                  label={col.label}
                  key={col.key}
                >
                  {ele}
                </el-form-item>
              </div>
            );
          })}
        </div>
      ));
    },
    generateItem(item) {
      let ele;
      switch (item.type) {
        case "input":
          ele = (
            <el-input
              {...this.commonData(item)}
              v-model={this.params[item.key]}
              size={"small"}
              clearable
              placeholder={item.placeholder || "请输入"}
              nativeOn-keydown={this.onKeyDown}
            ></el-input>
          );
          break;
        case "select":
          ele = (
            <el-select
              {...this.commonData(item)}
              v-model={this.params[item.key]}
              size={"small"}
              clearable
              placeholder={item.placeholder || "请选择"}
            >
              {(item.options || []).map(option => {
                return (
                  <el-option
                    key={option[item.valueKey || "value"]}
                    value={option[item.valueKey || "value"]}
                    label={option[item.labelKey || "label"]}
                  ></el-option>
                );
              })}
            </el-select>
          );
          break;
        case "enum-select":
          ele = (
            <EnumSelect
              {...this.commonData(item)}
              v-model={this.params[item.key]}
              type={item.enum}
              selector="select"
              multiple={!!item.multiple}
              size={"small"}
              clearable
            />
          );
          break;
        case "date-select":
          ele = (
            <DateSelect
              {...this.commonData(item)}
              value={this.params[item.key]}
              on={{
                "update:value": val => this.onUpdateValue(val, item.key),
              }}
              size={"small"}
            ></DateSelect>
          );
          break;
        case "date-range-select":
          ele = (
            <DateRangeSelect
              type="daterange"
              {...this.commonData(item)}
              start={this.params[item.keyStart]}
              end={this.params[item.keyEnd]}
              on={{
                "update:start": val => this.onUpdateValue(val, item.keyStart),
                "update:end": val => this.onUpdateValue(val, item.keyEnd),
              }}
              size={"small"}
            ></DateRangeSelect>
          );
          break;
        case "date-time-range-select":
          ele = (
            <DateRangeSelect
              type="datetimerange"
              {...this.commonData(item)}
              start={this.params[item.keyStart]}
              end={this.params[item.keyEnd]}
              on={{
                "update:start": val => this.onUpdateValue(val, item.keyStart),
                "update:end": val => this.onUpdateValue(val, item.keyEnd),
              }}
              size={"small"}
            ></DateRangeSelect>
          );
          break;
        case "cascader":
          ele = (
            <Cascader
              size={"small"}
              {...this.commonData(item)}
              v-model={this.params[item.key]}
            ></Cascader>
          );
          break;
        case "common-select":
          ele = (
            <CommonSelect
              ref={"commonSelectRefs"}
              refInFor={true}
              size={"small"}
              v-model={this.params[item.key]}
              {...this.commonData(item)}
            />
          );
          break;
        case "povinceType_city_select":
          ele = (
            <PovinceTypeCitySelect
              ref={"commonCitySelectRefs"}
              refInFor={true}
              size={"small"}
              v-model={this.params[item.key]}
              {...this.commonData(item)}
            />
          );
          break;
        case "range-input":
          ele = (
            <RangeInput
              start={this.params[item.keyStart]}
              end={this.params[item.keyEnd]}
              on={{
                "update:start": val => this.onUpdateValue(val, item.keyStart),
                "update:end": val => this.onUpdateValue(val, item.keyEnd),
              }}
              {...this.commonData(item)}
            />
          );
          break;
        case "empty":
          ele = <div></div>;
          break;
        case "search-btn":
          ele = (
            <div class="search-btn-wrap">
              <el-button
                type={"primary"}
                size={"small"}
                on-click={this.onSearch}
              >
                查询
              </el-button>
              <el-button size={"small"} on-click={this.onReset}>
                重置
              </el-button>
            </div>
          );
          break;
      }
      return ele;
    },
    commonData(item) {
      return {
        attrs: item.attrs,
        props: item.props,
        style: item.style,
      };
    },
    itemDirectives(item) {
      const directives = [];
      if (item.vSwitch) {
        directives.push({
          name: "switch",
          arg: item.vSwitch,
        });
      }
      return directives;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  margin-bottom: 10px;
}
.el-form-item-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.el-form-item {
  margin-right: 0;
  margin-bottom: 10px;
  display: inline-flex;
  align-items: center;
  width: 100%;
  /deep/ .el-form-item__label {
    line-height: 1.2;
    flex-shrink: 0;
    text-align: left;
  }
  /deep/.el-form-item__content {
    flex-grow: 1;
  }
}
.enum-select,
.common-select,
.date-select,
.cascader {
  display: block;
}
.date-range-select {
  display: flex;
}
.search-btn-wrap {
  text-align: right;
}
</style>
