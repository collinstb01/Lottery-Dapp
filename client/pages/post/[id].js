import { useRouter } from 'next/router'

const DetailsPage = () => {
    const route = useRouter()
    const userId = route.query.id
    console.log(userId)
  return (
    <div>DetailsPage</div>
  )
}

export default DetailsPage