import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Radio,
  Rating,
} from "@mui/material";
import {
  Close,
  LocalHospitalOutlined,
  ModeOutlined,
} from "@mui/icons-material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import "../styles/productModal.css";
import { useEffect, useReducer } from "react";

const initialState = {
  title: "",
  price: "",
  description: "",
  category: "",
  rating: "",
};

const componentReducer = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        ...action.fields,
      };
    case "reset":
      return {
        ...initialState,
      };
    default:
      throw new Error("Invalid action type");
  }
};

function ProductModal({ open, onClose, item, onSubmit, type, id }) {
  const [localState, localDispatch] = useReducer(
    componentReducer,
    initialState
  );

  const { title, price, description, rating, category } = localState;

  useEffect(() => {
    if (type === "edit") {
      localDispatch({
        type: "update",
        fields: {
          title: item.title,
          price: item.price,
          description: item.description,
          category: item.category,
          rating: item.rating.rate,
        },
      });
    } else {
      localDispatch({
        type: "reset",
      });
    }
  }, [item, type]);

  const onUpdateField = ({ target: { name, value } }) => {
    localDispatch({
      type: "update",
      fields: {
        [name]: value,
      },
    });
  };

  const handleSubmitForm = () => {
    const data = {
      title,
      price,
      description,
      rating,
      category,
    };
    onSubmit(data);
  };

  const handleChange = (event) => {
    localDispatch({
      type: "update",
      fields: {
        category: event.target.value,
      },
    });
  };

  return (
    <Dialog open={open} scroll="paper" className="view-modal-container">
      <ValidatorForm onSubmit={handleSubmitForm}>
        <DialogTitle className="dialog-title">
          <div className="dialog-title-container">
            <div id={`view-title-${item}`} className="modal-title">
              {type === "create" ? <LocalHospitalOutlined /> : <ModeOutlined />}
            </div>
            <div>
              <IconButton
                id="close-icon-btn"
                disableRipple
                onClick={onClose}
                className="dialog-close-btn"
              >
                <Close />
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        <DialogContent dividers style={{ paddingBottom: "3rem" }}>
          <div>
            <Grid container columnSpacing={4} item xs={10}>
              <Grid item xs={12} sm={6}>
                <div className="field-container">
                  <div className="label">ID</div>
                  <TextValidator
                    id="id-input"
                    fullWidth
                    variant="outlined"
                    onChange={onUpdateField}
                    name="id"
                    type="text"
                    disabled
                    value={id}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="field-container">
                  <div className="label">Book Title</div>
                  <TextValidator
                    id="title-input"
                    fullWidth
                    variant="outlined"
                    onChange={onUpdateField}
                    name="title"
                    type="text"
                    value={title}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="field-container">
                  <div className="label">Price</div>
                  <TextValidator
                    id="price-input"
                    fullWidth
                    variant="outlined"
                    onChange={onUpdateField}
                    name="price"
                    type="text"
                    value={price}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12}>
                <div className="field-container">
                  <div className="label">Description</div>
                  <TextValidator
                    id="description-input"
                    fullWidth
                    variant="outlined"
                    onChange={onUpdateField}
                    name="description"
                    type="text"
                    placeholder="Brief description about the product"
                    value={description}
                    multiline
                    rows={5}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12}>
                <div className="field-container">
                  <div className="label">Category</div>
                  <div className="category-list">
                    <div>
                      <Radio
                        checked={category === `men's clothing`}
                        onChange={handleChange}
                        value={`men's clothing`}
                        name="radio-buttons"
                      />
                      Men's Clothing
                    </div>
                    <div>
                      <Radio
                        checked={category === "jewelery"}
                        onChange={handleChange}
                        value="jewelery"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "B" }}
                      />
                      Jewelery
                    </div>
                    <div>
                      <Radio
                        checked={category === "electronics"}
                        onChange={handleChange}
                        value="electronics"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "B" }}
                      />
                      Electronics
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={12}>
                <div className="field-container">
                  <div className="label">Rating</div>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                      localDispatch({
                        type: "update",
                        fields: {
                          rating: newValue,
                        },
                      });
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions style={{ padding: "1.5rem" }}>
          <Button
            id="dialog-box-cancel"
            variant="outlined"
            size="large"
            color="secondary"
            type="button"
            onClick={onClose}
            className="modal-btn"
          >
            Cancel
          </Button>
          <Button
            id="logout-btn"
            variant="contained"
            size="large"
            color="primary"
            type="submit"
            style={{ marginLeft: "1.5rem" }}
            className="modal-btn"
          >
            {type === "create" ? "Add" : "Edit"}
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}

export default ProductModal;
