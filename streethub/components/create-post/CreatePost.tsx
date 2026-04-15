'use client';

import { useState } from 'react';
import { mockShippingAgents, mockSuppliers } from '@/data/mockData';
import { CreatePostActions } from '@/components/create-post/CreatePostActions';
import { CreatePostDetailsSection } from '@/components/create-post/CreatePostDetailsSection';
import { CreatePostHeader } from '@/components/create-post/CreatePostHeader';
import { CreatePostImageSection } from '@/components/create-post/CreatePostImageSection';
import { CreatePostPartnersSection } from '@/components/create-post/CreatePostPartnersSection';
import { CreatePostFormData, CreatePostProps } from '@/types/create-post';

const CREATE_POST_CATEGORIES = ['Moletom', 'Tênis', 'Jaqueta', 'Camiseta', 'Calça', 'Acessórios'];
const MAX_POST_IMAGES = 5;

const initialFormData: CreatePostFormData = {
  title: '',
  description: '',
  category: CREATE_POST_CATEGORIES[0],
  priceYuan: '',
  productLink: '',
  supplierId: '',
  shippingAgentId: '',
  weight: '',
  warehouseTime: '',
};

export function CreatePost({ isOpen, onClose }: CreatePostProps) {
  const [formData, setFormData] = useState<CreatePostFormData>(initialFormData);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  const handleFormChange = (field: keyof CreatePostFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddImage = () => {
    const url = currentImageUrl.trim();
    if (!url || imageUrls.length >= MAX_POST_IMAGES) {
      return;
    }

    setImageUrls((prev) => [...prev, url]);
    setCurrentImageUrl('');
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setImageUrls([]);
    setCurrentImageUrl('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: trocar por chamada de API quando backend estiver pronto.
    console.log('Create post:', { ...formData, images: imageUrls });

    handleClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
      <div className='bg-neutral-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-neutral-800'>
        <CreatePostHeader onClose={handleClose} />

        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          <CreatePostImageSection
            imageUrls={imageUrls}
            currentImageUrl={currentImageUrl}
            setCurrentImageUrl={setCurrentImageUrl}
            onAddImage={handleAddImage}
            onRemoveImage={handleRemoveImage}
            maxImages={MAX_POST_IMAGES}
          />

          <CreatePostDetailsSection
            formData={formData}
            categories={CREATE_POST_CATEGORIES}
            onChange={handleFormChange}
          />

          <CreatePostPartnersSection
            formData={formData}
            suppliers={mockSuppliers}
            shippingAgents={mockShippingAgents}
            onChange={handleFormChange}
          />

          <CreatePostActions hasImages={imageUrls.length > 0} onClose={handleClose} />
        </form>
      </div>
    </div>
  );
}
