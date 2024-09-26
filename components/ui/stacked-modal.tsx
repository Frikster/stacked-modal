import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";

interface StackedModalProps {
  modalsOpen: number;
  children: React.ReactNode[];
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

const StackedModal: React.FC<StackedModalProps> = ({ modalsOpen, children, handleOpenModal, handleCloseModal }) => {
    const modalRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [modalSizes, setModalSizes] = useState<number[]>([]);
    const [modalTops, setModalTops] = useState<number[]>([]);
  
    useEffect(() => {
      const tops = modalRefs.current.map(modal => modal ? modal.offsetTop : 0);
      const sizes = modalRefs.current.map(modal => modal ? modal.offsetWidth : 0);
      setModalSizes(sizes);
      setModalTops(tops);
    }, [modalsOpen]);

  return (
    <AnimatePresence>
      {modalsOpen > 0 && (
        <div onClick={handleCloseModal}>
          {children.slice(0, modalsOpen).map((modal, index) => (
            <motion.div // background animation
              key={index}
              className={`fixed inset-0 flex justify-center ${
                index === 0 ? "items-center bg-black bg-opacity-50 backdrop-blur-sm" : "items-start"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <motion.div // modal animation
                ref={el => { modalRefs.current[index] = el; }}
                className="bg-white p-6 rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: index < modalsOpen-1 ? 1 : 0.9, y: index > 0 ? 50 : 0, translateY: index > 0 ? modalTops[0] : 0}}
                animate={{ opacity: 1, scale: index < modalsOpen-1 ? 0.9 : 1, y: index < modalsOpen-1 ? -10*modalsOpen : 0, 
                    transition: { duration: index > 0 ? 0.5 : 0.2 } }}
                exit={{ opacity: 0, scale: 0.8, y: index > 0 ? 50 : 0,
                     transition: { duration: 0.2 } }}
              >
                {modal}
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export default StackedModal;