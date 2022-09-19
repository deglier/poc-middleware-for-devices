import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: [
        /*
         * Match all paths except for:
         * 1. /api routes
         * 2. /_next (Next.js internals)
         * 3. /fonts (inside /public)
         * 4. /examples (inside /public)
         * 5. all root files inside /public (e.g. /favicon.ico)
         */
        "/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)",
    ],
};

const getDeviceType = (ua: string) => {
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
};

export default function middleware(req: NextRequest) {
    const url = req.nextUrl;

    const deviceType = getDeviceType(req.headers.get('user-agent') || '');

    url.pathname = `/_${deviceType}${url.pathname}`

    return NextResponse.rewrite(url)

}