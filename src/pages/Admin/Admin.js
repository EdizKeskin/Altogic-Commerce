import { Box, ButtonGroup, SimpleGrid, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineHistory } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { FiDatabase } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import altogic from "../../api/altogic";
import { formatPrice } from "../../api/storage";
import StatsCard from "../../components/StatsCard";
import { useProduct } from "../../context/productContext";

export default function BasicStatistics() {
  const [ordersLength, setOrdersLength] = useState(0);
  const [completedOrdersLength, setcompletedOrdersLength] = useState(0);
  const [pendingOrdersLength, setPendingOrdersLength] = useState(0);
  const [canceledOrdersLength, setCanceledOrdersLength] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const { products } = useProduct();
  const intl = useIntl();

  useEffect(() => {
    const getStats = async () => {
      const orders = await altogic.db.model("order").get();
      if (!orders.errors) {
        setOrdersLength(orders.data.length);
        let total = 0;
        orders.data.forEach((order) => {
          order.products.forEach((prod) => {
            return (total += prod.price);
          });
        });
        setcompletedOrdersLength(
          orders.data.filter((order) => order.status === "completed").length
        );
        setPendingOrdersLength(
          orders.data.filter((order) => order.status === "pending").length
        );
        setCanceledOrdersLength(
          orders.data.filter((order) => order.status === "canceled").length
        );
        setTotalEarnings(total);
      }
    };
    getStats();
  }, [products]);

  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <Box
        display={"flex"}
        py={10}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Text textAlign={"center"} fontSize={"4xl"} fontWeight={"bold"} mb={4}>
          <FormattedMessage id="statistics" />
        </Text>
        <ButtonGroup>
          <Link to={"/admin/orders"}>
            <Button variant="outline" color="primary" shadow={"xl"}>
              <FormattedMessage id="orders" />
            </Button>
          </Link>
          <Link to={"/admin/products"}>
            <Button variant="outline" color="primary" shadow={"xl"}>
              <FormattedMessage id="products" />
            </Button>
          </Link>
        </ButtonGroup>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <Link to={"/admin/orders"}>
          <StatsCard
            title={intl.formatMessage({ id: "total_earnings" })}
            stat={formatPrice(totalEarnings)}
            icon={<GiMoneyStack size={"3em"} />}
          />
        </Link>
        <Link to={"/admin/orders"}>
          <StatsCard
            title={intl.formatMessage({ id: "total_orders" })}
            stat={ordersLength}
            icon={<BsBoxSeam size={"3em"} />}
          />
        </Link>
        <Link to={"/admin/products"}>
          <StatsCard
            title={intl.formatMessage({ id: "total_products" })}
            stat={products.length}
            icon={<FiDatabase size={"3em"} />}
          />
        </Link>
        <Link to={"/admin/orders"} state={"pending"}>
          <StatsCard
            title={intl.formatMessage({ id: "pending_orders" })}
            stat={pendingOrdersLength}
            icon={<AiOutlineHistory size={"3em"} />}
          />
        </Link>
        <Link to={"/admin/orders"} state={"completed"}>
          <StatsCard
            title={intl.formatMessage({ id: "completed_orders" })}
            stat={completedOrdersLength}
            icon={<IoMdCheckmarkCircleOutline size={"3em"} />}
          />
        </Link>
        <Link to={"/admin/orders"} state={"canceled"}>
          <StatsCard
            title={intl.formatMessage({ id: "canceled_orders" })}
            stat={canceledOrdersLength}
            icon={<MdOutlineCancel size={"3em"} />}
          />
        </Link>
      </SimpleGrid>
    </Box>
  );
}
