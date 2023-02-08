import {
  Text,
  Button,
  useColorModeValue,
  Flex,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { useIntl } from "react-intl";
import { formatPrice } from "../api/storage";
import Form3svg from "../assets/shop.svg";
import Checkout from "./Checkout";

function BasketSidebar({ items, totalPrice }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const intl = useIntl();

  const disabled = items
    .map((product) => product.stock < product.quantity)
    .includes(true)
    ? true
    : false;

  return (
    <Flex
      py={10}
      zIndex={"99"}
      mx={10}
      justifyContent="space-between"
      alignItems="center"
      flexDirection={"column"}
    >
      <Image
        src={Form3svg}
        display={{ base: "none", md: "block" }}
        loading={"lazy"}
      />
      <Flex
        flexDirection={"row"}
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          color={useColorModeValue("black", "white")}
        >
          {formatPrice(totalPrice)}
        </Text>
        <Button
          colorScheme={disabled === true ? "gray" : "green"}
          mt={10}
          ml="5"
          rightIcon={
            disabled === true ? (
              <MdOutlineCancel size={20} />
            ) : (
              <TiTickOutline size={20} />
            )
          }
          disabled={disabled}
          onClick={onOpen}
        >
          {disabled === true
            ? intl.formatMessage({ id: "out_of_stock" })
            : intl.formatMessage({ id: "complete_order" })}
        </Button>
      </Flex>
      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(20deg)" />
        <ModalContent w={"90%"}>
          <ModalCloseButton />
          <ModalBody>
            <Checkout
              onClose={onClose}
              price={totalPrice}
              products={items}
              loading={loading}
              setLoading={setLoading}
              quantity={items.quantity}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default BasketSidebar;
