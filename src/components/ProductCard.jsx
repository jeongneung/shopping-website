import styled from "styled-components";

export default function ProductCard({ id, name, price, image, color, soldout, onDelete, onEdit }) {
  return (
    <Card>
      <ProductImage src={image} alt={name} />
      <ProductName>{name}</ProductName>
      <SoldOut>{soldout ? "품절" : "재고 있음"}</SoldOut>
      <ColorText>색상: {color}</ColorText>
      <ProductPrice>{price.toLocaleString()}원</ProductPrice>
      <ButtonGroup>
        <DeleteButton onClick={() => onDelete(id)}>삭제</DeleteButton>
        <EditButton onClick={onEdit}>수정</EditButton>
      </ButtonGroup>
    </Card>
  );
}

const Card = styled.div`
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  width: 240px;
  margin: 12px;
  padding: 12px;
  text-align: left;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const ProductImage = styled.img`
  width: 100%;
  border-radius: 6px;
`;

const ProductName = styled.h3`
  font-size: 14px;
  margin: 10px 0 5px;
  color: black;
`;

const SoldOut = styled.p`
  font-size: 12px;
  color: ${props => (props.children === "품절" ? "#ff4d4f" : "#2ecc71")};
  font-weight: bold;
  margin: 4px 0;
`;

const ColorText = styled.p`
  font-size: 12px;
  color: #666;
  margin: 4px 0;
`;

const ProductPrice = styled.p`
  font-size: 13px;
  font-weight: 700;
  color: rgb(34, 34, 34);
  margin-top: 6px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: crimson;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const EditButton = styled.button`
  padding: 5px 10px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
