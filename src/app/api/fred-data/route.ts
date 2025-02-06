import { NextResponse } from 'next/server';

const URL_BASE = 'https://api.stlouisfed.org/fred/series/observations';
const API_KEY = '865948e350e77abd1f0875a9db2e088a';

// Map of state FIPS codes to state abbreviations
const stateFipsToAbbrev: { [key: string]: string } = {
    '01': 'AL', '02': 'AK', '04': 'AZ', '05': 'AR', '06': 'CA',
    '08': 'CO', '09': 'CT', '10': 'DE', '11': 'DC', '12': 'FL',
    '13': 'GA', '15': 'HI', '16': 'ID', '17': 'IL', '18': 'IN',
    '19': 'IA', '20': 'KS', '21': 'KY', '22': 'LA', '23': 'ME',
    '24': 'MD', '25': 'MA', '26': 'MI', '27': 'MN', '28': 'MS',
    '29': 'MO', '30': 'MT', '31': 'NE', '32': 'NV', '33': 'NH',
    '34': 'NJ', '35': 'NM', '36': 'NY', '37': 'NC', '38': 'ND',
    '39': 'OH', '40': 'OK', '41': 'OR', '42': 'PA', '44': 'RI',
    '45': 'SC', '46': 'SD', '47': 'TN', '48': 'TX', '49': 'UT',
    '50': 'VT', '51': 'VA', '53': 'WA', '54': 'WV', '55': 'WI',
    '56': 'WY'
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fipsCode = searchParams.get('fips_code');
  const isState = searchParams.get('is_state') === 'true';
  const seriesId = searchParams.get('series_id') || 'MEDLISPRI';
  
  if (!fipsCode) {
    return NextResponse.json({ error: 'FIPS code is required' }, { status: 400 });
  }

  let fullSeriesId;

  try {
    if (isState) {
      const stateAbbrev = stateFipsToAbbrev[fipsCode];
      if (!stateAbbrev) {
        throw new Error(`Invalid state FIPS code: ${fipsCode}`);
      }
      fullSeriesId = `${seriesId}${stateAbbrev}`;
    } else {
      fullSeriesId = `${seriesId}${fipsCode}`;
    }
    
    const fredUrl = `${URL_BASE}?series_id=${fullSeriesId}&api_key=${API_KEY}&file_type=json`;
    console.log('Attempting to fetch from:', fredUrl);
    
    const response = await fetch(fredUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('FRED API error response:', errorText);
      throw new Error(`FRED API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Successfully received data:', data);
    
    return NextResponse.json(data);

  } catch (error) {
    console.error('Detailed API error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch FRED data',
      details: error instanceof Error ? error.message : 'Unknown error',
      url: `${URL_BASE}?series_id=${fullSeriesId}&api_key=${API_KEY}&file_type=json`
    });
  }
}