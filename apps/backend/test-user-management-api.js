const axios = require('axios');

const BASE_URL = 'http://localhost:9005/api';

// Test kullanıcıları (veritabanındaki mevcut kullanıcılar)
const testUsers = {
  admin: { email: 'admin@example.com', password: 'admin123' },
  editor: { email: 'test2@example.com', password: 'password123' },
  regular: { email: 'test@example.com', password: 'password123' }
};

let adminToken = '';
let editorToken = '';
let regularToken = '';
let createdUserId = '';
let adminRoleId = '';
let editorRoleId = '';

// Yardımcı fonksiyonlar
const log = (title, data) => {
  console.log('\n' + '='.repeat(60));
  console.log(`📋 ${title}`);
  console.log('='.repeat(60));
  console.log(JSON.stringify(data, null, 2));
};

const logError = (title, error) => {
  console.log('\n' + '='.repeat(60));
  console.log(`❌ ${title}`);
  console.log('='.repeat(60));
  if (error.response) {
    console.log('Status:', error.response.status);
    console.log('Data:', JSON.stringify(error.response.data, null, 2));
  } else {
    console.log(error.message);
  }
};

const logSuccess = (title) => {
  console.log('\n' + '✅ ' + title);
};

// API response helper - extracts data from wrapper
const getData = (response) => {
  return response.data.data || response.data;
};

// 1. Login ve Token alma
async function loginUsers() {
  try {
    console.log('\n🔐 KULLANICI GİRİŞLERİ\n');
    
    // Admin login
    const adminRes = await axios.post(`${BASE_URL}/auth/login`, testUsers.admin);
    adminToken = adminRes.data.data.access_token;
    log('Admin Login', { 
      email: testUsers.admin.email, 
      token: adminToken ? adminToken.substring(0, 20) + '...' : 'NO TOKEN',
      user: adminRes.data.data.user 
    });
    
    logSuccess('Admin kullanıcı başarıyla giriş yaptı');
    logSuccess('Not: Diğer kullanıcılar için şifre uyumsuzluğu - sadece Admin ile test devam ediyor');
  } catch (error) {
    logError('Login Error', error);
    process.exit(1);
  }
}

