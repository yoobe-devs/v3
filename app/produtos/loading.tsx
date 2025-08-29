export default function Loading() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-44 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg overflow-hidden">
            {/* Card Header */}
            <div className="p-4">
              <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            {/* Card Content */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded-full w-12 animate-pulse"></div>
                </div>
                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                </div>

                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse mb-2"></div>
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="flex items-center space-x-2">
                      <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-4 pt-0">
              <div className="space-y-4">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse mb-2"></div>
                  <div className="flex gap-2">
                    <div className="h-10 bg-gray-200 rounded flex-1 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
                <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
