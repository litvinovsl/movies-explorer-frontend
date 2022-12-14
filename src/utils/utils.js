export function handleMovies(movies) {
	return movies.map((movie) => {
		return {
			country: movie.country,
			director: movie.director,
			duration: movie.duration,
			year: movie.year,
			description: movie.description,
			image: 'https://api.nomoreparties.co' + movie.image.url,
			trailerLink: movie.trailerLink,
			thumbnail: 'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url,
			movieId: movie.id,
			nameRU: movie.nameRU,
			nameEN: movie.nameEN,
		};
	});
}

// Функция фильтрации фильмов по длительности
export function filterByDuration(movies) {
	const durationLimit = 40;
	return movies.filter((movie) => movie.duration <= durationLimit);
}

export function filterByKeyWord(movies, keyWord) {
	if (keyWord) {
		return movies.filter((movie) => {
			return movie.nameRU.toLowerCase().includes(keyWord.toLowerCase());
		});
	}
}