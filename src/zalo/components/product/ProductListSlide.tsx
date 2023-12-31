import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@components/common/IconButton";
import ProductImage from "./components/ProductImage";
import StarRating from "./components/StarRating";
import Flex from "@shared/Flex";
import ModalVideoContent from "@components/app/e-learning/ModalVideoContent";
import Hoverbox from "@components/common/Hoverbox";
import playIcon from "@assets/icons/play.svg";

const ProductListSlide = ({ product, index }) => {
  const {
    name,
    category,
    id,
    features,
    price,
    discount,
    salePrice,
    shippingCost,
    rating,
    totalReview,
    isInStock,
    isNew,
    files,
    videoPoster,
    video,
  } = product;

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ModalVideoContent
        show={showModal}
        setShow={setShowModal}
        attachment={{ image: videoPoster, src: video }}
      />
      <Col
        xs={12}
        className={classNames("p-x1", {
          "bg-100": index % 2 !== 0,
        })}
      >
        <Row>
          <Col sm={5} md={4} xs={6}>
            {video ? (
              <div>
                <Hoverbox
                  onClick={() => setShowModal(true)}
                  className="text-center"
                >
                  <Button
                    variant="link"
                    onClick={() => setShowModal(true)}
                    className="p-0 border-0"
                  >
                    <Image
                      src={files[0].src}
                      alt=""
                      className="w-100 h-100 fit-cover"
                    />
                  </Button>
                  <div className="d-flex flex-center pe-none bg-holder overlay overlay-2">
                    <Image
                      src={playIcon}
                      width={40}
                      alt=""
                      className="z-index-1"
                    />
                  </div>
                </Hoverbox>
              </div>
            ) : (
              <ProductImage
                name={name}
                id={id}
                isNew={isNew}
                files={files}
                layout="list"
              />
            )}
          </Col>
          <Col sm={7} md={8} xs={6}>
            <Row className="h-100">
              <Col lg={8}>
                <h5 className="mt-sm-0">
                  <Link
                    to={`/e-commerce/product/product-details/${id}`}
                    className="text-dark fs-0 fs-lg-1"
                  >
                    {name}
                  </Link>
                </h5>
                <p className="fs--1 mb-2 mb-md-3">
                  <Link to="#!" className="text-500">
                    {category}
                  </Link>
                </p>
                <ul className="list-unstyled d-none d-lg-block">
                  {features.map((feature) => (
                    <li key={feature}>
                      <FontAwesomeIcon icon="circle" transform="shrink-12" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Col>
              <Col lg={4} as={Flex} justifyContent="between" direction="column">
                <div>
                  <h4 className="fs-1 fs-md-2 text-warning mb-0">
                    {`$${salePrice ? salePrice : price}`}
                  </h4>
                  {salePrice && (
                    <h5 className="fs--1 text-500 mb-0 mt-1">
                      <del>{`$${price}`}</del>
                      <span className="ms-2">-{discount}%</span>
                    </h5>
                  )}
                  <div className="mb-2 mt-3">
                    <StarRating readonly rating={rating} />
                    <span className="ms-1">({totalReview})</span>
                  </div>
                  <div className="d-none d-lg-block">
                    <p className="fs--1 mb-1">
                      Shipping Cost: <strong>{`$${shippingCost}`}</strong>
                    </p>
                    <p className="fs--1 mb-1">
                      Stock:{" "}
                      <strong
                        className={classNames({
                          "text-success": isInStock,
                          "text-danger": !isInStock,
                        })}
                      >
                        {isInStock ? "Available" : "Stock-Out"}
                      </strong>
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  {/* <IconButton
                    size="sm"
                    variant={
                      isInFavouriteItems(id)
                        ? 'outline-danger'
                        : 'outline-secondary'
                    }
                    className={classNames('d-lg-block me-2 me-lg-0 w-lg-100', {
                      'border-300': !isInFavouriteItems(id)
                    })}
                    icon={isInFavouriteItems(id) ? 'heart' : ['far', 'heart']}
                    onClick={handleFavouriteClick}
                  >
                    Favourite
                  </IconButton>
                  <IconButton
                    size="sm"
                    variant="primary"
                    className="d-lg-block mt-lg-2 w-lg-100"
                    icon="cart-plus"
                    onClick={() => handleAddToCart(1, true, true)}
                  >
                    Add to Cart
                  </IconButton> */}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </>
  );
};

ProductListSlide.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    features: PropTypes.array,
    price: PropTypes.number.isRequired,
    discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    salePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    shippingCost: PropTypes.number,
    rating: PropTypes.number,
    totalReview: PropTypes.number,
    isInStock: PropTypes.bool,
    isNew: PropTypes.bool,
    files: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  index: PropTypes.number,
};

export default ProductListSlide;
