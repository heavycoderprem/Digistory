import AllUserList from "@/components/shared/AllUserList"

import Loader from "@/components/shared/loader"
import { useTopCreators } from "@/lib/react-query/queriesAndMutations"

const AllUsers = () => {
  const {data: creators, isPending: isCreatorLoading} = useTopCreators()
  return (
    <div className='flex w-full items-center flex-col custom-scrollbar'>

      
      <div className='px-10 py-16 w-full'>
        <div className="flex w-full justify-start items-center">
          <img src="/public/icons/people.svg" alt="people" className="w-9 h-9"/>
          <h2 className="h3-bold md:h2-bold w-full mb-10 text-center">All Users</h2>
      </div>
      {
        isCreatorLoading ? (
          <Loader/>
        ) : 
        (
          <div className="flex w-full gap-7 flex-wrap items-center">
            {creators?.documents.map((creator) => (
              <AllUserList creator={creator} key={creator.$id}/>
            ))}
          </div>
        )
      }



      </div>
      
    </div>
  )
}

export default AllUsers
