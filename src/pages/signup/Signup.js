import { useState } from 'react'
import './Signup.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [image, setImage] = useState(undefined)
  const [thumbnailError, setThumbnailError] = useState(null)

  const handleFile = (e) => {
    const file = e.target.files[0]

    if(!file) {
      setThumbnailError('Please selet a file')
      return
    }
    if(!file.type.includes('image')){
      setThumbnailError('File type must be an image')
      e.target.value = null
      return
    }
    if(file.size > 500000){
      setThumbnailError('Image size must be less than 500kb')
      return
    }
    setThumbnailError(null)
    setImage(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {email, password, username, image}
    console.log(data)
  }

  return (
    <>
      <form className='auth-form' onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <label>
          <span>Email</span>
          <input required type='email' value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <span>Password</span>
          <input required type='password' value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          <span>Username</span>
          <input required type='text' value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          <span>Image File</span>
          <input required type='file' onChange={handleFile}/>
          {thumbnailError ? <div className='error'>{thumbnailError}</div> : null}
        </label>
        <button className='btn'>Sign up</button>
      </form>
    </>
  )
}
