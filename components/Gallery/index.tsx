'use client';

import React from "react";
import useGalleryData from './useGalleryData';
import { motion, AnimatePresence } from "framer-motion";

interface GalleryComponentProps {
    category: string;
}

const GalleryComponent: React.FC<GalleryComponentProps> = ({ category }) => {
    const { galleryData, loading, error } = useGalleryData();

    if (loading) {
        return (
            <AnimatePresence>
                <motion.div
                    key="loader"
                    className="flex justify-center items-center text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                ><div className="text-4xl font-bold">Loading...</div>
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
        <div className="gallery-container py-5 px-5 w-full min-h-screen">
            <div id="gallery" className="container-fluid">
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
                            className="img-item"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 * Number(item.id) }}
                            viewport={{ once: true }}
                        >
                            <div className="img-wrapper relative">
                                {
                                    item.media ? (
                                        item.media.endsWith('.mp4') || item.media.endsWith('.mov') || item.media.endsWith('.avi') || item.media.endsWith('.wmv') ? (
                                            <video
                                                src={item.media}
                                                className="video-responsive w-full h-auto mx-auto shadow-[0_0px_5px_0_rgba(0,0,0,1)] cursor-pointer transition-all duration-200"
                                                controls
                                                alt={item.title}
                                            >
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : (
                                                <img
                                                    src={item.media}
                                                    className="img-responsive w-full h-auto mx-auto shadow-[0_0px_5px_0_rgba(0,0,0,1)] cursor-pointer transition-all duration-200"
                                                    alt={item.title}
                                                />
                                            )
                                    ) : (
                                            <p>No media available!</p>
                                        )
                                }
                                <div className="img-label absolute bottom-0 left-0 w-full bg-white dark:bg-blacksection shadow-[0_0px_5px_0_rgba(0,0,0,1)] px-2 py-2 text-start text-black dark:text-white text-sm leading-3.5">
                                    {item.title}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default GalleryComponent;
