

import {useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";

import { useEffect, useState } from "react";
import Loader from "./loader";



type PostStatsProps = {
    post?: Models.Document;
    userId: string;
}

const PostStats = ({post, userId}: PostStatsProps) => {
    
    const likesList = post?.likes.map((user: Models.Document) => user.$id);
    
    const[likes,setlikes] = useState(likesList);
    const[isSaved, setisSaved] = useState(false);
    const[savedPostRecord, setSavedPostRecord] = useState<Models.Document | null>(null);
    const {mutate: likePost} = useLikePost();
    const {mutate: savePost, isPending: isSavingPost} = useSavePost();
    const {mutate: deleteSavedPosts, isPending: isDeletingSaved} = useDeleteSavedPost();


    const {data: currentuser} = useGetCurrentUser();

    useEffect(() => {
      if (currentuser && post) {
          const yea = currentuser.save.find(
              (record: Models.Document) => record.post.$id === post.$id
          );
          setSavedPostRecord(yea);
          setisSaved(!!yea);
      }
  }, [currentuser, post]);
    
    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation;
        let newlikes = [...likes];
        const hasliked = newlikes.includes(userId);
        if(hasliked) {
         newlikes = newlikes.filter((id: string) => id!== userId);
        } 
        else {
            newlikes.push(userId);
        }

        setlikes(newlikes);
        likePost({postId: post?.$id, likesArray: newlikes})

    }

    const handleSavedPost = (e: React.MouseEvent) => {
           e.stopPropagation;

           

           if(savedPostRecord) {
            setisSaved(false);
            deleteSavedPosts(savedPostRecord.$id);
           }
           else {
            savePost({postId: post?.$id, userId})
            setisSaved(true);
           }
    }

  return (
    <div className="flex justify-between items-center z-20">
        <div className="flex gap-2 mr-5">

         <img src= {
            checkIsLiked(likes,userId) ? "/public/icons/liked.svg" : "/public/icons/like.svg"
         } alt="like"
         width={20} height={20}
         onClick={handleLikePost} className="cursor-pointer"/>

         <p className="small-medium lg:base-medium">{likes.length}</p>
       
        </div>

        <div className="flex gap-2 mr-5">
         { isSavingPost || isDeletingSaved ? <Loader/> :
         <img src= {
            isSaved ? "/public/icons/saved.svg" : "/public/icons/save.svg"
         } alt="like"
         width={20} height={20}
         onClick={handleSavedPost} className="cursor-pointer"/>
}
       
        </div>
     
    
    </div>
  )
}

export default PostStats
