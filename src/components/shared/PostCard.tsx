import { useUserContext } from '@/context/AuthContext';
import { formatDateString } from '@/lib/utils';
import { Models } from 'appwrite';

import { Link } from 'react-router-dom';
import PostStats from './PostStats';

type PostCardProps = {
    post: Models.Document;
}


const PostCard = ({post}: PostCardProps) => {
    const {user} = useUserContext();
    if(!post.creeator) return;
  return (
    <div className='post-card'>
    <div className='flex-between'>
    <div className='flex items-center gap-3'>

        <Link to={`/profile/${post.creeator?.$id}`}>
            <img src={post?.creeator?.imageUrl} alt="creator" className='rounded-full w-12 lg:h-12' />
        
        </Link>

        <div>
            <p>{post.creeator?.name}</p>
            <div className='flex gap-3'>
                <p>
                 {formatDateString(post.$createdAt)}
                </p>
                -
                <p>
                 {post.location}
                </p>
            </div>
        </div>
    </div>

    <Link to={`/edit-post/${post.$id}`} className={`${user.id !== post.creeator.$id && "hidden"}`}><img src="/public/icons/edit.svg" alt="edit" width={20} height={20}/></Link>
    </div>
    <Link to={`/posts/${post.$id}`}>
    <div className='small-medium lg:base-medium py-5'>
        <p>{post.caption}</p>
        <ul className='flex gap-1 mt-2'>
         {post.tags.map((tag: string) => (
            <li key={tag} className='text-light-3'>
              #{tag}
            </li>
         ))}
        </ul>
    </div>
    <img src={post.imageUrl || "/public/icons/profile-placeholder.svg"} alt="post" className='post-card_img'/>
    </Link>
    <PostStats post={post} userId={user.id}/>
    </div>  
  )
}

export default PostCard
