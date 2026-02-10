
export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureCardData {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  icon: React.ReactNode;
}

export interface CompassResponse {
  message: string;
  verse: string;
  reference: string;
}
