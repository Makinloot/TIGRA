const warehouses = [
  {
    id: 1,
    name: "Barami",
  },
  {
    id: 2,
    name: "M1 Shipping",
  },
  {
    id: 3,
    name: "Logistix 101",
  },
  {
    id: 4,
    name: "Rockaway",
  },
  {
    id: 5,
    name: "Chicago AIVI",
  },
  {
    id: 6,
    name: "Jax Auto",
  },
  {
    id: 7,
    name: "Baramidze Corp",
  },
  {
    id: 8,
    name: "Dynamics Export",
  },
  {
    id: 9,
    name: "West Coast Shipping",
  },
];

// Get all warehouses @GET /warehouses
function getAllWarehouses(req, res) {
  try {
    res.status(200).json(warehouses);
  } catch (error) {
    console.log("Error fetching warehouses:", error);
    res.status(500).json({ message: error.message });
  }
}

export { getAllWarehouses };
