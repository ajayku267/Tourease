import { 
  PlaceholderImage, 
  DestinationImage, 
  ProfileImage, 
  TourImage, 
  AvatarImage 
} from "@/components/ui/PlaceholderImage"
import Link from "next/link"

// Sample image URLs - some valid, some invalid for testing error handling
const VALID_IMAGE_URL = "https://images.unsplash.com/photo-1682687982167-d7fb3ed8541d"
const INVALID_IMAGE_URL = "https://example.com/nonexistent-image.jpg"

export default function PlaceholderImagesPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <Link 
          href="/placeholders" 
          className="text-blue-600 hover:text-blue-800 flex items-center mb-4"
        >
          ← Back to Placeholders
        </Link>
        <h1 className="text-3xl font-bold mb-2">Placeholder Image Components</h1>
        <p className="text-gray-600">
          These components show placeholders while images are loading or if they fail to load.
        </p>
      </div>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Basic Image Placeholders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Valid Image</h3>
              <PlaceholderImage
                src={VALID_IMAGE_URL}
                alt="Valid image example"
                width={400}
                height={300}
                placeholderText="Loading..."
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Invalid Image (Error State)</h3>
              <PlaceholderImage
                src={INVALID_IMAGE_URL}
                alt="Invalid image example"
                width={400}
                height={300}
                placeholderText="Sample Image"
                placeholderBgColor="#f43f5e"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Custom Placeholder</h3>
              <PlaceholderImage
                src={VALID_IMAGE_URL}
                alt="Custom placeholder example"
                width={400}
                height={300}
                placeholderText="Custom Loading Text"
                placeholderBgColor="#8b5cf6"
                placeholderTextColor="#f8fafc"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Specialized Image Placeholders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Destination Image</h3>
              <DestinationImage
                src={VALID_IMAGE_URL}
                alt="Destination example"
                className="rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Profile Image</h3>
              <ProfileImage
                src={VALID_IMAGE_URL}
                alt="Profile example"
                size={200}
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Tour Image</h3>
              <TourImage
                src={VALID_IMAGE_URL}
                alt="Tour example"
                width={300}
                height={225}
                className="rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Avatar Image</h3>
              <div className="flex flex-col items-center space-y-3">
                <AvatarImage
                  src={VALID_IMAGE_URL}
                  alt="Avatar example"
                  size={120}
                />
                <AvatarImage
                  src={INVALID_IMAGE_URL}
                  alt="Error avatar example"
                  size={80}
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Object Fit Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Cover (Default)</h3>
              <PlaceholderImage
                src={VALID_IMAGE_URL}
                alt="Object-fit cover example"
                width={300}
                height={300}
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Contain</h3>
              <PlaceholderImage
                src={VALID_IMAGE_URL}
                alt="Object-fit contain example"
                width={300}
                height={300}
                objectFit="contain"
                className="rounded-lg bg-gray-100"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Scale Down</h3>
              <PlaceholderImage
                src={VALID_IMAGE_URL}
                alt="Object-fit scale-down example"
                width={300}
                height={300}
                objectFit="scale-down"
                className="rounded-lg bg-gray-100"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 