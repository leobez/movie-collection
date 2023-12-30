import "./Message.css"

type Props = {
	type: string,
	msg: string
}

const Message = ({type, msg}: Props) => {
	return (
		<div className="message">
			{type === 'loading' && <div className="loading"><p>Carregando...</p></div>}
			{type === 'error' && <div><p className="error">{msg}</p></div>}
		</div>
	)
}

export default Message