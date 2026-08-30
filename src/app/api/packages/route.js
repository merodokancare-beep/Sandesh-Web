import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const res = await query('SELECT * FROM itinerary_templates ORDER BY id ASC');
    
    // In case templates exist
    if (res.rows && res.rows.length > 0) {
      const formatted = res.rows.map(item => {
        let days = [];
        if (typeof item.days === 'string') {
          try { days = JSON.parse(item.days); } catch (e) { days = []; }
        } else if (Array.isArray(item.days)) {
          days = item.days;
        }
        return {
          id: item.id,
          name: item.name,
          region: item.region,
          totalDays: item.total_days,
          estimatedPrice: item.estimated_price,
          days
        };
      });

      return NextResponse.json({ success: true, packages: formatted });
    }

    // Default regional templates if empty
    return NextResponse.json({
      success: true,
      packages: [
        {
          id: 1,
          name: '3N-4D Gangtok & Tsomgo Lake / Baba Mandir (4 Days)',
          region: 'East',
          totalDays: 4,
          estimatedPrice: 16500.00,
          days: [
            { dayNumber: 1, description: 'Pickup from NJP/Bagdogra Airport (IXB) to Gangtok. En-route Teesta rafting & M.G. Marg exploration.', activities: 'Airport Transfer, Teesta View, M.G. Marg Evening' },
            { dayNumber: 2, description: 'Full Day Gangtok Sightseeing (Tashi Viewpoint, Waterfalls, Monasteries, Ropeway, Flower Show).', activities: 'Tashi Viewpoint, Ban Jhakri Falls, Ropeway' },
            { dayNumber: 3, description: 'Excursion to Changu / Tsomgo Lake (12,400 ft) & Baba Harbhajan Mandir. Optional Nathula Pass.', activities: 'High Altitude Lake, Baba Mandir, Alpine Vistas' },
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
            { dayNumber: 1, description: 'Gangtok to Lachen via Seven Sisters Waterfall, Mangan Valley & Chungthang. Overnight at Lachen.', activities: 'Permit Check, Seven Sisters Waterfall, Lachen Village' },
            { dayNumber: 2, description: 'Gurudongmar Lake (15,900 ft) sacred excursion, Thangu Valley, then transfer to Lachung.', activities: 'Gurudongmar Sacred Lake, Thangu, Lachung' },
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
