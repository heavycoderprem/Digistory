import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'

const Topbar = () => {

const {mutateAsync: SignOut, isSuccess} = useSignOutAccount();
const navigate = useNavigate();
const {user} = useUserContext();

useEffect(() => {
       if(isSuccess) { 
        navigate(0)
       }
}, [isSuccess])

  return (
    <section className='topbar'>
        <div className='py-4 px-5 flex-between'>

            <Link to="/" className='flex gap-3 items-center'><img src="/public/images/logo.svg" alt="logo" width={130} height={325} /></Link>
            
            <div className='flex gap-4'>
                <Button variant="ghost" className='shad-button_ghost' onClick={()=> SignOut()}>
                    <img src="/public/icons/logout.svg" alt="logut" />
                </Button>

                <Link to={`/profile/${user.id}`} className='flex-center gap-3'><img src={user.imageUrl || '/public/images/profile-placeholder.svg'} alt="profile" className='w-8 h-8 rounded-full' /></Link>
            </div>

        </div>

    </section>
  )
}

export default Topbar

