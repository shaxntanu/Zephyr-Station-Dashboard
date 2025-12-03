import { NextRequest, NextResponse } from 'next/server';

interface SensorDataPayload {
  tempBME280: number;
  tempDS18B20: number;
  humidity: number;
  pressure: number;
  airQuality: number;
  timestamp?: string;
  alert?: string;
}

// Store latest sensor data in memory (in production, use a database)
let latestData: SensorDataPayload | null = null;

// POST endpoint - ESP32 sends data here
export async function POST(request: NextRequest) {
  try {
    const data: SensorDataPayload = await request.json();
    
    // Validate required fields
    if (typeof data.tempBME280 !== 'number' || 
        typeof data.humidity !== 'number' || 
        typeof data.pressure !== 'number' || 
        typeof data.airQuality !== 'number') {
      return NextResponse.json(
        { error: 'Missing or invalid sensor data' },
        { status: 400 }
      );
    }

    // Store the latest data
    latestData = {
      ...data,
      timestamp: data.timestamp || new Date().toISOString()
    };

    console.log('Received sensor data:', latestData);

    return NextResponse.json({ 
      success: true, 
      message: 'Data received successfully' 
    });
  } catch (error) {
    console.error('Error processing sensor data:', error);
    return NextResponse.json(
      { error: 'Failed to process data' },
      { status: 500 }
    );
  }
}

// GET endpoint - Dashboard fetches data from here
export async function GET() {
  if (!latestData) {
    return NextResponse.json(
      { error: 'No data available yet' },
      { status: 404 }
    );
  }

  return NextResponse.json(latestData);
}
