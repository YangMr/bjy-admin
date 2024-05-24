const modulesFiles = require.context(".", true, /\.vue$/);

const modules = {};
modulesFiles.keys().forEach(modulePath => {
  modulePath = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const moduleSplit = modulePath.split("/");
  let moduleName;
  if (moduleSplit.length == 1) {
    moduleName = moduleSplit[0];
  } else {
    moduleName = moduleSplit[moduleSplit.length - 1];
    if (moduleName == "index") {
      moduleName = moduleSplit[moduleSplit.length - 2];
    }
  }
  if (!moduleName) {
    return console.error(`${modulePath} register error!`);
  }
  modules[moduleName] = modulePath;
});

export default function (Vue) {
  for (const key in modules) {
    Vue.component(key, () =>
      import(
        /* webpackChunkName: "component" */ `@/components/${modules[key]}`
      ),
    );
  }
}
