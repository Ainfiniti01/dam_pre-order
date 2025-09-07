import sql from "@/app/api/utils/sql";

export async function GET() {
  try {
    const subscribers = await sql`
      SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC
    `;
    
    return Response.json(subscribers);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return Response.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, name } = body;

    const result = await sql`
      INSERT INTO newsletter_subscribers (email, name)
      VALUES (${email}, ${name || null})
      ON CONFLICT (email) DO NOTHING
      RETURNING *
    `;

    if (result.length === 0) {
      return Response.json({ message: 'Email already subscribed' }, { status: 200 });
    }

    return Response.json(result[0]);
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return Response.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}