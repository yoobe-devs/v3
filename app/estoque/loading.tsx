export default function Loading() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="h-8 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded w-80 animate-pulse"></div>
      </div>

      <div className="border rounded-lg">
        <div className="border-b">
          <div className="grid grid-cols-7 gap-4 p-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {[...Array(4)].map((_, i) => (
          <div key={i} className="border-b last:border-b-0">
            <div className="grid grid-cols-7 gap-4 p-4 items-center">
              <div className="h-12 w-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
