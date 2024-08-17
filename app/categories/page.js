'use client'
import Tabs from "@/components/layout/Tabs";
import { UseProfile } from "@/components/UseProfile";

export default function CategoriesPage() {
  const {loading:profileLoading,data:profileData}=UseProfile()

  if(profileLoading){
    return 'Loading user info...';
  }

  if(!profileData.admin){
    return 'Not an admin'
  }
  return (
    <section className="mt-8 max-w-md mx-auto">
        <Tabs isAdmin={true}/>
        <form className="mt-8">
          <div className="flex gap-2 items-center">
          <div className="grow">
          <label>New category name</label>
          <input type="text"/>
          </div>
          <div className="mt-4">
            <button className="border border-primary" type="submit">Create</button>
          </div>
          </div>
          
        </form>    
</section>
  )
}
