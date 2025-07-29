export interface RecordBase {
    Title: string;
    Genre: string;
    Description: string;
}

export interface MovieMetadata extends Dict<any> {
    title: string;
    year: number;
    genre: string;
    director: string | undefined;
    actors: string | undefined;
    rating: number;
    votes: number;
    revenue: number | undefined;
    metascore: number | undefined;
    certificate: string | undefined;
    poster: string | undefined;
    duration: number | undefined;
    reviews: number | undefined;
    releaseDate: string | undefined
    // An important metric computed by TMDB developers based on views per day, votes per day, number of users marking it as "favorite" and "watchlist," release date, and other metrics.
    popularity: number | undefined
}

export interface Record10k extends RecordBase {
    Poster: string;
    Year: string;
    Certificate: string;
    'Duration (min)': string;
    Rating: string;
    Metascore: string;
    Director: string;
    Cast: string;
    Votes: string;
    'Review Count': string;
}

export interface RecordTop1000 extends RecordBase {
    Poster_Link: string;
    Released_Year: string;
    Certificate: string;
    Runtime: string;
    IMDB_Rating: string;
    Meta_score: string;
    Director: string;
    Star1: string;
    Star2: string;
    Star3: string;
    Star4: string;
    No_of_Votes: string;
    Gross: string;
}

export interface Record1000 extends RecordBase {
    Rank: string;
    Director: string;
    Actors: string;
    Year: string;
    'Runtime (Minutes)': string;
    Rating: string;
    Votes: string;
    'Revenue (Millions)': string;
    Metascore: string;
}

export interface Record9000 extends RecordBase {
    Release_Date: string
    Popularity: string
    Vote_Count: string
    Vote_Average: string
    Original_Language: string
    Poster_Url: string
}
