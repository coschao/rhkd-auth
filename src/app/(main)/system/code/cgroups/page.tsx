import { getCommonCodeGroups } from '@/lib/dal/code';
import GroupManagementClient from './GroupManagementClient';

export default async function CodeGroupPage() {
    const groups = await getCommonCodeGroups();

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Code Group Management</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Manage common code groups used across the system. You can create new groups or update existing ones.
                </p>
            </div>

            <GroupManagementClient initialGroups={groups} />
        </div>
    );
}
