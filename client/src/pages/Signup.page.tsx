export const Signup = () => {
  return (
    <div className="h-100vh mb-[50px]">
      <div className="max-w-md m-auto mt-6">
        <div className="border-t-4 border-violet-800 overflow-hidden rounded shadow-lg">
          <h3 className="text-xl text-center mt-8 mb-8">Register</h3>
          <div className="px-4 mb-4">
            <input
              type="text"
              placeholder="Email Address"
              className="border border-gray rounded w-full p-3"
            />
          </div>
          <div className="px-4 mb-4">
            <input
              type="text"
              placeholder="Password"
              className="border border-gray rounded w-full p-3"
            />
          </div>
          <div className="px-4 mb-4">
            <input
              type="text"
              placeholder="Confirm Password"
              className="border border-gray rounded w-full p-3"
            />
          </div>
          <div className="px-4 mb-4 flex">
            <div className="w-1/2">
              <input
                type="checkbox"
                className="align-middle cursor-pointer -mt-1"
                id="remember-me"
              />
              <label
                htmlFor="remember-me"
                className="align-middle text-gray-700 text-md cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <div className="w-1/2 text-right">
              <a href="#" className="font-semibold no-underline text-black">
                Forgot your password?
              </a>
            </div>
          </div>
          <div className="px-4 mb-6">
            <button className="border border-blue-500 bg-violet-800 rounded w-full px-4 py-3 text-white font-semibold">
              Sign in
            </button>
          </div>
          <div className="bg-gray-100 text-center text-gray-700 py-5">
            Don't have a account?
            <a href="#" className="font-semibold no-underline  text-violet-800">
              Signup
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
