import { Box, ButtonGroup, SimpleGrid, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsBoxSeam } from "react-icons/bs";
import { FiDatabase } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import { Link } from "react-router-dom";
import altogic from "../../api/altogic";
import { formatPrice } from "../../api/storage";
import StatsCard from "../../components/StatsCard";

export default function BasicStatistics() {
  const [productsLength, setProductsLength] = useState(0);
  const [ordersLength, setOrdersLength] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const getStats = async () => {
      const productsLength = await altogic.db.model("products").get();
      const orders = await altogic.db.model("order").get();

      if (!productsLength.errors) {
        setProductsLength(productsLength.data.length);
      }
      if (!orders.errors) {
        setOrdersLength(orders.data.length);
        let total = 0;
        orders.data.forEach((order) => {
          order.products.forEach((prod) => {
            return (total += prod.price);
          });
        });
        setTotalEarnings(total);
      }
    };
    getStats();
  }, []);

  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <Box
        display={"flex"}
        py={10}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Text textAlign={"center"} fontSize={"4xl"} fontWeight={"bold"} mb={4}>
          Basic Statistics
        </Text>
        <ButtonGroup >
          <Link to={"/admin/orders"}>
            <Button variant="outline" color="primary" shadow={'xl'}>
              Orders
            </Button>
          </Link>
          <Link to={"/admin/products"}>
            <Button variant="outline" color="primary" shadow={'xl'}>
              Products
            </Button>
          </Link>
        </ButtonGroup>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <Link to={"/admin/orders"}>
          <StatsCard
            title={"Total earnings"}
            stat={formatPrice(totalEarnings)}
            icon={<GiMoneyStack size={"3em"} />}
          />
        </Link>
        <Link to={"/admin/orders"}>
          <StatsCard
            title={"Total Orders"}
            stat={ordersLength}
            icon={<BsBoxSeam size={"3em"} />}
          />
        </Link>
        <Link to={"/admin/products"}>
          <StatsCard
            title={"Total Products"}
            stat={productsLength}
            icon={<FiDatabase size={"3em"} />}
          />
        </Link>
      </SimpleGrid>
    </Box>
  );
}
