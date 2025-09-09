import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUser } from './store/authSlice'


export default function SignUp() {


  const [form, setFrom] = useState({
    fullName: '',
    email: '',
    password: '',
    username: '',
    
  })

  const [avatar, setAvatar] = useState("")
  const [coverImage, setcoverImage] = useState("")
  const [error, setError] = useState(null)

  const dispatch = useDispatch()



  const handleinput = (e) => {
    const { name, value } = e.target
    setFrom((prev) => (
      { ...prev, [name]: value }))


  }


  const handleSubmit = (e) => {

    e.preventDefault()
    const userData = { ...form, avatar ,coverImage}

    if (!form) {
      console.log("please filled the required field")
    }
    dispatch(createUser({ ...userData }))
    console.log('user data send succesfully', userData)


  }

  console.log("avatr", avatar)
  console.log("coverImage", coverImage)




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-2 text-center">Create your account</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">Quick and secure signup</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full name</label>
            <input
              id="fullName"
              name="fullName"
              className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Jane Doe"
              value={form.fullName}
              onChange={handleinput}
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              name="username"
              className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="janedoe"
              value={form.username}
              onChange={handleinput}

            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleinput}

            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={handleinput}

            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Avatar</label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              // value={avatar}
              onChange={(e) => setAvatar(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700"
            />
            <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 5MB.</p>
          </div> <div>
            <label className="block text-sm font-medium text-gray-700">Cover Image</label>
            <input
              id="coverImage"
              name="coverImage"
              type="file"
              accept="image/*"
              // value={avatar}
              onChange={(e) => setcoverImage(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700"
            />
            <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 5MB.</p>
          </div>

          <div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 transition"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
