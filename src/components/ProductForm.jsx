import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

export default function ProductForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    rating: "",
    reviews: "",
    soldout: false,
    color: "",
    size: "",
    gender: "unisex",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/shoes`, formData);
      alert("상품 등록 완료!");
      if (onAdd) onAdd();
    } catch (err) {
      console.error("등록 실패:", err);
      alert("등록 실패");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>상품 등록</h3>

      {[
        { label: "이름", name: "name" },
        { label: "가격", name: "price", type: "number" },
        { label: "이미지 URL", name: "image" },
        { label: "평점", name: "rating", type: "number", step: "0.1" },
        { label: "리뷰 수", name: "reviews", type: "number" },
        { label: "색상", name: "color" },
        { label: "사이즈", name: "size" },
      ].map(({ label, name, type = "text", step }) => (
        <label key={name}>
          {label}:{" "}
          <input
            name={name}
            type={type}
            step={step}
            value={formData[name]}
            onChange={handleChange}
            required={["name", "price", "image"].includes(name)}
          />
        </label>
      ))}

      <label>
        성별:
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="unisex">Unisex</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>

      <label>
        품절:
        <input
          type="checkbox"
          name="soldout"
          checked={formData.soldout}
          onChange={handleChange}
        />
      </label>

      <button type="submit">등록하기</button>
    </Form>
  );
}

const Form = styled.form`
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: 14px;
  }

  input, select {
    margin-left: 8px;
    padding: 4px;
  }

  button {
    margin-top: 10px;
    padding: 6px 12px;
    background-color: black;
    color: white;
    border: none;
    cursor: pointer;
  }
`;
