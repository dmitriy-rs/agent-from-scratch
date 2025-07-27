export interface RecordBase {
    Title: string;
    Genre: string;
    Description: string;
}

export interface MovieMetadata extends Dict<any> {
    title: string;
    year: number;
    genre: string;
    director: string;
    actors: string;
    rating: number;
    votes: number;
    revenue: number | undefined;
    metascore: number;
    certificate: string | undefined;
    poster: string | undefined;
    duration: number;
    reviews: number | undefined;
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

export interface RecordMovie2023 {}
