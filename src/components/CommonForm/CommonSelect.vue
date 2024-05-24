<template>
  <el-select
    ref="commonSelect"
    class="common-select"
    v-model="modelValue"
    :multiple="multiple"
    transfer
    :disabled="disabled"
    :size="size"
    clearable
    :filterable="filterable"
    :remote="remote"
    :remote-method="getData"
    style="width: 100%"
  >
    <el-option
      v-for="(item, index) in list"
      :value="item[selectParams.select_id]"
      :label="item[selectParams.select_name]"
      :key="index"
      :disabled="optionDisabled && optionDisabled(item)"
    ></el-option>
  </el-select>
</template>

<script>
import http from "@/utils/http";
import PresetTypes from "./common-select-type";
export default {
  name: "FormSelect",
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    // 预设类型
    presetType: {
      type: String,
    },
    value: {},
    idKey: {
      type: String,
      default: "id",
    },
    nameKey: {
      type: String,
      default: "name",
    },
    url: {
      type: String,
    },
    params: {
      type: Object,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hasPage: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
    },
    optionDisabled: {
      type: Function,
    },
    size: {
      type: String,
    },
    filterable: {
      type: Boolean,
      default: true,
    },
    remote: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "value",
    event: "modelValueChange",
  },
  computed: {
    selectParams() {
      let nameKey = this.nameKey,
        idKey = this.idKey,
        url = this.url;
      if (this.presetType) {
        const presetData = PresetTypes[this.presetType];
        nameKey = presetData.nameKey;
        idKey = presetData.idKey;
        url = presetData.url;
      }
      return {
        select_name: nameKey,
        select_id: idKey,
        url: url,
      };
    },
  },
  data() {
    return {
      list: [],
      modelValue: this.multiple ? [] : "",
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (this.multiple && typeof val === "string") {
          const tmp = val ? val.split(",") : [];
          this.modelValue = tmp.map(i => +i);
        } else {
          this.modelValue = val;
        }
      },
    },
    modelValue(newValue) {
      this.$emit(
        "modelValueChange",
        Array.isArray(newValue) ? newValue.join() : newValue,
      );
      if (newValue) {
        this.$emit(
          "on-change",
          this.list.find(t => t[this.selectParams.select_id] == newValue),
        );
      } else {
        this.$emit("on-change");
      }
    },
    params() {
      this.getData();
    },
    options(newValue) {
      this.list = newValue;
    },
  },
  async created() {
    this.modelValue = this.value;
    if (this.selectParams && this.selectParams.url && !this.remote) {
      await this.getData();
    } else if (this.options) {
      this.list = this.options;
    }
  },
  methods: {
    async getData(query) {
      let params = { ...this.params };
      if (query && this.remote) {
        params.nickname = query;
      }
      if (this.hasPage) {
        params.limit = 999999;
      }
      // console.log(this.selectParams);
      let data = await http.get(this.selectParams.url, params);
      this.list = data.list || data;
      this.$emit("on-get-list", this.list);
    },
    resetOptoins() {
      if (this.remote) {
        this.$nextTick(() => {
          this.$refs.commonSelect.options = [];
        });
      }
    },
    clearOptions() {
      this.list = [];
    },
  },
};
</script>
