import { handlers } from "@/app/auth"

// NextAuth v5에서는 handlers 객체에서 GET, POST를 꺼내어 내보냅니다.
export const { GET, POST } = handlers