require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("../models/Product");

// ======================================================
// MONGODB CONNECTION
// ======================================================

const MONGO_URI = process.env.MONGO_URI;

// ======================================================
// PRODUCTS DATA
// ======================================================

const products = [

    // ================= ELECTRONICS =================

    {
        name: "Wireless Headphones",
        description:
            "Premium noise-canceling wireless headphones with 30-hour battery life.",
        price: 1050.99,
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        category: "Electronics",
        countInStock: 10
    },

    {
        name: "Smartphone",
        description:
            "Latest smartphone with a large display, powerful processor and 5G support.",
        price: 699.99,
        image:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
        category: "Electronics",
        countInStock: 8
    },

    {
        name: "Laptop",
        description:
            "High-performance laptop suitable for work, study and entertainment.",
        price: 899.99,
        image:
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
        category: "Electronics",
        countInStock: 6
    },

    {
        name: "Smart Watch",
        description:
            "Modern smartwatch with fitness tracking and notifications.",
        price: 149.99,
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        category: "Electronics",
        countInStock: 15
    },

    {
        name: "Bluetooth Speaker",
        description:
            "Portable Bluetooth speaker with powerful sound and long battery life.",
        price: 79.99,
        image:
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
        category: "Electronics",
        countInStock: 20
    },

    {
        name: "Wireless Keyboard",
        description:
            "Slim wireless keyboard perfect for office and home use.",
        price: 49.99,
        image:
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
        category: "Electronics",
        countInStock: 25
    },

    {
        name: "Gaming Mouse",
        description:
            "Ergonomic gaming mouse with accurate sensor and customizable buttons.",
        price: 39.99,
        image:
            "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
        category: "Electronics",
        countInStock: 30
    },

    {
        name: "Tablet",
        description:
            "Lightweight tablet with a bright display for entertainment and study.",
        price: 299.99,
        image:
            "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
        category: "Electronics",
        countInStock: 12
    },

    // ================= FASHION =================

    {
        name: "Running Shoes",
        description:
            "Lightweight running shoes with responsive cushioning for everyday runs.",
        price: 1299.99,
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        category: "Fashion",
        countInStock: 20
    },

    {
        name: "Casual Sneakers",
        description:
            "Comfortable sneakers suitable for everyday casual wear.",
        price: 899.99,
        image:
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
        category: "Fashion",
        countInStock: 18
    },

    {
        name: "Denim Jacket",
        description:
            "Classic denim jacket with a stylish modern fit.",
        price: 799.99,
        image:
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
        category: "Fashion",
        countInStock: 14
    },

    {
        name: "Cotton T-Shirt",
        description:
            "Soft and comfortable cotton t-shirt for everyday use.",
        price: 299.99,
        image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        category: "Fashion",
        countInStock: 40
    },

    {
        name: "Hoodie",
        description:
            "Warm and comfortable hoodie for casual winter wear.",
        price: 599.99,
        image:
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
        category: "Fashion",
        countInStock: 25
    },

    {
        name: "Formal Shirt",
        description:
            "Elegant formal shirt suitable for office and special occasions.",
        price: 499.99,
        image:
            "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=500",
        category: "Fashion",
        countInStock: 22
    },

    {
        name: "Sunglasses",
        description:
            "Stylish sunglasses with UV protection.",
        price: 249.99,
        image:
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
        category: "Fashion",
        countInStock: 30
    },

    {
        name: "Leather Shoes",
        description:
            "Premium leather shoes with a comfortable design.",
        price: 1199.99,
        image:
            "https://images.unsplash.com/photo-1444257661349-4e6f5f8f0d1b?w=500",
        category: "Fashion",
        countInStock: 10
    },

    // ================= HOME =================

    {
        name: "Coffee Maker",
        description:
            "Programmable coffee maker for delicious coffee at home.",
        price: 800.99,
        image:
            "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
        category: "Home",
        countInStock: 5
    },

    {
        name: "Modern Sofa",
        description:
            "Comfortable modern sofa perfect for your living room.",
        price: 14999.99,
        image:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
        category: "Home",
        countInStock: 5
    },

    {
        name: "Table Lamp",
        description:
            "Modern table lamp for bedroom, office and living room.",
        price: 599.99,
        image:
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
        category: "Home",
        countInStock: 20
    },

    {
        name: "Wall Clock",
        description:
            "Minimal modern wall clock for home decoration.",
        price: 399.99,
        image:
            "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500",
        category: "Home",
        countInStock: 15
    },

    {
        name: "Dinner Set",
        description:
            "Elegant dinner set for family meals and special occasions.",
        price: 899.99,
        image:
            "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=500",
        category: "Home",
        countInStock: 10
    },

    {
        name: "Kitchen Blender",
        description:
            "Powerful kitchen blender for smoothies and food preparation.",
        price: 1299.99,
        image:
            "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500",
        category: "Home",
        countInStock: 12
    },

    {
        name: "Water Bottle",
        description:
            "Reusable stainless steel water bottle.",
        price: 249.99,
        image:
            "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
        category: "Home",
        countInStock: 35
    },

    {
        name: "Bedside Table",
        description:
            "Compact bedside table with modern design.",
        price: 1499.99,
        image:
            "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=500",
        category: "Home",
        countInStock: 8
    },

    // ================= ACCESSORIES =================

    {
        name: "Backpack",
        description:
            "Durable 30L backpack with multiple compartments.",
        price: 499.99,
        image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        category: "Accessories",
        countInStock: 15
    },

    {
        name: "Travel Bag",
        description:
            "Spacious travel bag suitable for short trips and vacations.",
        price: 699.99,
        image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        category: "Accessories",
        countInStock: 12
    },

    {
        name: "Leather Wallet",
        description:
            "Premium leather wallet with multiple card slots.",
        price: 349.99,
        image:
            "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
        category: "Accessories",
        countInStock: 25
    },

    {
        name: "Smart Glasses",
        description:
            "Modern stylish glasses designed for everyday use.",
        price: 999.99,
        image:
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
        category: "Accessories",
        countInStock: 8
    },

    {
        name: "Wrist Watch",
        description:
            "Classic wrist watch with premium design.",
        price: 899.99,
        image:
            "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500",
        category: "Accessories",
        countInStock: 12
    },

    {
        name: "Cap",
        description:
            "Comfortable casual cap for everyday outdoor use.",
        price: 199.99,
        image:
            "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500",
        category: "Accessories",
        countInStock: 30
    },

    {
        name: "Travel Pouch",
        description:
            "Compact pouch for organizing travel essentials.",
        price: 249.99,
        image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        category: "Accessories",
        countInStock: 20
    },

    {
        name: "Key Holder",
        description:
            "Small and stylish key holder for everyday use.",
        price: 149.99,
        image:
            "https://images.unsplash.com/photo-1593085260707-5377ba37f868?w=500",
        category: "Accessories",
        countInStock: 25
    },

    // ================= SPORTS =================

    {
        name: "Football",
        description:
            "Durable football suitable for training and outdoor games.",
        price: 399.99,
        image:
            "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=500",
        category: "Sports",
        countInStock: 20
    },

    {
        name: "Basketball",
        description:
            "High-quality basketball for indoor and outdoor play.",
        price: 499.99,
        image:
            "https://images.unsplash.com/photo-1518065896235-a4c93e088e7d?w=500",
        category: "Sports",
        countInStock: 15
    },

    {
        name: "Yoga Mat",
        description:
            "Comfortable non-slip yoga mat for workouts and yoga.",
        price: 599.99,
        image:
            "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
        category: "Sports",
        countInStock: 20
    },

    {
        name: "Dumbbells",
        description:
            "Durable dumbbells for strength training at home.",
        price: 999.99,
        image:
            "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500",
        category: "Sports",
        countInStock: 10
    },

    // ================= BEAUTY =================

    {
        name: "Perfume",
        description:
            "Long-lasting fragrance with a fresh and elegant scent.",
        price: 799.99,
        image:
            "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500",
        category: "Beauty",
        countInStock: 18
    },

    {
        name: "Skincare Set",
        description:
            "Complete skincare set for daily beauty routine.",
        price: 899.99,
        image:
            "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500",
        category: "Beauty",
        countInStock: 15
    },

    {
        name: "Makeup Kit",
        description:
            "Complete makeup kit with essential beauty products.",
        price: 999.99,
        image:
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
        category: "Beauty",
        countInStock: 12
    },

    // ================= BOOKS =================

    {
        name: "Programming Book",
        description:
            "Beginner-friendly programming book for learning coding.",
        price: 499.99,
        image:
            "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500",
        category: "Books",
        countInStock: 20
    },

    {
        name: "Business Book",
        description:
            "Useful business strategies and ideas for beginners.",
        price: 399.99,
        image:
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
        category: "Books",
        countInStock: 15
    },

    {
        name: "Novel",
        description:
            "Interesting fiction novel for relaxing reading.",
        price: 299.99,
        image:
            "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500",
        category: "Books",
        countInStock: 25
    }
];

// ======================================================
// SEED DATABASE
// ======================================================

async function seedProducts() {
    try {
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is not defined in .env file");
        }

        await mongoose.connect(MONGO_URI);

        console.log("MongoDB Connected");

        // Remove old products
        await Product.deleteMany({});

        console.log("Old products deleted");

        // Insert new products
        await Product.insertMany(products);

        console.log(
            `${products.length} products inserted successfully!`
        );

    } catch (error) {
        console.error("Seed Error:", error.message);

    } finally {
        await mongoose.connection.close();
        console.log("MongoDB connection closed");
    }
}

seedProducts();