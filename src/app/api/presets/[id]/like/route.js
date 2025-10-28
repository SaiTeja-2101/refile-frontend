import { getCurrentSession } from "@/lib/server/session";
import { presetLikesDb } from "@/db/presets";

export async function POST(request, { params }) {
  try {
    const { session, user } = await getCurrentSession();
    
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const presetId = params.id;
    
    const result = await presetLikesDb.toggle(presetId, user.id);

    return Response.json({ 
      liked: result.liked,
      message: result.liked ? 'Preset liked' : 'Preset unliked'
    });
  } catch (error) {
    console.error('Error toggling like:', error);
    return Response.json({ error: 'Failed to toggle like' }, { status: 500 });
  }
}