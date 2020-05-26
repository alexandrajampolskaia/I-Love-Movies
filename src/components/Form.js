import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../features/addFavoriteList";
import { useSelector } from "react-redux";
import "../cssFolder/form.css";

const Form = () => {
	const dispatch = useDispatch();

	const data = useSelector((state) => state.addFavoriteList);
	const latestList = data.slice(-3).map((item) => (
		<div key={item.id}>
			<h2>{item.film.title} </h2>
			<p>Genre: {item.film.genre}</p>
			<p>About: {item.film.description}</p>
			<p>Year: {item.film.year}</p>
			<p>{item.film.ofType}</p>
			<p>Rating: {item.film.rating} </p>
		</div>
	));

	const [movie, setMovie] = useState({
		id: "",
		title: "",
		description: "",
		genre: "action",
		ofType: "movie",
		year: "",
	});

	const handleChange = (e) => {
		setMovie({
			...movie,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (movie.genre) {
			setMovie(
				{ ...movie, title: "" },
				{ ...movie, description: "" },
				{ ...movie, genre: "" },
				{ ...movie, year: "" },
				{ ...movie, ofType: "" }
			);
		}
	};

	const handleClick = () => dispatch(actions.addToMovieList(movie));
	console.log(movie);

	const showImage = (event) => {
		let img = event.target.files[0];
		const reader = new FileReader();
		reader.onload = function () {
			const img = new Image();
			img.src = reader.result;
			document.body.appendChild(img);
		};
		reader.readAsDataURL(img);
	};

	return (
		<div className="main-container">
			<div>
				<form className="form-style" onSubmit={handleSubmit}>
					{/* {errors.title && <span>{errors.title}</span>}  */}
					<h2>Add movies or series</h2>
					<br></br>

					<input
						placeholder="Title"
						type="text"
						name="title"
						value={movie.title}
						onChange={handleChange}
					/>

					{/* {errors.description && <span>{errors.description}</span>}  */}

					{/* <input
						placeholder="Description"
						type="text"
						name="description"
						value={movie.description}
						onChange={handleChange}
					/> */}

					<textarea
						placeholder="Description"
						type="text"
						name="description"
						value={movie.description}
						onChange={handleChange}
						cols="20"
						rows="5"
					></textarea>

					<div>
						{/* {errors.genre && <span>{errors.genre}</span>}  */}

						<input
							placeholder="Year"
							type="number"
							name="year"
							value={movie.year}
							onChange={handleChange}
						/>
						<div>
							<label htmlFor="genre">Genre: </label>
							<select name="genre" id="genre" onChange={handleChange}>
								<option value="action">action</option>
								<option value="anime">anime</option>
								<option value="dokumentärer">dokumentärer</option>
								<option value="draman">draman</option>
								<option value="historia">history</option>
								<option value="klassiker">classic</option>
								<option value="komedier">comedy</option>
								<option value="musikaler">musical</option>
								<option value="romantic">romantic</option>
								<option value="sci-fi">sci-fi</option>
							</select>
						</div>
						<div>
							<label htmlFor="Movie">Movie: </label>
							<input
								checked={true}
								value="movie"
								type="radio"
								name="ofType"
								id="Movie"
								onChange={handleChange}
							/>
							<label htmlFor="Serie">Serie: </label>
							<input
								value="serie"
								type="radio"
								name="ofType"
								id="Serie"
								onChange={handleChange}
							/>
						</div>
					</div>

					<label>Upload image</label>
					<br></br>
					<input
						type="file"
						id="image"
						accept=".png, .jpeg, .jpg"
						onChange={showImage}
					></input>

					<button
						type="submit"
						onClick={handleClick}
						className="addFavoriteToListButton"
					>
						Add
					</button>
				</form>
			</div>
			<h1>Latest Upload </h1>

			<div className="three-latest">
				<div className="test">{latestList}</div>
			</div>
		</div>
	);
};

export default Form;
