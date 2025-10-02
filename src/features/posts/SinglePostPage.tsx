import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'
import { TimeAgo } from '@/components/TimeAgo'
import { selectCurrentUsername } from '@/features/auth/authSlice'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import { useGetPostQuery } from '../api/apiSlice'
import { Spinner } from '../../components/Spinner'

export const SinglePostPage = () => {
  const { postId } = useParams()

  const currentUsername = useAppSelector(selectCurrentUsername)!
  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId!)

  let content: React.ReactNode

  const canEdit = currentUsername === post?.user

  if (isFetching) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <p>
          <TimeAgo timestamp={post.date} /> <PostAuthor userId={post.user} />
        </p>
        <ReactionButtons post={post} />
        {canEdit && (
          <Link to={`/posts/${post.id}/edit`} className="button">
            Edit Post
          </Link>
        )}
      </article>
    )
  }
  return <section>{content}</section>
}
