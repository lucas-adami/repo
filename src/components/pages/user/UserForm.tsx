import { useEffect, useState } from "react";
import type { IUser } from "../../../interface/IUser";
import { postUser, updateUser } from "../../../services/user/userService";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { toast } from "sonner";
import ArrowBack from "@/assets/arrowBack";

type Props = {
  userToEdit: IUser | null;
  setUserToEdit: (user: IUser | null) => void;
  refreshUsers: () => void;
};

export const UserForm = ({
  userToEdit,
  setUserToEdit,
  refreshUsers,
}: Props) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  useEffect(() => {
    console.log("Atualizou userToEdit:", userToEdit);
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [userToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // evita refresh da página

    console.log(name, email);

    try {
      const user: IUser = { name, email };

      //se existir usuário a ser editado, segue com o service de update
      if (userToEdit && userToEdit._id) {
        await updateUser(userToEdit._id, user);
        setUserToEdit(null);
        toast.success("User Updated with Success!");
      }

      // se nao, service de post
      else {
        await postUser(user);
        toast.success("User Created with Success!");
      }

      refreshUsers();
      setName("");
      setEmail("");
    } catch (error) {
      console.error(error);
      toast(`Error on creating: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full border-1 border-gray-500 rounded-xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold text-orange-500 text-xl" >
          {userToEdit
            ? `Update User: ${userToEdit._id}`
            : "Create User:"}
        </p>

        {/* Opção caso queira voltar ao registro de usuários...*/}
        {userToEdit && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUserToEdit(null)}
            title="Back to Create Form"
          >
            <ArrowBack />
          </Button>
        )}
        {/*##*/}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <Label className="text-sm font-medium mb-1">Name</Label>
          <Input
            type="text"
            placeholder="Write a name"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <Label className="text-sm font-medium mb-1">Email</Label>
          <Input
            type="email"
            placeholder="Write an e-mail"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Button type="submit" variant="ghost" className="text-white border-gray-500 border-1">
          {userToEdit ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};
