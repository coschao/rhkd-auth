import { prisma } from '@/lib/prisma'
import * as bcrypt from 'bcrypt'

interface RequestBody {
    username: string;
    password: string;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()
    console.log('[/api/user/login] payload :', body);

    const user = await prisma.user.findFirst({
        where: {
            email: body.username,
        },
    })

    if (user && (await bcrypt.compare(body.password, user.password))) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPass } = user
        return new Response(JSON.stringify(userWithoutPass))
    } 
    else {
        return new Response(JSON.stringify(null))
    }
}