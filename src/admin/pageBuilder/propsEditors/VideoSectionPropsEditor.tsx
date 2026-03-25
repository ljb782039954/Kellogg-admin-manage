// // 视频区块属性编辑器
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Switch } from '@/components/ui/switch';
// import BilingualInput from '../../components/BilingualInput';
// import ImageInput from '../../components/ImageInput';
// import type { VideoSectionPropsEditorProps } from '@/types';

// export function VideoSectionPropsEditor({ props, onUpdate }: VideoSectionPropsEditorProps) {
//   const handleChange = (key: string, value: unknown) => {
//     onUpdate({ ...props, [key]: value });
//   };

//   return (
//     <div className="space-y-6">
//       {/* 标题 */}
//       <div className="space-y-2">
//         <Label>视频标题（可选）</Label>
//         <BilingualInput
//           value={props.title || { zh: '', en: '' }}
//           onChange={(value) => handleChange('title', value)}
//           placeholder={{ zh: '请输入中文标题', en: 'Enter English title' }}
//         />
//       </div>

//       {/* 副标题 */}
//       <div className="space-y-2">
//         <Label>副标题（可选）</Label>
//         <BilingualInput
//           value={props.subtitle || { zh: '', en: '' }}
//           onChange={(value) => handleChange('subtitle', value)}
//           placeholder={{ zh: '请输入中文副标题', en: 'Enter English subtitle' }}
//         />
//       </div>

//       {/* 视频地址 */}
//       <div className="space-y-2">
//         <Label>视频地址 (Video URL)</Label>
//         <ImageInput
//           value={props.values?.videoUrl || ''}
//           onChange={(value) => handleChange('videoUrl', value)}
//           acceptType="video/*"
//           aspectRatio="video"
//         />
//         <div className="mt-2 text-xs text-gray-500">
//           Or paste an external embed code above:
//           <Input
//             value={props.values?.videoUrl || ''}
//             onChange={(e) => handleChange('videoUrl', e.target.value)}
//             placeholder="https://youtube.com/embed/xxx 或在此处手动输入视频 URL"
//             className="mt-1"
//           />
//         </div>
//       </div>

//       {/* 封面图 */}
//       <div className="space-y-2">
//         <Label>封面图（可选）</Label>
//         <ImageInput
//           value={props.values?.posterImage || ''}
//           onChange={(value) => handleChange('posterImage', value)}
//         />
//         <p className="text-xs text-gray-500">
//           视频加载前显示的封面图片
//         </p>
//       </div>

//       {/* 自动播放 */}
//       <div className="flex items-center justify-between">
//         <div className="space-y-0.5">
//           <Label>是否自动播放</Label>
//           <p className="text-xs text-gray-500">
//             页面加载后自动播放视频（通常会静音）
//           </p>
//         </div>
//         <Switch
//           checked={props.values?.autoPlay || false}
//           onCheckedChange={(checked) => handleChange('autoPlay', checked)}
//         />
//       </div>

//       {/* 循环播放 */}
//       <div className="flex items-center justify-between">
//         <div className="space-y-0.5">
//           <Label>是否循环播放</Label>
//           <p className="text-xs text-gray-500">
//             视频播放结束后自动重新播放
//           </p>
//         </div>
//         <Switch
//           checked={props.values?.loop || false}
//           onCheckedChange={(checked) => handleChange('loop', checked)}
//         />
//       </div>

//     </div>
//   );
// }
