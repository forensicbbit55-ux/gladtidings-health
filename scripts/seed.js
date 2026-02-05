const { Pool } = require('pg')
require('dotenv').config({ path: '.env.local' })

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

async function seedDatabase() {
  const client = await pool.connect()
  
  try {
    console.log('🌱 Starting database seeding...')
    
    // Begin transaction
    await client.query('BEGIN')
    
    // Insert categories
    console.log('📁 Inserting categories...')
    const categoriesResult = await client.query(`
      INSERT INTO categories (name) VALUES 
        ($1), ($2)
      ON CONFLICT (name) DO NOTHING
      RETURNING id, name
    `, ['Herbal Remedies', 'Nutrition'])
    
    console.log(`✅ Inserted ${categoriesResult.rows.length} categories:`)
    categoriesResult.rows.forEach(cat => {
      console.log(`   - ${cat.name} (ID: ${cat.id})`)
    })
    
    // Get category IDs for remedies
    const herbalCategory = categoriesResult.rows.find(c => c.name === 'Herbal Remedies')
    const nutritionCategory = categoriesResult.rows.find(c => c.name === 'Nutrition')
    
    // Insert remedies
    console.log('💊 Inserting remedies...')
    const remediesResult = await client.query(`
      INSERT INTO remedies (title, description, usage, image_url, category_id, is_published) VALUES 
        ($1, $2, $3, $4, $5, $6),
        ($7, $8, $9, $10, $11, $12),
        ($13, $14, $15, $16, $17, $18)
      ON CONFLICT DO NOTHING
      RETURNING id, title, category_id
    `, [
      // Herbal Remedy 1
      'Echinacea Tea',
      'Boosts immune system and helps fight infections. Known for its anti-inflammatory and antioxidant properties.',
      'Drink 1-2 cups daily when feeling under the weather. Add honey and lemon for better taste.',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
      herbalCategory.id,
      true,
      
      // Herbal Remedy 2
      'Peppermint Oil',
      'Soothes digestive issues and relieves headaches. Natural remedy for nausea and mental clarity.',
      'Apply 2-3 drops to temples for headache relief. Add to warm water for digestive comfort.',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      herbalCategory.id,
      true,
      
      // Nutrition Remedy
      'Turmeric Golden Milk',
      'Anti-inflammatory drink that supports joint health and overall wellness. Rich in curcumin.',
      'Mix 1 teaspoon turmeric powder with warm milk and honey. Drink before bedtime for best results.',
      'https://images.unsplash.com/photo-1589458843179-91e5c0c5f6d0?w=400',
      nutritionCategory.id,
      true
    ])
    
    console.log(`✅ Inserted ${remediesResult.rows.length} remedies:`)
    remediesResult.rows.forEach(remedy => {
      console.log(`   - ${remedy.title} (ID: ${remedy.id})`)
    })
    
    // Commit transaction
    await client.query('COMMIT')
    
    console.log('🎉 Database seeding completed successfully!')
    
    // Show summary
    console.log('\n📊 Seeding Summary:')
    console.log(`   Categories: ${categoriesResult.rows.length}`)
    console.log(`   Remedies: ${remediesResult.rows.length}`)
    console.log(`   Total records: ${categoriesResult.rows.length + remediesResult.rows.length}`)
    
  } catch (error) {
    // Rollback on error
    await client.query('ROLLBACK')
    console.error('❌ Error seeding database:', error)
    throw error
  } finally {
    client.release()
    await pool.end()
  }
}

// Run the seeding function
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('\n✨ Seeding completed. Script finished successfully.')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n💥 Seeding failed:', error)
      process.exit(1)
    })
}

module.exports = { seedDatabase }
