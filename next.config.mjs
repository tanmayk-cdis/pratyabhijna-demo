import { withContentlayer } from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  output: "export",
  assetPrefix: process.env.NODE_ENV === 'production' ? '/pratyabhijna-demo/' : '',
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
              ],
            },
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: '@mdx-js/loader',
          // /** @type {import('@mdx-js/loader').Options} */
          // options: {/* jsxImportSource: …, otherOptions… */ }
        }
      ]
    })

    return config
  },
}

export default withContentlayer(nextConfig)
