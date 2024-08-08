'use client';

import React, { useState, useEffect } from "react";
import useGalleryData from './useGalleryData';
import { motion, AnimatePresence } from "framer-motion";

interface GalleryComponentProps {
    category: string;
}

const GalleryComponent: React.FC<GalleryComponentProps> = ({ category }) => {
    const { galleryData, loading, error } = useGalleryData();
    const [selectedItem, setSelectedItem] = useState<{ media: string; title: string } | null>(null);

    const handleImageClick = (item: { media: string; title: string }) => {
        setSelectedItem(item);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    // Effect to manage body class for overflow
    useEffect(() => {
        if (selectedItem) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [selectedItem]);

    if (loading) {
        return (
            <AnimatePresence>
                <motion.div
                    key="loader"
                    className="flex justify-center items-center text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="text-4xl font-bold">Loading...</div>
                </motion.div>
            </AnimatePresence>
        );
    }

    if (error) {
        return (
            <AnimatePresence>
                <motion.div
                    key="error"
                    className="flex justify-center items-center text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="text-4xl font-bold text-red-500">Error: {error}</div>
                </motion.div>
            </AnimatePresence>
        );
    }

    const filteredData = galleryData.filter(item => item.category === category);

    if (!Array.isArray(filteredData) || filteredData.length === 0) {
        return (
            <AnimatePresence>
                <motion.div
                    key="no-data"
                    className="flex justify-center items-center text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="text-4xl font-bold">Oops! Data not available.</div>
                </motion.div>
            </AnimatePresence>
        );
    }

    return (
        <div className="gallery-container py-5 px-5 w-full">
            <div id="gallery" className={`container-fluid ${selectedItem ? 'blur-sm' : ''}`}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: { opacity: 1, y: 0 },
                    }}
                >
                    {filteredData.map((item) => (
                        <motion.div
                            key={item.id}
                            className="relative mb-14"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 * Number(item.id) }}
                            viewport={{ once: true }}
                        >
                            <div className="img-wrapper">
                                {item.media ? (
                                    item.media.endsWith('.mp4') ||
                                        item.media.endsWith('.mov') ||
                                        item.media.endsWith('.avi') ||
                                        item.media.endsWith('.wmv') ? (
                                            <video
                                                src={item.media}
                                                className="w-full h-auto mx-auto shadow-md cursor-pointer transition-all duration-200"
                                                controls
                                            >
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : (
                                            <img
                                                src={item.media}
                                                className="w-full h-auto mx-auto shadow-md cursor-pointer transition-all duration-200"
                                                alt={item.title}
                                                onClick={() => handleImageClick(item)}
                                            />
                                        )
                                ) : (
                                    <p>No media available!</p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseModal}
                    >
                        <div className="relative bg-white dark:bg-blacksection p-2 rounded-lg shadow-lg max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                            <button
                                className="absolute top-2 right-2 text-red-500 text-2xl"
                                onClick={handleCloseModal}
                            >
                                &times;
                            </button>
                            {selectedItem.media.endsWith('.mp4') ||
                            selectedItem.media.endsWith('.mov') ||
                            selectedItem.media.endsWith('.avi') ||
                            selectedItem.media.endsWith('.wmv') ? (
                                <video
                                    src={selectedItem.media}
                                    className="max-w-full max-h-[80vh] rounded-sm"
                                    controls
                                >
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <img
                                    src={selectedItem.media}
                                    className="max-w-full mx-auto max-h-[60vh] rounded-sm"
                                    alt={selectedItem.title}
                                />
                            )}
                            <h2 className="mt-4 text-lg font-bold text-center">
                                {selectedItem.title}
                            </h2>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GalleryComponent;
