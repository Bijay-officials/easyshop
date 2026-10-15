const fs = require('fs');

let content = fs.readFileSync('src/pages/OrderHistory.tsx', 'utf-8');

const progressComponent = `
import { CheckCircle2, Truck } from 'lucide-react';

const stages = [
  { id: 'Order Received', labelEn: 'Order Received', labelJa: '注文受付' },
  { id: 'Preparing Shipment', labelEn: 'Preparing Shipment', labelJa: '出荷準備中' },
  { id: 'Shipped', labelEn: 'Shipped', labelJa: '発送済み' },
  { id: 'Out for Delivery', labelEn: 'Out for Delivery', labelJa: '配達中' },
  { id: 'Delivered', labelEn: 'Delivered', labelJa: '配達完了' }
];

function DeliveryProgress({ status, lang, estimatedDate }: { status: string, lang: string, estimatedDate?: string }) {
  const currentIndex = stages.findIndex(s => s.id === (status || 'Order Received'));
  
  return (
    <div className="p-5 md:p-6 bg-white border-t border-[#E5E7EB]">
      <div className="flex justify-between items-end mb-4">
        <h3 className="font-bold text-gray-900">{lang === 'ja' ? '配送状況' : 'Delivery Status'}</h3>
        {estimatedDate && (
          <div className="text-sm font-semibold text-gray-600">
            {lang === 'ja' ? 'お届け予定日: ' : 'Estimated Delivery: '}
            <span className="text-green-600">{new Date(estimatedDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>
      
      <div className="relative flex justify-between items-center w-full mt-8 mb-4">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full z-0"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-green-500 rounded-full z-0 transition-all duration-500"
          style={{ width: \`\${(Math.max(0, currentIndex) / (stages.length - 1)) * 100}%\` }}
        ></div>
        
        {stages.map((stage, idx) => {
          const isCompleted = idx <= currentIndex;
          const isCurrent = idx === currentIndex;
          
          return (
            <div key={stage.id} className="relative z-10 flex flex-col items-center">
              <div 
                className={\`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300 \${
                  isCompleted ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-gray-300'
                }\`}
              >
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>}
              </div>
              <div 
                className={\`absolute top-10 text-[10px] sm:text-xs font-bold whitespace-nowrap text-center \${
                  isCurrent ? 'text-green-600' : isCompleted ? 'text-gray-800' : 'text-gray-400'
                }\`}
              >
                {lang === 'ja' ? stage.labelJa : stage.labelEn}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
`;

content = content.replace(
  /import \{ Package, Calendar, ChevronDown, ChevronUp \} from 'lucide-react';/,
  `import { Package, Calendar, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';`
);

content = content.replace(
  /export default function OrderHistory/,
  progressComponent.replace(/import \{ CheckCircle2, Truck \} from 'lucide-react';/, '') + '\nexport default function OrderHistory'
);

const deliveryProgressCall = `
                  <DeliveryProgress 
                    status={order.deliveryStatus || 'Order Received'} 
                    lang={lang} 
                    estimatedDate={order.estimatedDeliveryDate} 
                  />
                  {order.shippingAddress && (
`;

content = content.replace(
  /\{order\.shippingAddress && \(/,
  deliveryProgressCall
);

fs.writeFileSync('src/pages/OrderHistory.tsx', content);
console.log('Updated OrderHistory.tsx');
