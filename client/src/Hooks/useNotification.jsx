import React, { useEffect } from 'react'

const useNotification = () => {
  // 에러1. 크롬에서 안뜸
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      try {
        Notification.requestPermission().then((permission) => {
          if (permission !== 'granted') return;
        });
      } catch (error) {
        if (error instanceof TypeError) {
          Notification.requestPermission((permission) => {
            if (permission !== 'granted') return;
          });
        } else {
          console.error(error);
        }
      }
    }
  }, [])

  const pushNotification = (title, options) => {
    if (Notification.permission === 'granted') {
      // 로고 추가
      const icon = '/img/logo.png'
      options = { ...options, icon }
      const notification = new Notification(title, options)

      console.log(`notification? ${notification}`);
      console.log(notification);

      // 알림 클릭 시 이동할 URL 설정
      notification.onclick = () => {
        window.location.href = `/`
      }

      return notification
    } else {
      console.warn('알림 권한이 허용되지 않았습니다...')
    }
  }

  return pushNotification
}

export default useNotification