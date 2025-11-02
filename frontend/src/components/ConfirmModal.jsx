const ConfirmModal = ({ onClose, onConfirm, loading }) => {
  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete Note</h3>
        <p className="py-4">Are you sure you want to delete this note?</p>
        <div className="modal-action">
          <button
            className="btn btn-ghost"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={`btn btn-error ${loading ? "loading" : ""}`}
            onClick={onConfirm}
            disabled={loading}
          >
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmModal;