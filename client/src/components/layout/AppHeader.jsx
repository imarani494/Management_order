import {
  Box,
  Container,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
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
import { useAuth } from "../../contexts/AuthContext";

const NavLink = ({ children, href, icon, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Button
      variant={isActive ? "solid" : "ghost"}
      colorScheme={isActive ? "blackAlpha" : "gray"}
      leftIcon={icon}
      onClick={onClick}
      size="sm"
      fontWeight="medium"
    >
      {children}
    </Button>
  );
};

export default function AppHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const bg = useColorModeValue(
    "rgba(255, 255, 255, 0.85)",
    "rgba(26, 32, 44, 0.85)"
  );
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { label: "Overview", href: "/", icon: <FiHome /> },
    { label: "Orders", href: "/track-order", icon: <FiShoppingCart /> },
    { label: "Reports", href: "/dashboard", icon: <FiBarChart2 /> }
  ];

  return (
    <Box
      bg={bg}
      borderBottom="1px solid"
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={1000}
      backdropFilter="saturate(180%) blur(8px)"
    >
      <Container maxW="7xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <HStack spacing={8} alignItems="center">
            <Box
              cursor="pointer"
              onClick={() => navigate("/")}
              _hover={{ transform: "scale(1.05)" }}
              transition="transform 0.2s"
            >
              <Text fontSize="xl" fontWeight="bold" color="blue.600">
                BlackDash
              </Text>
            </Box>

          
            <HStack
              as="nav"
              spacing={4}
              display={{ base: "none", md: "flex" }}
              color={textColor}
            >
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
                    Hello, {user.name || user.email}
                  </Text>
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="gray"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </HStack>
              ) : (
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => navigate("/login")}
                >
                  Staff Login
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
            color="gray.800"
            bg="gray.200"
            _hover={{ bg: "gray.300" }}
          />
        </Flex>
      </Container>

     
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bg} backdropFilter="saturate(180%) blur(8px)">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" borderColor={borderColor}>
            <Text fontWeight="bold" color="blue.600">
              BlackDash
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  leftIcon={item.icon}
                  onClick={() => {
                    navigate(item.href);
                    onClose();
                  }}
                  size="md"
                  w="full"
                  justifyContent="flex-start"
                  colorScheme="gray"
                >
                  {item.label}
                </Button>
              ))}

              <Box pt={4} borderTop="1px solid" borderColor={borderColor}>
                {user ? (
                  <VStack spacing={3}>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      Hello, {user.name || user.email}
                    </Text>
                    <Button
                      size="sm"
                      variant="outline"
                      colorScheme="gray"
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
                    onClick={() => {
                      navigate("/login");
                      onClose();
                    }}
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
