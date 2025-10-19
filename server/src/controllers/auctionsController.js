const auctions = [
  {
    id: 1,
    name: "Copart",
  },
  {
    id: 2,
    name: "IAAI",
  },
  {
    id: 3,
    name: "Manheim",
  },
];

// Get all auctions @GET /auctions
function getAllAuctions(req, res) {
  try {
    res.status(200).json(auctions);
  } catch (error) {
    console.log("Error fetching auctions:", error);
    res.status(500).json({ message: error.message });
  }
}

export { getAllAuctions };
