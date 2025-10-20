// Simple test script to verify CMS API is working
async function testCmsApi() {
  try {
    console.log('Testing CMS API...');
    
    // Test getting all pages
    const response = await fetch('http://localhost:9005/api/cms/pages');
    console.log('Status:', response.status);
    
    if (response.ok) {
      const pages = await response.json();
      console.log('Pages:', pages);
    } else {
      console.log('Error:', response.status, response.statusText);
    }
  } catch (error) {
    console.log('Error:', error.message);
  }
}

testCmsApi();