import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility - TourEase",
  description: "Learn about TourEase's commitment to digital accessibility and our WCAG 2.1 compliance efforts.",
};

export default function AccessibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 