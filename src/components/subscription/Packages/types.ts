export type Package = {
  id: number;
  packageTitle: string;
  description: string;
  benefits: { id: number; title: string; description: string }[];
  hasPrice: boolean;
  price?: string;
  actionLabel: string;
};

export interface PackageProps {
  subscriptionPackage: Package;
}
