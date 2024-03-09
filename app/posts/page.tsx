'use server'

import s from './page.module.scss'
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { AllPostsDocument } from '@graphql';
import Link from 'next/link';

export default async function Posts() {

  const { allPosts, draftUrl } = await apiQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, {
    generateTags: false,
    tags: ['post']
  });

  return (
    <>
      <div className={s.container}>
        <h1>All posts</h1>
        <ul>
          {allPosts.map(post => (
            <li key={post.id}>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <DraftMode url={draftUrl} path="/posts" />
    </>
  )
}