// TODO-FX: Section configurations for dynamic UI rendering
// Replace with real API endpoint when backend ready
// API Endpoint: GET /api/ui/sections

export const sectionConfigs = {
  sections: [
    {
      id: "featured-auctions",
      title: "Featured Auctions",
      subtitle: "Live auctions ending soon — place your bids now",
      layout: {
        type: "carousel",
        columns: { sm: 1, md: 2, lg: 3, xl: 4 },
        gap: 6,
        padding: "py-10 px-6"
      },
      card: {
        image_ratio: "16/9",
        overlay_badge: {
          text: "LIVE",
          color: "red",
          style: "pill top-right"
        },
        content: {
          title: "Car Make & Model",
          subtitle: "Year • Mileage • Location",
          price: { label: "Current Bid", value: "$18,400" },
          timer: { label: "Ends in", value: "02h : 14m : 32s" },
          specs: {
            showEngine: true,
            showCylinders: true,
            showTransmission: true,
            showDrivetrain: true,
            showFuelType: true,
            showCondition: true,
            showColor: true,
            showBodyType: true
          }
        },
        actions: [
          {
            label: "Place Bid",
            variant: "primary",
            icon: "gavel",
            width: "full"
          },
          {
            label: "View Details",
            variant: "ghost",
            icon: "eye",
            width: "full"
          }
        ],
        style: {
          background: "white",
          rounded: "2xl",
          shadow: "xl",
          hover: ["translate-y-[-4px]", "shadow-2xl"],
          transition: "ease-in-out 200ms"
        }
      }
    },
    {
      id: "special-offers",
      title: "🔥 Special Offers Ending Soon",
      subtitle: "Limited time deals — bid now before they're gone!",
      layout: {
        type: "grid",
        columns: { sm: 1, md: 2, lg: 3 },
        gap: 8,
        background: "linear-gradient(from-orange-50 to orange-100)",
        padding: "py-12 px-6"
      },
      card: {
        image_ratio: "1/1",
        ribbon: {
          text: "Up to 25% Off",
          color: "orange-500",
          position: "top-left",
          style: "angled"
        },
        content: {
          title: "Special Deal",
          subtitle: "Ends in 3 days",
          description: "Exclusive limited-time offer for verified bidders.",
          specs: {
            showEngine: true,
            showCylinders: true,
            showTransmission: true,
            showDrivetrain: true,
            showFuelType: true,
            showCondition: true,
            showColor: true,
            showBodyType: true,
            showDiscount: true
          }
        },
        actions: [
          {
            label: "Claim Offer",
            variant: "primary",
            icon: "zap",
            width: "full"
          },
          {
            label: "More Info",
            variant: "outline",
            icon: "info",
            width: "full"
          }
        ],
        style: {
          background: "white",
          rounded: "2xl",
          shadow: "md",
          hover: ["scale-105", "shadow-lg"],
          transition: "ease-out 250ms"
        }
      }
    },
    {
      id: "ai-picks",
      title: "AI Picks For You",
      subtitle: "Personalized vehicle recommendations based on your preferences",
      layout: {
        type: "masonry",
        columns: { sm: 1, md: 2, lg: 3 },
        gap: 6,
        padding: "py-10 px-6"
      },
      card: {
        image_ratio: "16/10",
        ai_tag: {
          text: "AI Recommended",
          icon: "sparkles",
          color: "indigo-500",
          style: "badge top-left"
        },
        content: {
          title: "Suggested Vehicle",
          subtitle: "Matches 92% of your saved preferences",
          price: "$21,750",
          specs: {
            showEngine: true,
            showCylinders: true,
            showTransmission: true,
            showDrivetrain: true,
            showFuelType: true,
            showCondition: true,
            showColor: true,
            showBodyType: true,
            showMatchScore: true
          }
        },
        actions: [
          {
            label: "Quick View",
            variant: "ghost",
            icon: "eye",
            width: "1/2"
          },
          {
            label: "Bid Now",
            variant: "primary",
            icon: "gavel",
            width: "1/2"
          }
        ],
        style: {
          background: "white",
          rounded: "2xl",
          shadow: "md",
          hover: ["ring-2", "ring-indigo-200", "shadow-xl"],
          transition: "ease-in 200ms"
        }
      }
    },
    {
      id: "active-logistics-routes",
      title: "Active Logistics Routes",
      subtitle: "Real-time tracking of vehicles in transit across our global network",
      layout: {
        type: "split",
        left: {
          component: "Map",
          library: "react-map-gl",
          style: {
            height: "500px",
            rounded: "2xl",
            shadow: "xl",
            border: "border border-slate-200"
          },
          data: {
            route_demo: {
              origin: { city: "Los Angeles", country: "USA", coords: [-118.2437, 34.0522] },
              destination: { city: "Poti", country: "Georgia", coords: [41.6796, 42.1508] },
              path: {
                coordinates: [
                  [-118.2437, 34.0522], // Los Angeles
                  [-120.0, 35.0],       // Pacific Ocean start
                  [-90.0, 30.0],        // Gulf of Mexico
                  [-50.0, 35.0],        // Atlantic Ocean
                  [-10.0, 40.0],        // Near Portugal
                  [10.0, 42.0],         // Mediterranean Sea
                  [41.6796, 42.1508]    // Poti, Georgia
                ],
                style: { color: "#2563eb", width: 4, animated: true }
              },
              vehicles: [
                {
                  id: "C1",
                  label: "Container #C1",
                  coords: [-30.0, 38.0],
                  eta: "4 days",
                  status: "On Route",
                  icon: "ship"
                },
                {
                  id: "C2",
                  label: "Container #C2",
                  coords: [-10.5, 40.5],
                  eta: "2 days",
                  status: "Approaching Europe",
                  icon: "ship"
                },
                {
                  id: "C3",
                  label: "Container #C3",
                  coords: [20.2, 41.3],
                  eta: "8 hours",
                  status: "Near Georgia",
                  icon: "truck"
                }
              ]
            }
          }
        },
        right: {
          component: "ContainerList",
          style: {
            background: "white",
            rounded: "2xl",
            shadow: "lg",
            padding: "p-6 space-y-4",
            height: "full"
          },
          header: {
            title: "3 Active Containers",
            subtitle: "Tracking updates in real time",
            icon: "globe"
          },
          cards: [
            {
              id: "C1",
              title: "Container #C1",
              subtitle: "Los Angeles → Poti",
              progress: 65,
              eta: "4 days",
              status_color: "blue",
              details: {
                vessel: "MSC Aurora",
                last_update: "2h ago",
                location: "Mid-Atlantic Ocean"
              }
            },
            {
              id: "C2",
              title: "Container #C2",
              subtitle: "Los Angeles → Poti",
              progress: 85,
              eta: "2 days",
              status_color: "indigo",
              details: {
                vessel: "Ever Glory",
                last_update: "1h ago",
                location: "Near Portugal"
              }
            },
            {
              id: "C3",
              title: "Container #C3",
              subtitle: "Los Angeles → Poti",
              progress: 98,
              eta: "8 hours",
              status_color: "green",
              details: {
                vessel: "Land Truck #45",
                last_update: "5m ago",
                location: "Entering Georgia"
              }
            }
          ]
        }
      }
    }
  ],
  shared_ui_rules: {
    fonts: {
      title: "Inter Bold",
      text: "Inter Medium"
    },
    motion: "fade-in with slight zoom",
    button_variants: {
      primary: { bg: "blue-600", text: "white", hover: "blue-700" },
      ghost: { bg: "transparent", text: "slate-700", hover: "slate-900" },
      outline: { border: "1px solid currentColor", hover: "bg-slate-50" }
    }
  }
};

// TODO-FX: Helper function to get section config by ID
export const getSectionConfig = (sectionId) => {
  return sectionConfigs.sections.find(section => section.id === sectionId);
};

// TODO-FX: Helper function to get all section configs
export const getAllSectionConfigs = () => {
  return sectionConfigs.sections;
};
