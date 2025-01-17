import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
    {isAuthenticated ? (<Navigate to="/"/>) :
                     (
                      <> 
                      <div className="flex">
                      <section className="flex flex-1 justify-center items-center flex-col py-10"><Outlet/></section>


                      <img src="./public/images/side-img.svg" alt="logo" className="hidden xl:block h-screen object-cover bg-no-repeat w-1/2" />
                      </div>
                      </>
                      
                     )
     }

     
    </>
    
  )
}

export default AuthLayout
