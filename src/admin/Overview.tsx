import {
  ExternalLink,
  FileText,
  ShoppingBag,
  Layers,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

export default function Overview() {
  const navigate = useNavigate();
  const { allProducts } = useContent();

  // 快捷入口
  const quickLinks = [
    {
      name: '页面管理',
      description: '管理网站页面和布局',
      path: '/pages',
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      name: '预定义组件',
      description: '查看所有可用组件',
      path: '/components',
      icon: Layers,
      color: 'bg-purple-500',
    },
    {
      name: '商品管理',
      description: `共 ${allProducts.length} 件商品`,
      path: '/products',
      icon: ShoppingBag,
      color: 'bg-green-500',
    },
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

      {/* 快捷入口 */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">快捷入口</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickLinks.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-left group"
            >
              <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">使用提示</h3>
        <ul className="space-y-2 text-sm text-blue-700">
          <li>• 所有更改会自动保存到本地存储</li>
          <li>• 文本内容需要同时输入中英文，以支持语言切换</li>
          <li>• 在「页面管理」中可以编辑各个页面的布局和组件</li>
          <li>• 在「预定义组件」中可以预览所有可用的组件效果</li>
          <li>• 点击右上角的语言按钮可以预览不同语言的显示效果</li>
        </ul>
      </div>
    </div>
  );
}
