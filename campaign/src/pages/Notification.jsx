import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
const socket = io('http://localhost:5000')

function Notification() {

    const [notifications, setNotifications] = useState([])

    useEffect(() => {

        localStorage.setItem('Notifications', notifications)

        socket.on('campaignUpdated', data => {
            setNotifications((prev) => [...prev, data.message])
        })
        socket.on('campaignDeleted', data => {
            setNotifications((prev) => [...prev, data.message])
        })
        socket.on('campaignAdded', data => {
            setNotifications((prev) => [...prev, data.message])
        })

        return () => {
            socket.off('campaignAdded');
            socket.off('campaignUpdate');
            socket.off('campaignDeleted');
            console.log(notifications)

        }
    })
  return (
    <div>Notification
        <h2> {notifications.length < 0 ? 'No Notification' : ''}</h2>
    <ul>
        {notifications.length > 0  && notifications.map(
        (notifications, index) => (<li key={index}>{notifications}</li>)
        )}
    </ul>
    </div>
  )
}

export default Notification