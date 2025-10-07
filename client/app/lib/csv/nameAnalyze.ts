export function nameAnalyze(values: string[], names: Set<string>): number {
    const totalValue = values.length;
    if (totalValue === 0) return 0;

    const validNames = values.filter(value => {
        const nameParts = value.trim().split(/\s+/); 
        const result = nameParts.some(part => names.has(part.toLowerCase()));
        return result;
    });

    return (validNames.length / totalValue);
}