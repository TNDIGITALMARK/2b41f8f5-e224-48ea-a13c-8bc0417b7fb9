import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://hfndfmtxhqvubnfiwzlz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmbmRmbXR4aHF2dWJuZml3emx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2Mjk4MDgsImV4cCI6MjA3NjIwNTgwOH0.n0NK_Ov03-UbDQYr5mio3ggYa5XTN-XI1kB6X81N4nA',
  {
    global: {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJyb2xlIjoiYW5vbiIsInRlbmFudF9pZCI6IkhvelFjRmE1ZTZVZjNCd3pJNjFxTHJjS2I2cjEiLCJwcm9qZWN0X2lkIjoiMmI0MWY4ZjUtZTIyNC00OGVhLWExM2MtOGJjMDQxN2I3ZmI5IiwianRpIjoiYjExZmY4MjEtMTMwMy00NWNkLTg0ZjUtYTlkN2U1YTY1ZDcxIiwiaWF0IjoxNzYyOTU3MTY4LCJleHAiOjE3NjI5NTk4Njh9.Ibm8Cmi_u0oQEDCj9ordeZRUrMjo83XqC1ybas69sAg`
      }
    }
  }
);

const TENANT_ID = 'HozQcFa5e6Uf3BwzI61qLrcKb6r1';
const PROJECT_ID = '2b41f8f5-e224-48ea-a13c-8bc0417b7fb9';

async function seedData() {
  console.log('🌱 Seeding StepMax sneaker store data...\n');

  // Check existing data
  const { data: existingProducts } = await supabase
    .from('products')
    .select('id')
    .limit(1);

  if (existingProducts && existingProducts.length > 0) {
    console.log('✅ Data already exists, skipping seed');
    return;
  }

  // Create categories
  console.log('Creating categories...');
  const categoriesData = [
    { name: 'Running', slug: 'running', description: 'High-performance running shoes', display_order: 1 },
    { name: 'Basketball', slug: 'basketball', description: 'Court-ready basketball sneakers', display_order: 2 },
    { name: 'Lifestyle', slug: 'lifestyle', description: 'Casual everyday sneakers', display_order: 3 },
    { name: 'Training', slug: 'training', description: 'Cross-training and gym shoes', display_order: 4 },
  ];

  const { data: categories, error: catError } = await supabase
    .from('categories')
    .insert(
      categoriesData.map(cat => ({
        ...cat,
        tenantid: TENANT_ID,
        projectid: PROJECT_ID,
      }))
    )
    .select();

  if (catError) {
    console.error('❌ Error creating categories:', catError);
    return;
  }

  console.log(`✅ Created ${categories.length} categories`);

  // Create products
  console.log('\nCreating products...');
  const productsData = [
    {
      category_id: categories[0].id, // Running
      name: 'AirMax Velocity Pro',
      slug: 'airmax-velocity-pro',
      description: 'Premium running shoes with advanced cushioning technology for maximum comfort and performance.',
      price: 189.99,
      original_price: 229.99,
      brand: 'Nike',
      sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
      colors: [
        { name: 'Black/White', hex: '#000000' },
        { name: 'Blue/Orange', hex: '#1E40AF' },
      ],
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'],
      featured: true,
      in_stock: true,
      stock_quantity: 45,
      rating: 4.8,
      review_count: 234,
      tags: ['running', 'cushioning', 'breathable'],
    },
    {
      category_id: categories[1].id, // Basketball
      name: 'Court King Elite',
      slug: 'court-king-elite',
      description: 'Professional-grade basketball shoes with superior ankle support and responsive cushioning.',
      price: 159.99,
      original_price: null,
      brand: 'Jordan',
      sizes: ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
      colors: [
        { name: 'Red/Black', hex: '#DC2626' },
        { name: 'White/Gold', hex: '#FFFFFF' },
      ],
      images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800'],
      featured: true,
      in_stock: true,
      stock_quantity: 32,
      rating: 4.9,
      review_count: 189,
      tags: ['basketball', 'high-top', 'performance'],
    },
    {
      category_id: categories[2].id, // Lifestyle
      name: 'Urban Street Classic',
      slug: 'urban-street-classic',
      description: 'Timeless design meets modern comfort. Perfect for everyday wear with premium leather construction.',
      price: 129.99,
      original_price: 149.99,
      brand: 'Adidas',
      sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
      colors: [
        { name: 'White/Green', hex: '#FFFFFF' },
        { name: 'Black/Gold', hex: '#000000' },
        { name: 'Navy/White', hex: '#1E3A8A' },
      ],
      images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800'],
      featured: true,
      in_stock: true,
      stock_quantity: 67,
      rating: 4.7,
      review_count: 412,
      tags: ['lifestyle', 'casual', 'leather'],
    },
    {
      category_id: categories[3].id, // Training
      name: 'FlexFit Trainer Pro',
      slug: 'flexfit-trainer-pro',
      description: 'Versatile training shoes designed for cross-training, HIIT, and gym workouts.',
      price: 139.99,
      original_price: null,
      brand: 'Reebok',
      sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
      colors: [
        { name: 'Gray/Orange', hex: '#6B7280' },
        { name: 'Black/Red', hex: '#000000' },
      ],
      images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800'],
      featured: false,
      in_stock: true,
      stock_quantity: 28,
      rating: 4.6,
      review_count: 156,
      tags: ['training', 'versatile', 'stability'],
    },
    {
      category_id: categories[0].id, // Running
      name: 'Sprint Master 2024',
      slug: 'sprint-master-2024',
      description: 'Lightweight racing shoe built for speed with carbon fiber plate technology.',
      price: 249.99,
      original_price: null,
      brand: 'Nike',
      sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
      colors: [
        { name: 'Neon Yellow/Black', hex: '#FEF08A' },
        { name: 'Pink/White', hex: '#EC4899' },
      ],
      images: ['https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800'],
      featured: false,
      in_stock: true,
      stock_quantity: 18,
      rating: 4.9,
      review_count: 87,
      tags: ['running', 'racing', 'lightweight'],
    },
    {
      category_id: categories[2].id, // Lifestyle
      name: 'Retro Wave 90s',
      slug: 'retro-wave-90s',
      description: 'Nostalgic 90s-inspired design with chunky sole and bold colorways.',
      price: 119.99,
      original_price: 159.99,
      brand: 'New Balance',
      sizes: ['6', '7', '8', '9', '10', '11', '12'],
      colors: [
        { name: 'Purple/Teal', hex: '#7C3AED' },
        { name: 'Orange/Blue', hex: '#F97316' },
        { name: 'Pink/White', hex: '#F472B6' },
      ],
      images: ['https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800'],
      featured: false,
      in_stock: true,
      stock_quantity: 54,
      rating: 4.5,
      review_count: 298,
      tags: ['lifestyle', 'retro', 'chunky'],
    },
    {
      category_id: categories[1].id, // Basketball
      name: 'Dunk Force Mid',
      slug: 'dunk-force-mid',
      description: 'Mid-top basketball shoe with classic styling and modern performance features.',
      price: 139.99,
      original_price: null,
      brand: 'Nike',
      sizes: ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
      colors: [
        { name: 'Black/White', hex: '#000000' },
        { name: 'Royal Blue', hex: '#1D4ED8' },
      ],
      images: ['https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800'],
      featured: false,
      in_stock: true,
      stock_quantity: 41,
      rating: 4.7,
      review_count: 203,
      tags: ['basketball', 'mid-top', 'classic'],
    },
    {
      category_id: categories[3].id, // Training
      name: 'PowerLift Max',
      slug: 'powerlift-max',
      description: 'Weightlifting shoes with elevated heel and rock-solid stability for heavy lifts.',
      price: 179.99,
      original_price: null,
      brand: 'Adidas',
      sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
      colors: [
        { name: 'Black/Red', hex: '#000000' },
        { name: 'White/Black', hex: '#FFFFFF' },
      ],
      images: ['https://images.unsplash.com/photo-1520256862855-398228c41684?w=800'],
      featured: false,
      in_stock: true,
      stock_quantity: 22,
      rating: 4.8,
      review_count: 134,
      tags: ['training', 'weightlifting', 'stability'],
    },
  ];

  const { data: products, error: prodError } = await supabase
    .from('products')
    .insert(
      productsData.map(prod => ({
        ...prod,
        tenantid: TENANT_ID,
        projectid: PROJECT_ID,
      }))
    )
    .select();

  if (prodError) {
    console.error('❌ Error creating products:', prodError);
    return;
  }

  console.log(`✅ Created ${products.length} products`);
  console.log('\n✨ Seed data completed successfully!');
}

seedData().catch(console.error);
