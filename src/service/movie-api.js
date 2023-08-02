export default class MovieApi{
    _apiBase = 'https://api.themoviedb.org/3';
    _apiKey = 'b85954b5e01dd96d7b6eecf94dfd9616';
    async searchMovie(query){
        const res = await fetch(`${this._apiBase}/search/movie?api_key=${this._apiKey}&query=${query}`);
        const data = await res.json();
        return data;
    }
}