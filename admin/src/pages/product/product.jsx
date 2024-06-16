import React, { useEffect, useMemo, useState } from 'react';
import './product.css';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Chart from '../../components/chart/Chart';
import { Publish } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { userRequest } from '../../requestMethods';
import { updateProducts } from '../../redux/apiCalls';

const Product = () => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState(' ');
  const [name, setName] = useState(' ');
  const [desc,setDesc]  =useState(' ')

  const pro = { title: name, price: price ,desc:desc};
  const handleClick = (e) => {
    e.preventDefault();
    updateProducts(productId, pro, dispatch);
    
   
  };
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const [pStats, setPStats] = useState([]);
  const MONTH = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Nov',
      'Dec',
    ],
    []
  );
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get('orders/income?paid=' + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTH[item._id - 1], Sales: item.total },
          ])
        );
      } catch (error) {}
    };
    getStats();
  }, [MONTH, productId]);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newProduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Perfomance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg " />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfovalue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfovalue">5432</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfovalue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label> Product Name</label>
            <input
              type="text"
              className=""
              placeholder={product.title}
              onChange={(e) => setName(e.target.value)}
            />
            <label>In Description</label>
            <input type="text" className="" placeholder={product.desc} 
            onChange={(e)=>setDesc(e.target.value)}
            />
            <label>In price</label>
            <input
              type="text"
              className=""
              placeholder={product.price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label>In Stack</label>
            <select name="inStock" id="idStock">
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: 'none' }} />
            </div>
            <button className="productButton" onClick={(e) => handleClick(e)}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
