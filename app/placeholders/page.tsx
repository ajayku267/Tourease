import {
  Placeholder,
  ProfilePlaceholder,
  DestinationPlaceholder,
  GalleryPlaceholder,
  LandscapePlaceholder,
  TourPlaceholder,
  ActivityPlaceholder,
  AvatarPlaceholder,
  AspectRatio16x9,
  AspectRatio4x3,
  AspectRatio1x1
} from "@/components/ui/Placeholder"
import Link from "next/link"

export default function PlaceholdersPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Placeholder Components</h1>
      
      <div className="mb-8">
        <Link 
          href="/placeholders/images" 
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Image Placeholder Components
        </Link>
      </div>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Avatar Placeholders</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <AvatarPlaceholder />
            <AvatarPlaceholder size={120} />
            <Placeholder width={100} height={100} text="User" className="rounded-full" fontSize={18} />
            <Placeholder width={120} height={120} text="U" className="rounded-full" bgColor="#6366f1" fontSize={28} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Profile Placeholders</h2>
          <div className="flex flex-wrap gap-6">
            <ProfilePlaceholder />
            <ProfilePlaceholder responsive={true} />
            <Placeholder width={250} height={350} text="User Profile" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Destination Placeholders</h2>
          <div className="flex flex-wrap gap-6">
            <DestinationPlaceholder />
            <DestinationPlaceholder responsive={true} className="max-w-[300px]" />
            <Placeholder width={500} height={300} text="Paris" bgColor="#4f46e5" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Tour Placeholders</h2>
          <div className="flex flex-wrap gap-6">
            <TourPlaceholder />
            <TourPlaceholder responsive={true} className="max-w-[400px]" />
            <Placeholder width={700} height={500} text="Guided Tour" bgColor="#059669" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Activity Placeholders</h2>
          <div className="flex flex-wrap gap-6">
            <ActivityPlaceholder />
            <ActivityPlaceholder responsive={true} className="max-w-[200px]" />
            <Placeholder width={350} height={350} text="Hiking" bgColor="#d97706" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Gallery Placeholders</h2>
          <div className="mb-4">
            <GalleryPlaceholder className="max-w-full h-auto" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Landscape Placeholders</h2>
          <div className="mb-4">
            <LandscapePlaceholder className="max-w-full h-auto" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Aspect Ratio Placeholders</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">16:9 Aspect Ratio</h3>
              <AspectRatio16x9 className="mb-2" />
              <Placeholder width={16} height={9} text="Video Thumbnail" bgColor="#7c3aed" aspectRatio={true} />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">4:3 Aspect Ratio</h3>
              <AspectRatio4x3 className="mb-2" />
              <Placeholder width={4} height={3} text="Image Placeholder" bgColor="#0891b2" aspectRatio={true} />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">1:1 Aspect Ratio (Square)</h3>
              <AspectRatio1x1 className="mb-2" />
              <Placeholder width={1} height={1} text="Profile" bgColor="#db2777" aspectRatio={true} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Custom Placeholders</h2>
          <div className="flex flex-wrap gap-6">
            <Placeholder 
              width={400} 
              height={250} 
              text="Custom Placeholder" 
              bgColor="#ec4899" 
              textColor="#f8fafc" 
              fontSize={20} 
            />
            <Placeholder 
              width={300} 
              height={200} 
              text="Event" 
              bgColor="#0891b2" 
              textColor="#f8fafc" 
              className="rounded-lg" 
            />
            <Placeholder 
              width={600} 
              height={300} 
              text="Responsive Custom" 
              bgColor="#6d28d9" 
              textColor="#f8fafc" 
              responsive={true}
              className="max-w-[400px]" 
            />
          </div>
        </section>
      </div>
    </div>
  )
} 