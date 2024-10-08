import React from 'react'
import MenuItem from "@/components/menu/MenuItem"
import SectionHeaders from "@/components/layout/SectionHeaders"
import Image from 'next/image'

export default function HomeMenu() {
  return (
    <section className=''> 
    <div className='absolute left-0 right-0 w-full justify-start'>
      <div className='absolute -top-[70px] left-0 text-left -z-10'>
      <Image src={'/sallad1.png'} width={109} height={189} alt={'sallad'}/>
      </div>
      <div className='absolute -top-[100px] right-0 -z-10'>
      <Image src={'/sallad2.png'} width={107} height={195} alt={'sallad'}/>
      </div>
    </div>
    <div className='text-center'>
      <SectionHeaders 
      subHeader={'Check out'} 
      mainHeader={'Menu'}/>
    </div>
    <div className='grid grid-cols-3 gap-4'>
      <MenuItem/>
      <MenuItem/>
      <MenuItem/>
      <MenuItem/>
      <MenuItem/>
      <MenuItem/>

    </div>
    </section>
  )
}
