import * as Popover from "@radix-ui/react-popover"
import { ThreeDots } from "@styled-icons/bootstrap/ThreeDots"
import { LogOut } from "@styled-icons/evaicons-solid/LogOut"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../_features/Auth/context"

function RootLayout() {
  const auth = useAuth()
  const navigate = useNavigate()

  const handleLogoutButton = () => {
    auth.logout()
    navigate("/login")
  }

  const style =
    (styleClasses: string) =>
    ({ isActive }: { isActive: boolean; isPending: boolean }) =>
      `${isActive ? "bg-black/20" : ""} ${styleClasses}`

  return (
    <div className="w-screen h-screen bg-gray-900 text-white overflow-y-auto">
      <header className="w-full bg-gray-800">
        <main className="p-4 w-full max-w-[1280px] mx-auto flex justify-between">
          <nav className="flex gap-2">
            <NavLink
              to="/"
              className={style("px-4 py-2 rounded-lg flex items-center")}
            >
              Home
            </NavLink>
            <NavLink
              to="/profile"
              className={style("px-4 py-2 rounded-lg flex items-center")}
            >
              Profile
            </NavLink>
          </nav>
          <nav>
            {auth.user && (
              <div className="flex items-center">
                <div className="flex items-end flex-col">
                  <h2 className="text-lg text-gray-200 font-semibold leading-5">{auth.user.name}</h2>
                  <span className="block text-gray-400 leading-5">{auth.user.username}</span>
                </div>
                <div className="rounded-full overflow-hidden border-4 border-black w-12 h-12 ml-3">
                  <img
                    src={auth.user.avatar_url}
                    className="block w-full h-full"
                  />
                </div>
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <button className="rounded-full ml-2 w-10 h-7 flex items-center justify-center active:bg-gray-700">
                      <ThreeDots width={22} />
                    </button>
                  </Popover.Trigger>
                  <Popover.Content asChild>
                    <div className="py-1 px-1 bg-slate-700 rounded-lg">
                      <button
                        className="py-0.5 pl-2 pr-4 hover:bg-slate-600 rounded-md flex gap-2 items-center"
                        onClick={handleLogoutButton}
                      >
                        <div className="flex items-center justify-center">
                          <LogOut width={20} />
                        </div>
                        <span>Logout</span>
                      </button>
                    </div>
                  </Popover.Content>
                </Popover.Root>
                {/* <button
                onClick={() => {
                  auth.logout()
                  navigate("/login")
                }}
                className="px-4 py-2 rounded-lg bg-red-600"
              >
                Logout
              </button> */}
              </div>
            )}
            {!auth.user && (
              <NavLink
                to="/login"
                className={style("px-4 py-2 rounded-lg block bg-blue-500")}
              >
                Login
              </NavLink>
            )}
          </nav>
        </main>
      </header>
      <div className="w-full max-w-[1280px] mx-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout
