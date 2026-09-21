import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query(`
      SELECT 
        id, 
        client_name AS name, 
        location, 
        tour_name AS tour, 
        rating, 
        review_text AS text, 
        travel_date AS date,
        created_at
      FROM reviews 
      WHERE is_approved = TRUE 
      ORDER BY created_at DESC, id DESC
    `);

    return NextResponse.json({
      success: true,
      reviews: result.rows
    });
  } catch (error) {
    console.error('Error fetching approved reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { clientName, clientPhone, clientEmail, location, tourName, rating, reviewText, travelDate, leadId, lead_id } = body;
    const finalLeadId = leadId || lead_id ? parseInt(leadId || lead_id, 10) : null;

    if (!clientName || !clientPhone || !reviewText) {
      return NextResponse.json({ 
        error: 'Name, contact number, and review details are required.' 
      }, { status: 400 });
    }

    const cleanRating = Math.min(5, Math.max(1, parseInt(rating, 10) || 5));

    const insertRes = await query(`
      INSERT INTO reviews (
        client_name, 
        client_phone, 
        client_email, 
        location, 
        tour_name, 
        rating, 
        review_text, 
        travel_date, 
        is_approved,
        lead_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, FALSE, $9)
      RETURNING id, client_name, rating, is_approved, lead_id, created_at
    `, [
      clientName.trim(),
      clientPhone.trim(),
      clientEmail ? clientEmail.trim() : null,
      location ? location.trim() : 'India',
      tourName ? tourName.trim() : 'Sikkim Tour',
      cleanRating,
      reviewText.trim(),
      travelDate ? travelDate.trim() : `Visited ${new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })}`,
      finalLeadId
    ]);

    // If tied to a CRM lead, flag has_reviewed = true
    if (finalLeadId) {
      try {
        await query(`UPDATE leads SET has_reviewed = TRUE WHERE id = $1`, [finalLeadId]);
      } catch (leadUpdateErr) {
        console.warn('Note updating lead has_reviewed:', leadUpdateErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your feedback has been submitted and will be displayed once reviewed by our team.',
      review: insertRes.rows[0]
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
