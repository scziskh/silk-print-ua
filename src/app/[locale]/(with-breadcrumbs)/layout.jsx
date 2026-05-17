import Breadcrumbs from '@/components/breadcrumbs';

const WithBreadcrumbsLayout = ({ children }) => {
  return (
    <>
      <Breadcrumbs />
      {children}
    </>
  );
};

export default WithBreadcrumbsLayout;
