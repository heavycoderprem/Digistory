
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Models } from 'appwrite';

interface TopCreatorProps  {
    creator?: Models.Document;
}

const AllUserList = ({creator}: TopCreatorProps) => {
  return (

    <div className=''>

        <Link to={`/profile/${creator?.$id}`} className="px-2 py-5 border-[#1F1F22] border-2 rounded-[20px] flex flex-col items-center gap-5 justify-center min-w-[250px]">
        <img src={`${creator?.imageUrl}` || "/assets/icons/profile-placeholder.svg"} alt="profile" className="h-14 w-14 rounded-full" />
        <p className="body-bold">
         {creator?.name}
        </p>
        <p className='small-regular text-light-3'>
            @{creator?.username}
        </p>

        <Button className="bg-primary-500 py-5">
            Follow
        </Button>
        </Link>
      
    </div>
  )
}

export default AllUserList
