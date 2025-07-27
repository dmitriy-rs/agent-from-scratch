export function toNumber(v: string) {
    return Number(v.replaceAll(',', ''));
}

export function toMillions(v: string) {
    return Number((toNumber(v) / 1_000_000).toFixed(2));
}
