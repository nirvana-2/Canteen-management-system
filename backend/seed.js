const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// dotenv.config();

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ['admin', 'staff', 'student'], default: 'student' },
}, { timestamps: true });

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true },
    image: { type: String, default: '/uploads/food/default.jpg' },
    category: { type: String, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    available: { type: Boolean, default: true },
    numSales: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true }, quantity: { type: Number, required: true }, price: { type: Number, required: true } }],
    total: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'preparing', 'ready', 'paid', 'cancelled'], default: 'pending' },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    staffHandledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Food = mongoose.models.Food || mongoose.model('Food', foodSchema);
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        await Promise.all([User.deleteMany({}), Food.deleteMany({}), Order.deleteMany({})]);
        console.log('🗑️  Cleared all collections');

        const usersData = [
            { name: 'Admin User', email: 'admin@canteen.com', password: 'admin123', phone: '9800000001', role: 'admin' },
            { name: 'Staff Ram', email: 'staff@canteen.com', password: 'staff123', phone: '9800000002', role: 'staff' },
            { name: 'Student Saman', email: 'saman@canteen.com', password: 'student123', phone: '9800000003', role: 'student' },
            { name: 'Student Priya', email: 'priya@canteen.com', password: 'student123', phone: '9800000004', role: 'student' },
            { name: 'Student Rahul', email: 'rahul@canteen.com', password: 'student123', phone: '9800000005', role: 'student' },
        ];

        const users = [];
        for (const u of usersData) {
            const user = new User(u);
            await user.save();
            users.push(user);
        }
        console.log(`👥 Seeded ${users.length} users`);

        const admin = users.find(u => u.role === 'admin');
        const staff = users.find(u => u.role === 'staff');
        const students = users.filter(u => u.role === 'student');

        const foodData = [
            { name: 'Masala Dosa', description: 'Crispy dosa with spicy potato filling and chutney.', price: 60, category: 'Breakfast', countInStock: 50, available: true, numSales: 120, rating: 4.5, numReviews: 30, createdBy: admin._id, image: 'https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg' },
            { name: 'Poha', description: 'Light flattened rice with vegetables and spices.', price: 40, category: 'Breakfast', countInStock: 40, available: true, numSales: 90, rating: 4.2, numReviews: 20, createdBy: admin._id, image: 'https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg' },
            { name: 'Aloo Paratha', description: 'Stuffed flatbread with spiced potato filling.', price: 50, category: 'Breakfast', countInStock: 35, available: true, numSales: 80, rating: 4.3, numReviews: 25, createdBy: admin._id, image: 'https://www.themealdb.com/images/media/meals/qptpvt1487339267.jpg' },
            { name: 'Idli Sambar', description: 'Soft steamed rice cakes with lentil soup.', price: 45, category: 'Breakfast', countInStock: 45, available: true, numSales: 100, rating: 4.4, numReviews: 22, createdBy: admin._id, image: 'https://www.themealdb.com/images/media/meals/ixcqmv1614267012.jpg' },
            { name: 'Dal Rice', description: 'Steamed rice with yellow lentil curry.', price: 80, category: 'Lunch', countInStock: 60, available: true, numSales: 200, rating: 4.6, numReviews: 50, createdBy: admin._id, image: 'https://www.themealdb.com/images/media/meals/1bsv1q1560459826.jpg' },
            { name: 'Veg Thali', description: 'Complete meal with rice, dal, sabzi, roti and pickle.', price: 120, category: 'Lunch', countInStock: 30, available: true, numSales: 150, rating: 4.7, numReviews: 45, createdBy: admin._id, image: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg' },
            { name: 'Chicken Curry Rice', description: 'Spicy chicken curry served with steamed rice.', price: 150, category: 'Lunch', countInStock: 25, available: true, numSales: 180, rating: 4.8, numReviews: 60, createdBy: admin._id, image: 'https://www.themealdb.com/images/media/meals/zuab8m1619787871.jpg' },
            { name: 'Paneer Butter Masala', description: 'Creamy paneer in rich tomato-butter gravy with naan.', price: 130, category: 'Lunch', countInStock: 20, available: true, numSales: 110, rating: 4.5, numReviews: 35, createdBy: admin._id, image: 'https://www.themealdb.com/images/media/meals/xrysxr1487832195.jpg' },
            { name: 'Egg Fried Rice', description: 'Wok-tossed rice with eggs and vegetables.', price: 90, category: 'Lunch', countInStock: 40, available: true, numSales: 130, rating: 4.3, numReviews: 28, createdBy: admin._id, image: 'https://www.themealdb.com/images/media/meals/1bsv1q1560459826.jpg' },
            { name: 'Samosa', description: 'Crispy pastry filled with spiced potatoes and peas.', price: 20, category: 'Snacks', countInStock: 100, available: true, numSales: 300, rating: 4.5, numReviews: 80, createdBy: admin._id, image: 'https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg' },
            { name: 'Vada Pav', description: 'Mumbai-style spiced potato fritter in a bun.', price: 25, category: 'Snacks', countInStock: 80, available: true, numSales: 250, rating: 4.4, numReviews: 70, createdBy: admin._id, image: 'https://www.themealdb.com/images/media/meals/qptpvt1487339267.jpg' },
            { name: 'Bread Pakora', description: 'Bread slices stuffed with potato, dipped in batter and fried.', price: 30, category: 'Snacks', countInStock: 60, available: true, numSales: 160, rating: 4.2, numReviews: 40, createdBy: admin._id, image: 'https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg' },
            { name: 'Maggi Noodles', description: 'Classic instant noodles cooked with vegetables.', price: 35, category: 'Snacks', countInStock: 70, available: true, numSales: 220, rating: 4.6, numReviews: 65, createdBy: admin._id, image: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg' },
            { name: 'French Fries', description: 'Crispy golden potato fries with ketchup.', price: 50, category: 'Snacks', countInStock: 50, available: true, numSales: 190, rating: 4.5, numReviews: 55, createdBy: admin._id, image: 'https://www.themealdb.com/images/media/meals/xrysxr1487832195.jpg' },
            { name: 'Masala Chai', description: 'Spiced Indian milk tea with ginger and cardamom.', price: 15, category: 'Drinks', countInStock: 200, available: true, numSales: 500, rating: 4.8, numReviews: 100, createdBy: admin._id, image: 'https://www.themealdb.com/images/media/meals/ixcqmv1614267012.jpg' },
            { name: 'Cold Coffee', description: 'Chilled coffee blended with milk and ice cream.', price: 60, category: 'Drinks', countInStock: 50, available: true, numSales: 140, rating: 4.6, numReviews: 45, createdBy: admin._id, image: 'https://www.themealdb.com/images/media/meals/zuab8m1619787871.jpg' },
            { name: 'Fresh Lime Soda', description: 'Refreshing lime juice with soda water.', price: 30, category: 'Drinks', countInStock: 80, available: true, numSales: 170, rating: 4.4, numReviews: 38, createdBy: admin._id, image: 'https://www.themealdb.com/images/media/meals/1bsv1q1560459826.jpg' },
            { name: 'Mango Lassi', description: 'Thick yogurt-based mango smoothie.', price: 50, category: 'Drinks', countInStock: 40, available: true, numSales: 120, rating: 4.7, numReviews: 42, createdBy: admin._id, image: 'https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg' },
            { name: 'Mineral Water', description: 'Chilled 1 litre mineral water bottle.', price: 20, category: 'Drinks', countInStock: 500, available: true, numSales: 400, rating: 4.0, numReviews: 20, createdBy: admin._id, image: 'https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg' },
            { name: 'Gulab Jamun', description: 'Soft milk-solid dumplings soaked in rose syrup.', price: 30, category: 'Desserts', countInStock: 60, available: true, numSales: 140, rating: 4.7, numReviews: 50, createdBy: admin._id, image: 'https://www.themealdb.com/images/media/meals/qptpvt1487339267.jpg' },
            { name: 'Ice Cream Cup', description: 'Vanilla ice cream cup with chocolate sauce.', price: 40, category: 'Desserts', countInStock: 50, available: true, numSales: 110, rating: 4.5, numReviews: 35, createdBy: admin._id, image: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg' },
            { name: 'Kheer', description: 'Creamy rice pudding with saffron and nuts.', price: 35, category: 'Desserts', countInStock: 30, available: true, numSales: 80, rating: 4.6, numReviews: 28, createdBy: admin._id, image: 'https://www.themealdb.com/images/media/meals/xrysxr1487832195.jpg' },
            // Breakfast (5 more)
            { name: 'Upma', description: 'Savory semolina porridge with vegetables and spices.', price: 35, category: 'Breakfast', countInStock: 40, available: true, numSales: 75, rating: 4.1, numReviews: 18, createdBy: admin._id, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80' },
            { name: 'Puri Bhaji', description: 'Deep fried bread served with spiced potato curry.', price: 55, category: 'Breakfast', countInStock: 35, available: true, numSales: 95, rating: 4.4, numReviews: 24, createdBy: admin._id, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80' },
            { name: 'Bread Omelette', description: 'Fluffy egg omelette served with toasted bread.', price: 45, category: 'Breakfast', countInStock: 30, available: true, numSales: 85, rating: 4.3, numReviews: 21, createdBy: admin._id, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80' },
            { name: 'Banana Pancakes', description: 'Fluffy pancakes made with ripe bananas and honey.', price: 65, category: 'Breakfast', countInStock: 25, available: true, numSales: 60, rating: 4.5, numReviews: 16, createdBy: admin._id, image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&q=80' },
            { name: 'Boiled Egg Plate', description: 'Two boiled eggs served with toast and butter.', price: 30, category: 'Breakfast', countInStock: 50, available: true, numSales: 110, rating: 4.0, numReviews: 30, createdBy: admin._id, image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80' },

            // Lunch (5 more)
            { name: 'Biryani', description: 'Fragrant basmati rice cooked with spices and vegetables.', price: 160, category: 'Lunch', countInStock: 20, available: true, numSales: 220, rating: 4.9, numReviews: 75, createdBy: admin._id, image: 'https://images.unsplash.com/photo-1563379091339-03246963d96f?w=400&q=80' },
            { name: 'Chole Bhature', description: 'Spicy chickpea curry with deep fried bread.', price: 90, category: 'Lunch', countInStock: 30, available: true, numSales: 140, rating: 4.6, numReviews: 42, createdBy: admin._id, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80' },
            { name: 'Fish Curry Rice', description: 'Tangy fish curry with steamed rice.', price: 170, category: 'Lunch', countInStock: 15, available: true, numSales: 90, rating: 4.7, numReviews: 33, createdBy: admin._id, image: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400&q=80' },
            { name: 'Mutton Curry', description: 'Slow cooked tender mutton in spiced gravy with roti.', price: 200, category: 'Lunch', countInStock: 10, available: true, numSales: 70, rating: 4.8, numReviews: 28, createdBy: admin._id, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80' },
            { name: 'Mix Veg Rice', description: 'Stir fried seasonal vegetables served with steamed rice.', price: 85, category: 'Lunch', countInStock: 40, available: true, numSales: 115, rating: 4.2, numReviews: 36, createdBy: admin._id, image: 'https://images.unsplash.com/photo-1516901408037-c50b5f5ed2b1?w=400&q=80' },

            // Snacks (3 more)
            { name: 'Spring Rolls', description: 'Crispy rolls stuffed with vegetables and noodles.', price: 40, category: 'Snacks', countInStock: 60, available: true, numSales: 175, rating: 4.4, numReviews: 48, createdBy: admin._id, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80' },
            { name: 'Pav Bhaji', description: 'Spiced mashed vegetables served with buttered bread rolls.', price: 60, category: 'Snacks', countInStock: 45, available: true, numSales: 195, rating: 4.6, numReviews: 58, createdBy: admin._id, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80' },
            { name: 'Corn Chaat', description: 'Boiled sweet corn tossed with spices and lemon.', price: 30, category: 'Snacks', countInStock: 70, available: true, numSales: 145, rating: 4.3, numReviews: 38, createdBy: admin._id, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80' },

            // Drinks (3 more)
            { name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice served chilled.', price: 45, category: 'Drinks', countInStock: 60, available: true, numSales: 130, rating: 4.7, numReviews: 44, createdBy: admin._id, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&q=80' },
            { name: 'Buttermilk', description: 'Chilled spiced buttermilk with cumin and coriander.', price: 20, category: 'Drinks', countInStock: 100, available: true, numSales: 280, rating: 4.5, numReviews: 62, createdBy: admin._id, image: 'https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?w=400&q=80' },
            { name: 'Hot Chocolate', description: 'Rich creamy hot chocolate with marshmallows.', price: 55, category: 'Drinks', countInStock: 40, available: true, numSales: 95, rating: 4.6, numReviews: 32, createdBy: admin._id, image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&q=80' },

            // Desserts (4 more)
            { name: 'Brownie', description: 'Rich chocolate brownie served warm with vanilla ice cream.', price: 60, category: 'Desserts', countInStock: 30, available: true, numSales: 120, rating: 4.8, numReviews: 45, createdBy: admin._id, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80' },
            { name: 'Rasgulla', description: 'Soft spongy cottage cheese balls in sugar syrup.', price: 25, category: 'Desserts', countInStock: 50, available: true, numSales: 100, rating: 4.6, numReviews: 38, createdBy: admin._id, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80' },
            { name: 'Fruit Salad', description: 'Fresh seasonal fruits tossed with honey and mint.', price: 50, category: 'Desserts', countInStock: 35, available: true, numSales: 85, rating: 4.4, numReviews: 28, createdBy: admin._id, image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&q=80' },
            { name: 'Chocolate Mousse', description: 'Light and airy chocolate mousse topped with cream.', price: 70, category: 'Desserts', countInStock: 20, available: true, numSales: 65, rating: 4.7, numReviews: 22, createdBy: admin._id, image: 'https://images.unsplash.com/photo-1511715282680-fbf93a50e721?w=400&q=80' },

        ];

        const foods = await Food.insertMany(foodData);
        console.log(`🍽️  Seeded ${foods.length} food items`);

        const ordersData = [
            { user: students[0]._id, items: [{ food: foods[0]._id, quantity: 2, price: foods[0].price }, { food: foods[14]._id, quantity: 1, price: foods[14].price }], total: foods[0].price * 2 + foods[14].price, status: 'paid', isPaid: true, paidAt: new Date('2026-03-14'), staffHandledBy: staff._id },
            { user: students[1]._id, items: [{ food: foods[4]._id, quantity: 1, price: foods[4].price }, { food: foods[9]._id, quantity: 2, price: foods[9].price }], total: foods[4].price + foods[9].price * 2, status: 'ready', isPaid: false, staffHandledBy: staff._id },
            { user: students[0]._id, items: [{ food: foods[5]._id, quantity: 1, price: foods[5].price }], total: foods[5].price, status: 'preparing', isPaid: false, staffHandledBy: staff._id },
            { user: students[1]._id, items: [{ food: foods[10]._id, quantity: 3, price: foods[10].price }, { food: foods[15]._id, quantity: 2, price: foods[15].price }], total: foods[10].price * 3 + foods[15].price * 2, status: 'pending', isPaid: false },
            { user: students[0]._id, items: [{ food: foods[6]._id, quantity: 1, price: foods[6].price }, { food: foods[19]._id, quantity: 1, price: foods[19].price }], total: foods[6].price + foods[19].price, status: 'paid', isPaid: true, paidAt: new Date('2026-03-13'), staffHandledBy: staff._id },
        ];

        const orders = await Order.insertMany(ordersData);
        console.log(`📦 Seeded ${orders.length} orders`);

        console.log('\n🎉 Canteen database seeded successfully!');
        console.log('─────────────────────────────────────────');
        console.log('👤 Admin:   admin@canteen.com  / admin123');
        console.log('👤 Staff:   staff@canteen.com  / staff123');
        console.log('👤 Student: saman@canteen.com  / student123');
        console.log('─────────────────────────────────────────');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
}

seed();