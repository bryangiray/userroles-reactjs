
import { Outlet } from "react-router-dom"

const GuestLayout = () => {
    return (
        <div>
            <section className="bg-gray-200">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    
                    <Outlet />
                </div>
            </section>
        </div>
    )
}

export default GuestLayout