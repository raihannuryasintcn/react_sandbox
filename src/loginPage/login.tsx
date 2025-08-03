const Login = () => {
    return (
        <>
            <div className="flex min-h-screen items-center justify-center">
                <div className="bg-white py-8 px-12 rounded border border-gray-300 max-w-md w-full">
                    <p className="text-gray-600 pb-2 text-md">Please enter your details</p>
                    <h1 className="text-3xl text-gray-800 font-bold pb-12">Welcome back</h1>
                    <form className="flex flex-col gap-4" action="">
                        <input
                            className="border border-gray-300 rounded p-2 placeholder:text-sm text-gray-600 focus:outline-none"
                            type="email"
                            placeholder="Email address" />
                        <input
                            className="border border-gray-300 rounded p-2 placeholder:text-sm text-gray-600 focus:outline-none"
                            type="password"
                            placeholder="Password" />
                        <div className="flex gap-1">
                            <input
                                className="focus:outline-none"
                                type="checkbox"
                                name=""
                                id="" /><span className="text-sm text-gray-600">Remember for 24 hours</span>
                        </div>

                        <button className="justify-center bg-blue-500 hover:bg-blue-600 text-white text-sm w-full p-2 mt-6 rounded cursor-pointer transition duration-200 ease-in-out">Log In</button>

                    </form>

                </div>
            </div>
        </>
    )
}

export default Login;