const API_URL = import.meta.env.VITE_API_URL;

export async function getCars() {
    const response = await fetch(`${API_URL}/cars`);

    if (!response.ok) {
        throw new Error("Unable to load cars");
    }

    return response.json();
}