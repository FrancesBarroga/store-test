import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import "../styles/deleteModal.css";

function DeleteModal({ open, id, title, onCancel, onDelete }) {
  return (
    <Dialog open={open}>
      <DialogContent className="dialog-content">
        <div style={{ margin: "1rem 0" }}>
          <DeleteForever />
        </div>

        <div className="modal-title">You are about to delete a product</div>
        <div className="modal-msg">
          Are you sure you want to delete {id}: {title}
        </div>
      </DialogContent>
      <DialogActions style={{ padding: "1.5rem" }}>
        <Button
          id="dialog-box-cancel"
          variant="outlined"
          size="large"
          color="secondary"
          type="button"
          onClick={onCancel}
          className="modal-btn"
        >
          Cancel
        </Button>
        <Button
          id="logout-btn"
          variant="contained"
          size="large"
          color="primary"
          type="button"
          onClick={onDelete}
          style={{ marginLeft: "1.5rem" }}
          className="modal-btn"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteModal;
