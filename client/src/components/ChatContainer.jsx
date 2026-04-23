import React from 'react'
import assets from '../assets/assets'

const ChatContainer = ({selectedUser, setSelectedUser}) => {
  return selectedUser ? (
    <div>
        <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
            <img className='w-8 rounded-full' src={assets.profile_martin} alt="" />
            <p className='flex-1 text-lg text-white flex items-center gap-2' >
                Martin johnson
                <span className='w-2 h-2 rounded-full bg-green-500' ></span>
            </p>
            <img onClick={() => setSelectedUser(null) } src={assets.arrow_icon} alt="" className='md:hiden max-w-6 cursor-pointer' />
            <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5' />
        </div>
    </div>
  ) : (
    <div className=" flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
        <img className='max-w-16' src={assets.logo_icon} alt="" />
        <p className='text-lg font-medium text-white' >Stay close, no matter the distance.</p>
    </div>
  )
}

export default ChatContainer