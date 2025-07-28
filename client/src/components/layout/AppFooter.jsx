import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  HStack,
  VStack,
  Link,
  Divider,
  SimpleGrid,
  Heading
} from "@chakra-ui/react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiTwitter
} from "react-icons/fi";

export default function AppFooter() {
  const bg = useColorModeValue("gray.100", "gray.800");
  const color = useColorModeValue("gray.700", "gray.300");

  return (
    <Box bg={bg} color={color} mt="auto" px={{ base: 4, md: 10 }}>
      <Container as={Stack} maxW="7xl" py={{ base: 8, md: 12 }}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={10}>
          <Stack spacing={4}>
            <Box>
              <Text fontSize="2xl" fontWeight="bold" color="blue.500" mb={2}>
                OrderMS
              </Text>
              <Text fontSize="sm" lineHeight="tall">
                Complete order management solution for modern businesses.
              </Text>
            </Box>
          </Stack>

          <Stack spacing={4}>
            <Heading size="sm" color="blue.400">
              Quick Links
            </Heading>
            <VStack spacing={2} align="start">
              {["Home", "Track Order", "Dashboard", "Login"].map(
                (item, idx) => (
                  <Link
                    key={idx}
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    fontSize="sm"
                    _hover={{ color: "blue.400", textDecoration: "underline" }}
                  >
                    {item}
                  </Link>
                )
              )}
            </VStack>
          </Stack>

          <Stack spacing={4}>
            <Heading size="sm" color="blue.400">
              Contact
            </Heading>
            <VStack spacing={3} align="start">
              <HStack spacing={3}>
                <Box as={FiMail} boxSize={4} />
                <Text fontSize="sm">support@orderms.com</Text>
              </HStack>
              <HStack spacing={3}>
                <Box as={FiPhone} boxSize={4} />
                <Text fontSize="sm">+1 (555) 123-4567</Text>
              </HStack>
              <HStack spacing={3}>
                <Box as={FiMapPin} boxSize={4} />
                <Text fontSize="sm">123 Business Ave, Suite 100</Text>
              </HStack>
            </VStack>
          </Stack>

          <Stack spacing={4}>
            <Heading size="sm" color="blue.400">
              Follow Us
            </Heading>
            <HStack spacing={5}>
              <Link href="#" aria-label="GitHub" _hover={{ color: "blue.400" }}>
                <Box as={FiGithub} boxSize={5} />
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                _hover={{ color: "blue.400" }}
              >
                <Box as={FiLinkedin} boxSize={5} />
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                _hover={{ color: "blue.400" }}
              >
                <Box as={FiTwitter} boxSize={5} />
              </Link>
            </HStack>
          </Stack>
        </SimpleGrid>

        <Divider
          my={8}
          borderColor={useColorModeValue("gray.300", "gray.600")}
        />

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify="space-between"
          align="center"
          textAlign={{ base: "center", md: "left" }}
        >
          <Text fontSize="sm">© 2024 OrderMS. All rights reserved.</Text>
        </Stack>
      </Container>
    </Box>
  );
}
