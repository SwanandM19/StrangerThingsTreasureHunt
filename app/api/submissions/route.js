import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('treasurehunt');
    
    const submissions = await db.collection('submissions')
      .find({})
      .sort({ timestamp: 1 })
      .toArray();
    
    return Response.json({ success: true, submissions });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { teamName, clueNumber, fragment, answer, timestamp } = await request.json();
    
    const client = await clientPromise;
    const db = client.db('treasurehunt');
    
    const result = await db.collection('submissions').insertOne({
      teamName,
      clueNumber,
      fragment,
      answer,
      timestamp: new Date(timestamp),
      submittedAt: new Date()
    });
    
    return Response.json({ success: true, submissionId: result.insertedId });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
