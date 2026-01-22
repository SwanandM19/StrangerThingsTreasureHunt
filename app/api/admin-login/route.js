export async function POST(request) {
  try {
    const { username, password } = await request.json();
    
    const correctUsername = process.env.ADMIN_USERNAME;
    const correctPassword = process.env.ADMIN_PASSWORD;
    
    if (username === correctUsername && password === correctPassword) {
      return Response.json({ success: true });
    } else {
      return Response.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
