import React, { useEffect, useState } from "react";
import Product from "../../components/product/Product";
import { useNavigate, useParams } from "react-router";
import "./Collection.scss";
import { useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";
function Collection() {
  const navigate = useNavigate();
  const params = useParams();
  const [categoryId, setCategoryId] = useState("");
  const categories = useSelector((state) => state.categoryReducer.categories);
  const [products, setProducts] = useState([]);
  const sortOptions = [
    {
      value: "Price - Low To High",
      sort: "price",
    },
    {
      value: "Newest First ",
      sort: "createdAt",
    },
  ];

  const [sortBy, setSortBy] = useState(sortOptions[0].sort);
  async function fetchProducts() {
    const url = params.categoryId
      ? `/products?populate=image&filters[category][key][$eq]=${params.categoryId}&sort=${sortBy}`
      : `/products?populate=image&sort=${sortBy}`;
    const response = await axiosClient.get(url);
    setProducts(response.data.data);
  }
  useEffect(() => {
    setCategoryId(params.categoryId);
    fetchProducts();
  }, [params, sortBy]);
  function updateCategory(e) {
    navigate(`/category/${e.target.value}`);
  }

  return (
    <div className="Categories">
      <div className="container">
        <div className="header">
          <div className="info">
            <h2>Explore All Print and Artwork</h2>
            <p>
              India's largest collection of wall posters for your bedroom,living
              room,kids room,kitchen and posters & art points at highest quality
              lowest price
            </p>
          </div>
          <div className="sort-by">
            <div className="sort-by-container">
              <h3 className="sort-by-text">Sort By</h3>
              <select
                className="select-sort-by"
                name="sort-by"
                id="sort-by"
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((item) => (
                  <option key={item.sort} value={item.sort}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="filter-box">
            <div className="category-filter">
              <h3>Category</h3>
              {categories.map((item) => (
                <div key={item.id} className="filter-radio">
                  <input
                    name="category"
                    type="radio"
                    value={item.attributes.key}
                    id={item.id}
                    onChange={updateCategory}
                    checked={item.attributes.key === categoryId}
                  />
                  <label htmlFor={item.id}>{item.attributes.title}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="products-box">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;

//e685d8b3617ffea412d752a22f99f2590a8e737e5689871007117fde20827201a2fe817cf17235f7bca2251d16c01fce8b5542222b83cc24bdbbaf118f83819aab9815730ec251073492b8bbbcf6fbb253eed4efb50bc82a5620a6312bcc926e172ba369bc553ab1127ff5c7d98d1efb83a98d318981bcbdcc26dbf46ccd1077
