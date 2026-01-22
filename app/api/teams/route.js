import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('treasurehunt');
    
    const teams = await db.collection('teams').find({}).toArray();
    
    return Response.json({ success: true, teams });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name } = await request.json();
    
    if (!name || name.trim() === '') {
      return Response.json({ success: false, error: 'Team name required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('treasurehunt');
    
    // Check if team already exists
    const existingTeam = await db.collection('teams').findOne({ name: name.trim() });
    if (existingTeam) {
      return Response.json({ success: false, error: 'Team already exists' }, { status: 400 });
    }

    const result = await db.collection('teams').insertOne({
      name: name.trim(),
      createdAt: new Date()
    });
    
    return Response.json({ success: true, teamId: result.insertedId });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
