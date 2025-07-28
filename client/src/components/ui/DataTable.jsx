import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Select,
  Box
} from "@chakra-ui/react"

export default function DataTable({ 
  data, 
  columns, 
  onStatusChange 
}) {
  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column.key}>{column.header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item._id}>
              {columns.map((column) => (
                <Td key={`${item._id}-${column.key}`}>
                  {column.key === 'status' ? (
                    <Select
                      value={item.status}
                      onChange={(e) => onStatusChange(item._id, e.target.value)}
                      size="sm"
                      w="32"
                    >
                      <option value="placed">Placed</option>
                      <option value="picked">Picked</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </Select>
                  ) : column.key === 'payment' ? (
                    <Badge colorScheme={item.paymentCollected ? "green" : "gray"}>
                      {item.paymentCollected ? "Collected" : "Pending"}
                    </Badge>
                  ) : (
                    item[column.key]
                  )}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}