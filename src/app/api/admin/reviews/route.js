import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const status = url.searchParams.get('status') || 'pending';
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    const reviews = await sql`
      SELECT r.*, p.name as product_name, p.image_url as product_image
      FROM reviews r
      LEFT JOIN products p ON r.product_id = p.id
      WHERE r.status = ${status}
      ORDER BY r.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    // Get total count
    const totalResult = await sql`
      SELECT COUNT(*) as total FROM reviews WHERE status = ${status}
    `;
    const total = parseInt(totalResult[0].total);

    return Response.json({
      reviews,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching reviews:', error);
    return Response.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}