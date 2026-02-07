#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('📝 Running Content Review...\n');

// Content issues to check
const contentIssues = {
  placeholderText: {
    patterns: [
      /Lorem ipsum/gi,
      /placeholder/gi,
      /TODO/gi,
      /FIXME/gi,
      /XXX/gi,
      /temp/gi,
      /demo/gi,
      /sample/gi,
      /test data/gi,
      /mock data/gi,
      /example text/gi,
      /your content here/gi,
      /coming soon/gi,
      /under construction/gi,
      /more info coming/gi,
      /details to follow/gi,
      /content placeholder/gi,
      /dummy text/gi,
      /filler text/gi,
      /lorem/gi,
      /ipsum/gi
    ],
    description: 'Check for placeholder and filler text'
  },
  
  grammarIssues: {
    patterns: [
      /\s{2,}/g, // Multiple spaces
      /\n{3,}/g, // Multiple newlines
      /\t+/g, // Tabs instead of spaces
      /[.]{2,}/g, // Multiple periods
      /[!]{2,}/g, // Multiple exclamation marks
      /[?]{2,}/g, // Multiple question marks
      /\s[,.!?]/g, // Space before punctuation
      /[,.!?]\s\s/g, // Double space after punctuation
      /\b(its|it's)\b/gi, // Common its/it's confusion
      /\b(your|you're)\b/gi, // Common your/you're confusion
      /\b(there|their|they're)\b/gi, // Common there/their/they're confusion
    ],
    description: 'Check for grammar and formatting issues'
  },
  
  toneInconsistency: {
    patterns: [
      /\b(hello|hi|hey)\b/gi, // Too casual greetings
      /\b(awesome|cool|dude|man)\b/gi, // Too casual language
      /\b(obviously|clearly|basically)\b/gi, // Potentially condescending
      /\b(please kindly|kindly please)\b/gi, // Redundant politeness
      /\b(very|really|quite|rather|somewhat)\b\s+\b(very|really|quite|rather|somewhat)\b/gi, // Double qualifiers
    ],
    description: 'Check for tone inconsistencies'
  }
};

// Function to scan directory for files
function scanDirectory(dir, extensions = ['.js', '.jsx', '.ts', '.tsx']) {
  const files = [];
  
  function traverse(currentDir) {
    try {
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          traverse(fullPath);
        } else if (extensions.some(ext => item.endsWith(ext))) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Skip directories we can't read
    }
  }
  
  traverse(dir);
  return files;
}

// Function to check file for content issues
function checkFile(filePath, patterns) {
  const issues = [];
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    patterns.forEach((pattern, index) => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          // Find line number
          const lines = content.split('\n');
          let lineNumber = -1;
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(match)) {
              lineNumber = i + 1;
              break;
            }
          }
          
          issues.push({
            pattern: pattern.toString(),
            match: match.substring(0, 50) + (match.length > 50 ? '...' : ''),
            line: lineNumber,
            severity: 'medium'
          });
        });
      }
    });
  } catch (error) {
    // Skip files we can't read
  }
  
  return issues;
}

// Function to check for consistent medical missionary tone
function checkToneConsistency(content) {
  const professionalTerms = [
    'medical missionary',
    'natural health',
    'wellness',
    'holistic',
    'remedies',
    'health',
    'healing',
    'spiritual',
    'care',
    'treatment',
    'therapy',
    'medicine',
    'healthcare'
  ];
  
  const casualTerms = [
    'awesome',
    'cool',
    'dude',
    'man',
    'bro',
    'sis',
    'hey',
    'what\'s up',
    'gonna',
    'wanna',
    'kinda',
    'sorta'
  ];
  
  let professionalCount = 0;
  let casualCount = 0;
  
  professionalTerms.forEach(term => {
    const matches = content.toLowerCase().match(new RegExp(term, 'g'));
    if (matches) professionalCount += matches.length;
  });
  
  casualTerms.forEach(term => {
    const matches = content.toLowerCase().match(new RegExp(term, 'g'));
    if (matches) casualCount += matches.length;
  });
  
  return {
    professionalCount,
    casualCount,
    isConsistent: casualCount === 0 || (professionalCount > casualCount * 2)
  };
}

// Main review function
function runContentReview() {
  const srcDir = path.join(__dirname, '../src');
  const files = scanDirectory(srcDir);
  
  console.log(`📁 Scanning ${files.length} files...\n`);
  
  let totalIssues = 0;
  let placeholderIssues = 0;
  let grammarIssues = 0;
  let toneIssues = 0;
  
  // Run all content checks
  Object.entries(contentIssues).forEach(([checkName, config]) => {
    console.log(`🔍 Checking ${config.description}...`);
    
    let issues = [];
    files.forEach(file => {
      const fileIssues = checkFile(file, config.patterns);
      fileIssues.forEach(issue => {
        issues.push({
          ...issue,
          file: path.relative(srcDir, file)
        });
      });
    });
    
    if (issues.length > 0) {
      console.log(`❌ Found ${issues.length} issues:`);
      issues.forEach(issue => {
        console.log(`   ${issue.file}:${issue.line} - ${issue.match}`);
      });
      totalIssues += issues.length;
      
      if (checkName === 'placeholderText') placeholderIssues = issues.length;
      if (checkName === 'grammarIssues') grammarIssues = issues.length;
      if (checkName === 'toneInconsistency') toneIssues = issues.length;
    } else {
      console.log(`✅ No issues found`);
    }
    console.log('');
  });
  
  // Check tone consistency
  console.log('🔍 Checking tone consistency...');
  let toneInconsistentFiles = 0;
  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const toneCheck = checkToneConsistency(content);
      if (!toneCheck.isConsistent) {
        toneInconsistentFiles++;
        console.log(`⚠️  ${path.relative(srcDir, file)} - Tone may be inconsistent`);
      }
    } catch (error) {
      // Skip files we can't read
    }
  });
  
  if (toneInconsistentFiles === 0) {
    console.log(`✅ Tone consistency maintained`);
  }
  console.log('');
  
  // Summary
  console.log('📊 Content Review Summary:');
  console.log(`   Total issues: ${totalIssues}`);
  console.log(`   Placeholder text: ${placeholderIssues}`);
  console.log(`   Grammar issues: ${grammarIssues}`);
  console.log(`   Tone inconsistencies: ${toneIssues}`);
  
  if (totalIssues > 0) {
    console.log('\n⚠️  Content issues found. Review and fix if necessary.');
    console.log('Focus on removing placeholder text and improving grammar.');
  } else {
    console.log('\n✅ Content review passed! No critical issues found.');
  }
  
  // Recommendations
  console.log('\n💡 Content Recommendations:');
  console.log('1. Replace all placeholder text with real content');
  console.log('2. Maintain professional medical missionary tone');
  console.log('3. Use consistent terminology throughout');
  console.log('4. Check for proper grammar and punctuation');
  console.log('5. Ensure all content serves the user\'s needs');
}

// Run the review
if (require.main === module) {
  runContentReview();
}

module.exports = { runContentReview };
