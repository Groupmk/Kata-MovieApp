export default class MovieApi{
    _apiBase = 'https://api.themoviedb.org/3';
    _apiKey = 'b85954b5e01dd96d7b6eecf94dfd9616';
    async searchMovie(query){
        const res = await fetch(`${this._apiBase}/search/movie?api_key=${this._apiKey}&query=${query}`);
        const data = await res.json();
        return data;
    }

    async rateMovie(rating) {
        const url = `${this._apiBase}/authentication/guest_session/new?api_key=${this._apiKey}`;
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({
            value: rating,
          }),
        };
    
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
      }

      async getGenres() {
        const res = await fetch(`${this._apiBase}/genre/movie/list?api_key=${this._apiKey}`);
        const data = await res.json();
        return data.genres;
      }
      
}