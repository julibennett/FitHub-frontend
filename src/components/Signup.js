import { useState } from "react"

const Signup = (props) => {
    const [form, setForm] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleSignUp(form)
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
    <h1 className="text-xl font-bold text-center mb-6">Register for a FitHub Account</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username: </label>
            <input type="text" name="username" onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email: </label>
            <input type="email" name="email" onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password: </label>
            <input type="password" name="password" autoComplete="true" onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <input type="submit" value="Sign Up" className="w-full bg-pink-400 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"/>
    </form>
</div>

  )
}

export default Signup