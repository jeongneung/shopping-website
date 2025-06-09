import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import ProductCard from "./components/ProductCard";
import Header from "./components/Header";
import ProductForm from "./components/ProductForm";
import EditProductModal from "./components/EditProductModal";

const SORT_OPTIONS = [
  { label: "홈", value: "home" },
  { label: "높은 가격순", value: "high" },
  { label: "낮은 가격순", value: "low" },
];

export default function App() {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("home");
  const [editingProduct, setEditingProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get(" https://shopping-website-server.onrender.com/shoes");
      let data = res.data;

      if (sortOption === "high") {
        data.sort((a, b) => b.price - a.price);
      } else if (sortOption === "low") {
        data.sort((a, b) => a.price - b.price);
      }

      setProducts(data);
    } catch (err) {
      console.error("상품 불러오기 실패:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(` https://shopping-website-server.onrender.com/shoes/${id}`);
      fetchData();
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제 실패");
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortOption]);

  const selectedLabel = SORT_OPTIONS.find((opt) => opt.value === sortOption).label;

  return (
    <>
      <Header />
      <Wrapper>
        <Title>AirForce</Title>

        <ProductForm onAdd={fetchData} />

        <SortWrapper>
          <DropdownHeader onClick={() => setIsOpen(!isOpen)}>
            {selectedLabel}
          </DropdownHeader>
          {isOpen && (
            <DropdownList>
              {SORT_OPTIONS.map((option) => (
                <DropdownItem
                  key={option.value}
                  onClick={() => {
                    setSortOption(option.value);
                    setIsOpen(false);
                  }}
                  selected={option.value === sortOption}
                >
                  {option.label}
                  {option.value === sortOption && <Check>✔</Check>}
                </DropdownItem>
              ))}
            </DropdownList>
          )}
        </SortWrapper>

        <ProductList>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onDelete={handleDelete}
              onEdit={() => setEditingProduct(product)}
            />
          ))}
        </ProductList>

        {editingProduct && (
          <EditProductModal
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onUpdate={() => {
              fetchData();
              setEditingProduct(null);
            }}
          />
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  padding: 24px;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const SortWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  cursor: pointer;
`;

const DropdownHeader = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #1c1b1a;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 180px;
  padding: 8px 0;
  z-index: 100;
`;

const DropdownItem = styled.li`
  list-style: none;
  padding: 10px 16px;
  font-size: 14px;
  color: ${({ selected }) => (selected ? "#000" : "#555")};
  background-color: ${({ selected }) => (selected ? "#f5f5f5" : "white")};
  display: flex;
  justify-content: space-between;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Check = styled.span`
  color: black;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
