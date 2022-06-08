import type { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Avatar, Spinner } from 'flowbite-react';
import { TUserData } from '../../types';
import React from 'react';

const queryClient = new QueryClient();


const fetchUserData = async (id: string | string[] | undefined) => {
  const res = await fetch(`${process.env.GITHUB_API}/${id}`);
  const response = await res.json();

  return response;
};

const renderData = (isLoading: boolean, userData: TUserData, isError: boolean) => {
  if (isLoading) return <Spinner aria-label="Loading user Data" />
  if (isError) return <p>Something is worng</p>
  return (
    <React.Fragment>
      <Avatar
        img={userData.avatar_url}
        rounded={true}
      />
      <p>{userData.name}</p>
    </React.Fragment>
  )
}

const UserPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: userData, isLoading, isError } = useQuery('userData', async () => await fetchUserData(id))

  return (
    <div className='h-screen'>
      <div className='container mx-auto flex items-center justify-center'>
        <div className="flex flex-wrap gap-2 mt-10 justify-center items-center">
          {renderData(isLoading, userData, isError)}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ query }: NextPageContext) => {
  const { id } = query;
  await queryClient.prefetchQuery("userData", async () => await fetchUserData(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default UserPage
