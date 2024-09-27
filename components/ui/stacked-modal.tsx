import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";

interface StackedModalProps {
  modalsOpen: number;
  children: React.ReactNode[];
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

// This comment was added automatically using AI!
const StackedModal: React.FC<StackedModalProps> = ({ modalsOpen, children, handleOpenModal, handleCloseModal }) => {
    const modalRefs = useRef<(HTMLDivElement | null)[]>([]);
    // top property of the first modal - all stacked modals are aligned to this
    const [modalTop, setModalTop] = useState<number | undefined>();
    const [modalHeights, setModalHeights] = useState<number[]>([]);

    useEffect(() => {
        const handleWindowResize = () => {
            handleCloseModal();
            updateModalTopAndHeights();
        }
        const updateModalTopAndHeights = () => {
            setModalTop(modalRefs.current[0]?.offsetTop);
            const heights = modalRefs.current.map(ref => ref?.offsetHeight || 0);
            setModalHeights(heights);
        };
        updateModalTopAndHeights();
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [modalsOpen]);

    return (
        <AnimatePresence>
            {modalsOpen > 0 && (
                <div onClick={handleCloseModal}>
                    {children.slice(0, modalsOpen).map((modal, index) => {
                        const isCoveredModal = index < modalsOpen - 1;
                        const originalHeight = modalHeights[index] || 0;
                        const scaledHeight = originalHeight * (isCoveredModal ? 0.9 : 1);
                        const heightDifference = originalHeight - scaledHeight;

                        return (
                            <motion.div
                                key={index}
                                className={`fixed inset-0 flex justify-center ${
                                    index === 0 ? "items-center bg-black bg-opacity-50 backdrop-blur-sm" : "items-start"
                                }`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                            >
                                <motion.div
                                    ref={el => { modalRefs.current[index] = el; }}
                                    className="bg-white p-6 rounded-lg shadow-lg border border-gray-300"
                                    onClick={(e) => e.stopPropagation()}
                                    initial={{ 
                                        translateY: index > 0 ? modalTop : 0,
                                        opacity: 0,
                                        scale: isCoveredModal ? 1 : 0.9,
                                        y: index > 0 ? 100 : 0
                                    }}
                                    animate={{ 
                                        opacity: 1, 
                                        scale: isCoveredModal ? 0.9 : 1,
                                        y: -5 * (modalsOpen - 1 - index) - heightDifference,
                                        backgroundColor: isCoveredModal ? '#e0e0e0' : 'white',
                                        transition: { duration: 0.2 }
                                    }}
                                    exit={{ 
                                        opacity: 0,
                                        scale: 0.9,
                                        y: index > 0 ? 100 : 0,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    {modal}
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </AnimatePresence>
    );
};

export default StackedModal;