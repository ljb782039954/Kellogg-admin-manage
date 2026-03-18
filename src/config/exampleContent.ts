import type { SiteContent } from '../types';

export const exampleContent: SiteContent = {
  header: {
    logoText: {
      zh: 'KELLOGG',
      en: 'KELLOGG',
    },
    navItems: [
      { name: { zh: '首页', en: 'Home' }, href: '/' },
      { name: { zh: '新品', en: 'New Arrivals' }, href: '/new-arrivals' },
      { name: { zh: '全部商品', en: 'All Products' }, href: '/products' },
      { name: { zh: '工厂', en: 'Factory' }, href: '/factory' },
      { name: { zh: '常见问题', en: 'FAQ' }, href: '/faq' },
    ],
  },
  home: {
    carousel: {
      slides: [
        {
          image: '/images/style1/hero1.jpg',
          title: { zh: '简约之美', en: 'Beauty of Simplicity' },
          subtitle: {
            zh: 'Less is More，探索极简主义的永恒魅力',
            en: 'Less is More, explore the timeless charm of minimalism' },
          cta: { zh: '探索系列', en: 'Explore Collection' },
        },
        {
          image: '/images/style1/hero2.jpg',
          title: { zh: '经典剪裁', en: 'Classic Cut' },
          subtitle: {
            zh: '精湛工艺，打造属于你的完美轮廓',
            en: 'Exquisite craftsmanship, creating your perfect silhouette' },
          cta: { zh: '立即选购', en: 'Shop Now' },
        },
        {
          image: '/images/style1/hero3.jpg',
          title: { zh: '精致配饰', en: 'Exquisite Accessories' },
          subtitle: {
            zh: '细节之处见真章，点缀你的优雅人生',
            en: 'Details reveal true quality, embellishing your elegant life' },
          cta: { zh: '查看配饰', en: 'View Accessories' },
        },
      ],
    },
    brandValues: {
      title: { zh: '品牌价值', en: 'Brand Values' },
      subtitle: { zh: '我们坚持的理念', en: 'What We Stand For' },
      values: [
        {
          icon: 'Leaf',
          title: { zh: '环保材质', en: 'Eco-Friendly' },
          description: {
            zh: '采用可持续发展的环保面料，守护地球家园',
            en: 'Using sustainable eco-friendly materials to protect our planet' },
        },
        {
          icon: 'Award',
          title: { zh: '精湛工艺', en: 'Craftsmanship' },
          description: {
            zh: '每一件产品都经过严格的质量把控',
            en: 'Every product undergoes strict quality control' },
        },
        {
          icon: 'Heart',
          title: { zh: '舒适体验', en: 'Comfort' },
          description: {
            zh: '以人为本的设计理念，追求极致舒适',
            en: 'Human-centered design philosophy for ultimate comfort' },
        },
        {
          icon: 'Recycle',
          title: { zh: '可持续时尚', en: 'Sustainable Fashion' },
          description: {
            zh: '倡导慢时尚，减少浪费，延长产品生命周期',
            en: 'Promoting slow fashion, reducing waste, extending product lifecycle' },
        },
      ],
    },
    statistics: {
      title: { zh: '我们的成就', en: 'Our Achievements' },
      stats: [
        { value: '10+', label: { zh: '年行业经验', en: 'Years Experience' } },
        { value: '500K+', label: { zh: '满意客户', en: 'Happy Customers' } },
        { value: '1000+', label: { zh: '产品款式', en: 'Product Styles' } },
        { value: '50+', label: { zh: '全球门店', en: 'Global Stores' } },
      ],
    },
    testimonials: {
      title: { zh: '客户评价', en: 'Customer Reviews' },
      subtitle: { zh: '听听他们怎么说', en: 'What They Say About Us' },
      items: [
        {
          id: 1,
          name: { zh: '张小姐', en: 'Ms. Zhang' },
          role: { zh: '时尚博主', en: 'Fashion Blogger' },
          content: {
            zh: 'MINIMAL的设计简约而不简单，每次穿上都能感受到品质的用心。',
            en: 'MINIMAL\'s designs are simple yet sophisticated. You can feel the quality in every piece.' },
          avatar: '/images/style1/product4.jpg',
        },
        {
          id: 2,
          name: { zh: '李先生', en: 'Mr. Li' },
          role: { zh: '企业高管', en: 'Business Executive' },
          content: {
            zh: '面料舒适，剪裁得体，非常适合商务场合穿着。',
            en: 'Comfortable fabric, perfect fit, ideal for business occasions.' },
          avatar: '/images/style1/product3.jpg',
        },
        {
          id: 3,
          name: { zh: '王女士', en: 'Ms. Wang' },
          role: { zh: '设计师', en: 'Designer' },
          content: {
            zh: '作为一个对细节要求很高的人，MINIMAL的产品让我非常满意。',
            en: 'As someone who cares about details, I\'m very satisfied with MINIMAL products.' },
          avatar: '/images/style1/product1.jpg',
        },
      ],
    },
    featuredProducts: {
      title: { zh: '精选推荐', en: 'Featured Products' },
      subtitle: { zh: '本季热门单品', en: 'This Season\'s Hot Items' },
      items: [
        {
          id: 1,
          name: { zh: '简约米色羊毛针织衫', en: 'Minimalist Beige Wool Sweater' },
          price: 599,
          originalPrice: 799,
          image: '/images/style1/product1.jpg',
          rating: 4.8,
          sales: 1200,
          tag: { zh: '热销', en: 'Hot' },
          category: 'tops',
          releaseDate: '2024-01-15',
        },
        {
          id: 2,
          name: { zh: '经典黑色阔腿裤', en: 'Classic Black Wide-leg Pants' },
          price: 459,
          image: '/images/style1/product2.jpg',
          rating: 4.6,
          sales: 890,
          category: 'bottoms',
          releaseDate: '2024-02-01',
        },
        {
          id: 3,
          name: { zh: '灰色羊毛混纺毛衣', en: 'Gray Wool Blend Sweater' },
          price: 699,
          originalPrice: 899,
          image: '/images/style1/product3.jpg',
          rating: 4.9,
          sales: 1500,
          tag: { zh: '新品', en: 'New' },
          category: 'tops',
          releaseDate: '2024-03-01',
        },
        {
          id: 4,
          name: { zh: '简约银色几何手链', en: 'Minimalist Silver Geometric Bracelet' },
          price: 299,
          image: '/images/style1/product4.jpg',
          rating: 4.7,
          sales: 650,
          category: 'accessories',
          releaseDate: '2024-01-20',
        },
      ],
    },
  },
  products: {
    title: { zh: '全部商品', en: 'All Products' },
    subtitle: { zh: '探索我们的完整系列', en: 'Explore Our Complete Collection' },
    categories: [
      { id: 'all', name: { zh: '全部', en: 'All' } },
      { id: 'tops', name: { zh: '上装', en: 'Tops' } },
      { id: 'bottoms', name: { zh: '下装', en: 'Bottoms' } },
      { id: 'dresses', name: { zh: '连衣裙', en: 'Dresses' } },
      { id: 'accessories', name: { zh: '配饰', en: 'Accessories' } },
    ],
    sortOptions: [
      { id: 'newest', name: { zh: '最新上架', en: 'Newest' } },
      { id: 'price-asc', name: { zh: '价格从低到高', en: 'Price: Low to High' } },
      { id: 'price-desc', name: { zh: '价格从高到低', en: 'Price: High to Low' } },
      { id: 'popular', name: { zh: '最受欢迎', en: 'Most Popular' } },
    ],
    itemsPerPage: 12,
  },
  newArrivals: {
    title: { zh: '新品上市', en: 'New Arrivals' },
    subtitle: { zh: '探索最新款式', en: 'Discover the Latest Styles' },
  },
  factory: {
    heroImage: '/images/factory/company3.jpg',
    heroTitle: { zh: '我们的工厂', en: 'Our Factory' },
    heroSubtitle: { zh: '了解我们的生产流程和质量标准', en: 'Learn about our production process and quality standards' },
    sections: [
      {
        image: '/images/factory/company4.jpg',
        title: { zh: '现代化生产设备', en: 'Modern Production Equipment' },
        content: {
          zh: '我们引进了国际先进的生产设备，确保每一件产品都达到最高标准。从裁剪到缝制，每一个环节都经过严格把控。',
          en: 'We have introduced internationally advanced production equipment to ensure every product meets the highest standards. From cutting to sewing, every step is strictly controlled.' },
      },
      {
        image: '/images/factory/company5.jpg',
        title: { zh: '专业设计团队', en: 'Professional Design Team' },
        content: {
          zh: '我们的设计团队由来自世界各地的资深设计师组成，他们将极简主义美学与实用功能完美结合，创造出既美观又实用的服装。',
          en: 'Our design team consists of senior designers from around the world. They perfectly combine minimalist aesthetics with practical functionality to create beautiful and practical clothing.' },
      },
      {
        image: '/images/factory/factory.jpg',
        title: { zh: '严格的质量控制', en: 'Strict Quality Control' },
        content: {
          zh: '每一件产品在出厂前都要经过三道质检工序，确保没有任何瑕疵。我们对品质的执着追求，是我们品牌的核心竞争力。',
          en: 'Every product undergoes three quality inspection processes before leaving the factory to ensure there are no defects. Our persistent pursuit of quality is the core competitiveness of our brand.' },
      },
    ],
  },
  faq: {
    title: { zh: '常见问题', en: 'FAQ' },
    subtitle: { zh: '找到您需要的答案', en: 'Find the Answers You Need' },
    items: [
      {
        id: 1,
        question: { zh: '如何选择合适的尺码？', en: 'How do I choose the right size?' },
        answer: {
          zh: '我们提供详细的尺码表供您参考。建议您在购买前测量自己的身体尺寸，然后对照尺码表选择。如果您仍然不确定，可以联系我们的客服团队获取帮助。',
          en: 'We provide a detailed size chart for your reference. We recommend measuring your body dimensions before purchasing and comparing them with the size chart. If you\'re still unsure, you can contact our customer service team for help.' },
      },
      {
        id: 2,
        question: { zh: '支持哪些支付方式？', en: 'What payment methods are supported?' },
        answer: {
          zh: '我们支持支付宝、微信支付、银联卡以及主流信用卡支付。所有支付都经过加密处理，确保您的交易安全。',
          en: 'We support Alipay, WeChat Pay, UnionPay cards, and major credit cards. All payments are encrypted to ensure your transaction security.' },
      },
      {
        id: 3,
        question: { zh: '订单发货后多久能收到？', en: 'How long will it take to receive my order after shipment?' },
        answer: {
          zh: '一般情况下，国内订单在发货后3-5个工作日内送达，国际订单需要7-15个工作日。具体送达时间取决于您的所在地和物流情况。',
          en: 'Generally, domestic orders are delivered within 3-5 working days after shipment, and international orders take 7-15 working days. The exact delivery time depends on your location and logistics conditions.' },
      },
      {
        id: 4,
        question: { zh: '如何办理退换货？', en: 'How do I process a return or exchange?' },
        answer: {
          zh: '我们支持7天无理由退换货。如果您对商品不满意，可以在收到商品后7天内申请退换。请确保商品保持原状，吊牌完好。',
          en: 'We support 7-day no-reason returns and exchanges. If you are not satisfied with the product, you can apply for a return or exchange within 7 days of receiving it. Please ensure the product remains in its original condition with tags intact.' },
      },
      {
        id: 5,
        question: { zh: '商品如何保养？', en: 'How should I care for the products?' },
        answer: {
          zh: '不同材质的商品有不同的保养方法。一般来说，建议按照洗标指示进行清洗。羊毛制品建议干洗，棉质产品可以机洗但建议使用温和模式。',
          en: 'Different materials require different care methods. Generally, we recommend following the care label instructions. Wool products are recommended for dry cleaning, and cotton products can be machine washed but we recommend using a gentle cycle.' },
      },
      {
        id: 6,
        question: { zh: '是否提供定制服务？', en: 'Do you offer customization services?' },
        answer: {
          zh: '目前我们不提供个人定制服务。但我们会根据客户反馈不断优化产品设计，推出更多符合大家需求的款式。',
          en: 'We currently do not offer personal customization services. However, we continuously optimize our product designs based on customer feedback and launch more styles that meet everyone\'s needs.' },
      },
    ],
  },
  footer: {
    linkGroups: [
      {
        title: { zh: '购物', en: 'Shop' },
        links: [
          { name: { zh: '新品上市', en: 'New Arrivals' }, href: '/new-arrivals' },
          { name: { zh: '全部商品', en: 'All Products' }, href: '/products' },
          { name: { zh: '热销推荐', en: 'Best Sellers' }, href: '#' },
        ],
      },
      {
        title: { zh: '帮助', en: 'Support' },
        links: [
          { name: { zh: '尺码指南', en: 'Size Guide' }, href: '#' },
          { name: { zh: '配送说明', en: 'Shipping Info' }, href: '#' },
          { name: { zh: '退换政策', en: 'Return Policy' }, href: '#' },
          { name: { zh: '常见问题', en: 'FAQ' }, href: '/faq' },
        ],
      },
      {
        title: { zh: '关于', en: 'Company' },
        links: [
          { name: { zh: '关于我们', en: 'About Us' }, href: '#' },
          { name: { zh: '工厂介绍', en: 'Our Factory' }, href: '/factory' },
          { name: { zh: '联系我们', en: 'Contact Us' }, href: '#' },
        ],
      },
    ],
    newsletterPlaceholder: { zh: '输入邮箱订阅', en: 'Enter email to subscribe' },
    newsletterButton: { zh: '订阅', en: 'Subscribe' },
  },
};

