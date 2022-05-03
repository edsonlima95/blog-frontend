


export function truncate(text: string, min: number, max: number): string {

    return text?.length > 10 ? text.substring(min, max) + "..." : text

}