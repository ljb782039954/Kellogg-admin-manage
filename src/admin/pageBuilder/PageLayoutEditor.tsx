// 页面布局编辑器主组件

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { nanoid } from 'nanoid';
import { Save, Eye, RotateCcw, Plus, ArrowLeft, Settings } from 'lucide-react';
import { type PageSchema, type PageBlock, isFixedPage } from '@/types/pageSchema';
import { getDefaultSchema } from '@/config/defaultPageSchemas';
import { BlockList } from './BlockList';
import { BlockPropsEditor } from './BlockPropsEditor';
import { AddBlockDialog } from './AddBlockDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import BilingualInput from '../components/BilingualInput';

interface PageLayoutEditorProps {
  pageId?: string; // 可选，用于直接传入 pageId
}

// localStorage 键名
const getStorageKey = (pageId: string) => `page_schema_${pageId}`;

export function PageLayoutEditor({ pageId: propPageId }: PageLayoutEditorProps) {
  const navigate = useNavigate();
  const params = useParams();
  const pageId = propPageId || params.pageId || 'home';

  const [schema, setSchema] = useState<PageSchema | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  // 拖拽传感器配置
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 加载页面 Schema
  useEffect(() => {
    loadSchema();
  }, [pageId]);

  const loadSchema = useCallback(() => {
    const storageKey = getStorageKey(pageId);
    const stored = localStorage.getItem(storageKey);

    if (stored) {
      try {
        setSchema(JSON.parse(stored));
      } catch {
        setSchema(getDefaultSchema(pageId));
      }
    } else {
      setSchema(getDefaultSchema(pageId));
    }
    setHasChanges(false);
  }, [pageId]);

  // 保存 Schema
  const handleSave = useCallback(() => {
    if (!schema) return;

    const updatedSchema = {
      ...schema,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(getStorageKey(pageId), JSON.stringify(updatedSchema));
    setSchema(updatedSchema);
    setHasChanges(false);

    toast({
      title: '保存成功',
      description: '页面已保存',
    });
  }, [schema, pageId, toast]);

  // 更新 Schema（标记有变更）
  const updateSchema = useCallback((newSchema: PageSchema) => {
    setSchema(newSchema);
    setHasChanges(true);
  }, []);

  // 更新页面元信息
  const handleUpdatePageMeta = useCallback((field: string, value: unknown) => {
    if (!schema) return;
    updateSchema({
      ...schema,
      [field]: value,
    });
  }, [schema, updateSchema]);

  // 拖拽结束处理
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !schema) return;

    const oldIndex = schema.blocks.findIndex((b) => b.id === active.id);
    const newIndex = schema.blocks.findIndex((b) => b.id === over.id);

    updateSchema({
      ...schema,
      blocks: arrayMove(schema.blocks, oldIndex, newIndex),
    });
  }, [schema, updateSchema]);

  // 添加区块
  const handleAddBlock = useCallback((block: PageBlock) => {
    if (!schema) return;
    updateSchema({
      ...schema,
      blocks: [...schema.blocks, block],
    });
    setSelectedBlockId(block.id);
  }, [schema, updateSchema]);

  // 删除区块
  const handleRemoveBlock = useCallback((blockId: string) => {
    if (!schema) return;
    updateSchema({
      ...schema,
      blocks: schema.blocks.filter((b) => b.id !== blockId),
    });
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  }, [schema, selectedBlockId, updateSchema]);

  // 切换区块可见性
  const handleToggleBlock = useCallback((blockId: string) => {
    if (!schema) return;
    updateSchema({
      ...schema,
      blocks: schema.blocks.map((b) =>
        b.id === blockId ? { ...b, enabled: !b.enabled } : b
      ),
    });
  }, [schema, updateSchema]);

  // 上移区块
  const handleMoveBlockUp = useCallback((blockId: string) => {
    if (!schema) return;
    const index = schema.blocks.findIndex((b) => b.id === blockId);
    if (index <= 0) return;
    updateSchema({
      ...schema,
      blocks: arrayMove(schema.blocks, index, index - 1),
    });
  }, [schema, updateSchema]);

  // 下移区块
  const handleMoveBlockDown = useCallback((blockId: string) => {
    if (!schema) return;
    const index = schema.blocks.findIndex((b) => b.id === blockId);
    if (index < 0 || index >= schema.blocks.length - 1) return;
    updateSchema({
      ...schema,
      blocks: arrayMove(schema.blocks, index, index + 1),
    });
  }, [schema, updateSchema]);

  // 更新区块属性
  const handleUpdateBlockProps = useCallback((blockId: string, props: PageBlock['props']) => {
    if (!schema) return;
    updateSchema({
      ...schema,
      blocks: schema.blocks.map((b) =>
        b.id === blockId ? { ...b, props } : b
      ),
    });
  }, [schema, updateSchema]);

  // 重置为默认
  const handleReset = useCallback(() => {
    const defaultSchema = getDefaultSchema(pageId);
    // 为默认 blocks 生成新的 ID
    defaultSchema.blocks = defaultSchema.blocks.map((block) => ({
      ...block,
      id: nanoid(),
    }));
    updateSchema(defaultSchema);
    setSelectedBlockId(null);
    setIsResetDialogOpen(false);

    toast({
      title: '已重置',
      description: '页面布局已恢复为默认设置',
    });
  }, [pageId, updateSchema, toast]);

  // 预览
  const handlePreview = useCallback(() => {
    // 先保存再预览
    if (hasChanges) {
      handleSave();
    }
    // 打开新窗口预览
    const previewUrl = schema?.slug || '/';
    window.open(`http://localhost:5173${previewUrl}?preview=true`, '_blank');
  }, [hasChanges, handleSave, schema]);

  // 返回列表
  const handleBack = useCallback(() => {
    if (hasChanges) {
      const confirmed = window.confirm('有未保存的更改，确定要离开吗？');
      if (!confirmed) return;
    }
    navigate('/pages');
  }, [hasChanges, navigate]);

  const selectedBlock = schema?.blocks.find((b) => b.id === selectedBlockId);
  const isFixed = isFixedPage(pageId);

  if (!schema) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* 顶部工具栏 */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            返回
          </Button>
          <div className="border-l pl-4">
            <h1 className="text-lg font-semibold">{schema.title.zh}</h1>
            <p className="text-sm text-gray-500">
              {schema.slug} · {schema.blocks.length} 个组件
              {hasChanges && <span className="text-orange-500 ml-2">• 有未保存的更改</span>}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* 页面设置 */}
          <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-1" />
                设置
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>页面设置</SheetTitle>
                <SheetDescription>
                  编辑页面的基本信息
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-6 py-6">
                <div className="space-y-2">
                  <Label>页面标题</Label>
                  <BilingualInput
                    value={schema.title}
                    onChange={(value) => handleUpdatePageMeta('title', value)}
                    placeholder={{ zh: '请输入中文标题', en: 'Enter English title' }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>页面描述 (SEO)</Label>
                  <BilingualInput
                    value={schema.description || { zh: '', en: '' }}
                    onChange={(value) => handleUpdatePageMeta('description', value)}
                    placeholder={{ zh: '页面描述', en: 'Page description' }}
                    multiline
                  />
                </div>
                {!isFixed && (
                  <div className="space-y-2">
                    <Label>URL 路径</Label>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-1">/</span>
                      <Input
                        value={schema.slug.replace(/^\//, '')}
                        onChange={(e) => {
                          const newSlug = `/${e.target.value.replace(/[^a-z0-9-]/gi, '-').toLowerCase()}`;
                          handleUpdatePageMeta('slug', newSlug);
                        }}
                        placeholder="about-us"
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      只能使用小写字母、数字和连字符
                    </p>
                  </div>
                )}
                {isFixed && (
                  <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <p>这是一个固定页面，URL 路径不能修改。</p>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <Button variant="outline" size="sm" onClick={() => setIsResetDialogOpen(true)}>
            <RotateCcw className="w-4 h-4 mr-1" />
            重置
          </Button>
          <Button variant="outline" size="sm" onClick={handlePreview}>
            <Eye className="w-4 h-4 mr-1" />
            预览
          </Button>
          <Button size="sm" onClick={handleSave} disabled={!hasChanges}>
            <Save className="w-4 h-4 mr-1" />
            保存
          </Button>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧：区块列表 */}
        <div className="w-80 border-r bg-gray-50/50 flex flex-col">
          <div className="p-4 flex-1 overflow-y-auto">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <BlockList
                blocks={schema.blocks}
                selectedId={selectedBlockId}
                onSelect={setSelectedBlockId}
                onToggle={handleToggleBlock}
                onRemove={handleRemoveBlock}
                onMoveUp={handleMoveBlockUp}
                onMoveDown={handleMoveBlockDown}
              />
            </DndContext>
            {/* 添加按钮 */}
            <div className="mt-4 border-t pt-4">
              <Button
                variant="outline"
                className="w-full bg-green-200"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                添加组件
              </Button>
            </div>
          </div>
        </div>

        {/* 右侧：属性编辑器 */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="p-6">
            {selectedBlock ? (
              <BlockPropsEditor
                block={selectedBlock}
                onUpdate={(props) => handleUpdateBlockProps(selectedBlock.id, props)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Eye className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-sm">选择左侧的组件进行编辑</p>
                <p className="text-xs mt-1">拖拽组件可调整显示顺序</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 添加组件弹窗 */}
      <AddBlockDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddBlock}
        existingBlocks={schema.blocks}
      />

      {/* 重置确认弹窗 */}
      <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认重置？</AlertDialogTitle>
            <AlertDialogDescription>
              这将把页面布局恢复为默认设置，当前的所有更改都将丢失。此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset}>确认重置</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default PageLayoutEditor;
