export async function POST(request) {
  try {
    const { submittedFlag, correctFlag } = await request.json();
    
    // Compare flags (case-insensitive, trimmed)
    const isCorrect = submittedFlag.trim().toUpperCase() === correctFlag.trim().toUpperCase();
    
    return Response.json({ success: isCorrect });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
