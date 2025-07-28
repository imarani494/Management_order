"use client";

import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  Container,
  HStack,
  IconButton,
  useDisclosure,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FiShoppingCart, FiBarChart2, FiHome } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const NavLink = ({ children, href, icon, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Button
      variant={isActive ? "solid" : "ghost"}
      colorScheme={isActive ? "blue" : "gray"}
      leftIcon={icon}
      onClick={onClick}
      size="sm"
    >
      {children}
    </Button>
  );
};

const MobileNavLink = ({ children, href, icon, onClick, onClose }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Button
      variant={isActive ? "solid" : "ghost"}
      colorScheme={isActive ? "blue" : "gray"}
      leftIcon={icon}
      onClick={() => {
        onClick();
        onClose();
      }}
      size="md"
      w="full"
      justifyContent="flex-start"
    >
      {children}
    </Button>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { label: "Home", href: "/", icon: <FiHome /> },
    { label: "Track Order", href: "/customer", icon: <FiShoppingCart /> },
    { label: "Admin", href: "/admin", icon: <FiBarChart2 /> }
  ];

  return (
    <Box
      bg={bg}
      borderBottom={1}
      borderStyle="solid"
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Container maxW="7xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <HStack spacing={8} alignItems="center">
            <Box
              cursor="pointer"
              onClick={() => navigate("/")}
              _hover={{ transform: "scale(1.05)" }}
              transition="transform 0.2s"
            >
              <Text fontSize="xl" fontWeight="bold" color="blue.500">
                OrderMS
              </Text>
            </Box>

            <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  onClick={() => navigate(item.href)}
                >
                  {item.label}
                </NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems="center" display={{ base: "none", md: "flex" }}>
            <Stack direction="row" spacing={4}>
              {user ? (
                <HStack spacing={4}>
                  <Text fontSize="sm" color="gray.600">
                    Welcome, {user.name || user.email}
                  </Text>
                  <Button size="sm" variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </HStack>
              ) : (
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              )}
            </Stack>
          </Flex>

          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>
      </Container>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Text color="blue.500" fontWeight="bold">
              OrderMS
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {navItems.map((item) => (
                <MobileNavLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  onClick={() => navigate(item.href)}
                  onClose={onClose}
                >
                  {item.label}
                </MobileNavLink>
              ))}

              <Box pt={4} borderTop="1px" borderColor="gray.200">
                {user ? (
                  <VStack spacing={3}>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      Welcome, {user.name || user.email}
                    </Text>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleLogout}
                      w="full"
                    >
                      Logout
                    </Button>
                  </VStack>
                ) : (
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => navigate("/login")}
                    w="full"
                  >
                    Login
                  </Button>
                )}
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
