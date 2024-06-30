import { useTopCreators } from "@/lib/react-query/queriesAndMutations"
import { useLocation } from "react-router-dom";
import Loader from "./loader";
import TopCreators from "./TopCreators";
import { Models } from "appwrite";

const RightSidebar = () => {
    const {pathname} = useLocation();
    if (pathname !== "/") return null;
    const {data: creators, isPending: isCreatorLoading} = useTopCreators();

   
    
  return (
    <div className="rightsidebar custom-scrollbar">
        {
            isCreatorLoading ? (<Loader/>) :
            (
                <>
                <h2 className="h3-bold md:h2-bold w-full mb-10 text-center">Top Creators</h2>
                <div className="grid  xl:grid-cols-2 lg:grid-cols-1 gap-4">
                    {
                        creators?.documents.map((creator:  Models.Document) => (
                                  <TopCreators creator={creator} key={creator.$id}/>

                        ))
                            
                        
                    }
                </div>
                </>
            )
        }
      
    </div>
  )
}

export default RightSidebar
