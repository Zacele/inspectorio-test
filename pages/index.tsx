import * as React from 'react'
import type { NextPage } from 'next'
import { ListGroup } from 'flowbite-react'
import { useRouter } from 'next/router'

const topFiveGithubUser: string[] = ["GrahamCampbell", "fabpot", "weierophinney", "rkh", "josh"]

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div className='h-screen'>
      <div className='container mx-auto flex flex-col items-center justify-center'>
        <ListGroup className="w-full h-full m-10">
          {topFiveGithubUser.map(user => (
            <ListGroup.Item key={user} onClick={() => router.push(`/user/${encodeURIComponent(user)}`)}>
              {user}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div >
  )
}

export default Home
