import { getCommonCodes, getCommonCodeGroups } from '@/lib/dal/code';
import CodeManagementClient from './CodeManagementClient';

export default async function CommonCodePage() {
    const codes = await getCommonCodes();
    const groups = await getCommonCodeGroups();

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Common Code Management</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Manage detailed common codes. Codes are grouped by their respective categories.
                </p>
            </div>

            <CodeManagementClient initialCodes={codes} groups={groups} />
        </div>
    );
}
