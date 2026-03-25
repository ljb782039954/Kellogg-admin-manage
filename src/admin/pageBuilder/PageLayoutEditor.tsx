// 页面布局编辑器主组件
import { useState, useCallback, useMemo, useEffect } from 'react';
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
import { useContent } from '@/context/ContentContext';
import { type CustomPage, type PageBlock } from '@/types';
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

export function PageLayoutEditor() {
  const navigate = useNavigate();
  const { pageId } = useParams<{ pageId: string }>();
  const { findPage, updatePage } = useContent();
  const { toast } = useToast();

  const page = useMemo(() => findPage(pageId || ''), [findPage, pageId]);

  const [localPage, setLocalPage] = useState<CustomPage | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // 当 page 加载后，且本地没有数据时，同步到本地状态
  useEffect(() => {
    if (page && !localPage) {
      setLocalPage(JSON.parse(JSON.stringify(page))); // 深拷贝
    }
  }, [page, localPage]);

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

  // 保存更改
  const handleSave = useCallback(async () => {
    if (!localPage || !pageId) return;

    await updatePage(pageId, localPage);
    setHasChanges(false);

    toast({
      title: '保存成功',
      description: '页面更改已保存到服务器',
    });
  }, [localPage, pageId, updatePage, toast]);

  // 更新本地页面状态
  const updateLocalPage = useCallback((updates: Partial<CustomPage>) => {
    setLocalPage(prev => prev ? { ...prev, ...updates } : null);
    setHasChanges(true);
  }, []);

  // 拖拽结束处理
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !localPage) return;

    const oldIndex = localPage.blocks.findIndex((b) => b.id === active.id);
    const newIndex = localPage.blocks.findIndex((b) => b.id === over.id);

    updateLocalPage({
      blocks: arrayMove(localPage.blocks, oldIndex, newIndex),
    });
  }, [localPage, updateLocalPage]);

  // 添加区块
  const handleAddBlock = useCallback((block: PageBlock) => {
    if (!localPage) return;
    updateLocalPage({
      blocks: [...localPage.blocks, block],
    });
    setSelectedBlockId(block.id);
  }, [localPage, updateLocalPage]);

  // 删除区块
  const handleRemoveBlock = useCallback((blockId: string) => {
    if (!localPage) return;
    updateLocalPage({
      blocks: localPage.blocks.filter((b) => b.id !== blockId),
    });
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  }, [localPage, selectedBlockId, updateLocalPage]);

  // 切换区块可见性
  const handleToggleBlock = useCallback((blockId: string) => {
    if (!localPage) return;
    updateLocalPage({
      blocks: localPage.blocks.map((b) =>
        b.id === blockId ? { ...b, isVisible: !b.isVisible } : b
      ),
    });
  }, [localPage, updateLocalPage]);

  // 上移区块
  const handleMoveBlockUp = useCallback((blockId: string) => {
    if (!localPage) return;
    const index = localPage.blocks.findIndex((b) => b.id === blockId);
    if (index <= 0) return;
    updateLocalPage({
      blocks: arrayMove(localPage.blocks, index, index - 1),
    });
  }, [localPage, updateLocalPage]);

  // 下移区块
  const handleMoveBlockDown = useCallback((blockId: string) => {
    if (!localPage) return;
    const index = localPage.blocks.findIndex((b) => b.id === blockId);
    if (index < 0 || index >= localPage.blocks.length - 1) return;
    updateLocalPage({
      blocks: arrayMove(localPage.blocks, index, index + 1),
    });
  }, [localPage, updateLocalPage]);

  // 更新区块属性
  const handleUpdateBlockProps = useCallback((blockId: string, content: any) => {
    if (!localPage) return;
    updateLocalPage({
      blocks: localPage.blocks.map((b) =>
        b.id === blockId ? { ...b, content } : b
      ),
    });
  }, [localPage, updateLocalPage]);

  // 重置为默认
  const handleReset = useCallback(() => {
    if (!localPage) return;

    let defaultBlocks: PageBlock[] = [];

    // 为默认 blocks 生成新的 ID
    defaultBlocks = defaultBlocks.map((block) => ({
      ...block,
      id: `block_${nanoid(8)}`,
    }));

    updateLocalPage({ blocks: defaultBlocks });
    setSelectedBlockId(null);
    setIsResetDialogOpen(false);

    toast({
      title: '已重置',
      description: '页面布局已恢复为默认积木块设置',
    });
  }, [localPage, updateLocalPage, toast]);

  // 预览
  const handlePreview = useCallback(() => {
    const previewUrl = localPage?.path || '/';
    // 假设 webApp 在 5173 开端口
    window.open(`http://localhost:5173${previewUrl}?preview=true`, '_blank');
  }, [localPage]);

  // 返回列表
  const handleBack = useCallback(() => {
    if (hasChanges) {
      const confirmed = window.confirm('有未保存的更改，确定要离开吗？');
      if (!confirmed) return;
    }
    navigate('/pages');
  }, [hasChanges, navigate]);

  if (!localPage) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const selectedBlock = localPage.blocks.find((b) => b.id === selectedBlockId);

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
            <h1 className="text-lg font-semibold">{localPage.title.zh}</h1>
            <p className="text-sm text-gray-500">
              {localPage.path} · {localPage.blocks.length} 个积木块
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
                  编辑页面的基本信息和路由
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-6 py-6">
                <div className="space-y-2">
                  <Label>页面标题</Label>
                  <BilingualInput
                    value={localPage.title}
                    onChange={(title) => updateLocalPage({ title })}
                    placeholder={{ zh: '请输入中文标题', en: 'Enter English title' }}
                  />
                </div>
                {!localPage.isFixed && (
                  <div className="space-y-2">
                    <Label htmlFor="path">URL 路径</Label>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-1">/</span>
                      <Input
                        id="path"
                        value={localPage.path.replace(/^\//, '')}
                        onChange={(e) => {
                          const newPath = `/${e.target.value.replace(/[^a-z0-9-]/gi, '-').toLowerCase()}`;
                          updateLocalPage({ path: newPath });
                        }}
                        placeholder="about-us"
                      />
                    </div>
                  </div>
                )}
                {localPage.isFixed && (
                  <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <p>这是一个固定系统页面，路由路径无法修改。</p>
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
        {/* 左侧：积木块列表 */}
        <div className="w-80 border-r bg-gray-50/50 flex flex-col">
          <div className="p-4 flex-1 overflow-y-auto">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <BlockList
                blocks={localPage.blocks}
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
                className="w-full bg-green-50 hover:bg-green-100 border-green-200 text-green-700"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                添加积木块
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
                onUpdate={(content) => handleUpdateBlockProps(selectedBlock.id, content)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Eye className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-sm font-medium">选择左侧的积木块进行编辑</p>
                <p className="text-xs mt-1">拖拽积木块可以调整在前端页面的显示顺序</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 添加积木块弹窗 */}
      <AddBlockDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddBlock}
        existingBlocks={localPage.blocks}
      />

      {/* 重置确认弹窗 */}
      <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认重置？</AlertDialogTitle>
            <AlertDialogDescription>
              这将把当前页面的积木块布局恢复为系统默认设置。此操作无法撤销。
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
