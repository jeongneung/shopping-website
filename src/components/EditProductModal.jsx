import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

export default function EditProductModal({ product, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    color: product.color,
    soldout: product.soldout,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(` https://shopping-website-server.onrender.com/shoes/${product.id}`, formData);
      alert("수정 완료!");
      onUpdate();
      onClose();
    } catch (err) {
      console.error("수정 실패:", err);
      alert("수정 실패");
    }
  };

  return (
    <Overlay>
      <Modal>
        <h3>상품 수정</h3>
        <form onSubmit={handleSubmit}>
          <FormRow>
            <Label>이름</Label>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </FormRow>

          <FormRow>
            <Label>가격</Label>
            <Input name="price" type="number" value={formData.price} onChange={handleChange} />
          </FormRow>

          <FormRow>
            <Label>색상</Label>
            <Input name="color" value={formData.color} onChange={handleChange} />
          </FormRow>

          <FormRow>
            <Label>
              <input
                type="checkbox"
                name="soldout"
                checked={formData.soldout}
                onChange={handleChange}
              />
              품절 여부
            </Label>
          </FormRow>

          <ButtonGroup>
            <Button type="submit">저장</Button>
            <Button type="button" cancel="true" onClick={onClose}>취소</Button>
          </ButtonGroup>
        </form>
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
`;

const Button = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: ${({ cancel }) => (cancel ? "#ccc" : "#000")};
  color: white;
  cursor: pointer;
`;
