// Script de test de connexion au backend
// Exécuter avec: node test-backend-connection.js

const http = require('http');

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://172.23.16.1:3000';

console.log('🔍 Test de connexion au backend...\n');
console.log(`📍 URL du backend: ${BACKEND_URL}\n`);

// Test 1: Endpoint /health ou /
testEndpoint('/');
testEndpoint('/health');
testEndpoint('/products');
testEndpoint('/api/products');

function testEndpoint(path) {
  const url = new URL(path, BACKEND_URL);
  
  console.log(`\n🚀 Test: ${url.href}`);
  
  const req = http.get(url, (res) => {
    console.log(`   ✅ Status: ${res.statusCode}`);
    console.log(`   📋 Headers:`, JSON.stringify(res.headers, null, 2));
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        console.log(`   📦 Response:`, JSON.stringify(json, null, 2).substring(0, 200));
      } catch (e) {
        console.log(`   📄 Response (text):`, data.substring(0, 200));
      }
    });
  });
  
  req.on('error', (error) => {
    console.log(`   ❌ Error: ${error.message}`);
  });
  
  req.setTimeout(5000, () => {
    console.log(`   ⏱️  Timeout`);
    req.destroy();
  });
}
