const fs = require('fs');
const { execSync } = require('child_process');

const inputDate = process.argv[2];
const minCommits = parseInt(process.argv[3], 10);
const maxCommits = parseInt(process.argv[4], 10);

if (!inputDate || isNaN(new Date(inputDate))) {
  console.error('❌ Please provide a valid start date (e.g. 2024-01-01)');
  process.exit(1);
}

if (isNaN(minCommits) || isNaN(maxCommits) || minCommits < 1 || maxCommits < minCommits) {
  console.error('❌ Please provide valid min and max commit numbers (e.g. 3 7)');
  process.exit(1);
}

const startDate = new Date(inputDate);
const today = new Date();

for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
  const commitCount = Math.floor(Math.random() * (maxCommits - minCommits + 1)) + minCommits;

  for (let j = 0; j < commitCount; j++) {
    const formatted = d.toISOString().slice(0, 19).replace('T', ' ');
    fs.appendFileSync('file.txt', formatted + '\n');
    execSync('git add .');
    execSync(`git commit --date="${formatted}" -m "Commit Saved In ${formatted}"`);
    console.log(`Commit Saved In ${formatted}`);
  }
}

execSync('git push -u origin main');
console.log("Finish :)");
