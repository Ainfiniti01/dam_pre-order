import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('product_id');
    const status = searchParams.get('status') || 'approved';

    let query = `
      SELECT r.*, p.name as product_name
      FROM reviews r
      LEFT JOIN products p ON r.product_id = p.id
      WHERE r.status = $1
    `;
    
    const params = [status];

    if (productId) {
      query += ` AND r.product_id = $2`;
      params.push(productId);
    }

    query += ` ORDER BY r.created_at DESC`;

    const reviews = await sql(query, params);
    
    return Response.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return Response.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { product_id, customer_name, customer_email, rating, comment } = body;

    const result = await sql`
      INSERT INTO reviews (product_id, customer_name, customer_email, rating, comment)
      VALUES (${product_id}, ${customer_name}, ${customer_email}, ${rating}, ${comment})
      RETURNING *
    `;

    return Response.json(result[0]);
  } catch (error) {
    console.error('Error creating review:', error);
    return Response.json({ error: 'Failed to create review' }, { status: 500 });
  }
}