import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from 'app/api';
import { Gallery } from "@/types/gallery";

const useGalleryData = () => {
    const [galleryData, setGalleryData] = useState<Gallery[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGalleryData = async () => {
            try {
                setLoading(true);
                const response = await axios.get<{ data: Gallery[] }>(`${BASE_URL}/gallery/all`);
                setGalleryData(response.data.data);
            } catch (err) {
                const error = err as AxiosError;
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGalleryData();
    }, []);

    return { galleryData, loading, error };
};

export default useGalleryData;
