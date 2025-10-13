interface IBreadcrumb {
  title: string;
  route: string;
}

export const useBreadcrumb = () => {
  const breadcrumbs = useState<IBreadcrumb[]>("breadcrumbs", () => []);
  const pageTitle = useState<string | null>("pageTitle", () => null);
  const pageDescription = useState<string | null>(
    "pageDescription",
    () => null
  );

  const setBreadcrumbs = (newBreadcrumbs: IBreadcrumb[]) => {
    breadcrumbs.value = newBreadcrumbs;
  };

  const setPageTitle = (title: string) => {
    pageTitle.value = title;
  };

  const setPageDescription = (description: string) => {
    pageDescription.value = description;
  };

  // Generate structured data untuk SEO
  const getStructuredBreadcrumbs = () => {
    const { $config } = useNuxtApp();
    const siteURL = $config.public.siteURL ?? "/";

    return breadcrumbs.value.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      item: item.route ? `${siteURL}${item.route}` : undefined,
    }));
  };

  return {
    breadcrumbs: readonly(breadcrumbs),
    pageTitle: readonly(pageTitle),
    pageDescription: readonly(pageDescription),
    setBreadcrumbs,
    setPageTitle,
    setPageDescription,
    getStructuredBreadcrumbs,
  };
};
