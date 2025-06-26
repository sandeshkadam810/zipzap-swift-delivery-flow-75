
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  discount: number;
  category: string;
  brand?: string;
  unit?: string;
  inStock: boolean;
}

export const productData: { [key: string]: Product[] } = {
  groceries: [
    // Fruits & Vegetables
    { id: 1, name: "Fresh Bananas", price: 99, image: "🍌", rating: 4.5, discount: 10, category: "groceries", brand: "Fresh", unit: "1 dozen", inStock: true },
    { id: 2, name: "Red Apples", price: 120, image: "🍎", rating: 4.6, discount: 15, category: "groceries", brand: "Premium", unit: "1 kg", inStock: true },
    { id: 3, name: "Fresh Oranges", price: 80, image: "🍊", rating: 4.4, discount: 8, category: "groceries", brand: "Citrus", unit: "1 kg", inStock: true },
    { id: 4, name: "Green Grapes", price: 150, image: "🍇", rating: 4.7, discount: 12, category: "groceries", brand: "Sweet", unit: "500g", inStock: true },
    { id: 5, name: "Fresh Tomatoes", price: 60, image: "🍅", rating: 4.3, discount: 5, category: "groceries", brand: "Farm Fresh", unit: "1 kg", inStock: true },
    { id: 6, name: "Onions", price: 40, image: "🧅", rating: 4.2, discount: 0, category: "groceries", brand: "Local", unit: "1 kg", inStock: true },
    { id: 7, name: "Fresh Carrots", price: 70, image: "🥕", rating: 4.5, discount: 10, category: "groceries", brand: "Organic", unit: "500g", inStock: true },
    { id: 8, name: "Green Capsicum", price: 90, image: "🫑", rating: 4.4, discount: 8, category: "groceries", brand: "Fresh", unit: "500g", inStock: true },
    { id: 9, name: "Fresh Spinach", price: 35, image: "🥬", rating: 4.6, discount: 0, category: "groceries", brand: "Leafy", unit: "250g", inStock: true },
    { id: 10, name: "Fresh Broccoli", price: 120, image: "🥦", rating: 4.5, discount: 15, category: "groceries", brand: "Green", unit: "500g", inStock: true },
    
    // Dairy Products
    { id: 11, name: "Fresh Milk", price: 65, image: "🥛", rating: 4.8, discount: 5, category: "groceries", brand: "Amul", unit: "1L", inStock: true },
    { id: 12, name: "Cheese Slices", price: 180, image: "🧀", rating: 4.6, discount: 12, category: "groceries", brand: "Britannia", unit: "200g", inStock: true },
    { id: 13, name: "Greek Yogurt", price: 95, image: "🥛", rating: 4.7, discount: 8, category: "groceries", brand: "Epigamia", unit: "400g", inStock: true },
    { id: 14, name: "Fresh Butter", price: 240, image: "🧈", rating: 4.5, discount: 10, category: "groceries", brand: "Amul", unit: "500g", inStock: true },
    { id: 15, name: "Paneer", price: 320, image: "🧀", rating: 4.8, discount: 15, category: "groceries", brand: "Mother Dairy", unit: "500g", inStock: true },
    
    // Grains & Cereals
    { id: 16, name: "Basmati Rice", price: 450, image: "🍚", rating: 4.7, discount: 8, category: "groceries", brand: "India Gate", unit: "5kg", inStock: true },
    { id: 17, name: "Whole Wheat Flour", price: 280, image: "🌾", rating: 4.6, discount: 12, category: "groceries", brand: "Aashirvaad", unit: "5kg", inStock: true },
    { id: 18, name: "Oats", price: 220, image: "🥣", rating: 4.5, discount: 10, category: "groceries", brand: "Quaker", unit: "1kg", inStock: true },
    { id: 19, name: "Brown Bread", price: 35, image: "🍞", rating: 4.2, discount: 0, category: "groceries", brand: "Harvest Gold", unit: "400g", inStock: true },
    { id: 20, name: "Quinoa", price: 480, image: "🌾", rating: 4.8, discount: 20, category: "groceries", brand: "Organic", unit: "500g", inStock: true },
    
    // Pulses & Legumes
    { id: 21, name: "Toor Dal", price: 120, image: "🫘", rating: 4.4, discount: 8, category: "groceries", brand: "Tata", unit: "1kg", inStock: true },
    { id: 22, name: "Moong Dal", price: 140, image: "🫘", rating: 4.5, discount: 10, category: "groceries", brand: "Organic", unit: "1kg", inStock: true },
    { id: 23, name: "Chana Dal", price: 110, image: "🫘", rating: 4.3, discount: 5, category: "groceries", brand: "Traditional", unit: "1kg", inStock: true },
    { id: 24, name: "Rajma", price: 160, image: "🫘", rating: 4.6, discount: 12, category: "groceries", brand: "Kashmir", unit: "500g", inStock: true },
    { id: 25, name: "Black Chickpeas", price: 130, image: "🫘", rating: 4.4, discount: 8, category: "groceries", brand: "Organic", unit: "1kg", inStock: true },
    
    // Snacks & Beverages
    { id: 26, name: "Potato Chips", price: 45, image: "🍟", rating: 4.3, discount: 15, category: "groceries", brand: "Lay's", unit: "90g", inStock: true },
    { id: 27, name: "Biscuits", price: 65, image: "🍪", rating: 4.5, discount: 10, category: "groceries", brand: "Parle-G", unit: "800g", inStock: true },
    { id: 28, name: "Green Tea", price: 280, image: "🍵", rating: 4.7, discount: 18, category: "groceries", brand: "Lipton", unit: "100 bags", inStock: true },
    { id: 29, name: "Coffee Powder", price: 350, image: "☕", rating: 4.6, discount: 12, category: "groceries", brand: "Nescafe", unit: "200g", inStock: true },
    { id: 30, name: "Instant Noodles", price: 25, image: "🍜", rating: 4.2, discount: 8, category: "groceries", brand: "Maggi", unit: "70g", inStock: true },
    
    // Continue with more items to reach 100+...
    { id: 31, name: "Coconut Oil", price: 180, image: "🥥", rating: 4.5, discount: 10, category: "groceries", brand: "Parachute", unit: "500ml", inStock: true },
    { id: 32, name: "Olive Oil", price: 480, image: "🫒", rating: 4.8, discount: 20, category: "groceries", brand: "Figaro", unit: "500ml", inStock: true },
    { id: 33, name: "Honey", price: 320, image: "🍯", rating: 4.7, discount: 15, category: "groceries", brand: "Dabur", unit: "500g", inStock: true },
    { id: 34, name: "Salt", price: 20, image: "🧂", rating: 4.3, discount: 0, category: "groceries", brand: "Tata", unit: "1kg", inStock: true },
    { id: 35, name: "Sugar", price: 45, image: "🍚", rating: 4.2, discount: 5, category: "groceries", brand: "Madhur", unit: "1kg", inStock: true },
    // Add more items to reach 100+ for groceries
  ],
  
  pharmacy: [
    { id: 101, name: "Paracetamol 500mg", price: 25, image: "💊", rating: 4.3, discount: 0, category: "pharmacy", brand: "Crocin", unit: "15 tablets", inStock: true },
    { id: 102, name: "Vitamin C Tablets", price: 150, image: "💊", rating: 4.6, discount: 10, category: "pharmacy", brand: "Limcee", unit: "30 tablets", inStock: true },
    { id: 103, name: "Hand Sanitizer", price: 45, image: "🧴", rating: 4.5, discount: 5, category: "pharmacy", brand: "Dettol", unit: "50ml", inStock: true },
    { id: 104, name: "Band Aid", price: 35, image: "🩹", rating: 4.4, discount: 8, category: "pharmacy", brand: "Johnson", unit: "10 pieces", inStock: true },
    { id: 105, name: "Cough Syrup", price: 85, image: "🍯", rating: 4.2, discount: 12, category: "pharmacy", brand: "Benadryl", unit: "100ml", inStock: true },
    { id: 106, name: "Antiseptic Cream", price: 65, image: "🧴", rating: 4.5, discount: 10, category: "pharmacy", brand: "Savlon", unit: "30g", inStock: true },
    { id: 107, name: "Thermometer", price: 280, image: "🌡️", rating: 4.7, discount: 15, category: "pharmacy", brand: "Digital", unit: "1 piece", inStock: true },
    { id: 108, name: "Face Mask", price: 120, image: "😷", rating: 4.3, discount: 20, category: "pharmacy", brand: "3M", unit: "50 pieces", inStock: true },
    { id: 109, name: "Calcium Tablets", price: 180, image: "💊", rating: 4.6, discount: 8, category: "pharmacy", brand: "Shelcal", unit: "30 tablets", inStock: true },
    { id: 110, name: "Multivitamin", price: 350, image: "💊", rating: 4.8, discount: 18, category: "pharmacy", brand: "Centrum", unit: "30 tablets", inStock: true },
    // Add more pharmacy items...
  ],
  
  electronics: [
    { id: 201, name: "Phone Charger", price: 299, image: "🔌", rating: 4.2, discount: 15, category: "electronics", brand: "Samsung", unit: "1 piece", inStock: true },
    { id: 202, name: "Wireless Earphones", price: 1599, image: "🎧", rating: 4.4, discount: 20, category: "electronics", brand: "boAt", unit: "1 pair", inStock: true },
    { id: 203, name: "Power Bank", price: 899, image: "🔋", rating: 4.7, discount: 12, category: "electronics", brand: "Mi", unit: "10000mAh", inStock: true },
    { id: 204, name: "USB Cable", price: 199, image: "🔌", rating: 4.3, discount: 10, category: "electronics", brand: "Belkin", unit: "1 meter", inStock: true },
    { id: 205, name: "Bluetooth Speaker", price: 2499, image: "🔊", rating: 4.6, discount: 25, category: "electronics", brand: "JBL", unit: "1 piece", inStock: true },
    { id: 206, name: "Phone Case", price: 349, image: "📱", rating: 4.4, discount: 15, category: "electronics", brand: "Spigen", unit: "1 piece", inStock: true },
    { id: 207, name: "Screen Protector", price: 199, image: "📱", rating: 4.2, discount: 8, category: "electronics", brand: "Nilkin", unit: "1 piece", inStock: true },
    { id: 208, name: "Car Charger", price: 399, image: "🚗", rating: 4.5, discount: 12, category: "electronics", brand: "Anker", unit: "1 piece", inStock: true },
    { id: 209, name: "Laptop Stand", price: 1299, image: "💻", rating: 4.6, discount: 18, category: "electronics", brand: "Portronics", unit: "1 piece", inStock: true },
    { id: 210, name: "Wireless Mouse", price: 799, image: "🖱️", rating: 4.4, discount: 15, category: "electronics", brand: "Logitech", unit: "1 piece", inStock: true },
    // Add more electronics items...
  ],
  
  beauty: [
    { id: 301, name: "Face Wash", price: 180, image: "🧴", rating: 4.5, discount: 18, category: "beauty", brand: "Cetaphil", unit: "125ml", inStock: true },
    { id: 302, name: "Moisturizer", price: 320, image: "🧴", rating: 4.6, discount: 15, category: "beauty", brand: "Nivea", unit: "200ml", inStock: true },
    { id: 303, name: "Lipstick", price: 450, image: "💋", rating: 4.7, discount: 20, category: "beauty", brand: "Lakme", unit: "1 piece", inStock: true },
    { id: 304, name: "Foundation", price: 899, image: "💄", rating: 4.4, discount: 25, category: "beauty", brand: "Maybelline", unit: "30ml", inStock: true },
    { id: 305, name: "Shampoo", price: 250, image: "🧴", rating: 4.3, discount: 12, category: "beauty", brand: "L'Oreal", unit: "340ml", inStock: true },
    { id: 306, name: "Hair Oil", price: 180, image: "🧴", rating: 4.5, discount: 10, category: "beauty", brand: "Dabur", unit: "200ml", inStock: true },
    { id: 307, name: "Perfume", price: 1299, image: "🌸", rating: 4.8, discount: 30, category: "beauty", brand: "Fogg", unit: "100ml", inStock: true },
    { id: 308, name: "Soap", price: 65, image: "🧼", rating: 4.2, discount: 8, category: "beauty", brand: "Dove", unit: "125g", inStock: true },
    { id: 309, name: "Toothpaste", price: 85, image: "🦷", rating: 4.4, discount: 12, category: "beauty", brand: "Colgate", unit: "200g", inStock: true },
    { id: 310, name: "Deodorant", price: 199, image: "🧴", rating: 4.3, discount: 15, category: "beauty", brand: "Axe", unit: "150ml", inStock: true },
    // Add more beauty items...
  ],
  
  "home-garden": [
    { id: 401, name: "Plant Pot", price: 150, image: "🪴", rating: 4.4, discount: 10, category: "home-garden", brand: "Ceramic", unit: "1 piece", inStock: true },
    { id: 402, name: "Garden Soil", price: 80, image: "🌱", rating: 4.3, discount: 5, category: "home-garden", brand: "Organic", unit: "5kg", inStock: true },
    { id: 403, name: "Watering Can", price: 299, image: "💧", rating: 4.5, discount: 12, category: "home-garden", brand: "Plastic", unit: "1 piece", inStock: true },
    { id: 404, name: "Seeds Pack", price: 45, image: "🌱", rating: 4.6, discount: 8, category: "home-garden", brand: "Hybrid", unit: "1 pack", inStock: true },
    { id: 405, name: "Garden Tools Set", price: 899, image: "🛠️", rating: 4.7, discount: 20, category: "home-garden", brand: "Steel", unit: "5 pieces", inStock: true },
    { id: 406, name: "Fertilizer", price: 120, image: "🌿", rating: 4.4, discount: 15, category: "home-garden", brand: "NPK", unit: "1kg", inStock: true },
    { id: 407, name: "Garden Hose", price: 450, image: "💧", rating: 4.3, discount: 18, category: "home-garden", brand: "Flexible", unit: "10 meters", inStock: true },
    { id: 408, name: "Lawn Mower", price: 8999, image: "🏡", rating: 4.8, discount: 25, category: "home-garden", brand: "Electric", unit: "1 piece", inStock: true },
    { id: 409, name: "Garden Gloves", price: 99, image: "🧤", rating: 4.2, discount: 10, category: "home-garden", brand: "Cotton", unit: "1 pair", inStock: true },
    { id: 410, name: "Pesticide Spray", price: 180, image: "🌿", rating: 4.5, discount: 12, category: "home-garden", brand: "Organic", unit: "500ml", inStock: true },
    // Add more home-garden items...
  ],
  
  "pet-supplies": [
    { id: 501, name: "Dog Food", price: 899, image: "🐕", rating: 4.6, discount: 15, category: "pet-supplies", brand: "Pedigree", unit: "3kg", inStock: true },
    { id: 502, name: "Cat Food", price: 450, image: "🐱", rating: 4.5, discount: 12, category: "pet-supplies", brand: "Whiskas", unit: "1.2kg", inStock: true },
    { id: 503, name: "Pet Shampoo", price: 280, image: "🧴", rating: 4.4, discount: 10, category: "pet-supplies", brand: "Himalaya", unit: "200ml", inStock: true },
    { id: 504, name: "Dog Leash", price: 199, image: "🦮", rating: 4.3, discount: 8, category: "pet-supplies", brand: "Nylon", unit: "1 piece", inStock: true },
    { id: 505, name: "Pet Bowl", price: 149, image: "🥣", rating: 4.5, discount: 12, category: "pet-supplies", brand: "Steel", unit: "1 piece", inStock: true },
    { id: 506, name: "Cat Litter", price: 320, image: "🐱", rating: 4.4, discount: 15, category: "pet-supplies", brand: "Clumping", unit: "5kg", inStock: true },
    { id: 507, name: "Pet Toys", price: 250, image: "🧸", rating: 4.6, discount: 18, category: "pet-supplies", brand: "Rubber", unit: "1 set", inStock: true },
    { id: 508, name: "Bird Food", price: 180, image: "🐦", rating: 4.3, discount: 10, category: "pet-supplies", brand: "Mixed Seeds", unit: "1kg", inStock: true },
    { id: 509, name: "Pet Bed", price: 799, image: "🛏️", rating: 4.7, discount: 20, category: "pet-supplies", brand: "Cushioned", unit: "1 piece", inStock: true },
    { id: 510, name: "Pet Collar", price: 129, image: "🐕", rating: 4.2, discount: 8, category: "pet-supplies", brand: "Adjustable", unit: "1 piece", inStock: true },
    // Add more pet supplies items...
  ]
};

export const getCategoryProducts = (categoryName: string): Product[] => {
  return productData[categoryName] || [];
};
