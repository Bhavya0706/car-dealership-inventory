const API_URL = import.meta.env.VITE_API_URL;

export async function getCars(filters = {}) {
    const query = new URLSearchParams();

    if (filters.search?.trim()) {
        query.append("search", filters.search.trim());
    }

    if (filters.category) {
        query.append("category", filters.category);
    }

    if (filters.minPrice != null && filters.minPrice !== "") {
        query.append("minPrice", filters.minPrice);
    }
    
    if (filters.maxPrice != null && filters.maxPrice !== "") {
        query.append("maxPrice", filters.maxPrice);
    }

    const queryString = query.toString();

    const url = queryString
        ? `${API_URL}/cars/search?${queryString}`
        : `${API_URL}/cars`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
        const validationMessage = data.errors
            ?.map((error) => error.msg)
            .join(", ");

        throw new Error(
            validationMessage ||
            data.message ||
            "Unable to load cars"
        );
    }

    return data;
}