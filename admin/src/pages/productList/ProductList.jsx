import React, { useEffect } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import './productList.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProducts, getProducts } from '../../redux/apiCalls';





const ProductList = () => {
  const dispatch = useDispatch();
  const products =useSelector((state)=>state.product.products)

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);
  
 
  const handleDelete = (id) => {

   deleteProducts(dispatch,id)
  };
  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    {
      field: 'product',
      headerName: 'product',
      width:110,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: 'inStock', headerName: 'Stock', width: 60 },
   
    {
      field: 'price',
      headerName: 'Price ',
      width: 60,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/product/' + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableRowSelectionOnClick
        columns={columns}
        getRowId={(row)=>row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
        checkboxSelection
      />
    </div>
  );
};

export default ProductList;