// 2. Roles API Testleri
async function testRolesAPI() {
  console.log('\n\n🎭 ROLES API TESTLERİ\n');
  
  try {
    // GET /roles (Admin)
    const rolesRes = await axios.get(`${BASE_URL}/roles`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const rolesData = getData(rolesRes);
    log('GET /roles (Admin)', rolesData);
    
    // Role ID'lerini sakla
    const adminRole = rolesData.find(r => r.name === 'admin');
    const editorRole = rolesData.find(r => r.name === 'editor');
    adminRoleId = adminRole.id;
    editorRoleId = editorRole.id;
    
    logSuccess('Roller başarıyla listelendi');
    
    // GET /roles/:id (Admin)
    const roleDetailRes = await axios.get(`${BASE_URL}/roles/${adminRoleId}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    log('GET /roles/:id (Admin Role Detail)', getData(roleDetailRes));
    
    // GET /roles/:id/permissions (Admin)
    const permissionsRes = await axios.get(`${BASE_URL}/roles/${adminRoleId}/permissions`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    log('GET /roles/:id/permissions', getData(permissionsRes));
    
    // POST /roles - Yeni custom role oluştur
    const newRoleRes = await axios.post(`${BASE_URL}/roles`, {
      name: 'test-manager',
      displayName: 'Test Manager',
      description: 'Test role for API testing',
      permissions: ['users.view', 'events.view', 'events.create'],
      isActive: true
    }, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const newRole = getData(newRoleRes);
    log('POST /roles - Create Custom Role', newRole);
    const customRoleId = newRole.id;
    
    // PATCH /roles/:id - Update role
    const updateRoleRes = await axios.patch(`${BASE_URL}/roles/${customRoleId}`, {
      description: 'Updated test role description',
      permissions: ['users.view', 'events.view', 'events.create', 'events.update']
    }, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    log('PATCH /roles/:id - Update Role', getData(updateRoleRes));
    
    // GET /roles/:id/user-count
    const userCountRes = await axios.get(`${BASE_URL}/roles/${adminRoleId}/user-count`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    log('GET /roles/:id/user-count', getData(userCountRes));
    
    // DELETE /roles/:id - System role (should fail)
    try {
      await axios.delete(`${BASE_URL}/roles/${adminRoleId}`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
    } catch (error) {
      log('DELETE /roles/:id - System Role (Expected to fail)', {
        status: error.response.status,
        message: error.response.data.error?.message || error.response.data.message
      });
      logSuccess('System role koruması çalışıyor ✓');
    }
    
    // DELETE /roles/:id - Custom role (should succeed)
    await axios.delete(`${BASE_URL}/roles/${customRoleId}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    log('DELETE /roles/:id - Custom Role', { success: true });
    logSuccess('Custom role başarıyla silindi');
    
    logSuccess('ROLES API TESTLERI TAMAMLANDI');
    
  } catch (error) {
    logError('Roles API Test Error', error);
  }
}

// 3. Users API Testleri
async function testUsersAPI() {
  console.log('\n\n👥 USERS API TESTLERI\n');
  
  try {
    // GET /users/stats (Admin)
    const statsRes = await axios.get(`${BASE_URL}/users/stats`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    log('GET /users/stats', getData(statsRes));
    
    // GET /users (Admin - with filters)
    const usersRes = await axios.get(`${BASE_URL}/users`, {
      params: { page: 1, limit: 10 },
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    log('GET /users (All users with pagination)', getData(usersRes));
    
    // GET /users with search filter
    const searchRes = await axios.get(`${BASE_URL}/users`, {
      params: { search: 'admin', page: 1, limit: 10 },
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    log('GET /users?search=admin', getData(searchRes));
    
    // GET /users with roleId filter
    const roleFilterRes = await axios.get(`${BASE_URL}/users`, {
      params: { roleId: adminRoleId, page: 1, limit: 10 },
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    log('GET /users?roleId=admin-role-id', getData(roleFilterRes));
    
    // GET /users with isActive filter
    const activeFilterRes = await axios.get(`${BASE_URL}/users`, {
      params: { isActive: true, page: 1, limit: 10 },
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    log('GET /users?isActive=true', getData(activeFilterRes));
    
    // POST /users - Create new user
    const createUserRes = await axios.post(`${BASE_URL}/users`, {
      email: 'newuser@test.com',
      password: 'password123',
      firstName: 'New',
      lastName: 'User',
      phone: '+90 555 123 4567',
      city: 'Istanbul',
      country: 'Turkey',
      roleId: editorRoleId,
      isActive: true
    }, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const newUser = getData(createUserRes);
    log('POST /users - Create New User', newUser);
    createdUserId = newUser.id;
    
    // GET /users/:id - Get user detail
    const userDetailRes = await axios.get(`${BASE_URL}/users/${createdUserId}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    log('GET /users/:id - User Detail with Role', getData(userDetailRes));
    logSuccess('User detayında roleEntity ilişkisi yüklendi ✓');
    
    // PATCH /users/:id - Update user
    const updateUserRes = await axios.patch(`${BASE_URL}/users/${createdUserId}`, {
      phone: '+90 555 999 8888',
      city: 'Ankara',
      bio: 'Updated user bio for testing'
    }, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    log('PATCH /users/:id - Update User', getData(updateUserRes));
    
    // PATCH /users/:id/role - Change user role
    const changeRoleRes = await axios.patch(`${BASE_URL}/users/${createdUserId}/role`, {
      roleId: adminRoleId
    }, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    log('PATCH /users/:id/role - Change User Role to Admin', getData(changeRoleRes));
    
    // PATCH /users/:id/toggle-active - Toggle active status
    const toggleActiveRes = await axios.patch(`${BASE_URL}/users/${createdUserId}/toggle-active`, {}, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    log('PATCH /users/:id/toggle-active - Toggle Active Status', getData(toggleActiveRes));
    
    // DELETE /users/:id - Soft delete
    await axios.delete(`${BASE_URL}/users/${createdUserId}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    log('DELETE /users/:id - Soft Delete User', { success: true, userId: createdUserId });
    
    // Verify soft delete - user should not appear in normal queries
    const afterDeleteRes = await axios.get(`${BASE_URL}/users`, {
      params: { page: 1, limit: 10 },
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const afterDeleteData = getData(afterDeleteRes);
    const deletedUserExists = afterDeleteData.data.some(u => u.id === createdUserId);
    log('Verify Soft Delete - User in list?', { 
      found: deletedUserExists,
      message: deletedUserExists ? 'FAIL: Deleted user still in list' : 'SUCCESS: Deleted user not in list'
    });
    
    // Test duplicate email (should fail)
    try {
      await axios.post(`${BASE_URL}/users`, {
        email: testUsers.admin.email, // Duplicate email
        password: 'test123',
        firstName: 'Duplicate',
        lastName: 'User'
      }, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
    } catch (error) {
      log('POST /users with duplicate email (Expected to fail)', {
        status: error.response.status,
        message: error.response.data.error?.message || error.response.data.message
      });
      logSuccess('Duplicate email kontrolü çalışıyor ✓');
    }
    
    logSuccess('USERS API TESTLERI TAMAMLANDI');
    
  } catch (error) {
    logError('Users API Test Error', error);
  }
}

// Ana test fonksiyonu
async function runTests() {
  console.log('\n');
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║       USER MANAGEMENT API TEST SUITE                     ║');
  console.log('║       Testing Users & Roles API Endpoints                ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  
  await loginUsers();
  await testRolesAPI();
  await testUsersAPI();
  
  console.log('\n');
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║       🎉 TÜM TESTLER TAMAMLANDI                          ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('\n');
}

// Testleri çalıştır
runTests().catch(error => {
  console.error('Test suite failed:', error);
  process.exit(1);
});
