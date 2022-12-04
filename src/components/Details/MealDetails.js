import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRandomMealById } from "../../store/mealApi";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Tag, Skeleton, Table } from "antd";
import { addToCart } from "../../store/cartSlice";
import { ShoppingCartOutlined } from "@ant-design/icons";

function MealDetails() {
  const { Title, Paragraph } = Typography;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchRandomMealById({ id: id }));
  }, [dispatch, id]);

  const { randomMeal } = useSelector((state) => state.mealApi);
  const { data, loading } = randomMeal;

  const handleClick = (item) => {
    dispatch(addToCart(item));
    navigate(`/checkout/${item.idMeal}`);
  };

  const columns = [
    {
      title: "Intgredients",
      dataIndex: "intgredients",
    },
    {
      title: "Measurement",
      dataIndex: "measurement",
    },
  ];

  const intgredients = (item) => {
    let intgredientsTableData = [];
    for (let index = 1; index <= 20; index++) {
      var intgredientsName = "strIngredient" + index;
      var measure = "strMeasure" + index;
      var allIntgredients = {
        intgredients: item[intgredientsName],
        measurement: item[measure],
      };

      if (allIntgredients.intgredients && allIntgredients.measurement) {
        intgredientsTableData.push(allIntgredients);
      }
    }

    return (
      <Table
        pagination={false}
        dataSource={intgredientsTableData}
        columns={columns}
      />
    );
  };

  return (
    <div
      style={{ marginBottom: "3em" }}
      className="fw flex flex-col flex-center-cross"
    >
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <div style={{ marginTop: "5em" }} className="fw-3-4 fw flex">
            <Button onClick={() => navigate(-1)} size="large">
              Go Back
            </Button>
          </div>
          {data?.map((item) => {
            const tags = item.strTags?.split(",");

            intgredients(item);
            return (
              <div
                className="fw-3-4 flex flex-col flex-main-justify"
                key={item.idMeal}
                style={{ marginTop: "2em" }}
              >
                <div className="flex flex-row flex-main-justify">
                  <div style={{ width: "40%" }}>
                    <img width={"100%"} src={item.strMealThumb} alt="meal" />
                  </div>
                  <div style={{ width: "50%" }}>
                    <Title>{item.strMeal}</Title>
                    <div className="flex flex-center-cross">
                      <h3 level={5}>Area</h3>
                      <p style={{ paddingLeft: "2em" }}>{item.strArea}</p>
                    </div>
                    <div className="flex flex-center-cross">
                      <h3>Category</h3>
                      <p style={{ paddingLeft: "2em" }}>{item.strCategory}</p>
                    </div>
                    <div style={{ marginTop: "2em" }}>
                      {tags?.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                    <div style={{ marginTop: "2em" }}>
                      <Title level={4}>Cooking Instructions:-</Title>
                      <Paragraph level={5}>{item.strInstructions}</Paragraph>
                    </div>
                    <div
                      className="flex py-4 space-x-4"
                      style={{ marginTop: "2em" }}
                    >
                      <Button
                        onClick={() => handleClick(item)}
                        type="primary"
                        size="large"
                        icon={<ShoppingCartOutlined />}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex fw flex-row flex-center-main flex-center-cross">
                  <div
                    style={{ marginTop: "2em" }}
                    className="fw flex flex-row flex-main-justify"
                  >
                    <div>
                      <Title level={4}>Ingredients</Title>
                      {intgredients(item)}
                    </div>
                    <div>
                      <Title level={4}>Tutorial</Title>
                      <iframe
                        src={item.strYoutube.replace("/watch?v=", "/embed/")}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title="video"
                        width={500}
                        height={300}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default MealDetails;
