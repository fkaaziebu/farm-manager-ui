import Link from "next/link";

export default function AuthRequestPasswordReset() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            FarmManager
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Reset your password
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md">
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Send Reset Link
            </button>
          </div>

          <div className="text-center">
            <Link
              href="/auth/worker/login"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
