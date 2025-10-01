import { useLayoutEffect } from 'react'
import classnames from 'classnames'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { TimeAgo } from '@/components/TimeAgo'
import { PostAuthor } from '@/features/posts/PostAuthor'
import { allNotificationsRead, selectAllNotifications } from './notificationsSlice'

export const NotificationsList = () => {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector(selectAllNotifications)

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map((notification) => {
    const notifClassName = classnames('notification', { new: notification.isNew })

    return (
      <div key={notification.id} className={notifClassName}>
        <div>
          <b>
            <PostAuthor userId={notification.user} showPrefix={false} />
          </b>{' '}
          {notification.message}
        </div>
        <TimeAgo timestamp={notification.date} />
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}
