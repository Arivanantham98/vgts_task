import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMealsBySearch } from "../../store/mealApi";
import { Card, Button, Skeleton, Col, Row, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

function SearchDetails() {
  const { Title, Paragraph } = Typography;
  const { term } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMealsBySearch({ term: term }));
  }, [dispatch, term]);

  const { searchData } = useSelector((state) => state.mealApi);
  const { data, loading } = searchData;

  return (
    <div className="flex flex-col flex-center-main flex-center-cross">
      <Col
        style={{ margin: "3em 0" }}
        className="flex flex-center-main flex-center-cross"
        span={8}
      >
        {data == null ? (
          <Title>
            No Results Found! <br /> Try with other names
          </Title>
        ) : (
          <Title>Search Results for {term}</Title>
        )}
      </Col>
      <Row className="fw">
        {loading ? (
          <Skeleton />
        ) : (
          data?.slice(0, 10).map((item) => (
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
                    size="large"
                    type="primary"
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

export default SearchDetails;
