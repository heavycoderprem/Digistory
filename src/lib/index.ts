import { z } from "zod"

export const SignUpformValidation = z.object({
    username: z.string().min(2, {message: 'Too Short'}).max(50),
    name: z.string().min(2, {message: 'Too Short'}),
    email: z.string().email(),
    password: z.string().min(8, {message: 'Password must be atleast 8 characters'})

})


export const SignInformValidation = z.object({
    
    email: z.string().email(),
    password: z.string().min(8, {message: 'Password must be atleast 8 characters'})

})


export const PostValidation = z.object({
    
    caption: z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(2).max(100),
    tags: z.string(),

})

export const ProfileValidation = z.object({
    
    file: z.custom<File[]>(),
    name: z.string().max(100),
    username: z.string().min(5).max(100),
    email: z.string().email(),
    bio: z.string().max(900),
    
})
