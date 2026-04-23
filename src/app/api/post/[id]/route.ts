import { prisma } from '@/lib/prisma'
// import * as bcrypt from 'bcrypt'
import { verifyJwt } from '@/lib/jwt';

export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    const accessToken = request.headers.get('authorization')
    console.log(`[/api/post/{id}] accessToken = '${accessToken}'`);
    const token = accessToken?.replace('Bearer ', '');
    console.log(`[/api/post/{id}] token = '${token}'`);

    // if (!token || !verifyJwt(token)) {
    //     return new Response(JSON.stringify({ error: 'No Authorization' }), {
    //         status: 401,
    //     })
    // }

    const { id } = await params; //Next.js 15+ : params가 Promise로 변경
    const iid = Number(id)
    console.log(`[/api/post/${id}] id = ${iid}`);

    const post = await prisma.post.findUnique({
        where: {
            id: iid,
        },
        include: {
            author: {
                select: {
                    email: true,
                    name: true,
                },
            },
        },
    })

    return new Response(JSON.stringify(post))
}