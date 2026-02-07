// SEO Helper Utility Functions

export function generateSiteUrl(path = '') {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gladtidings-health.vercel.app'
  return `${baseUrl}${path}`
}

export function generateStructuredData(type, data) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  }
  return baseStructuredData
}

export function generateArticleStructuredData(post) {
  return generateStructuredData('Article', {
    headline: post.title,
    description: post.excerpt || post.meta_description,
    image: post.cover_image || generateSiteUrl('/images/blog-og-image.jpg'),
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Person',
      name: post.author_name || 'Glad Tidings Medical Missionary',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Glad Tidings',
      logo: {
        '@type': 'ImageObject',
        url: generateSiteUrl('/images/logo.png'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': generateSiteUrl(`/blog/${post.slug}`),
    },
  })
}

export function generateProductStructuredData(product) {
  return generateStructuredData('Product', {
    name: product.title,
    description: product.description,
    image: product.image_url,
    brand: {
      '@type': 'Brand',
      name: 'Glad Tidings',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: product.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Glad Tidings',
      },
    },
  })
}

export function generateOrganizationStructuredData() {
  return generateStructuredData('Organization', {
    name: 'Glad Tidings',
    description: 'Medical missionary health and wellness organization providing natural health remedies and holistic wellness services.',
    url: generateSiteUrl(),
    logo: generateSiteUrl('/images/logo.png'),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-234-567-8900',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://www.facebook.com/gladtidings',
      'https://www.twitter.com/gladtidings',
      'https://www.instagram.com/gladtidings',
    ],
  })
}

export function generateBreadcrumbStructuredData(breadcrumbs) {
  return generateStructuredData('BreadcrumbList', {
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: generateSiteUrl(breadcrumb.url),
    })),
  })
}

export function generateWebPageStructuredData(title, description, url) {
  return generateStructuredData('WebPage', {
    name: title,
    description: description,
    url: generateSiteUrl(url),
    isPartOf: {
      '@type': 'WebSite',
      name: 'Glad Tidings',
      url: generateSiteUrl(),
    },
  })
}

// Function to generate meta tags dynamically
export function generateMetaTags(pageData) {
  const {
    title,
    description,
    keywords = [],
    image = '/images/og-image.jpg',
    url = '',
    type = 'website',
    author = 'Glad Tidings Medical Missionary',
    publishedTime,
    modifiedTime,
  } = pageData

  return {
    title: title,
    description: description,
    keywords: keywords.join(', '),
    authors: [{ name: author }],
    openGraph: {
      title: title,
      description: description,
      type: type,
      url: generateSiteUrl(url),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [image],
    },
    alternates: {
      canonical: url || '/',
    },
  }
}
