import { NextResponse } from 'next/server';

export async function GET() {
  const config = {
    accountAssociation: {
    "header": "eyJmaWQiOjgxMjkxNywidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweEFBNzdDNzk5ZkJGYUUzNDQ0RDU3OUE0RjA4MTA0ZUNDNmEzYjc5MzIifQ",
    "payload": "eyJkb21haW4iOiJ3aGVlbC1vZi1lbmIudmVyY2VsLmFwcCJ9",
    "signature": "MHg5YmVmMzdmM2ExOGFlYzkxMjkzNWQ4MjFmNjE4Y2E2N2NmMzU5ZmZkYjE3NjYyZjcwYmI4ZDU1MTI1OWU1ZDcxNjE5MzAwZWIwNTYxNWZjOWMyMjA4Nzc5NGY4NDc1NzFhY2VlNGMzMTNiYjFmZjk1N2UyODZmMjI2ZTNmYTA1ODFi"
  },
    frame: {
      version: '1',
      name: 'Wheel Of ENB',
      iconUrl: 'https://wheel-of-enb.vercel.app/icon.png',
      splashImageUrl: 'https://wheel-of-enb.vercel.app/splash.png',
      splashBackgroundColor: '#FFFFFF',
      homeUrl: 'https://wheel-of-enb.vercel.app/',
      imageUrl: 'https://wheel-of-enb.vercel.app/image.png',
      buttonTitle: 'Spin The Wheel',
      heroImageUrl:
        'https://wheel-of-enb.vercel.app/image.png',
      webhookUrl: 'https://wheel-of-enb.vercel.app/api/webhook',
      subtitle: 'Spin and Win Everyday',
      description: 'Spin the wheel, win ENB',
      "screenshotUrls": [
      "https://wheel-of-enb.vercel.app/1.jpg",
      "https://wheel-of-enb.vercel.app/2.jpg",
      "https://wheel-of-enb.vercel.app/3.jpg"
    ],
      primaryCategory: 'games',
     tags: [
      "spin",
      "wheel",
      "win",
      "everyday"
    ],
      tagline: 'Spin and Win Everyday',
      ogTitle: 'Wheel Of ENB',
      ogDescription: 'Spin the wheel, win ENB',
      ogImageUrl:
        'https://wheel-of-enb.vercel.app/og-image.png',
      castShareUrl: 'https://wheel-of-enb.vercel.app/',
    },
   baseBuilder: {
    "allowedAddresses": ["0x63526F05d9237DA102bce72960e13Ac4F2A3c3A9"]
    },
  };

  return NextResponse.json(config);
}

export const runtime = 'edge';
