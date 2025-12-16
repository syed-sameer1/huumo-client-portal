export type Package = {
  packageTitle: string;
  description: string;
  benefits: { id: number; title: string; description: string }[];
  hasPrice: boolean;
  price?: string;
  packageLink: string;
  actionLabel: string;
};

export interface PackageProps {
  subscriptionPackage: Package;
}
