import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ProfileValidation } from "@/lib"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { IUpdateUser, IUser } from "@/types"
import { Textarea } from "../ui/textarea"

import ProfileUploader from "../shared/ProfileUploader"
import { useUpdateProfile } from "@/lib/react-query/queriesAndMutations"
import { useToast } from "../ui/use-toast";

type userProp = {
    user: IUpdateUser;
}

const ProfileForm = ({user}: userProp) => {

    const {mutateAsync: UpdateProfile, isPending: isUpdateLoading} = useUpdateProfile();
    const {toast} = useToast();


    const form = useForm<z.infer<typeof ProfileValidation>>({
        resolver: zodResolver(ProfileValidation),
        defaultValues: {
          username: "",
        },
      })

      async function onSubmit(values: z.infer<typeof ProfileValidation>) {
       const updatedProfile = await UpdateProfile({
         ...values,
         imageId: user?.imageId,
         userId: user?.userId,
         imageUrl: user?.imageUrl,
         
       })
       if(!updatedProfile) {
        toast({title: "pls try again"})
      }
      }
    

  return (
    
    <>
    <div className="flex flex-col w-full gap-9 relative">
     <div className="flex gap-7">
     <img src={user.imageUrl} alt="profile-image" className='w-24 h-24 rounded-full' /> 
     <Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)} className="gap-9 w-full max-w-5xl">
  <FormField
    control={form.control}
    name="file"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="shad-form_label"></FormLabel>
        <FormControl>
          <ProfileUploader fieldChange={field.onChange} mediaUrl={user.imageUrl}/>
        </FormControl>
        
        <FormMessage className="shad-form_message" />
      </FormItem>
    )}
  />
 
</form>
</Form>
     </div>
  


    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Name</FormLabel>
            <FormControl>
              <Input placeholder="digistory" {...field} className="shad-input" />
            </FormControl>
           
            <FormMessage className="shad-form_message" />
          </FormItem>
        )}
      />
      
    </form>
  </Form>


  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Username</FormLabel>
            <FormControl>
              <Input placeholder="digistory_04" {...field} className="shad-input" />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
     
    </form>
  </Form>


  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Email</FormLabel>
            <FormControl>
              <Input placeholder="digistory@gmail.com" {...field} className="shad-input" />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
   
    </form>
  </Form>


  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Bio</FormLabel>
            <FormControl>
              <Textarea placeholder="first rule of fight club you dont talk about the fight club" {...field} className="shad-textarea custom-scrollbar" />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  </Form>
  </div>
    </>
    
  )
}

export default ProfileForm
