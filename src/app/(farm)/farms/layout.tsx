export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full px-24  sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16"> */}
      {/* Logo and Name Section */}
      {/* <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4M20 12C21.1046 12 22 11.1046 22 10V6C22 4.89543 21.1046 4 20 4H4C2.89543 4 2 4.89543 2 6V10C2 11.1046 2.89543 12 4 12M20 12C21.1046 12 22 12.8954 22 14V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V14C2 12.8954 2.89543 12 4 12"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">FarmTrack</h1>
                <p className="text-xs text-gray-500">
                  Livestock Management System
                </p>
              </div>
            </div> */}

      {/* Navigation Links - Desktop */}

      {/* Profile Section */}
      {/* <div className="flex items-center space-x-4 gap-10"> */}
      {/* Notifications */}
      {/* <button className="p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 relative">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-xs text-white font-medium">
                  3
                </span>
              </button> */}

      {/* Profile dropdown */}
      {/* <div className="relative">
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-900">
                      Sarah Connor
                    </span>
                    <span className="text-xs text-gray-500">Farm Manager</span>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-green-100">
                    <img
                      src="/api/placeholder/40/40"
                      alt="User profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div> */}

      {/* Mobile menu button */}
      {/* <button className="md:hidden rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                <span className="sr-only">Open menu</span>
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header> */}
      <div>{children}</div>
    </div>
  );
}
