import { Card } from "antd"
import _Layout from "../_Layout"
import { IoSearch } from "react-icons/io5"
import { TbLogout } from "react-icons/tb"
import { HiOutlineUsers } from "react-icons/hi"

const Admin = () => {

  const adminMenu = () => {
    return (
      <Card className="min-h-screen">
        <div className="flex flex-col ml-5 mt-5 gap-y-4">
          <div className="flex items-center space-x-2 hover:cursor-pointer hover:text-blue-500">
            <HiOutlineUsers className="w-6 h-6" />
            <span className="font-semibold">Users</span>
          </div>
          <div className="flex items-center space-x-2 hover:cursor-pointer hover:text-blue-500">
            <IoSearch className="w-6 h-6" />
            <span className="font-semibold">Search</span>
          </div>

          <div className="flex items-center space-x-2 hover:cursor-pointer hover:text-blue-500">
            <TbLogout className="w-6 h-6" />
            <span className="font-semibold">Logout</span>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <_Layout
      sidebarContent={adminMenu()}
    />
  )
}

export default Admin