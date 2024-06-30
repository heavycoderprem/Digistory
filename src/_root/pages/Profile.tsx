import ProfileForm from '@/components/forms/ProfileForm';
import { useUserContext } from '@/context/AuthContext'

import { useGetCurrentUser } from '@/lib/react-query/queriesAndMutations';
import { Link } from 'react-router-dom';


const Profile = () => {
  const {user} = useUserContext();
  const {data: currentUser} = useGetCurrentUser();
  
  return (
    <div>
      <Link to={`/update-profile/${user?.id}`}  className={`${user.id !== currentUser?.$id  && 'hidden'}`}>
            <img src='/public/icons/edit.svg' alt="creator" width={24} height={24} />
</Link>
    </div>
    
  )
}

export default Profile
