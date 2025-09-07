import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE 1=1';
    const params = [];
    
    if (status) {
      whereClause += ` AND status = $${params.length + 1}`;
      params.push(status);
    }

    const query = `
      SELECT o.*, p.name as product_name, p.image_url as product_image
      FROM orders o
      LEFT JOIN products p ON o.product_id = p.id
      ${whereClause}
      ORDER BY o.created_at DESC
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;
    
    params.push(limit, offset);
    const orders = await sql(query, params);

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM orders ${whereClause}`;
    const totalResult = await sql(countQuery, params.slice(0, -2));
    const total = parseInt(totalResult[0].total);

    return Response.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    return Response.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { customer_name, customer_email, customer_phone, product_id, quantity, total_amount, whatsapp_message } = body;

    const result = await sql`
      INSERT INTO orders (customer_name, customer_email, customer_phone, product_id, quantity, total_amount, whatsapp_message)
      VALUES (${customer_name}, ${customer_email}, ${customer_phone}, ${product_id}, ${quantity || 1}, ${total_amount}, ${whatsapp_message})
      RETURNING *
    `;

    return Response.json(result[0]);

  } catch (error) {
    console.error('Error creating order:', error);
    return Response.json({ error: 'Failed to create order' }, { status: 500 });
  }
}