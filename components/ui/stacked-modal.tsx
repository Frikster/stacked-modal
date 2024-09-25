import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface StackedModalProps {
  modalsOpen: number;
  children: React.ReactNode[];
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

const StackedModal: React.FC<StackedModalProps> = ({ modalsOpen, children, handleOpenModal, handleCloseModal }) => {
  return (
    <AnimatePresence>
      {modalsOpen > 0 && (
        <div className="fixed inset-0 flex items-center justify-center" onClick={handleCloseModal}>
          {children.slice(0, modalsOpen).map((modal, index) => (
            <motion.div // background animation
              key={index}
              className={`fixed inset-0 flex items-center justify-center ${
                index === 0 ? "bg-black bg-opacity-50 backdrop-blur-sm" : ""
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <motion.div // modal animation
                className="bg-white p-6 rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: index < modalsOpen-1 ? 1 : 0.8}}
                animate={{ opacity: 1, scale: index < modalsOpen-1 ? 0.8 : 1, y: index < modalsOpen-1 ? -50 : 0 }}
                exit={{ opacity: 0, scale: 0.8, y: modalsOpen > 1 ? 50 : 0, transition: { duration: 2 } }}
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