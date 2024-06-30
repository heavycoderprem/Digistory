import SavePostList from "@/components/shared/SavePostList"
import Loader from "@/components/shared/loader"

import { useUserContext } from "@/context/AuthContext"
import { useGetCurrentUser, usegetSavedPosts } from "@/lib/react-query/queriesAndMutations"




const Saved = () => {
const {user} = useUserContext();
const {data: saved, isPending: isSaveLoading, error: savedError} = usegetSavedPosts(user?.id)


if(isSaveLoading) return <Loader/>
if(savedError) return <div>Error loading saved posts: {savedError.message}</div>;
  return (
    <div className='explore-container'>
      <div className="explore-inner_container">
        <div className='flex gap-2 justify-start w-full items-center'>
          <img src="/public/icons/save.svg" alt="save" className='w-9 h-9' />
          <h2 className='h3-bold md:h2-bold w-full'>Saved Posts</h2>
        </div>
        <div>
          
            <div className="grid-container">
              {
                saved?.map((save) => (
                  save.post?.$id && <SavePostList saveId={save.post.$id} key={save.user.$id}/>
                ))
              }
            </div>
          
        </div>
      </div>
      
    </div>
  )
}

export default Saved
