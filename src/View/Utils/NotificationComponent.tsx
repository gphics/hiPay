
// @ts-nocheck
function NotificationComponent({customId}) {
  return (
    <div id={customId} className="notification_component_holder hide_notification">
      <div className="timeout_display"></div>
      <div className="notification_body">
        <h5 id="main_notification"></h5>
      </div>
    </div>
  )
}

export default NotificationComponent