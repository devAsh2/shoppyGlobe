import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'Model', 'cart.model.js');

try {
    const fileContent = fs.readFileSync(filePath, 'utf8');

    if (fileContent.includes('mongoose.Schema')) {
        console.log("VERIFICATION PASSED");
        process.exit(0);
    } else {
        console.log("VERIFICATION FAILED: 'mongoose.Schema' not found in cart.model.js");
        process.exit(1);
    }
} catch (error) {
    console.log(`VERIFICATION FAILED: Error reading file - ${error.message}`);
    process.exit(1);
}