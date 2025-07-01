const mongoose = require('mongoose');
const Product = require('./product');

const mongoUrl =
  process.env.MONGO_URL ||
  'mongodb://mongo:27017/celebration' ||
  'mongodb://localhost:27017/celebration';

// רשימת המוצרים
const products = [
  {
    name: "#001 - בלונים",
    description: "ערכה של 10 בלונים מגוונים",
    category: "עיצוב יום הולדת",
    price: 30,
    image: "/images/balloons.jpg"
  },
  {
    name: "#002 - מפה חד פעמית",
    description: "מפה חד פעמית עם דגלי העולם",
    category: "כלי שולחן",
    price: 30,
    image: "/images/map.jpg"
  },
  {
    name: "#003 - כוסות חד פעמיות",
    description: "ערכה של 20 כוסות חד פעמיות צבעוניות",
    category: "כלי שולחן",
    price: 25,
    image: "/images/cups.jpg"
  },
  {
    name: "#004 - צלחות חד פעמיות",
    description: "ערכה של 20 צלחות חד פעמיות מעוצבות",
    category: "כלי שולחן",
    price: 25,
    image: "/images/plates.jpg"
  },
  {
    name: "#005 - קונפטי",
    description: "ערכת קונפטי ליצירת אווירה קסומה באירוע",
    category: "אביזרי מסיבה",
    price: 15,
    image: "/images/confetti.jpg"
  },
  {
    name: "#006 - כובעי מסיבה",
    description: "ערכה של 10 כובעי מסיבה עם פסים צבעוניים",
    category: "אביזרי מסיבה",
    price: 10,
    image: "/images/party_hats.jpg"
  },
  {
    name: "#007 - דגלים",
    description: "ערכה של 10 דגלים לתלייה בפינה או מעל השולחן",
    category: "אביזרי מסיבה",
    price: 20,
    image: "/images/flags.jpg"
  },
  {
    name: "#008 - פיניאטה",
    description: "פיניאטה בצורת מגלה עם פריטים קטנים בתוכה",
    category: "אביזרי מסיבה",
    price: 40,
    image: "/images/pinata.jpg"
  },
  {
    name: "#009 - אותיות מוארות",
    description: "אותיות מוארות ליצירת כיתובים מרהיבים",
    category: "אביזרי מסיבה",
    price: 30,
    image: "/images/lighted_letters.jpg"
  },
  {
    name: "#010 - גליל חוט לבלונים",
    description: "חוט ורוד לבלונים",
    category: "בלונים",
    price: 30,
    image: "/images/HOT.jpg"
  }
];

// פונקציה שמנסה להתחבר למונגו עם ריטריי אוטומטי (מחכה ל-DB)
async function connectWithRetry(retries = 10, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(mongoUrl);
      return true;
    } catch (err) {
      console.log(`[seedProducts] Waiting for MongoDB... (${i + 1}/${retries})`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  throw new Error("Failed to connect to MongoDB after multiple attempts.");
}

async function seed() {
  try {
    await connectWithRetry();
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("כל המוצרים הוזנו בהצלחה!");
    mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("[seedProducts]", err);
    process.exit(1);
  }
}

seed();