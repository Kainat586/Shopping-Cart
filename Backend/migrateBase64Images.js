import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import Product from './models/Product.js'; // Adjust path if needed

// Simulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect('mongodb://localhost:27017/shopping_cart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

async function migrateImages() {
  try {
    const products = await Product.find();

    for (let product of products) {
      if (product.image && product.image.startsWith('data:image')) {
        const matches = product.image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) continue;

        const ext = matches[1].split('/')[1];
        const buffer = Buffer.from(matches[2], 'base64');
        const filename = `${product._id}.${ext}`;
        const filepath = path.join(uploadsDir, filename);

        fs.writeFileSync(filepath, buffer);
        product.image = filename;
        await product.save();

        console.log(`✅ Migrated: ${filename}`);
      }
    }

    console.log('🎉 Migration completed');
    process.exit();
  } catch (err) {
    console.error('❌ Error during migration:', err);
    process.exit(1);
  }
}

migrateImages();
