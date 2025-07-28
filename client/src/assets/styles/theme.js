import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    brand: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      500: "#0ea5e9",
      600: "#0284c7"
    },
    success: {
      500: "#10b981"
    },
    warning: {
      500: "#f59e0b"
    },
    error: {
      500: "#ef4444"
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "medium",
        borderRadius: "lg"
      }
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: "xl",
          boxShadow: "sm",
          _hover: {
            boxShadow: "md"
          }
        }
      }
    }
  }
})

export default theme