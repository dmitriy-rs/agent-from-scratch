export interface Score {
    name: string;
    score: number;
}

export interface Run {
    input: string;
    output: {
        role: string;
        content: string | null;
        tool_calls?: any[];
        refusal: null;
    };
    expected: any;
    scores: Score[];
    createdAt: string;
}

export interface Set {
    runs: Run[];
    score: number;
    createdAt: string;
}

export interface Experiment {
    name: string;
    sets: Set[];
}

export interface Results {
    experiments: Experiment[];
}
