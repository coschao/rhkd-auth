import React from 'react';

export default function AboutPage() {
    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About RHKD Project</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        React/Next.js 프레임워크를 사용한 엔터프라이즈급 아키텍처 대비 샘플 프로젝트입니다.
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    {/* 주요 목표 */}
                    <div className="flex flex-col items-start">
                        <h3 className="text-xl font-bold text-gray-900">주요 목표</h3>
                        <ul className="mt-4 space-y-4 text-base leading-7 text-gray-600">
                            <li className="flex gap-x-3">
                                <span className="text-indigo-600">✔</span>
                                <span>React 학습 및 공통 프레임워크 구성</span>
                            </li>
                            <li className="flex gap-x-3">
                                <span className="text-indigo-600">✔</span>
                                <span>기본 배치 아키텍처 및 화면 분할 설계</span>
                            </li>
                            <li className="flex gap-x-3">
                                <span className="text-indigo-600">✔</span>
                                <span>로그인/로그아웃 및 사용자 관리 샘플 구현</span>
                            </li>
                            <li className="flex gap-x-3">
                                <span className="text-indigo-600">✔</span>
                                <span>직접 DB 접근(DAL)에서 API 기반 백엔드로의 진화 로드맵 구축</span>
                            </li>
                        </ul>
                    </div>

                    {/* 기술 스택 */}
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-x-12">
                        <div>
                            <h3 className="text-lg font-semibold leading-8 text-gray-900">Frontend Stack</h3>
                            <dl className="mt-4 space-y-2 text-sm leading-7 text-gray-600">
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                    <dt>Framework</dt>
                                    <dd className="font-medium text-gray-900">Next.js 16.2 (App Router)</dd>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                    <dt>Library</dt>
                                    <dd className="font-medium text-gray-900">React 19.2</dd>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                    <dt>Auth</dt>
                                    <dd className="font-medium text-gray-900">NextAuth.js v5</dd>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                    <dt>ORM</dt>
                                    <dd className="font-medium text-gray-900">Prisma 7.8</dd>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                    <dt>Grid</dt>
                                    <dd className="font-medium text-gray-900">ag-Grid 35.x</dd>
                                </div>
                            </dl>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold leading-8 text-gray-900">Backend & DB</h3>
                            <dl className="mt-4 space-y-2 text-sm leading-7 text-gray-600">
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                    <dt>Main DB</dt>
                                    <dd className="font-medium text-gray-900">SQLite3</dd>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                    <dt>Cache</dt>
                                    <dd className="font-medium text-gray-900">Redis (Planned)</dd>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                    <dt>Legacy/Remote</dt>
                                    <dd className="font-medium text-gray-900">Oracle (via FastAPI)</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                {/* 아키텍처 로드맵 */}
                <div className="mt-24 rounded-2xl bg-indigo-50 p-8 sm:p-12">
                    <h3 className="text-2xl font-bold text-gray-900">Architecture Roadmap</h3>
                    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <span className="inline-flex items-center rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">Phase 1</span>
                            <h4 className="mt-4 font-bold">Local Data Access</h4>
                            <p className="mt-2 text-sm text-gray-600">React 내부에서 Prisma를 통해 직접 DB(DAL)에 접근하여 빠른 프로토타이핑을 진행합니다.</p>
                        </div>
                        <div className="rounded-xl bg-white p-6 shadow-sm border-2 border-indigo-200">
                            <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Phase 2</span>
                            <h4 className="mt-4 font-bold">Decoupled Architecture</h4>
                            <p className="mt-2 text-sm text-gray-600">DAL 부분을 별도의 FastAPI 백엔드로 분리하여 엔터프라이즈 환경에 적합한 멀티 티어 아키텍처를 구성합니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
