import { prisma } from '@/lib/prisma';
import * as bcrypt from 'bcrypt';

interface RequestBody {
    name: string;
    email: string;
    password: string;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()
    console.log('Received user data:', body);

    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            //password: body.password,
            password: await bcrypt.hash(body.password, 10),
        },
    })
    console.log('Created user:', user);

    const { password, ...result } = user
    console.log('Response x-pw:', password);
    console.log('Response user:', result);
    return new Response(JSON.stringify(result))
}