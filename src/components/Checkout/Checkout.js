import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Typography, Form, Input, Button, message } from "antd";
import { getUserData } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

function Checkout() {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartData } = useSelector((state) => state.cartSlice);
  const { productData, loading } = cartData;
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 12,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  useEffect(() => {
    Object.keys(productData).length === 0 && navigate("/");
  }, [productData, navigate]);

  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    mobile: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    pincode: "",
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setFormDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleCheckout = () => {
    if (
      formDetails.name &&
      formDetails.email &&
      formDetails.mobile &&
      formDetails.address1 &&
      formDetails.address2 &&
      formDetails.city &&
      formDetails.country &&
      formDetails.pincode
    ) {
      dispatch(getUserData(formDetails));
      navigate("/order-confirmed");
    } else {
      message.warning("Please fill all the fields");
    }
  };

  return (
    <>
      {!loading && productData ? (
        <div className="flex flex-col flex-center-main flex-center-cross">
          <Title
            level={3}
            style={{
              margin: "1em 0 1em 0",
              borderBottom: "3px solid #000",
              paddingBottom: "0.25em",
            }}
          >
            Checkout
          </Title>
          <div
            className="fw-3-4 flex flex-col flex-main-justify"
            style={{ marginTop: "2em" }}
          >
            <div className="flex flex-row flex-main-justify">
              <div style={{ width: "40%" }}>
                <Title level={3} style={{ marginBottom: "2em" }}>
                  Purchase {productData?.strMeal}
                </Title>
                <Card
                  style={{
                    width: 300,
                    cursor: "pointer",
                    border: "1px solid rgb(189, 195, 199)",
                    borderRadius: "20px",
                  }}
                  cover={
                    <img alt="thumbnail" src={productData?.strMealThumb} />
                  }
                  bordered
                >
                  <Title level={4}>{productData?.strMeal}</Title>
                  <Paragraph level={4}>{productData?.strCategory}</Paragraph>
                </Card>
              </div>
              <div style={{ width: "50%" }}>
                <Form {...formItemLayout} layout="vertical" form={form}>
                  <Title level={3}>Contact Information</Title>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    label="Name"
                    style={{ marginBottom: "8px", marginTop: "2em" }}
                  >
                    <Input required name="name" onChange={setdata} />
                  </Form.Item>
                  <Form.Item label="Email" style={{ marginBottom: "8px" }}>
                    <Input required name="email" onChange={setdata} />
                  </Form.Item>
                  <Form.Item
                    label="Mobile Number"
                    style={{ marginBottom: "8px" }}
                  >
                    <Input required name="mobile" onChange={setdata} />
                  </Form.Item>
                </Form>
                <Form
                  {...formItemLayout}
                  layout="vertical"
                  style={{ marginTop: "2em" }}
                >
                  <Title level={3}>Shipping Information</Title>
                  <Form.Item
                    label="Address 1 (Door No, Street Name)"
                    style={{ marginBottom: "8px", marginTop: "2em" }}
                  >
                    <Input required name="address1" onChange={setdata} />
                  </Form.Item>
                  <Form.Item
                    label="Address 2 (Area)"
                    style={{ marginBottom: "8px" }}
                  >
                    <Input required name="address2" onChange={setdata} />
                  </Form.Item>
                  <Form.Item
                    label="City & State"
                    style={{ marginBottom: "8px" }}
                  >
                    <Input required name="city" onChange={setdata} />
                  </Form.Item>
                  <Form.Item label="Country" style={{ marginBottom: "8px" }}>
                    <Input required name="country" onChange={setdata} />
                  </Form.Item>
                  <Form.Item label="Pincode" style={{ marginBottom: "8px" }}>
                    <Input required name="pincode" onChange={setdata} />
                  </Form.Item>
                </Form>
                <Button
                  size="large"
                  style={{ margin: "1em 0 2em 0" }}
                  type="primary"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
                <Button
                  onClick={() => navigate(-1)}
                  size="large"
                  style={{ margin: "1em 0 2em 1em" }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Checkout;
