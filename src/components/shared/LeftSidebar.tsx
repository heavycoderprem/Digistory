import { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'
import { sidebarLinks } from '@/constants/sidebarLinks'
import { INavLink } from '@/types'

const LeftSidebar = () => {
  const {pathname} = useLocation();

const {mutateAsync: SignOut, isSuccess} = useSignOutAccount();
const navigate = useNavigate();
const {user} = useUserContext();

useEffect(() => {
       if(isSuccess) { 
        navigate(0)
       }
}, [isSuccess])

  return (
   <nav className='leftsidebar'>
    <div className='flex flex-col gap-11'>
    <Link to="/" className='flex gap-3 items-center'><img src="/public/images/logo.svg" alt="logo" width={130} height={325} /></Link>
    
    <Link to={`/profile/${user.id}`} className='gap-3 flex items-center'><img src={user.imageUrl || '/public/images/profile-placeholder.svg'} alt="profile" className='w-14 h-14 rounded-full' />
            <div className='flex flex-col gap-1'>
              <p className='body-bold'>{user.name}</p>
              <p className='small-regular text-light-3'>@{user.username}</p>

            </div>
    </Link>

    <ul className='flex flex-col gap-6'>
      {sidebarLinks.map((link:INavLink) => {
        const isActive = pathname === link.route;
        return(
          <li key={link.label} className={`leftsidebar-link group ${isActive && "bg-primary-500"}`}>
            <NavLink to={link.route} className="flex gap-4 items-center p-4">
              <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && "invert-white"}`} />
            {link.label}
            </NavLink>
          </li>
        )
      })}
    </ul>
    

   
    </div>

    <Button variant="ghost" className='shad-button_ghost' onClick={()=> SignOut()}>
                    <img src="/public/icons/logout.svg" alt="logut" />
                    <p className='small-medium lg:base-medium'>Logout</p>
    </Button>

   </nav>
  )
}

export default LeftSidebar
