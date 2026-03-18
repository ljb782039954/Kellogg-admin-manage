import { useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Package,
  Factory,
  HelpCircle,
  // Footprints,
  ExternalLink,
  Image as ImageIcon,
  BarChart3,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface PageItem {
  name: string;
  path: string;
  icon: React.ElementType;
  color: string;
}

interface PageGroup {
  title: string;
  items: PageItem[];
}

const pageGroups: PageGroup[] = [
  {
    title: '首页管理',
    items: [
      // { name: 'Header 导航', path: '/header', icon: Type, color: 'bg-gray-800' },
      { name: '轮播图', path: '/carousel', icon: ImageIcon, color: 'bg-blue-500' },
      { name: '品牌价值', path: '/brand-values', icon: Sparkles, color: 'bg-green-500' },
      { name: '统计数据', path: '/statistics', icon: BarChart3, color: 'bg-purple-500' },
      { name: '客户评价', path: '/testimonials', icon: MessageSquare, color: 'bg-orange-500' },
      { name: '精选产品', path: '/featured-products', icon: ShoppingBag, color: 'bg-pink-500' },
    ],
  },
  {
    title: '页面管理',
    items: [
      { name: '全部商品', path: '/all-products', icon: ShoppingBag, color: 'bg-blue-500' },
      { name: '新品上市', path: '/new-arrivals', icon: Package, color: 'bg-green-500' },
      { name: '工厂介绍', path: '/factory', icon: Factory, color: 'bg-orange-500' },
      { name: '常见问题', path: '/faq', icon: HelpCircle, color: 'bg-purple-500' },
      // { name: '页脚', path: '/footer', icon: Footprints, color: 'bg-gray-600' },
    ],
  },
];

export default function Overview() {
  const navigate = useNavigate();
  const { content, allProducts } = useContent();

  const stats = [
    { label: '轮播图数量', value: content.home.carousel.slides.length },
    { label: '精选产品', value: content.home.featuredProducts.items.length },
    { label: '全部商品', value: allProducts.length },
    { label: 'FAQ数量', value: content.faq.items.length },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">概览</h1>
          <p className="text-gray-500 mt-1">管理您的网站内容和设置</p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          查看网站
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Page Groups */}
      {pageGroups.map((group) => (
        <div key={group.title}>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{group.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.items.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-left group"
              >
                <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Quick Tips */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">使用提示</h3>
        <ul className="space-y-2 text-sm text-blue-700">
          <li>• 所有更改会自动保存到本地存储</li>
          <li>• 文本内容需要同时输入中英文，以支持语言切换</li>
          <li>• 图片路径以 /images/ 开头，如 /images/style1/hero1.jpg</li>
          <li>• 点击右上角的语言按钮可以预览不同语言的显示效果</li>
        </ul>
      </div>
    </div>
  );
}
