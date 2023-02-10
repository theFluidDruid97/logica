const Notify = (title, body) => {
  let permission = Notification.permission

  if (permission === 'granted') {
    showNotification()
  } else if (permission === 'default') {
    requestAndShowPermission()
  } else {
    alert('Use normal alert')
  }

  function requestAndShowPermission() {
    Notification.requestPermission(function (permission) {
      if (permission === 'granted') {
        showNotification()
      }
    })
  }
  function showNotification() {
    //  if(document.visibilityState === "visible") {
    //      return;
    //  }
    // let title = 'You have Training thats due soon!'
    // let body = 'Get it done or youll be in trouble!'

    let notification = new Notification(title, { body })

    notification.onclick = () => {
      notification.close()
      window.parent.focus()
    }
  }
}

export default Notify
