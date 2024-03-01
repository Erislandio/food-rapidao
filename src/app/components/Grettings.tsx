import { useAuthContext } from "@/app/context/AuthContext"

function ProfileGrettings({
  name
}: { name: string }) {
  return <h2 className="text-lg font-thin mt-8">Olá {name}, <b className="font-bold">Bom dia!</b></h2>
}

export const Grettings = () => {

  const { user } = useAuthContext()

  if (!user?.name) {
    <ProfileGrettings name='' />
  }

  return (
    <h2 className="text-lg font-thin mt-8">Olá {user.name}, <b className="font-bold">Bom dia!</b></h2>
  )
}

