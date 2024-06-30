
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl,FormField,FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignUpformValidation } from "@/lib"
import Loader from "@/components/shared/loader"
import { Link, useNavigate } from "react-router-dom"

import { toast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"






const SignupForm = () => {
  
  const {mutateAsync: createUserAccount, isPending: isCreatingAccount} = useCreateUserAccount();
  const {mutateAsync: SignInAccount, isPending: isSigningIn} = useSignInAccount();
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext();
  const navigate = useNavigate();

   // 1. Define your form.
   const form = useForm<z.infer<typeof SignUpformValidation>>({
    resolver: zodResolver(SignUpformValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpformValidation>) {
    
    try {
     const newUser = await createUserAccount(values);
     
    
    if(!newUser) {
      return toast({title: 'Sign-up failed. Please try again.'})
    }
     
    const session = await SignInAccount({email: values.email, password: values.password});


    if(!session) {
      toast({title: "Something went wrong. Please login your new account", });
      navigate("/sign-up");
      return;
    }
   

 

    const isLoggedIn = await checkAuthUser();
    console.log("ok");
    if(isLoggedIn) {
      form.reset()
      navigate("/")
      console.log("noo")
    }
     else {
      return toast({title: 'Sign up failed. Please try again.'})
     }
    }
    catch (error) {
      console.log({ error });
    }
  };

 

  return (
    
  <div>
    <Form {...form}>
      <div className="flex-center flex-col sm:w-420">
        <img src="./public/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
        <p className="text-light text-gray-500 small-medium mt-2 md:base-regular mb-4">To use your Snapgram, Please enter your details</p>

     
      <div className="sm:w-420">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>

            
          )}
        />

         <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>

            
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>

            
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>

            
          )}
        />

        <Button type="submit" className="shad-button_primary">
           {
            isCreatingAccount || isSigningIn || isUserLoading ? (
              <div className="gap-2 flex-center">
                <Loader /> Loading...
              </div>
            ) : "Sign-up"
           }
        </Button>

        <p className="text-small-regular text-light-2 text-center mt-2">Already have an account?
        <Link to="/sign-in" className="text-primary-500 ml-1 text-small-semibold"> Log in </Link>
        </p>
      </form>
      </div>
      </div>
    </Form>
  </div>
  
  )
}

export default SignupForm
