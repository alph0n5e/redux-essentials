import { Link } from 'react-router-dom'

import { TimeAgo } from '@/components/TimeAgo'

import { PostAuthor } from './PostAuthor'
import { type Post } from './postsSlice'
import { ReactionButtons } from './ReactionButtons'

type PostExcerptProps = {
  post: Post
}

export const PostExcerpt = ({ post }: PostExcerptProps) => (
  <article className="post-excerpt">
    <h3>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </h3>
    <p className="post-content">{post.content.substring(0, 100)}</p>
    <TimeAgo timestamp={post.date} /> <PostAuthor userId={post.user} />
    <ReactionButtons post={post} />
  </article>
)
