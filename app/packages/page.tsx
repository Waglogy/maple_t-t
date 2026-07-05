import PackagesList, { Package } from "./PackagesList"

// Fetch packages on the server, cached and revalidated hourly.
// This avoids a client-side spinner and only hits the (cold-starting)
// backend once per hour instead of on every visitor's browser.
async function getPackages(): Promise<Package[]> {
  try {
    const res = await fetch(
      "https://maple-server-e7ye.onrender.com/api/packages",
      { next: { revalidate: 3600 } }
    )
    const data = await res.json()
    return data.success ? data.data : []
  } catch (error) {
    console.error("Error fetching packages:", error)
    return []
  }
}

export default async function PackagesPage() {
  const packages = await getPackages()

  return (
    <>
      <section
        className="relative h-[60vh] bg-gradient-to-r from-[#010001] to-[#f45201] bg-cover bg-center"
        style={{ backgroundImage: "url('/3.png')" }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              Your Journey, <span className="text-[#f45201]">Your Way</span>{" "}
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Let's plan your perfect journey together
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">
            Our Travel <span className="text-[#f45201]">Packages</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            Discover our carefully curated selection of travel packages designed
            to create unforgettable experiences. From scenic destinations to
            cultural adventures, we offer comprehensive itineraries that cater
            to every traveler's dreams.
          </p>
          <div className="w-24 h-1 bg-[#f45201] mx-auto"></div>
        </div>

        <PackagesList packages={packages} />
      </div>
    </>
  )
}
