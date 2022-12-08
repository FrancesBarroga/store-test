import * as React from "react";
import {
  Button,
  Collapse,
  IconButton,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useReducer } from "react";
import {
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowUp,
} from "@mui/icons-material";
import { deleteProduct, fetchProducts } from "../actions/ProductActions";
import { CategoryTag, DeleteModal } from "../components";
import "../styles/productTable.css";

const initialState = {
  openDeleteModal: false,
  openProductModal: false,
  productsList: [],
  product: {},
  showProductDetails: false,
  selectedProduct: "",
};

const componentReducer = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        ...action.fields,
      };
    default:
      throw new Error("Invalid action type");
  }
};

function ProductTable() {
  const limit = 10;

  const [localState, localDispatch] = useReducer(
    componentReducer,
    initialState
  );

  const {
    productList,
    openDeleteModal,
    product,
    showProductDetails,
    selectedProduct,
  } = localState;

  useEffect(() => {
    fetchProducts(limit).then((response) => {
      localDispatch({
        type: "update",
        fields: {
          productList: response.data,
        },
      });
    });
  }, []);

  const onDeleteProduct = () => {
    deleteProduct(product.id).then((response) => {
      console.log("deleted:", response.data.id);
      localDispatch({
        type: "update",
        fields: {
          openDeleteModal: false,
        },
      });
      // fetch updated product list
      fetchProducts(limit).then((response) => {
        localDispatch({
          type: "update",
          fields: {
            productList: response.data,
          },
        });
      });
    });
  };

  return (
    <React.Fragment>
      <div>
        <TableContainer style={{ margin: "2rem 0" }}>
          <Table>
            <TableHead>
              <TableRow className="table-header">
                <TableCell className="header-cell">ID</TableCell>
                <TableCell className="header-cell">Book Title</TableCell>
                <TableCell className="header-cell">Category</TableCell>
                <TableCell className="header-cell">Price</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {productList?.map((item) => (
                <>
                  <TableRow key={item.id} id={`product-item-${item.id}`}>
                    <TableCell className="table-cell">
                      {item.id.toString().padStart(3, "0")}
                    </TableCell>
                    <TableCell className="table-cell">{item.title}</TableCell>
                    <TableCell className="table-cell">
                      {CategoryTag(item.category)}
                    </TableCell>
                    <TableCell className="table-cell">₱{item.price}</TableCell>
                    <TableCell>
                      <Button variant="text" color="primary">
                        Edit
                      </Button>
                      <Button
                        variant="text"
                        color="secondary"
                        onClick={() => {
                          localDispatch({
                            type: "update",
                            fields: {
                              product: item,
                              openDeleteModal: true,
                            },
                          });
                        }}
                      >
                        Delete
                      </Button>
                      <IconButton
                        onClick={() => {
                          localDispatch({
                            type: "update",
                            fields: {
                              showProductDetails: !showProductDetails,
                              selectedProduct:
                                selectedProduct === "" ? item.id : "",
                            },
                          });
                        }}
                      >
                        {showProductDetails && selectedProduct === item.id ? (
                          <KeyboardDoubleArrowUp />
                        ) : (
                          <KeyboardDoubleArrowDown />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={showProductDetails && selectedProduct === item.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <div className="details-container">
                          <div
                            className="text-container"
                            style={{ width: "60%" }}
                          >
                            <div style={{ margin: "0.5rem 0" }}>
                              Description
                            </div>
                            <div>{item.description}</div>
                          </div>
                          <div className="text-container">
                            <div style={{ margin: "0.5rem 0" }}>Rating</div>
                            <div>
                              <Rating
                                name="half-rating-read"
                                defaultValue={item.rating.rate}
                                precision={0.1}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/*Delete Modal*/}
        <DeleteModal
          open={openDeleteModal}
          id={product?.id?.toString().padStart(3, "0")}
          title={product?.title}
          onCancel={() => {
            localDispatch({
              type: "update",
              fields: {
                openDeleteModal: false,
              },
            });
          }}
          onDelete={onDeleteProduct}
        />
      </div>
    </React.Fragment>
  );
}

export default ProductTable;
