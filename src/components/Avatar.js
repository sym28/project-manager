// seperate component for user avatar as it will be used in more than one place

// styles
import './Avatar.css'

export default function Avatar({src}) {
  return (
    <div className='avatar'>
      <img src={src} alt="user avatar" />
    </div>
  )
}

