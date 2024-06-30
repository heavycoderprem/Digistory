

import { INewPost, INewUser, IUpdatePost, IUpdateUser } from "@/types";
import {ID, ImageGravity, Query } from "appwrite";
import { account, appwriteconfig, avatars, databases, storage } from "./config";

 interface Iimage {
    imageUrl: string;
    imageId: string;
 }
export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )
        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);
      


        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl.href,
        })
        return newUser;
         

    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function saveUserToDB(user: {
    accountId: string;
    email: string;
     name: string;
    imageUrl: string;
    username?: string;
}) 
{
    try {
         
        const newUser = await databases.createDocument(
            appwriteconfig.databaseId,
            appwriteconfig.userCollectionId,
            ID.unique(),
            user,


        )
        return newUser;


    } catch (error) {
        console.log(error);
    }
}

export async function SignInAccount(user: {email: string; password: string;}) {
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password);
        return session;

    } catch (error) {
        throw error;
    }
}
export async function getAccount() {
    try {
        const currentAccount = await account.get();
    
        return currentAccount;
      } catch (error) {
        console.log(error);
      }
}
export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteconfig.databaseId,
            appwriteconfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );
        if(!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}

export async function SignOut() {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        console.log(error);
    }
}


export async function createPost(post: INewPost) {
    try {
      // Upload file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0]);
  
      if (!uploadedFile) throw Error;
  
      // Get file url
      const fileUrl = (getFilePreview(uploadedFile.$id))?.toString();
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
  
      // Convert tags into array
      const tags = post.tags?.replace(/ /g, "").split(",") || [];
  
      // Create post
      console.log('User ID:', post.userId);

      const newPost = await databases.createDocument(
        appwriteconfig.databaseId,
        appwriteconfig.postCollectionId,
        ID.unique(),
        {
          creeator: post.userId,
          caption: post.caption,
          imageUrl: fileUrl,
          imageId: uploadedFile.$id,
          location: post.location,
          tags: tags,
        }
      );
  
      if (!newPost) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
  
      return newPost;
    } catch (error) {
      console.log(error);
    }
  }

 export async function uploadFile (file: File) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteconfig.storageId,
            ID.unique(),
            file
        );

        return uploadedFile;
    } catch (error) {
        console.log(error);
    }
 
  }

  export function getFilePreview(fileId: string) {
    try {
        const fileUrl = storage.getFilePreview(
            appwriteconfig.storageId,
            fileId,
            2000,
            2000,
            ImageGravity.Top,
            100,
        );
        if (!fileUrl) throw new Error('File URL is undefined or null');
        return fileUrl.toString();
    } catch (error) {
        console.log(error)
    }
  }

  export async function deleteFile(fileId: string) {
    try {
       await storage.deleteFile(appwriteconfig.storageId, fileId);
       return {status: "ok"};
    } catch (error) {
        console.log(error);
    }
  }

  export async function getRecentPosts() {
    const posts = await databases.listDocuments(
        appwriteconfig.databaseId,
        appwriteconfig.postCollectionId,
        [Query.orderDesc('$createdAt'), Query.limit(20)]
    )

    if(!posts) {
        throw Error;
    }
    else {
        return posts;
    }
  }

  export async function likePost(postId: string, likesArray: string[]) {
    try {
        const updatedPosts = await databases.updateDocument(
            appwriteconfig.databaseId,
            appwriteconfig.postCollectionId,
            postId,
            {
              likes: likesArray
            }
        )
        if(!updatedPosts) throw Error;
        return updatedPosts;

    } catch (error) {
        console.log(error);
    }
  }

  export async function savePost(postId?: string, userId?: string) {
    try {
        const updatedPosts = await databases.createDocument(
            appwriteconfig.databaseId,
            appwriteconfig.savesCollectionId,
            ID.unique(),
            {
                user: userId,
                post: postId,
            }
        )
        if(!updatedPosts) throw Error;
        return updatedPosts;
        
    } catch (error) {
        console.log(error);
    }
  }

  export async function deleteSavedPosts(documentId: string) {
    console.log('Deleting document:', documentId);
    try {
      await databases.deleteDocument(
        appwriteconfig.databaseId,
        appwriteconfig.savesCollectionId,
        documentId
      );
      console.log('Document deleted successfully!');
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  export async function getPostById(postId: string) {
    if (!postId || postId.length > 36) {
        throw new Error('Invalid document ID');
      }
    try {
        const post = await databases.getDocument(
            appwriteconfig.databaseId,
            appwriteconfig.postCollectionId,
            postId,
            
        )
        
        return post;
    } catch (error) {
        console.error("Failed to delete document:", error);
        throw new Error("Failed to delete document");
    }
    
  }

 

  export async function UpdatePost(post: IUpdatePost) {
    const hasUpdated = post.file.length>0;
    try {
        let image: Iimage = {
            imageUrl: post.imageUrl,
            imageId: post.imageId,
        }

        if(hasUpdated) {
            const uploadedFile = await uploadFile(post.file[0]);
  
            if (!uploadedFile) throw Error;
        
            // Get file url
            const fileUrl = (getFilePreview(uploadedFile.$id))?.toString();
            if (!fileUrl) {
              await deleteFile(uploadedFile.$id);
              throw Error;
            }

            image = {...image, imageUrl: fileUrl, imageId: uploadedFile.$id};
        }
      // Upload file to appwrite storage
     
  
      // Convert tags into array
      const tags = post.tags?.replace(/ /g, "").split(",") || [];
  
      // Create post
      

      const updatedPost = await databases.updateDocument(
        appwriteconfig.databaseId,
        appwriteconfig.postCollectionId,
        post.postId,
        {
         
          caption: post.caption,
          imageUrl: image.imageUrl,
          imageId: image.imageId,
          location: post.location,
          tags: tags,
        }
      );
  
      if (!updatedPost) {
        await deleteFile(post.imageId);
        throw Error;
      }
  
      return updatedPost;
    } catch (error) {
      console.log(error);
    }
  }

  export async function deletePost(postId?: string, imageId?: string) {
    if(!postId || !imageId) throw Error;
    try {
        await databases.deleteDocument(
            appwriteconfig.databaseId,
            appwriteconfig.postCollectionId,
            postId
        )
        return {status: 'ok'};
        
    } catch (error) {
        console.log(error);
    }
  }

  export async function getInfinitePosts({pageParam}: {pageParam: number}) {
    const queries: any[] = [Query.orderDesc('$updatedAt'), Query.limit(10)]

    if(pageParam) {
        queries.push(Query.cursorAfter(pageParam.toString()));
    }

    try {
        const posts = await databases.listDocuments(
            appwriteconfig.databaseId,
            appwriteconfig.postCollectionId,
            queries
        )
        if(!posts) throw Error;
        return posts;
    } catch (error) {
        console.log(error)
    }
  }

  export async function SearchPosts(searchTerm: string) {
    
    try {
        const posts = await databases.listDocuments(
            appwriteconfig.databaseId,
            appwriteconfig.postCollectionId,
            [Query.search('caption', searchTerm)]
        )
        if(!posts) throw Error;
        return posts;
    } catch (error) {
        console.log(error)
    }
  }

  export async function getTopCreators() {
    try {
        const creators = await databases.listDocuments(
            appwriteconfig.databaseId,
            appwriteconfig.userCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(20)]

        );
        if(!creators) throw Error;
        return creators;
    } catch (error) {
        console.log(error);
    }
  }

  export async function getSavedPosts(userId: string) {
    try {
        const saved = await databases.listDocuments(
            appwriteconfig.databaseId,
            appwriteconfig.savesCollectionId,
            [Query.equal('user', userId)]
        );
        if(!saved) throw Error;
        return saved.documents;
        
    } catch (error) {
        console.log(error);
    }
  }

  export async function UpdateProfile(user: IUpdateUser) {
     const hasUpdated = user.file.length>0;
    try {
        let image: Iimage = {
            imageUrl: user.imageUrl,
            imageId: user.imageId,
        }

        if(hasUpdated) {
            const uploadedFile = await uploadFile(user.file[0]);
  
            if (!uploadedFile) throw Error;
        
            // Get file url
            const fileUrl = (getFilePreview(uploadedFile.$id))?.toString();
            if (!fileUrl) {
              await deleteFile(uploadedFile.$id);
              throw Error;
            }

            image = {...image, imageUrl: fileUrl, imageId: uploadedFile.$id};
        }
      // Upload file to appwrite storage
     
  
   
  
      // Create post
      

      const updatedPost = await databases.updateDocument(
        appwriteconfig.databaseId,
        appwriteconfig.userCollectionId,
        user.userId,
        {
         
          name: user.name,
          imageUrl: image.imageUrl,
          imageId: image.imageId,
          bio: user.bio,
          username: user.username,
        }
      );
  
      if (!updatedPost) {
        await deleteFile(user.imageId);
        throw Error;
      }
  
      return updatedPost;
    } catch (error) {
      console.log(error);
    }
  }
  