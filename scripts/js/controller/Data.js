class Data {

    static loadGenres(callback) {
        this._get('data/json/genres.json', callback);
    }

    static getTrending(callback, genres) {
        this._get('data/json/trending.json', (fail, response, error) => {
            if(!fail) {
                callback(false, this._composeN(response, genres, 'trending'), null);
            } else {
                callback(fail, null, error);
            }
        });
    }

    static getDiscover(callback, genres){
        this._get('data/json/discover.json', (fail, response, error) => {
            if(!fail) {
                callback(false, this._composeN(response, genres, 'discover'), null);
            } else {
                callback(fail, null, error);
            }
        });
    }

    static getLatest(callback) {
        this._get('data/json/latest.json', (fail, response, error) => {
            if(!fail) {
                callback(false, this._composeA(response, 'latest'), null );
            } else {
                callback(fail, null, error);
            }
        });
    }


    /** THIS IS FOR INTERNAL ONLY **/

    /**
     * for composing discover and trending
     * @param {JSON} jsonResponse 
     * @returns {JSON} movieData
     */
    static _composeN(jsonResponse, genres, type) {

        let listJSON = [];
        jsonResponse.results.forEach(element => {
            const genre = this._findGenre(element.genre_ids, genres.genres);
            const rate = this._composeRating(element.vote_average);
            
            listJSON.push({
                name: element.title,
                date: element.release_date,
                rating: rate,
                voteCount: element.vote_count,
                genres: genre,
                posterPath: this._getBase(element.poster_path, type),
                overview: element.overview
            })
        });
        return listJSON;
    }

    static _composeA(jsonData, type){
        const genre = this._composeGenreSingle(jsonData.genres);
        const rate = this._composeRating(jsonData.vote_average);
        return {
            name: jsonData.title,
            date: jsonData.release_date,
            rating: rate,
            voteCount: jsonData.vote_count,
            genres: genre,
            posterPath: this._getBase(jsonData.poster_path, type),
            overview: jsonData.overview
        }
    }

    static _getBase(posterPath, type){
        return `/Submission1-PWA/data/images/${type}${posterPath}`;
    }


    static _findGenre(genreId, genres){
        let content = '';
        let _i = '';
        for(; _i < genreId.length;){
            genres.forEach(item => {
                if(item.id === genreId[_i]){
                    content += item.name;
                }
            })

            if(++_i < genreId.length)
                content+=',';
        }
        return content;
    }

    static _composeGenreSingle(jsonGenre){
        let content = '';
        let _i = 0;
        for(; _i < jsonGenre.length;){
            content += jsonGenre[_i].genreItem.name;
            if(++_i < jsonGenre.length)
                content+=',';
        }
        return content;
    }

    static _composeRating(voteAverage){
        return voteAverage * 5 / 10;
    }


    /**
     * 
     * @param {string} api 
     * @param {function(boolean, JSON, string)} callback 
     */
    static async _get(api, callback) {
        try {
            const response = await fetch(api);
            const jsonResponse = await response.json();
            callback(false, jsonResponse, null)
        } catch(error){
            callback(true, null, error);
        }
    }
}