import { ShippingAgent, Supplier } from '@/types/feed';

export interface CreatePostProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CreatePostFormData {
  title: string;
  description: string;
  category: string;
  priceYuan: string;
  productLink: string;
  supplierId: string;
  shippingAgentId: string;
  weight: string;
  warehouseTime: string;
}

export interface CreatePostImageSectionProps {
  imageUrls: string[];
  currentImageUrl: string;
  setCurrentImageUrl: (value: string) => void;
  onAddImage: () => void;
  onRemoveImage: (index: number) => void;
  maxImages: number;
}

export interface CreatePostDetailsSectionProps {
  formData: CreatePostFormData;
  categories: string[];
  onChange: (field: keyof CreatePostFormData, value: string) => void;
}

export interface CreatePostPartnersSectionProps {
  formData: CreatePostFormData;
  suppliers: Supplier[];
  shippingAgents: ShippingAgent[];
  onChange: (field: keyof CreatePostFormData, value: string) => void;
}

export interface CreatePostActionsProps {
  hasImages: boolean;
  onClose: () => void;
}
