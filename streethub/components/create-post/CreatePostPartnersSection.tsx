import { CreatePostPartnersSectionProps } from '@/types/create-post';

export function CreatePostPartnersSection({
  formData,
  suppliers,
  shippingAgents,
  onChange,
}: CreatePostPartnersSectionProps) {
  return (
    <>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-neutral-300 mb-2'>Fornecedor *</label>
          <select
            required
            value={formData.supplierId}
            onChange={(e) => onChange('supplierId', e.target.value)}
            className='w-full px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-purple-500'
          >
            <option value=''>Selecione...</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.avatar} {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-neutral-300 mb-2'>Agente de Compra *</label>
          <select
            required
            value={formData.shippingAgentId}
            onChange={(e) => onChange('shippingAgentId', e.target.value)}
            className='w-full px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-purple-500'
          >
            <option value=''>Selecione...</option>
            {shippingAgents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.avatar} {agent.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-neutral-300 mb-2'>
            Peso (kg) <span className='text-neutral-500'>(Opcional)</span>
          </label>
          <input
            type='number'
            min='0'
            step='0.1'
            value={formData.weight}
            onChange={(e) => onChange('weight', e.target.value)}
            placeholder='0.5'
            className='w-full px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-neutral-300 mb-2'>
            Tempo até Warehouse <span className='text-neutral-500'>(Opcional)</span>
          </label>
          <input
            type='text'
            value={formData.warehouseTime}
            onChange={(e) => onChange('warehouseTime', e.target.value)}
            placeholder='3 dias'
            className='w-full px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500'
          />
        </div>
      </div>
    </>
  );
}
