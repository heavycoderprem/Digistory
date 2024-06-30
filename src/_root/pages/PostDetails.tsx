import PostStats from '@/components/shared/PostStats';
import Loader from '@/components/shared/loader';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/AuthContext';
import { useDeletePost, useGetPostById } from '@/lib/react-query/queriesAndMutations'
import { formatDateString } from '@/lib/utils';



import { Link, useParams } from 'react-router-dom';



const PostDetails = () => {
  
  
  const {id} = useParams(); 
  const{data: post, isPending} = useGetPostById(id);
  const {mutateAsync: deletePost} = useDeletePost()
  const {user} = useUserContext();

  const imageId = post?.imageId;
  const deletepost = (e: React.MouseEvent) => {
        e.stopPropagation;

        deletePost({postId: id,imageId: imageId})
  }
 
  return (
    <div className='post_details-container'>
      {isPending ? 
      (<Loader/>) : (
      <div className='post_details-card'>
      <img src={post?.imageUrl} alt="post" className='post_details-img' />
      <div className='post_details-info'>

        <div className='flex-between w-full'>
        <Link to={`/profile/${post?.creeator?.$id}`}>
            <img src={post?.creeator?.imageUrl} alt="creator" className='rounded-full w-8 h-8 lg:w-12 lg:h-12' />
        
       
        <div>
            <p>{post?.creeator?.name}</p>
            <div className='flex gap-3'>
                <p>
                 {formatDateString(post?.$createdAt)}
                </p>
                -
                <p>
                 {post?.location}
                </p>
            </div>
        </div>
        </Link>


   <div className='flex-center'>
   <Link to={`/edit-post/${post?.$id}`}  className={`${user.id !== post?.creeator.$id && 'hidden'}`}>
            <img src='/public/icons/edit.svg' alt="creator" width={24} height={24} />
</Link>
<Button className={`${user.id !== post?.creeator.$id && 'hidden'}`} variant='ghost' onClick={deletepost}>
            <img src='/public/icons/delete.svg' alt="creator" width={24} height={24} />
</Button>
   </div>


    </div>
  
  <hr className='border w-full border-dark-4/80' />
  
  <div className='flex flex-col small-medium flex-1 w-full'>
        <p>{post?.caption}</p>
        <ul className='flex gap-1 mt-2'>
         {post?.tags.map((tag: string) => (
            <li key={tag} className='text-light-3'>
              #{tag}
            </li>
         ))}
        </ul>
    </div>

    <div className='w-full'>
      <PostStats post={post} userId={user.id}/>
    </div>

       

    </div>
      </div>
    
    )}
    </div>

  )
}

export default PostDetails
