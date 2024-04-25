/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api',
        destination: `https://a.klaviyo.com/api/v2/list/XYfdpk/members?api_key=${process.env.KLAV_KEY}`,
      },
      {
        source: '/api/profil',
        destination: `https://a.klaviyo.com/api/v2/list/XYfdpk/get-members?api_key=${process.env.KLAV_KEY}`,
      },
    ]
  },
}