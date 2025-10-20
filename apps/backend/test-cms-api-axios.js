// Simple test script to verify CMS API is working with axios
const axios = require('axios');

async function testCmsApi() {
  try {
    console.log('Testing CMS API with axios...');
    
    // Test getting all pages
    const response = await axios.get('http://localhost:9005/api/cms/pages');
    console.log('Status:', response.status);
    console.log('Data:', response.data);
  } catch (error) {
    console.log('Error:', error.message);
    if (error.response) {
      console.log('Response status:', error.response.status);
      console.log('Response data:', error.response.data);
    }
  }
}

testCmsApi();