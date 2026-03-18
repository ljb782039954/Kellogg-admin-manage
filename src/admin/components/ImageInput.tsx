import { useState, useRef } from 'react';
import { ImageIcon, Eye, Upload, X } from 'lucide-react';

interface ImageInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  preview?: boolean;
}

export default function ImageInput({
  label,
  value,
  onChange,
  preview = true,
}: ImageInputProps) {
  const [showPreview, setShowPreview] = useState(false);
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

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {value && (
          <button
            onClick={clearImage}
            className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            清除
          </button>
        )}
      </div>

      {/* 隐藏的实际文件输入框 */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* 上传区域 */}
      {!value ? (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-8 border-2 border-dashed border-gray-200 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all flex flex-col items-center gap-2 text-gray-500"
        >
          <Upload className="w-8 h-8" />
          <span className="text-sm font-medium">点击上传图片</span>
          <span className="text-xs text-gray-400">支持 JPG、PNG、GIF 等格式</span>
        </button>
      ) : (
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
            <ImageIcon className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600 truncate flex-1">
              {value.startsWith('data:') ? '已上传图片' : value}
            </span>
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2"
            title="重新上传"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline text-sm font-medium">更换</span>
          </button>

          {preview && (
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className={`px-4 py-3 rounded-xl transition-all flex items-center gap-2 shadow-sm ${
                showPreview ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">预览</span>
            </button>
          )}
        </div>
      )}

      {showPreview && value && (
        <div className="relative w-full h-48 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 mt-2 group">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23999" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2" ry="2"/%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"/%3E%3Cpolyline points="21 15 16 10 5 21"/%3E%3C/svg%3E';
            }}
          />
        </div>
      )}
    </div>
  );
}
