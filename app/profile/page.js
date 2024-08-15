"use client"
import { useSession } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';

export default function ProfilePage() {
  const session = useSession()
  const [saved,setSaved]= useState(false)
  const [isSaving,setSaving] = useState(false)
  const [userName,setUserName] = useState('');
  const {status} = session;

  useEffect(()=>{
    if(status === 'authenticated'){
      setUserName(session.data.user.name);
    }
  },[session,status])

  async function handleProfileInfoUpdate(ev){
    ev.preventDefault();
    setSaved(false)
    setSaving(true)
    const response = await fetch('/api/profile',{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({name:userName}),
    })
    setSaving(false)
    if(response.ok){
      setSaved(true);
    }
  }
  if(status === 'loading'){
    return 'Loading...'
  }
  if(status === 'unauthenticated'){
    return redirect('/login')
  }
  const userImage = session.data.user.image;
  async function handleFileChange(ev){
    const files = ev.target.files;
    if(files?.length === 1){
      const data = new FormData;
      data.set('file',files[0])
      await fetch('/api/upload',{
        method:'POST',
        body: data,
      })
    }
  }

  return (
    <section className='mt-8'>
      <h1 className='text-center text-primary text-4xl mb-4'>
        Profile
      </h1>
      <div className='max-w-md mx-auto'>
        {saved && (
          <h2 className='text-center bg-green-100 rounded-lg border border-green-300 p-4'>Profile saved !</h2>
        )}
        { isSaving && (
          <h2 className='text-center bg-blue-100 rounded-lg border border-blue-300 p-4'>Saving...</h2>
        )

        }
        <div className='flex gap-4 items-center'>
        <div>
          <div className='p-2 rounded-lg'>
            <Image className='rounded-lg w-full h-full mb-1' src={userImage} width={250} height={250} alt={'avatar'}/>
            <label>
            <input type='file' className='hidden' onChange={handleFileChange}/>
            <span className='block border border-gray-300 rounded-lg p-2 text-center cursor-pointer'>Edit</span>
            </label>
          </div>
          </div>
          <form className='grow' onSubmit={handleProfileInfoUpdate}>
            <input type='text' placeholder='First and last name' value={userName} onChange={ev => setUserName(ev.target.value)}/>
            <input type='email' disabled={true} placeholder='email' value={session.data.user.email}/>
            <button type='submit'>Save</button>
          </form>
         </div>
      </div>
    </section>
  )
}
