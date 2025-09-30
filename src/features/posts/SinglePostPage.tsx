import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'
import { TimeAgo } from '@/components/TimeAgo'
import { selectCurrentUsername } from '@/features/auth/authSlice'
import { selectPostById } from './postsSlice'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'

export const SinglePostPage = () => {
  const { postId } = useParams()

  const post = useAppSelector((state) => selectPostById(state, postId!))
  const currentUsername = useAppSelector(selectCurrentUsername)!

  if (!post) {
    return (
      <section>
        <h2>Post not found...</h2>
      </section>
    )
  }

  const canEdit = currentUsername === post.user

  return (
    <section>
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
    </section>
  )
}
