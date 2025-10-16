// TODO-FX: Section configurations for dynamic UI rendering
// Replace with real API endpoint when backend ready
// API Endpoint: GET /api/ui/sections

export const sectionConfigs = {
  sections: [
    {
      id: "featured-auctions",
      title: "WILL FINISH SOON",
      subtitle: "Live auctions ending soon — place your bids now",
      purpose: "Главная витрина активных и популярных торгов, создающая ощущение срочности и динамики.",
      visual_theme: {
        tone: "vibrant-energy",
        palette: {
          primary: "#2563eb",
          accent: "#22c55e",
          background: "white",
          badge: "#ef4444"
        },
        effects: {
          gradient_overlay: "linear(to top, rgba(0,0,0,0.5), transparent)",
          countdown_timer: true,
          pulse_animation: "for LIVE badges",
          hover: "lift + shadow-lg + brightness-110"
        },
        layout: {
          type: "grid",
          columns: 3,
          gap: "1.5rem",
          rounded: "2xl",
          shadow: "xl"
        }
      },
      content_elements: {
        primary_data: ["photo", "title", "current_bid", "time_left"],
        secondary_data: ["bidders_count", "condition_grade", "ship_ready_badge"],
        cta: { "label": "Place Bid", "variant": "solid", "icon": "gavel" }
      },
      component: "AuctionCard2025"
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
