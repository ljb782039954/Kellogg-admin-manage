import { useRef } from 'react';
import { Upload, X, RefreshCw } from 'lucide-react';

interface ImageInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  aspectRatio?: 'square' | 'video' | 'banner' | 'auto';
  className?: string;
}

export default function ImageInput({
  label,
  value,
  onChange,
  aspectRatio = 'auto',
  className = '',
}: ImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    onChange('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // 根据宽高比设置容器样式
  const aspectRatioClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    banner: 'aspect-[3/1]',
    auto: 'min-h-[120px]',
  }[aspectRatio];

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}

      {/* 隐藏的实际文件输入框 */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* 图片显示/上传区域 */}
      {!value ? (
        // 无图片时：显示上传区域
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`w-full ${aspectRatioClass} border-2 border-dashed border-gray-200 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all flex flex-col items-center justify-center gap-2 text-gray-500`}
        >
          <Upload className="w-8 h-8" />
          <span className="text-sm font-medium">点击上传图片</span>
          <span className="text-xs text-gray-400">支持 JPG、PNG、GIF 等格式</span>
        </button>
      ) : (
        // 有图片时：直接显示图片预览
        <div className={`relative w-full ${aspectRatioClass} bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group`}>
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23999" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2" ry="2"/%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"/%3E%3Cpolyline points="21 15 16 10 5 21"/%3E%3C/svg%3E';
            }}
          />

          {/* 悬浮操作按钮 */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
            {/* 更换图片 */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              title="更换图片"
            >
              <RefreshCw className="w-5 h-5 text-gray-700" />
            </button>

            {/* 删除图片 */}
            <button
              type="button"
              onClick={clearImage}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
              title="删除图片"
            >
              <X className="w-5 h-5 text-red-500" />
            </button>
          </div>

          {/* 底部提示 */}
          <div className="absolute bottom-2 left-2 right-2 text-center">
            <span className="text-xs text-white bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              悬浮显示操作按钮
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
