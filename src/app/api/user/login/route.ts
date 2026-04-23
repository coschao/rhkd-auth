import { prisma } from '@/lib/prisma'
import * as bcrypt from 'bcrypt'
import { signJwtAccessToken } from '@/lib/jwt';

interface RequestBody {
    email: string;
    password: string;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()
    console.log('[/api/user/login] payload :', body);

    const user = await prisma.user.findFirst({
        where: {
            email: body.email,
        },
    })

    if (user && (await bcrypt.compare(body.password, user.password))) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPass } = user
        const accessToken = signJwtAccessToken(userWithoutPass);
        return new Response(JSON.stringify({ ...userWithoutPass, accessToken }))
    } 
    else {
        return new Response(JSON.stringify(null))
    }
}