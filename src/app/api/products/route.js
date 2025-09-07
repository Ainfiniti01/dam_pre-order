import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');

    let query = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.status = 'active'
    `;
    
    const params = [];
    let paramCount = 0;

    if (category && category !== 'all') {
      paramCount++;
      query += ` AND c.slug = $${paramCount}`;
      params.push(category);
    }

    if (search) {
      paramCount++;
      query += ` AND (LOWER(p.name) LIKE LOWER($${paramCount}) OR LOWER(p.description) LIKE LOWER($${paramCount}))`;
      params.push(`%${search}%`);
    }

    if (featured === 'true') {
      query += ` AND p.is_featured = true`;
    }

    query += ` ORDER BY p.created_at DESC`;

    const products = await sql(query, params);
    
    return Response.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return Response.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, price, category: categorySlug, imageUrl: image_url, status, isOnSale, limitedStock, isNew, discountPercentage, isPreOrder, hasFreeDelivery } = body;

    let categoryId;
    const existingCategory = await sql`SELECT id FROM categories WHERE slug = ${categorySlug}`;

    if (existingCategory.length > 0) {
      categoryId = existingCategory[0].id;
    } else {
      const newCategory = await sql`
        INSERT INTO categories (name, slug)
        VALUES (${categorySlug}, ${categorySlug})
        RETURNING id
      `;
      categoryId = newCategory[0].id;
    }

    const result = await sql`
      INSERT INTO products (name, description, price, category_id, image_url, status, is_on_sale, limited_stock, is_new, discount_percentage, is_pre_order, has_free_delivery)
      VALUES (${name}, ${description}, ${price}, ${categoryId}, ${image_url}, ${status}, ${isOnSale}, ${limitedStock}, ${isNew}, ${discountPercentage}, ${isPreOrder}, ${hasFreeDelivery})
      RETURNING *
    `;

    return Response.json(result[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    return Response.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
