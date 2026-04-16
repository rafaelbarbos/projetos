import { Link as LinkIcon } from 'lucide-react';
import { CreatePostDetailsSectionProps } from '@/types/create-post';

export function CreatePostDetailsSection({
  formData,
  categories,
  onChange,
}: CreatePostDetailsSectionProps) {
  return (
    <>
      <div>
        <label className='block text-sm font-medium text-neutral-300 mb-2'>Título do Produto *</label>
        <input
          type='text'
          required
          value={formData.title}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder='Ex: Essentials Hoodie Oversized - Bege Premium'
          className='w-full px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-neutral-300 mb-2'>
          Descrição <span className='text-neutral-500'>(Opcional)</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder='Conte mais sobre o produto: qualidade, tamanho, observações...'
          rows={3}
          className='w-full px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500 resize-none'
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-neutral-300 mb-2'>Categoria *</label>
          <select
            required
            value={formData.category}
            onChange={(e) => onChange('category', e.target.value)}
            className='w-full px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-purple-500'
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-neutral-300 mb-2'>Preço (Yuan) *</label>
          <div className='relative'>
            <span className='absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400 font-medium'>¥</span>
            <input
              type='number'
              required
              min='0'
              step='0.01'
              value={formData.priceYuan}
              onChange={(e) => onChange('priceYuan', e.target.value)}
              placeholder='158'
              className='w-full pl-8 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500'
            />
          </div>
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium text-neutral-300 mb-2'>
          Link do Produto <span className='text-neutral-500'>(Opcional)</span>
        </label>
        <div className='relative'>
          <LinkIcon className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500' />
          <input
            type='url'
            value={formData.productLink}
            onChange={(e) => onChange('productLink', e.target.value)}
            placeholder='https://www.pandabuy.com/product/123456789'
            className='w-full pl-10 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500'
          />
        </div>
      </div>
    </>
  );
}
