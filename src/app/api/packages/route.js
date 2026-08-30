import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    // 1. Try querying possible itinerary table names used in CRM
    const tableCandidates = ['itinerary_master', 'itinerary_templates', 'itineraries', 'packages', 'tour_packages'];
    let rows = null;
    let foundTable = null;

    for (const table of tableCandidates) {
      try {
        const res = await query(`SELECT * FROM ${table} ORDER BY id ASC`);
        if (res && res.rows && res.rows.length > 0) {
          rows = res.rows;
          foundTable = table;
          break;
        }
      } catch (tableErr) {
        // Table doesn't exist, try next
      }
    }

    // 2. If dynamic packages exist in database
    if (rows && rows.length > 0) {
      const formatted = rows.map(item => {
        let days = [];
        const rawDays = item.days || item.itinerary || item.days_json || item.schedule || item.day_details;
        if (typeof rawDays === 'string') {
          try { days = JSON.parse(rawDays); } catch (e) { days = []; }
        } else if (Array.isArray(rawDays)) {
          days = rawDays;
        }

        // Format day objects consistently
        const formattedDays = days.map((d, idx) => ({
          dayNumber: d.dayNumber || d.day_number || d.day || idx + 1,
          activities: d.activities || d.title || d.heading || `Day ${idx + 1} Sightseeing`,
          description: d.description || d.desc || d.details || ''
        }));

        return {
          id: item.id,
          name: item.name || item.title || item.package_name || item.itinerary_name || 'Himalayan Tour',
          region: item.region || item.category || item.location || 'Sikkim',
          totalDays: item.total_days || item.days_count || item.duration || (formattedDays.length > 0 ? formattedDays.length : 4),
          estimatedPrice: item.estimated_price || item.price || item.cost || item.base_price || 15000,
          days: formattedDays
        };
      });

      return NextResponse.json({ 
        success: true, 
        source: `database (${foundTable})`,
        packages: formatted 
      });
    }

    // 3. Fallback default templates if database table is currently empty
    return NextResponse.json({
      success: true,
      source: 'default',
      packages: [
        {
          id: 1,
          name: '3N-4D Gangtok & Tsomgo Lake / Baba Mandir (4 Days)',
          region: 'East',
          totalDays: 4,
          estimatedPrice: 16500.00,
          days: [
            { dayNumber: 1, description: 'Pickup from NJP/Bagdogra Airport (IXB) to Gangtok. En-route Teesta rafting & M.G. Marg exploration.', activities: 'Airport/NJP Pickup, Melli River Rafting, M.G. Marg Evening Walk' },
            { dayNumber: 2, description: 'Full Day Gangtok Sightseeing (Tashi Viewpoint, Waterfalls, Monasteries, Ropeway, Flower Show).', activities: 'Tashi Viewpoint, Waterfalls, Monasteries, Gangtok Ropeway, Flower Show' },
            { dayNumber: 3, description: 'Excursion to Changu / Tsomgo Lake (12,400 ft) & Baba Harbhajan Mandir. Optional Nathula Pass.', activities: 'Changu Lake, Baba Mandir & Alpine Vistas' },
            { dayNumber: 4, description: 'Hotel checkout and transfer back to Bagdogra / NJP station.', activities: 'Scenic Transfer & Departure' }
          ]
        },
        {
          id: 2,
          name: 'North Sikkim Jeep Adventure - Lachen, Gurudongmar & Lachung (3 Days)',
          region: 'North',
          totalDays: 3,
          estimatedPrice: 15000.00,
          days: [
            { dayNumber: 1, description: 'Gangtok to Lachen via Seven Sisters Waterfall, Mangan Valley & Chungthang. Overnight at Lachen.', activities: 'Tashi View Point, Waterfalls, Mangan Valley, Singhik, Naga Waterfalls, Chumthang Valley, Lachen Halt' },
            { dayNumber: 2, description: 'Gurudongmar Lake (15,900 ft) sacred excursion, Thangu Valley, then transfer to Lachung.', activities: 'Gurudongmar High Altitude Lake, Thangu Valley, Bhim Nala Waterfalls, Lachung Halt' },
            { dayNumber: 3, description: 'Yumthang Valley of Flowers, Rhododendron Sanctuary, Natural Hot Springs & return to Gangtok.', activities: 'Yumthang Valley, Hot Springs, Gangtok Return' }
          ]
        },
        {
          id: 3,
          name: 'Pelling & Kalimpong Heritage Circuit (5 Days)',
          region: 'West',
          totalDays: 5,
          estimatedPrice: 25500.00,
          days: [
            { dayNumber: 1, description: 'Transfer from NJP/IXB to Pelling with scenic mountain road views.', activities: 'Airport Transfer, Pelling Market Evening' },
            { dayNumber: 2, description: 'Pelling Local Tour: Glass Skywalk, Khecheopalri Sacred Lake, Pemayangtse Monastery & Rabdentse Ruins.', activities: 'Glass Skywalk, Sacred Lake, Ancient Palace Ruins' },
            { dayNumber: 3, description: 'Pelling to Kalimpong drive via Teesta border.', activities: 'Border drive, Kalimpong check-in' },
            { dayNumber: 4, description: 'Kalimpong Heritage Tour: Deolo Hill, Durpin Monastery, Pine View Cactus Nursery & Dr. Grahams Home.', activities: 'Deolo Hill View, Monastery, Cactus Garden' },
            { dayNumber: 5, description: 'Departure transfer to NJP Railway Station or Bagdogra Airport.', activities: 'Departure Drop' }
          ]
        },
        {
          id: 4,
          name: 'Old Silk Route & Zuluk Himalayan Loop (4 Days)',
          region: 'Silk Route',
          totalDays: 4,
          estimatedPrice: 18500.00,
          days: [
            { dayNumber: 1, description: 'Transfer to Sillery Gaon / Aritar. Explore Aritar Lampokhari Lake and Mankhim Top.', activities: 'Lampokhari Emerald Lake, Mankhim Temple' },
            { dayNumber: 2, description: 'Ascend to Zuluk via Rongli permit checkpoint, Kuekhola Falls & Padamchen.', activities: 'Permit Processing, Kuekhola Waterfall, Zuluk Village' },
            { dayNumber: 3, description: 'Witness sunrise at Thambi Viewpoint (32 hairpin curves), Lungthung, Kupup Elephant Lake, Old Baba Mandir.', activities: '32 Zig-Zag Road, Kupup Lake, Tukla Valley' },
            { dayNumber: 4, description: 'Descent via Gangtok / Rongli to NJP/Bagdogra Airport.', activities: 'Departure Transfer' }
          ]
        }
      ]
    });
  } catch (error) {
    console.error('Error fetching packages from DB:', error);
    return NextResponse.json({ error: 'Failed to load tour packages' }, { status: 500 });
  }
}
