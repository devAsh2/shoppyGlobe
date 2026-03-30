import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'Model', 'cart.model.js');

try {
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const expectedLine = "const cartSchema = new mongoose.Schema({";
    if (fileContent.includes(expectedLine)) {
        console.log("VERIFICATION PASSED");
        process.exit(0);
    } else {
        console.log("VERIFICATION FAILED: Expected line not found in cart.model.js");
        process.exit(1);
    }
} catch (error) {
    console.log("VERIFICATION FAILED: Error reading file -", error.message);
    process.exit(1);
}