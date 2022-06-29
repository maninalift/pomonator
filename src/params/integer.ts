//import ParamsMatcher from "@sveltejs/kit"

export function match(param: string) {
    return /^\d+$/.test(param)
}