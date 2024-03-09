import { useUserContext } from "@/app/context/UserContext"

function getGrettings() {
  const hour = new Date().getHours()

  if (hour < 12) {
    return 'Bom dia!'
  }

  if (hour > 12 && hour < 16) {
    return 'Boa tarde!'
  }

  return 'Boa noite!'
}

function ProfileGrettings({
  name
}: { name: string }) {
  return <h2 className="text-lg font-thin mt-8">Olá {name}, <b className="font-bold">{getGrettings()}</b></h2>
}

export const Grettings = () => {

  const { user } = useUserContext()

  if (!user?.name) {
    <ProfileGrettings name='' />
  }

  return (
    <ProfileGrettings name={user.name} />
  )
}
