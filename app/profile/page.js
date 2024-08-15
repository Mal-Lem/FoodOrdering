"use client"
import { useSession } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import InfoBox from '@/components/layout/InfoBox';
import SuccesBox from '@/components/layout/SuccesBox';
import Link from 'next/link';
import Tabs from '@/components/layout/Tabs';

export default function ProfilePage() {
  const session = useSession()
  const [saved,setSaved]= useState(false)
  const [isSaving,setSaving] = useState(false)
  const [phone,setPhone]= useState('')
  const [streetAdress,setStreetAdress]= useState('')
  const [postalCode,setPostalCode]= useState('')
  const [city,setCity]= useState('')
  const [country,setCountry]= useState('')
  const[isAdmin,setIsAdmin]=useState('');
  const [userName,setUserName] = useState('');
  const {status} = session;

  useEffect(()=>{
    if(status === 'authenticated'){
      setUserName(session.data.user.name);
      fetch('/api/profile').then(response=>{
        response.json().then(data=>{
          setPhone(data.phone);
          setStreetAdress(data.streetAdress);
          setPostalCode(data.postalCode);
          setCountry(data.country);
          setCity(data.city);
          setIsAdmin(data.admin)
        })
      })
    }
  },[session,status])

  async function handleProfileInfoUpdate(ev){
    ev.preventDefault();
    setSaved(false)
    setSaving(true)
    const response = await fetch('/api/profile',{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        name:userName,
        streetAdress,
        phone,
        postalCode,
        city,
        country,
      }),
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
      <Tabs isAdmin={isAdmin}/>
    
      <div className='max-w-md mx-auto mt-4'>
        {saved && (
          <SuccesBox>Profile saved !</SuccesBox>
        )}
        { isSaving && (
          <InfoBox>Saving...</InfoBox>
        )

        }
        <div className='flex gap-4 mt-1'>
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
            <label>First and last name</label>
            <input type='text' placeholder='First and last name' value={userName} onChange={ev => setUserName(ev.target.value)}/>
            <label>Email</label>
            <input type='email' disabled={true} placeholder='email' value={session.data.user.email}/>
            <label>Phone</label>
            <input type='tel' placeholder='Phone Number' value={phone} onChange={ev => setPhone(ev.target.value)}/>
            <label>Street Address</label>
            <input type='text' placeholder='Street Adress' value={streetAdress} onChange={ev => setStreetAdress(ev.target.value)}/>
            <div className='flex gap-4'>
              <div>
              <label>City</label>
            <input type='text' placeholder='City' 
            value={city} onChange={ev => setCity(ev.target.value)}/>
              </div>
            <div>
            <label>Postal Code</label>
            <input type='text' placeholder='Postal Code' 
            value={postalCode} onChange={ev => setPostalCode(ev.target.value)}/>
            </div>

            </div>
            <label>Country</label>
            <input type='text' placeholder='Country' value={country} onChange={ev => setCountry(ev.target.value)}/>
            <button type='submit'>Save</button>
          </form>
         </div>
      </div>
    </section>
  )
}
