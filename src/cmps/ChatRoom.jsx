import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'


export function ChatRoom({ toy }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [topic, setTopic] = useState('')

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        setTopic(toy.name)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [])

    function onUsrMsg(e) {
        const { value, name } = e.target
        setMsg(prevMsg => ({...prevMsg, [name]:value }))
    }

    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedInUser?.fullname || 'Guest'
        const newMsg = { from, txt: msg.txt }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        addMsg(newMsg)
        setMsg({ txt: '' })
    }

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    return <section className='chat-of-toy'><ul className="toy-msgs">
        <h2>Chat about {topic}</h2>
        {toy.msgs &&
         toy.msgs.map(msg => <li key={msg.id}><span>{msg.by.fullname}: {msg.txt}</span></li>)}
        <form onSubmit={sendMsg}>
            <span>{loggedInUser.fullname || 'Guest'}: </span><input type="text" name="txt" value={msg.txt} onChange={onUsrMsg} placeholder="Enter your message" />
            <button>Send</button>
        </form>
    </ul>
    </section>
}