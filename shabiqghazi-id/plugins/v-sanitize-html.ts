import sanitizeHtml from "sanitize-html";
import type { Directive } from "vue";

const vSanitizeHtml: Directive = {
  mounted(el, binding) {
    el.innerHTML = sanitizeHtml(binding.value, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "figure",
        "figcaption",
        "img",
      ]),

      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        "*": ["class", "style"],
      },
    });
  },
  updated(el, binding) {
    el.innerHTML = sanitizeHtml(binding.value, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "figure",
        "figcaption",
        "img",
      ]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        "*": ["class", "style"],
      },
    });
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("sanitize-html", vSanitizeHtml);
});