// Admin credentials
export const adminCredentials = {
  username: 'admin',
  password: 'admin123',
};

// All products data (for products page)
export const allProducts = [
  ...exampleContent.home.featuredProducts.items,
  {
    id: 5,
    name: { zh: '白色纯棉T恤', en: 'White Cotton T-Shirt' },
    price: 199,
    image: '/images/style1/product2.jpg',
    rating: 4.5,
    sales: 2300,
    category: 'tops',
    releaseDate: '2024-02-15',
  },
  {
    id: 6,
    name: { zh: '深蓝色牛仔裤', en: 'Dark Blue Jeans' },
    price: 399,
    originalPrice: 499,
    image: '/images/style1/product3.jpg',
    rating: 4.7,
    sales: 1500,
    tag: { zh: '热销', en: 'Hot' },
    category: 'bottoms',
    releaseDate: '2024-01-10',
  },
  {
    id: 7,
    name: { zh: '黑色连衣裙', en: 'Black Dress' },
    price: 799,
    image: '/images/style1/product1.jpg',
    rating: 4.8,
    sales: 800,
    category: 'dresses',
    releaseDate: '2024-03-05',
  },
  {
    id: 8,
    name: { zh: '米色风衣', en: 'Beige Trench Coat' },
    price: 1299,
    originalPrice: 1599,
    image: '/images/style1/hero1.jpg',
    rating: 4.9,
    sales: 450,
    tag: { zh: '新品', en: 'New' },
    category: 'tops',
    releaseDate: '2024-03-10',
  },
];
