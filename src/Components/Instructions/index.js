import React from 'react'
import { Message } from 'semantic-ui-react'
import './instructions.css'
const MessageExampleList = ({setTab}) => {

    return (
        <div className="instructions">
            <Message>
                <Message.Header>Instructions</Message.Header>
                <Message.List>
                <Message.Item>Dont't refresh while attending quiz</Message.Item>
                <Message.Item>Make sure you have proper internet connection</Message.Item>
                </Message.List>
            </Message>
        </div>
    )
}
export default MessageExampleList