import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { clientName, clientPhone, travelDates, numTravelers, startDate, packageName, vehicleType, notes } = body;

    if (!clientName || !clientPhone) {
      return NextResponse.json(
        { error: 'Name and Phone number are required to submit an inquiry.' },
        { status: 400 }
      );
    }

    const travelersCount = parseInt(numTravelers, 10) || 2;
    
    // Format travel notes with any specific package or vehicle requests
    let detailsArr = [];
    if (travelDates) detailsArr.push(travelDates);
    if (packageName) detailsArr.push(`[Package: ${packageName}]`);
    if (vehicleType) detailsArr.push(`[Vehicle: ${vehicleType}]`);
    if (notes) detailsArr.push(`Notes: ${notes}`);

    const combinedTravelDates = detailsArr.length > 0 ? detailsArr.join(' | ') : 'Website Web Lead';

    let newLead;
    try {
      // Insert with start_date
      const result = await query(
        `INSERT INTO leads (partner_id, client_name, client_phone, travel_dates, num_travelers, status, start_date)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id, client_name, client_phone, travel_dates, num_travelers, status, created_at`,
        [
          null,
          clientName.trim(),
          clientPhone.trim(),
          combinedTravelDates,
          travelersCount,
          'new',
          startDate || null
        ]
      );
      newLead = result.rows[0];
    } catch (insertErr) {
      console.warn('Initial insert note, trying standard insert:', insertErr.message);
      // Fallback insert without start_date column if not present in older CRM table
      const fallbackResult = await query(
        `INSERT INTO leads (partner_id, client_name, client_phone, travel_dates, num_travelers, status)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, client_name, client_phone, travel_dates, num_travelers, status, created_at`,
        [
          null,
          clientName.trim(),
          clientPhone.trim(),
          combinedTravelDates,
          travelersCount,
          'new'
        ]
      );
      newLead = fallbackResult.rows[0];
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully! Our travel specialist will connect with you on WhatsApp shortly.',
      lead: newLead || { client_name: clientName, client_phone: clientPhone }
    });
  } catch (error) {
    console.error('API /leads error:', error);
    return NextResponse.json(
      { 
        error: `Database submission issue: ${error.message || 'Check database connection'}. Please try WhatsApp directly.`,
        details: error.message 
      },
      { status: 500 }
    );
  }
}
