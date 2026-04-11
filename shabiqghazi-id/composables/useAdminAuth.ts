const STORAGE_KEY = "cms_admin_token";

export const useAdminToken = () => {
  const token = useState<string | null>("cms-admin-token", () => null);

  const initTokenFromStorage = () => {
    if (!import.meta.client) return;
    if (token.value) return;
    token.value = localStorage.getItem(STORAGE_KEY);
  };

  const setToken = (value: string | null) => {
    token.value = value;
    if (import.meta.client) {
      if (value) localStorage.setItem(STORAGE_KEY, value);
      else localStorage.removeItem(STORAGE_KEY);
    }
  };

  return { token, setToken, initTokenFromStorage };
};

export const useAdminApi = () => {
  const { token, initTokenFromStorage } = useAdminToken();

  const adminFetch = async <T>(
    path: string,
    opts: Parameters<typeof $fetch<T>>[1] = {}
  ) => {
    initTokenFromStorage();
    const headers = new Headers(
      opts.headers as HeadersInit | undefined
    );
    if (token.value) {
      headers.set("Authorization", `Bearer ${token.value}`);
    }
    return $fetch<T>(path, {
      ...opts,
      headers,
    });
  };

  return { adminFetch };
};
