'use server'

import Link from "next/link";
import s from './NavBar.module.scss'
import { apiQuery, DraftMode } from "next-dato-utils";
import { AllMenusDocument } from "@graphql";

export default async function NavBar({ }: {}) {

  const { allMenus, draftUrl } = await apiQuery<AllMenusQuery, AllMenusQueryVariables>(AllMenusDocument, {
    revalidate: 30,
    tags: ['menu']
  });

  return (
    <>
      <ul className={s.navbar}>
        <li><Link href={'/'} prefetch={false}>Home</Link></li>
        <li><Link href={'/posts'}>Posts</Link></li>
        {allMenus.map(({ id, title, slug }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
      <DraftMode url={draftUrl} tag={'menu'} />
    </>
  );
}