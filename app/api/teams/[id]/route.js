import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    const client = await clientPromise;
    const db = client.db('treasurehunt');
    
    await db.collection('teams').deleteOne({ _id: new ObjectId(id) });
    
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
