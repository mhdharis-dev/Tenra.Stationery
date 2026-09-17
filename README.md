# TENRA STATIONERY — Write Your Future.

> A complete, production-quality frontend UI/UX for TENRA STATIONERY — a premium, minimal, student-friendly stationery brand.

![TENRA Brand Banner](public/tenra-logo.png)

---

## ✒️ Brand Philosophy

> **"Quiet Premium."**

TENRA STATIONERY is built around a simple idea: the tools we use to write, learn, and create should feel as considered as the ideas themselves. The interface uses generous whitespace, strong typography (**Manrope**), fine paper line motifs, and subtle navy (`#0B1F3A`) & gold (`#D4AF37`) accents.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite 6
- **Routing**: React Router 7 (`react-router-dom`)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React (`lucide-react`)
- **State & Storage**: Custom React Hooks + `localStorage`
- **Architecture**: Component-based, modular Phase 1 frontend ready for Phase 2 API / Cloudinary / DB integration.

---

## 🌟 Key Features

### 🛒 Customer Experience
- **Editorial Hero Section**: Asymmetric hero layout with vertical micro-labels (*"IDEAS START HERE."*) and cursor hover micro-interactions.
- **Top Bar Navigation**: Explicit `HOME`, `PRODUCTS`, `CATEGORIES`, `OUR STORY`, `ABOUT`, `CONTACT` links with gold active line indicators.
- **Curated Category Grid**: Asymmetric, non-generic category layouts for Pens, Notebooks, Pencils, Geometry, School Essentials, and Art & Creative.
- **Selected Essentials Catalog**: Minimalist product cards, specifications table, stock status tags (*Available Now* / *Coming Soon*), and price formatting.
- **Command-K Live Search Modal**: Full frontend query search overlay filterable by product name, category, or keywords.
- **Slide-Over Shopping Bag Drawer**: Quantity adjustment, subtotal calculation, and Phase 2 notice banner.
- **Contact Inquiries**: Interactive form with toast notifications (*"Thanks. This demo form is ready to connect to the TENRA contact service in Phase 2."*).

### 🔒 Admin Control Center (`/admin`)
- **Device-Cached Authentication**: Navigating to `/admin` enforces login verification ([`AdminLogin.jsx`](src/admin/AdminLogin.jsx)). Once authenticated, `localStorage` caches the session for seamless future visits.
- **Admin Dashboard**: Real-time summary statistic widgets (Products, Categories, Drafts, Messages) and recent activity tables.
- **Product Management CRUD**: Full product listing, filtering, search, modal deletion, and rich add/edit forms.
- **Cloudinary Integration Annotations**: All image upload components include `// Phase 2: Connect Cloudinary here.` annotations.
- **Category & Collection Organizer**: Manage custom category lists and curated collection groupings.
- **Media Library & Messages Inbox**: Asset gallery preview and contact submission reader.
- **User Home Page Shortcut**: Top-bar button allowing store admins to return to the customer homepage in one click.

---

## 🚦 Getting Started

### Prerequisites
- Node.js `v18+` or `v20+`
- npm `v9+` or `v10+`

### Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mhdharis-dev/Tenra.Stationery.git
   cd Tenra.Stationery
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the Application**:
   - Customer Web App: `http://localhost:5173/`
   - Admin Control Center: `http://localhost:5173/admin`

---

## 🔑 Demo Admin Credentials

- **Email**: `admin@tenrastationery.com`
- **Password**: `tenra2026`

---

## 🔮 Phase 2 Roadmap & Backend Architecture

The Phase 1 frontend is built with strict separation of concern hooks (`useProducts`, `useCategories`, `useMessages`, `useLocalStorage`) so that Phase 2 integration requires **zero UI redesign**:

- **API Integration**: Swap local hook arrays in `useProducts.js` with `fetch('/api/v1/products')`.
- **Media Storage**: Connect Cloudinary SDK inside `AddProduct.jsx` and `Media.jsx`.
- **Database**: Connect PostgreSQL / MongoDB schemas aligning with our mock product data models.
- **Authentication**: Replace `localStorage` token cache with JWT / OAuth backend sessions.

---

## 📄 License & Copyright

© 2026 TENRA Stationery. All rights reserved.
"Write Your Future."
