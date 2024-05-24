import Vue from "vue";
import SortModalService from "@/components/SortModal.js";
import * as GridSelectModal from "@/components/GridSelect/GridSelectModal.js";

Vue.prototype.sortModalService = SortModalService;
Vue.prototype.$gridSelectService = GridSelectModal;

Vue.component("Grid", () =>
  import(/* webpackChunkName: "common-component" */ "@/components/Grid/Grid"),
);
Vue.component("TreeGrid", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/Grid/TreeGrid"
  ),
);
Vue.component("TreeGridPage", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/Grid/TreeGridPage"
  ),
);
Vue.component("MixGrid", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/Grid/MixGrid"
  ),
);
Vue.component("CellGrid", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/Grid/CellGrid"
  ),
);
Vue.component("CharCount", () =>
  import(/* webpackChunkName: "common-component" */ "@/components/CharCount"),
);
Vue.component("Currency", () =>
  import(/* webpackChunkName: "common-component" */ "@/components/Currency"),
);
Vue.component("UploadFile", () =>
  import(/* webpackChunkName: "common-component" */ "@/components/UploadFile"),
);
Vue.component("UploadOSSFile", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/UploadOSSFile"
  ),
);
Vue.component("Loading", () =>
  import(/* webpackChunkName: "common-component" */ "@/components/Loading"),
);
Vue.component("UploadSvg", () =>
  import(/* webpackChunkName: "common-component" */ "@/components/UploadSvg"),
);
Vue.component("SortModal", () =>
  import(/* webpackChunkName: "common-component" */ "@/components/SortModal"),
);
Vue.component("CheckboxEx", () =>
  import(/* webpackChunkName: "common-component" */ "@/components/CheckboxEx"),
);
Vue.component("RadioEx", () =>
  import(/* webpackChunkName: "common-component" */ "@/components/RadioEx"),
);
Vue.component("Fragment", () =>
  import(/* webpackChunkName: "common-component" */ "@/components/Fragment"),
);
Vue.component("EnumSelect", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/Form/EnumSelect"
  ),
);
Vue.component("FormBtns", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/Form/FormBtns"
  ),
);
Vue.component("SchoolSelect", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/Form/SchoolSelect"
  ),
);
Vue.component("SchoolCascader", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/Form/SchoolCascader"
  ),
);
Vue.component("SchoolMultiSelect", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/Form/SchoolMultiSelect"
  ),
);
Vue.component("SchoolMultiCascaderSelect", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/Form/SchoolMultiCascaderSelect"
  ),
);
Vue.component("DateSelect", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/Form/DateSelect"
  ),
);
Vue.component("DateRangeSelect", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/Form/DateRangeSelect"
  ),
);
Vue.component("CommonCascader", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/Form/CommonCascader"
  ),
);
Vue.component("CommonForm", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/Form/CommonForm"
  ),
);
Vue.component("CommonSelect", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/Form/CommonSelect"
  ),
);
Vue.component("NumberRangeInput", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/Form/NumberRangeInput"
  ),
);
Vue.component("AreaSelect", () =>
  import(/* webpackChunkName: "common-component" */ "@/components/AreaSelect"),
);
Vue.component("ButtonTeacher", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/Form/ButtonTeacher"
  ),
);
Vue.component("EditFormButtons", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/Form/EditFormButtons"
  ),
);
Vue.component("FormInput", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/Form/FormInput"
  ),
);
Vue.component("GradeSelect", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/Form/GradeSelect"
  ),
);
Vue.component("CourseClassifySelect", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/Form/CourseClassifySelect"
  ),
);
Vue.component("FormItemInput", () =>
  import(
    /* webpackChunkName: "common-component" */ "@/components/Form/FormItemInput"
  ),
);
Vue.component("Rich", () =>
  import(/* webpackChunkName: "common-component" */ "@/components/Rich"),
);
Vue.component("RichCell", () =>
  import(/* webpackChunkName: "common-component" */ "@/components/RichCell"),
);
Vue.component("Tips", () =>
  import(/* webpackChunkName: "common-component" */ "@/components/Tips"),
);
Vue.component("UEditor", () =>
  import(/* webpackChunkName: "common-component" */ "@/components/UEditor"),
);
