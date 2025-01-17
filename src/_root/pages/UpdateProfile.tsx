import ProfileForm from "@/components/forms/ProfileForm";
import { useUserContext } from "@/context/AuthContext"

const UpdateProfile = () => {
  const {user} = useUserContext();
  
  return (
    <div className="flex flex-1">
      <div className="common-container">
      <div className='max-w-5xl flex-start gap-3 flex w-full'>
        <img src="/public/icons/edit.svg" alt="add" width={36} height={36}/>
        <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Profile</h2>
      </div>
     
     <ProfileForm user={user}/>

      </div>
      
    </div>
  )
}

export default UpdateProfile

