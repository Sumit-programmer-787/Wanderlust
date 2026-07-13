Wanderlust — Full-Stack Airbnb Clone

A full-stack, Airbnb-inspired property rental platform with end-to-end functionality — from listing creation to booking management and secure authentication.

Tech Stack: MongoDB, Express.js, React.js, Node.js, Tailwind CSS, Passport.js, Cloudinary, Maptiler API

Key Features:


Secure Authentication — Session-based auth via Passport.js (local strategy), covering all protected routes with role-based access for hosts and guests
Property Listings — RESTful CRUD APIs for listings, user profiles, and reviews, backed by structured MongoDB collections
Cloud Image Uploads — Cloudinary integration for fast, efficient host-side photo management via drag-and-drop
Interactive Maps — MapBox API integration for geo-coordinate-based listing discovery
Fully Responsive — Tailwind CSS UI tested across mobile, tablet, and desktop with dynamic real-time search filtering


Project Structure:

wanderlust/
├── controllers/       # Route logic (listings, reviews, users)
├── models/             # Mongoose schemas
├── routes/             # Express route handlers
├── views/               # EJS / React views
├── public/              # Static assets
├── middleware/       # Auth & validation middleware
└── app.js               # Application entry point

Getting Started:

bashgit clone https://github.com/<your-username>/wanderlust.git
cd wanderlust
npm install
npm start

Create a .env file with:

MONGO_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
MAPBOX_TOKEN=your_mapbox_token
SESSION_SECRET=your_session_secret
