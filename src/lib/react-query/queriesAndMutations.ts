import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { SearchPosts, SignInAccount, SignOut, UpdatePost, UpdateProfile, createPost, createUserAccount, deletePost, deleteSavedPosts, getCurrentUser, getInfinitePosts, getPostById, getRecentPosts, getSavedPosts, getTopCreators, likePost, savePost } from "../appwrite/api";
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from "@/types";
import { QUERY_KEYS } from "./queryKeys";

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user:INewUser) => createUserAccount(user)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {email: string; password: string;}) => SignInAccount(user),
    })
}


export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: SignOut
    })
}

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
  };
  
  export const useGetRecentPosts = () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      queryFn: getRecentPosts,
    })
  }

  export const useLikePost = () => {
       const queryClient = useQueryClient();
       return useMutation({
        mutationFn: ({postId, likesArray}: {postId: string, likesArray: string[]}) => likePost(postId, likesArray),
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            
          })
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            
          })
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            
          })
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_POSTS]
            
          })
        }

       })
  }
 export const useSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({postId, userId, postname}: {postId?: string, userId?: string, postname?: string}) => savePost(postId, userId, postname),
    onSuccess: ()=> {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
        
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
        
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS]
        
      })
    }
  })
 }

 export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (saveRecordId: string) => deleteSavedPosts(saveRecordId),
    onSuccess: ()=> {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
        
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
        
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS]
        
      })
    }
  })
 }

 export const useGetCurrentUser = () => {
         return useQuery({
          queryKey: [QUERY_KEYS.GET_CURRENT_USER],
          queryFn: getCurrentUser,
         })
 }

 export const useGetPostById = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId
  })
 }

 export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
   
    mutationFn: (post: IUpdatePost) => UpdatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
      })
    }
  })
 }

 export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
   
    mutationFn: ({postId, imageId}: {postId?: string, imageId: string}) => deletePost(postId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      })
    }
  })
 }

 export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: getInfinitePosts,
    getNextPageParam: (lastPage) => {
      if(lastPage && lastPage.documents.length === 0) return null;
      const lastId = lastPage?.documents[lastPage.documents.length - 1].$id;
      return lastId
    }
  })
 }

 export const useSearchPosts = (SearchTerm: string) => {
       return useQuery({
        queryKey: [QUERY_KEYS.SEARCH_POSTS, SearchTerm],
        queryFn: () => SearchPosts(SearchTerm),
        enabled: !!SearchTerm

       })
 }

 export const useTopCreators = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: getTopCreators,

  })
 }

 export const usegetSavedPosts = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getSavedPosts(userId),
    enabled: !!userId,  

  })
 }

 export const useUpdateProfile = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (user: IUpdateUser) => UpdateProfile(user),
    onSuccess: (data) => {
      queryclient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
      queryclient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id]
      })
    }
  })  
 }