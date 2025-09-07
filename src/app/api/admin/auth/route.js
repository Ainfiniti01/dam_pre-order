import sql from "@/app/api/utils/sql";

// Admin login (POST)
export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return new Response(JSON.stringify({ error: 'Missing credentials' }), { status: 400 });
    }

    // Check if admin user exists
    const admin = await sql`
      SELECT * FROM admin_users 
      WHERE username = ${username} OR email = ${username}
    `;

    if (admin.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    }

    // For demo: simple password check
    // In production, use hashed passwords + password_verify
    const validPassword = password === 'password123';

    if (!validPassword) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    }

    // Create session token (demo purposes)
    const sessionToken = btoa(`${admin[0].id}-${Date.now()}`);

    return new Response(JSON.stringify({
      success: true,
      token: sessionToken,
      admin: {
        id: admin[0].id,
        username: admin[0].username,
        email: admin[0].email
      }
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error('Admin login error:', error);
    return new Response(JSON.stringify({ error: 'Login failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

// Token validation (GET)
export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'No token provided' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const token = authHeader.substring(7);

    try {
      const decoded = atob(token);
      const [adminId, timestamp] = decoded.split('-');

      // Token age check (24h)
      const tokenAge = Date.now() - parseInt(timestamp);
      if (tokenAge > 24 * 60 * 60 * 1000) {
        return new Response(JSON.stringify({ error: 'Token expired' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
      }

      const admin = await sql`
        SELECT id, username, email FROM admin_users 
        WHERE id = ${adminId}
      `;

      if (admin.length === 0) {
        return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
      }

      return new Response(JSON.stringify({ valid: true, admin: admin[0] }), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (err) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

  } catch (error) {
    console.error('Token validation error:', error);
    return new Response(JSON.stringify({ error: 'Token validation failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
