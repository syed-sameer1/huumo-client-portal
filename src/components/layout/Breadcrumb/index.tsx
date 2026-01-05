import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

type BreadcrumbItemType = {
  href: string;
  label: string;
};

export const Breadcrumb = ({
  breadcrumbsItem,
}: {
  breadcrumbsItem: BreadcrumbItemType[];
}) => {
  return (
    <ShadcnBreadcrumb className="py-4 px-6 border-b">
      <BreadcrumbList>
        {breadcrumbsItem.map(({ href, label }, index) => {
          const isLast = index === breadcrumbsItem.length - 1;

          return (
            <BreadcrumbItem key={href} className="text-[12px]">
              {isLast ? (
                <BreadcrumbPage>{label}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </ShadcnBreadcrumb>
  );
};
