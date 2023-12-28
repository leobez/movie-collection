import "./Random.css"

const Random = () => {

	const handleSubmit = (e: React.FormEvent):void => {
		e.preventDefault()

	}

	return (
		<div className="random">

			<div className="form-continer">
				
				<form onSubmit={handleSubmit}>

					<div className="choices-panel">


					</div>
					

					<input type="submit" value="Escolher filme"/>

				</form>

			</div>

		</div>
	)
}

export default Random