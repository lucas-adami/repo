import { UserForm } from "./UserForm"
import type { IUser } from "@/interface/IUser"
import { useState } from "react"
import UserDataDatable from "../../ui/datatable/user-datatable"
import { useUsersData } from "@/hooks/useUsersData"
import ArrowBack from "@/assets/arrowBack"
import { useNavigate } from "react-router-dom"


export const UserSession = () => {

    const navigate = useNavigate()

    const [userToEdit, setUserToEdit] = useState<IUser | null>(null)
    //retorna os usuários via hook 
    const { users, refreshUsersData } = useUsersData()

    return (
        <div className="flex  w-full justify-center">

            <div className="flex justify-center bg-[#1c1c1c] w-3/4 rounded-sm p-10 border-1 border-gray-700 ">
                <ArrowBack onClick={() => navigate(-1)} className="cursor-pointer h-4 mb-10" />

                <div className="w-1/3 flex flex-col justify-center ">
                    <div>
                        <UserForm userToEdit={userToEdit} setUserToEdit={setUserToEdit} refreshUsers={refreshUsersData} />
                    </div>
                </div>


                <div className=" pl-10">
                    <UserDataDatable users={users} setUserToEdit={setUserToEdit} refreshUsers={refreshUsersData} />
                </div>

            </div>
        </div>
    )
}