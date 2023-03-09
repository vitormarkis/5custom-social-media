import * as Popover from "@radix-ui/react-popover"
import { ThreeDots } from "@styled-icons/bootstrap/ThreeDots"
import { LogOut } from "@styled-icons/evaicons-solid/LogOut"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useLamaAuth } from "../_features/LamaAuth/context"

function RootLayout() {
  const navigate = useNavigate()
  const { currentUser, logout } = useLamaAuth()

  const handleLogoutButton = () => {
    logout()
    navigate("/login")
  }

  const style =
    (styleClasses: string) =>
    ({ isActive }: { isActive: boolean; isPending: boolean }) =>
      `${isActive ? "bg-black/20" : ""} ${styleClasses}`

  return (
    <div className="w-screen h-screen max-h-screen bg-gray-900 text-white flex flex-col overflow-y-auto custom-scroll">
      <header className="w-full bg-gray-800 h-16 flex items-center justify-center border-b border-b-gray-900">
        <main className="p-4 w-full max-w-[1280px] flex justify-between">
          <nav className="flex gap-2">
            <NavLink
              to="/"
              className={style("px-4 py-2 rounded-lg flex items-center")}
            >
              Home
            </NavLink>
            {currentUser ? (
              <NavLink
                to="/posts"
                className={style("px-4 py-2 rounded-lg flex items-center")}
              >
                Posts
              </NavLink>
            ) : null}
            {currentUser ? (
              <NavLink
                to="/saved-posts"
                className={style("px-4 py-2 rounded-lg flex items-center")}
              >
                Posts Salvos
              </NavLink>
            ) : null}
          </nav>
          <nav>
            {currentUser && (
              <div className="flex items-center">
                <div className="flex items-end flex-col">
                  <h2 className="text-base text-gray-200 font-semibold leading-5">{currentUser.name}</h2>
                  <span className="block text-gray-400 leading-5 text-sm">{currentUser.username}</span>
                </div>
                <NavLink
                  to="/profile"
                  className="cursor-pointer rounded-full overflow-hidden border-4 border-black w-12 h-12 ml-3"
                >
                  <img
                    src={currentUser.profile_pic}
                    className="block w-full h-full object-cover"
                  />
                </NavLink>
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <button className="rounded-full ml-2 w-10 h-7 flex items-center justify-center active:bg-gray-700">
                      <ThreeDots width={22} />
                    </button>
                  </Popover.Trigger>
                  <Popover.Content
                    asChild
                    align="end"
                  >
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
              </div>
            )}
            {!currentUser && (
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
      <div className="w-full max-w-[1280px] mx-auto chat">
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout
