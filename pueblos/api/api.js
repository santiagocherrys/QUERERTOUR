import { urlPueblos } from "./url.js";


export async function getTowns() {
    const response = await fetch(urlPueblos);
    const towns = await response.json();

    return towns;
}