
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl,FormField,FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignInformValidation } from "@/lib"
import Loader from "@/components/shared/loader"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import {useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"






const SigninForm = () => {
 
  const {toast} = useToast();
  const {mutateAsync: signInAccount, isPending} = useSignInAccount();
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext();
  const navigate = useNavigate();

   // 1. Define your form.
   const form = useForm<z.infer<typeof SignInformValidation>>({
    resolver: zodResolver(SignInformValidation),
    defaultValues: {
     
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInformValidation>) {
   

    try {

      const session = await signInAccount(values);
      if(!session) {
        toast({title: "Login failed. Please try again."});
        return;
      }

      const isLoggedIn = await checkAuthUser();
      if (isLoggedIn) {
        form.reset();
        navigate("/");
      } else {
        toast({ title: 'Sign in failed. Please try again.' });
        return;
      }

    } catch (error) {
      toast({title: "sign In failed. Please try again."})
    }
    
  }

 

  return (
    
  <div>
    <Form {...form}>
      <div className="flex-center flex-col sm:w-420">
        <img src="./public/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Welcome Back!</h2>
        <p className="text-light text-gray-500 small-medium mt-2 md:base-regular mb-4">To use your Snapgram, Please enter your details</p>

     
      <div className="sm:w-420">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" >
       
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

        <Button type="submit" className="shad-button_primary hover:scale-[1.05]">
           {
            isPending || isUserLoading ? (
              <div className="gap-2 flex-center">
                <Loader /> Loading...
              </div>
            ) : "Log In"
           }
        </Button>

        <p className="text-small-regular text-light-2 text-center mt-2">Don't have an account?
        <Link to="/sign-up" className="text-primary-500 ml-1 text-small-semibold hover:tracking-wide"> Sign-up </Link>
        </p>
      </form>
      </div>
      </div>
    </Form>
  </div>
  
  )
}

export default SigninForm
