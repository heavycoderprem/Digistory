import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import Loader from "./loader";
import { Link } from "react-router-dom";



type SaveProp = {
    saveId: string;
   
}
const SavePostList = ({saveId}: SaveProp) => {
  
  const {data: post, isPending: isPostLoading, error: isPostError} = useGetPostById(saveId);
  if(isPostError) return <div>Error loading saved posts: {isPostError.message}</div>;

  return (
    <div className="">
     {
      isPostLoading ? (<Loader/> ) : (
        <div className="post_details-card">
           <Link to={`/posts/${saveId}`} className="grid-post_link">
         <img src={post?.imageUrl} alt="savedpost" className="w-full h-full object-cover" />
         </Link>
        </div>
        )
      }
      
     
    </div>
  )
}

export default SavePostList
