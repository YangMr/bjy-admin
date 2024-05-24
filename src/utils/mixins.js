export const lifetimeTest = {
  beforeCreate() {
    console.log("beforeCreate " + this.$options.name);
  },
  created() {
    console.log("created " + this.$options.name);
  },
  beforeMount() {
    console.log("beforeMount " + this.$options.name);
  },
  mounted() {
    console.log("mounted " + this.$options.name);
  },
  beforeUpdate() {
    console.log("beforeUpdate " + this.$options.name);
  },
  updated() {
    console.log("updated " + this.$options.name);
  },
  beforeDestroy() {
    console.log("beforeDestroy " + this.$options.name);
  },
  destroyed() {
    console.log("destroyed " + this.$options.name);
  },
};

export const twowayModel = {
  props: {
    value: {},
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "value",
    event: "change",
  },
  data() {
    return {
      privateValue: "",
    };
  },
  created() {
    this.privateValue = this.convert(this.value);
  },
  watch: {
    value(newValue) {
      this.privateValue = this.convert(newValue);
    },
  },
  methods: {
    convert(value) {
      if (!value) {
        return value;
      }
      if (this.multiple) {
        return value
          .toString()
          .split(",")
          .map(v => (!isNaN(v) ? Number(v) : v));
      }
      return value;
    },
    convertBack(value) {
      if (!value) {
        return value;
      }
      if (this.multiple) {
        return value.join(",");
      }
      return value;
    },
    onChange() {
      this.$emit("change", this.convertBack(this.privateValue));
    },
  },
};
