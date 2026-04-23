import { prisma } from '@/lib/prisma';
import * as bcrypt from 'bcrypt';

interface RequestBody {
    name: string;
    email: string;
    password: string;
    role?: string;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()
    console.log('Received user data:', body);

    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: await bcrypt.hash(body.password, 10),
            // body.role이 있으면 사용하고, 없으면 undefined를 주어 스키마의 default("STD_USER")가 작동하게 함
            role: body.role || undefined,
        },
    })
    console.log('Created user:', user);

    const { password, ...result } = user
    return new Response(JSON.stringify(result), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function PATCH(request: Request) {
    const body = await request.json();
    const { id, ...updateData } = body;

    console.log(`[PATCH] Updating user : id=${id} with data:`, updateData);

    if (!id) {
        return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
    }

    try {
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: updateData,
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = updatedUser;
        return new Response(JSON.stringify(result));
    }
    catch (error) {
        console.error('Update user error:', error);
        return new Response(JSON.stringify({ error: 'Failed to update user' }), { status: 500 });
    }
}