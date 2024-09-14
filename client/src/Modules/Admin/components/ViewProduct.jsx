import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Snackbar, MenuItem, Select, FormControl, InputLabel, IconButton } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [alert, setAlert] = useState({ open: false, severity: '', message: '' });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSubcategories();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:5002/api/Product/GetAllProducts')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        const errorMessage = error.response ? error.response.data.message : error.message;
        console.error("There was an error fetching the products!", errorMessage);
        setAlert({ open: true, severity: 'error', message: errorMessage });
      });
  };

  const fetchCategories = () => {
    axios.get('http://localhost:5002/api/Category/GetCategory')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the categories!", error);
      });
  };

  const fetchSubcategories = () => {
    axios.get('http://localhost:5002/api/SubCategory/GetSubcategories')
      .then(response => {
        setSubcategories(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the subcategories!", error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5002/api/Product/DeleteProduct/${id}`)
      .then(response => {
        fetchProducts();
        setAlert({ open: true, severity: 'success', message: 'Product deleted successfully!' });
      })
      .catch(error => {
        console.error("There was an error deleting the product!", error);
        setAlert({ open: true, severity: 'error', message: 'Failed to delete product!' });
      });
  };

  const handleEditClickOpen = (product) => {
    setEditProduct(product);
    setOpen(true);
  };

  const handleEditClose = () => {
    setOpen(false);
    setEditProduct(null);
  };

  const handleEditSave = () => {
    axios.patch(`http://localhost:5002/api/Product/UpdateProduct/${editProduct._id}`, editProduct)
      .then(response => {
        fetchProducts();
        handleEditClose();
        setAlert({ open: true, severity: 'success', message: 'Product updated successfully!' });
      })
      .catch(error => {
        console.error("There was an error updating the product!", error);
        setAlert({ open: true, severity: 'error', message: 'Failed to update product!' });
      });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({
      ...editProduct,
      [name]: value
    });
  };

  const handleAlertClose = () => {
    setAlert({ open: false, severity: '', message: '' });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
      <TableHead>
  <TableRow>
    <TableCell
      sx={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: '#19334d', // Coffee brown color
        borderBottom: '2px solid #19334d', // Adds a border for visual separation
        whiteSpace: 'nowrap', // Prevents text from wrapping
        overflow: 'hidden', // Hides any overflow
        textOverflow: 'ellipsis' // Adds ellipsis if text overflows
      }}
    >
      Product Name
    </TableCell>
    <TableCell
      sx={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: '#19334d',
        borderBottom: '2px solid #19334d',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
    >
      Description
    </TableCell>
    <TableCell
      sx={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: '#19334d',
        borderBottom: '2px solid #19334d',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
    >
      Date
    </TableCell>
    <TableCell
      sx={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: '#19334d',
        borderBottom: '2px solid #19334d',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
    >
      Image
    </TableCell>
    <TableCell
      sx={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: '#19334d',
        borderBottom: '2px solid #19334d',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
    >
      Category
    </TableCell>
    <TableCell
      sx={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: '#19334d',
        borderBottom: '2px solid #19334d',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
    >
      Subcategory
    </TableCell>
    <TableCell
      sx={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: '#19334d',
        borderBottom: '2px solid #19334d',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
    >
      Amount
    </TableCell>
    <TableCell
      sx={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: '#19334d',
        borderBottom: '2px solid #19334d',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
    >
      Actions
    </TableCell>
  </TableRow>
</TableHead>

        <TableBody>
          {products.map(product => (
            <TableRow key={product._id}>
              <TableCell>{product.product_name}</TableCell>
              <TableCell style={{textAlign:'justify'}}>{product.product_description}</TableCell>
              <TableCell>{new Date(product.product_date).toLocaleDateString()}</TableCell>
              <TableCell><img src={`http://localhost:5002/api/image/${product.product_image}`} alt={product.product_name} style={{ width: 50, height: 50 }} /></TableCell>
              <TableCell>{product.category?.category_name || 'N/A'}</TableCell>
              <TableCell>{product.subcategory?.subcategory_name || 'N/A'}</TableCell>
              <TableCell>{product.amount || 'N/A'}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleEditClickOpen(product)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDelete(product._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleEditClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please update the necessary fields and save the changes.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="product_name"
            label="Product Name"
            type="text"
            fullWidth
            value={editProduct?.product_name || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="product_description"
            label="Product Description"
            type="text"
            fullWidth
            value={editProduct?.product_description || ''}
            onChange={handleEditChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={editProduct?.category?._id || ''}
              onChange={handleEditChange}
            >
              {categories.map(category => (
                <MenuItem key={category._id} value={category._id}>
                  {category.category_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Subcategory</InputLabel>
            <Select
              name="subcategory"
              value={editProduct?.subcategory?._id || ''}
              onChange={handleEditChange}
            >
              {subcategories.map(subcategory => (
                <MenuItem key={subcategory._id} value={subcategory._id}>
                  {subcategory.subcategory_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="amount"
            label="Amount"
            type="number"
            fullWidth
            value={editProduct?.amount || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="actual_size"
            label="Actual Size"
            type="text"
            fullWidth
            value={editProduct?.actual_size || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="filter_size"
            label="Filter Size"
            type="text"
            fullWidth
            value={editProduct?.filter_size || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="material_type"
            label="Material Type"
            type="text"
            fullWidth
            value={editProduct?.material_type || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="sink_type"
            label="Sink Type"
            type="text"
            fullWidth
            value={editProduct?.sink_type || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="finish"
            label="Finish"
            type="text"
            fullWidth
            value={editProduct?.finish || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="applications"
            label="Applications"
            type="text"
            fullWidth
            value={editProduct?.applications || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="quality"
            label="Quality"
            type="text"
            fullWidth
            value={editProduct?.quality || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="coverage_area"
            label="Coverage Area"
            type="text"
            fullWidth
            value={editProduct?.coverage_area || ''}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </TableContainer>
  );
};

export default ViewProduct;
