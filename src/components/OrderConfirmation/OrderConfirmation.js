import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

function OrderConfirmation() {
  const { cartData } = useSelector((state) => state.cartSlice);
  const { productData, userData } = cartData;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    Object.keys(productData).length === 0 && navigate("/");
  }, [productData, navigate]);

  return (
    <div
      style={{ marginTop: "2em", marginBottom: "2em" }}
      className="flex flex-col flex-center-main flex-center-cross"
    >
      <Title>Yaay! Order Confirmed</Title>
      <Button
        style={{ marginTop: "2em" }}
        type="primary"
        size="large"
        onClick={() => navigate("/")}
      >
        Redirect to Home
      </Button>
      <div className="fw-3-4 flex flex-col" style={{ marginTop: "2em" }}>
        <div className="flex flex-row flex-main-justify">
          <div style={{ width: "40%" }}>
            <Card
              style={{
                width: 300,
                cursor: "pointer",
                border: "1px solid rgb(189, 195, 199)",
                borderRadius: "20px",
              }}
              cover={<img alt="thumbnail" src={productData?.strMealThumb} />}
              bordered
            >
              <Title level={4}>{productData?.strMeal}</Title>
              <Paragraph level={4}>{productData?.strCategory}</Paragraph>
            </Card>
          </div>
          <div style={{ width: "50%" }}>
            <Card
              style={{
                cursor: "pointer",
                border: "1px solid rgb(189, 195, 199)",
                borderRadius: "10px",
              }}
              bordered
            >
              <Title style={{ borderBottom: "1px solid black" }} level={3}>
                Order Information
              </Title>

              <Title level={4}>Contact Details</Title>
              <Title level={2}>{userData?.name}</Title>
              <Paragraph level={4}>{userData?.email}</Paragraph>
              <Paragraph level={4}>{userData?.mobile}</Paragraph>
              <Title style={{ marginTop: "2m" }} level={4}>
                Shipping Details
              </Title>
              <Paragraph level={4}>{userData?.address1}</Paragraph>
              <Paragraph level={4}>{userData?.address2}</Paragraph>
              <Paragraph level={4}>{userData?.city}</Paragraph>
              <Paragraph level={4}>{userData?.country}</Paragraph>
              <Paragraph level={4}>{userData?.pincode}</Paragraph>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
