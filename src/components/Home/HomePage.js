import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearRandomMeal, fetchRandomMealApi } from "../../store/mealApi";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Button, Skeleton, Input, Col, Row, Typography } from "antd";
import { addToCart } from "../../store/cartSlice";

const { Search } = Input;
const { Title, Paragraph } = Typography;

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchRandomMealApi());
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearRandomMeal());
  }, [dispatch]);

  const { randomMealApi } = useSelector((state) => state.mealApi);
  const { data, loading } = randomMealApi;
  const onSearch = (value) => {
    navigate(`/search/${value}`);
  };

  const handleClick = (event, item) => {
    event.stopPropagation();
    dispatch(addToCart(item));
    navigate(`/checkout/${item.idMeal}`);
  };

  return (
    <div className="flex flex-col flex-center-main flex-center-cross">
      <Col
        style={{ margin: "3em 0" }}
        className="flex flex-center-main flex-center-cross"
        span={8}
      >
        <Search
          placeholder="Search food by name"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </Col>
      <Row className="fw">
        {loading ? (
          <Skeleton />
        ) : (
          data.slice(0, 10).map((item) => (
            <Col
              className="flex flex-center-main flex-center-cross"
              style={{
                margin: "20px 0",
              }}
              span={6}
              onClick={() => navigate(`/meal-details/${item.idMeal}`)}
              key={item.idMeal}
            >
              <Card
                style={{
                  width: 300,
                  cursor: "pointer",
                  border: "1px solid rgb(189, 195, 199)",
                  borderRadius: "20px",
                }}
                cover={<img alt="thumbnail" src={item.strMealThumb} />}
                bordered
              >
                <Title level={4}>{item.strMeal}</Title>
                <Paragraph level={4}>{item.strCategory}</Paragraph>
                <div className="flex flex-row fw flex-center-main">
                  <Button
                    onClick={(e) => handleClick(e, item)}
                    type="primary"
                    size="large"
                    icon={<ShoppingCartOutlined />}
                  >
                    Buy
                  </Button>
                </div>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}

export default HomePage;
