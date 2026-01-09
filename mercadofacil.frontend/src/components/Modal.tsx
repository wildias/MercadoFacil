import React from 'react';
import '../styles/Modal.css';

export type ModalType = 'sucesso' | 'atencao' | 'erro' | 'pergunta';

interface ModalProps {
  isOpen: boolean;
  type: ModalType;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, type, message, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const getTitle = () => {
    switch (type) {
      case 'sucesso':
        return 'Sucesso';
      case 'atencao':
        return 'Atenção';
      case 'erro':
        return 'Erro';
      case 'pergunta':
        return 'Pergunta';
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={type !== 'pergunta' ? onClose : undefined}>
      <div className={`modal-container modal-${type}`} onClick={(e) => e.stopPropagation()}>
        <div className={`modal-header modal-header-${type}`}>
          <h2>{getTitle()}</h2>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          {type === 'pergunta' ? (
            <>
              <button className="modal-btn modal-btn-sim" onClick={handleConfirm}>
                <span className="icon-check">✓</span> Sim
              </button>
              <button className="modal-btn modal-btn-nao" onClick={onClose}>
                <span className="icon-x">✕</span> Não
              </button>
            </>
          ) : (
            <button className="modal-btn modal-btn-fechar" onClick={onClose}>
              Fechar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
