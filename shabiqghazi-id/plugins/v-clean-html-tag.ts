import type { Directive } from "vue";

const vCleanHtmlTag: Directive = {
  mounted(el, binding) {
    const plainText = binding.value.replace(/<[^>]+>/g, "");
    el.innerHTML = plainText.split(" ").slice(0, 100).join(" ") + "...";
  },
  updated(el, binding) {
    const plainText = binding.value.replace(/<[^>]+>/g, "");
    el.innerHTML = plainText.split(" ").slice(0, 100).join(" ") + "...";
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("clean-html-tag", vCleanHtmlTag);
});
