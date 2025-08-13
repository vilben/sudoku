import path from "path";
import fs from "fs";

const indexFile = path.join(process.cwd(), ".output/public/index.html");
const notFoundFile = path.join(process.cwd(), ".output/public/404.html");
const noJekyllFile = path.join(process.cwd(), ".output/public/.nojekyll");

if (fs.existsSync(indexFile)) {
  fs.copyFileSync(indexFile, notFoundFile);
  console.log("✅ Copied index.html → 404.html");
} else {
  console.error("❌ index.html not found. Make sure the build finished.");
}

fs.writeFileSync(noJekyllFile, "");

if (fs.existsSync(indexFile)) {
  console.log("✅ Created .noJekyll file");
} else {
  console.error("❌ Couldn't create .noJekyll file");
}
