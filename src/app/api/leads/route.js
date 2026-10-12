import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      clientName, 
      clientPhone, 
      travelDates, 
      numTravelers, 
      numAdults,
      numChildren,
      numElderly,
      childrenAges,
      startDate, 
      endDate,
      packageName, 
      vehicleType, 
      notes 
    } = body;

    if (!clientName || !clientPhone) {
      return NextResponse.json(
        { error: 'Name and Phone number are required to submit an inquiry.' },
        { status: 400 }
      );
    }

    const parsedAdults = parseInt(numAdults, 10) || (numTravelers ? parseInt(numTravelers, 10) : 2);
    const parsedChildren = parseInt(numChildren, 10) || 0;
    const parsedElderly = parseInt(numElderly, 10) || 0;
    const travelersCount = parsedAdults + parsedChildren + parsedElderly;
    
    // Format children ages text if any children specified
    let agesFormatted = '';
    if (parsedChildren > 0) {
      if (Array.isArray(childrenAges) && childrenAges.length > 0) {
        agesFormatted = childrenAges.slice(0, parsedChildren).join(', ');
      } else if (typeof childrenAges === 'string') {
        agesFormatted = childrenAges;
      }
    }

    // Explicitly tag lead as originating from the website with full details
    let detailsArr = ['🌐 [Website Online Lead]'];
    if (packageName) detailsArr.push(`[${packageName}]`);
    
    // Add date range or travel dates
    if (startDate && endDate) {
      detailsArr.push(`[Travel Dates: ${startDate} to ${endDate}]`);
    } else if (startDate) {
      detailsArr.push(`[Travel Date: ${startDate}]`);
    } else if (travelDates && !travelDates.includes('Website Web Lead')) {
      detailsArr.push(travelDates);
    }
    
    // Add detailed traveler category breakdown (Adults, Children, Elderly)
    const categoryBreakdown = [];
    if (parsedAdults > 0) categoryBreakdown.push(`${parsedAdults} Adult(s)`);
    if (parsedChildren > 0) categoryBreakdown.push(`${parsedChildren} Child(ren)${agesFormatted ? ` (Ages: ${agesFormatted})` : ''}`);
    if (parsedElderly > 0) categoryBreakdown.push(`${parsedElderly} Elderly / Senior(s) (60+ yrs)`);
    if (categoryBreakdown.length > 0) {
      detailsArr.push(`[Travelers (${travelersCount} Total): ${categoryBreakdown.join(', ')}]`);
    } else {
      detailsArr.push(`[Travelers: ${travelersCount}]`);
    }

    if (vehicleType) detailsArr.push(`[Vehicle: ${vehicleType}]`);
    if (notes) detailsArr.push(`Notes: ${notes}`);

    const combinedTravelDates = detailsArr.join(' | ');

    // Parse child ages to numeric array for CRM child_ages (jsonb) column
    const numericAges = Array.isArray(childrenAges)
      ? childrenAges.slice(0, parsedChildren).map(a => {
          const match = String(a).match(/\d+/);
          return match ? parseInt(match[0], 10) : 0;
        })
      : [];

    let newLead;
    try {
      // 1. Try full insert including CRM fields (adults, children, child_ages, source, package_name, notes, end_date, num_elderly)
      const result = await query(
        `INSERT INTO leads (
          partner_id, client_name, client_phone, travel_dates, num_travelers, status, 
          start_date, end_date, source, package_name, vehicle_type, notes,
          adults, children, child_ages, num_adults, num_children, num_elderly, elderly, children_ages
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15::jsonb, $16, $17, $18, $19, $20)
        RETURNING id, client_name, client_phone, travel_dates, num_travelers, status, created_at`,
        [
          null,
          clientName.trim(),
          clientPhone.trim(),
          combinedTravelDates,
          travelersCount,
          'new',
          startDate || null,
          endDate || null,
          'website',
          packageName || null,
          vehicleType || null,
          notes || null,
          parsedAdults,
          parsedChildren,
          JSON.stringify(numericAges),
          parsedAdults,
          parsedChildren,
          parsedElderly,
          parsedElderly,
          agesFormatted || null
        ]
      );
      newLead = result.rows[0];
    } catch (insertErr) {
      console.warn('Full CRM insert note, attempting compatibility insert:', insertErr.message);
      try {
        // Fallback insert with standard columns + dates & counts
        const resultWithDates = await query(
          `INSERT INTO leads (partner_id, client_name, client_phone, travel_dates, num_travelers, status, start_date, end_date, num_adults, num_children, num_elderly)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
           RETURNING id, client_name, client_phone, travel_dates, num_travelers, status, created_at`,
          [
            null,
            clientName.trim(),
            clientPhone.trim(),
            combinedTravelDates,
            travelersCount,
            'new',
            startDate || null,
            endDate || null,
            parsedAdults,
            parsedChildren,
            parsedElderly
          ]
        );
        newLead = resultWithDates.rows[0];
      } catch (fallbackDatesErr) {
        console.warn('Secondary insert note, trying baseline insert:', fallbackDatesErr.message);
        try {
          const resultWithStartDate = await query(
            `INSERT INTO leads (partner_id, client_name, client_phone, travel_dates, num_travelers, status, start_date, num_adults, num_children)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING id, client_name, client_phone, travel_dates, num_travelers, status, created_at`,
            [
              null,
              clientName.trim(),
              clientPhone.trim(),
              combinedTravelDates,
              travelersCount,
              'new',
              startDate || null,
              parsedAdults,
              parsedChildren
            ]
          );
          newLead = resultWithStartDate.rows[0];
        } catch (baseInsertErr) {
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
      }
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
