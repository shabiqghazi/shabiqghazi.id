export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.startsWith("/admin")) return;
  if (to.path === "/admin/login" || to.path.startsWith("/admin/login")) return;

  const { token, initTokenFromStorage } = useAdminToken();
  initTokenFromStorage();
  if (!token.value) {
    return navigateTo("/admin/login");
  }
});
