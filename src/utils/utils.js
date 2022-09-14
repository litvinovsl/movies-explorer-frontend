export function handleMovies(movies) {
	return movies.map((movie) => {
		return {
			country: movie.country || ' ',
			director: movie.director || ' ',
			duration: movie.duration || 0,
			year: movie.year || ' ',
			description: movie.description || ' ',
			image: 'https://api.nomoreparties.co' + movie.image.url || ' ',
			trailerLink: movie.trailerLink || ' ',
			thumbnail: 'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url || ' ',
			movieId: movie.id || -1,
			nameRU: movie.nameRU || ' ',
			nameEN: movie.nameEN || ' ',
		};
	});
}

export function handleDuration(movies) {
	return movies.map((movie) => {
		const handledDuration =
			Math.trunc(movie.duration / 60) + ' ч ' + (movie.duration % 60) + ' м';
		return {
			...movie,
			duration: handledDuration,
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