import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  keywords?: string[];
}

export function SEO({
  title = "TourEase - AI-Powered Travel Assistant",
  description = "Plan your perfect trip with TourEase. Get personalized itineraries, smart recommendations, and travel assistance powered by AI.",
  image = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  url = "https://tourease.com",
  type = "website",
  keywords = ["travel", "trip planning", "AI", "itinerary", "vacation"],
}: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </Head>
  );
} 