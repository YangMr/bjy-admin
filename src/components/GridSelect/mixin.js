export default {
  props: {
    client_str: {
      type: String,
      default: "2",
    },
    link_type: {
      type: String,
      default: "3",
    },
    formColumnCount: {
      type: Number,
      default: 4,
    },
    selectType: {
      type: String,
      default: "multi",
    },
    rowSelectDisabled: {
      type: Function,
    },
    selectedRows: {
      type: Array,
    },
  },
  data() {
    return {
      selectList: [],
    };
  },
  methods: {
    // get
    getSelectList() {
      return this.selectList;
    },
    // on event
    onSelectionChange(selections) {
      this.selectList = [...selections];
    },
    onSearch() {
      this.$refs.grid.requestList(true);
    },
  },
};
